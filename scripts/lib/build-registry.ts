import type { Registry, Topic } from './types.js'
import { MODULES, type SeedTopic } from './curriculum-data.js'

function titleCaseFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((p) => (p.length ? p[0]!.toUpperCase() + p.slice(1) : p))
    .join(' ')
}

function expandTopic(
  moduleId: string,
  topic: SeedTopic,
  order: { value: number },
  parentId?: string,
): Topic[] {
  const segments = topic.segments ?? [topic.slug]
  const idSuffix = segments.join('-')
  const id = `${moduleId}.${idSuffix}`
  const relPath = `en/${moduleId}/${segments.join('/')}/index.md`

  const childTopics = topic.children ?? []
  const childIds = childTopics.map((child) => {
    const childSegments = child.segments ?? [...segments, child.slug]
    return `${moduleId}.${childSegments.join('-')}`
  })

  const node: Topic = {
    id,
    title: topic.title || titleCaseFromSlug(topic.slug),
    module: moduleId,
    path: relPath,
    difficulty: topic.difficulty ?? 'junior',
    estimated_reading_minutes: topic.reading ?? 30,
    estimated_implementation_minutes: topic.implementation ?? 0,
    prerequisites: topic.prerequisites ?? [],
    recommended_next: topic.recommended_next ?? [],
    parents: parentId ? [parentId] : [moduleId],
    children: childIds,
    related: topic.related ?? [],
    depends_on: topic.depends_on ?? topic.prerequisites ?? [],
    dependents: [],
    advanced: topic.advanced ?? [],
    beginner_path: topic.beginner_path,
    perspective_of: topic.perspective_of ?? [],
    tags: topic.tags ?? [],
    status: 'stub',
    order: order.value++,
  }

  const nested = childTopics.flatMap((child) =>
    expandTopic(
      moduleId,
      {
        ...child,
        segments: child.segments ?? [...segments, child.slug],
        prerequisites: child.prerequisites ?? [id],
      },
      order,
      id,
    ),
  )

  return [node, ...nested]
}

function wireDependents(topics: Topic[]): Topic[] {
  const byId = new Map(topics.map((t) => [t.id, t]))
  for (const topic of topics) {
    for (const dep of topic.depends_on) {
      const parent = byId.get(dep)
      if (parent && !parent.dependents.includes(topic.id)) {
        parent.dependents.push(topic.id)
      }
    }
  }

  // Linear recommended_next within module when missing
  const byModule = new Map<string, Topic[]>()
  for (const topic of topics) {
    const list = byModule.get(topic.module) ?? []
    list.push(topic)
    byModule.set(topic.module, list)
  }
  for (const list of byModule.values()) {
    list.sort((a, b) => a.order - b.order)
    for (let i = 0; i < list.length; i++) {
      const cur = list[i]!
      if (cur.recommended_next.length === 0 && i < list.length - 1) {
        cur.recommended_next = [list[i + 1]!.id]
      }
    }
  }

  return topics
}

export function buildRegistry(): Registry {
  const order = { value: 0 }
  const topics = MODULES.flatMap((mod) =>
    mod.topics.flatMap((topic) => expandTopic(mod.id, topic, order)),
  )

  return {
    version: 1,
    modules: MODULES.map((m, index) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      order: index,
    })),
    topics: wireDependents(topics),
  }
}

export function collectTags(registry: Registry): { id: string; label: string; description: string }[] {
  const set = new Set<string>()
  for (const topic of registry.topics) {
    for (const tag of topic.tags) set.add(tag)
  }
  return [...set].sort().map((id) => ({
    id,
    label: titleCaseFromSlug(id),
    description: `Topics tagged ${id}`,
  }))
}
