import fs from 'node:fs'
import YAML from 'yaml'
import { LearningPathsFileSchema, TagsFileSchema } from './lib/types.js'
import { loadRegistry, indexTopics } from './lib/load-registry.js'
import { LEARNING_PATHS_PATH, TAGS_PATH } from './lib/paths.js'

function fail(messages: string[]): never {
  for (const m of messages) console.error(`✖ ${m}`)
  process.exit(1)
}

function detectCycles(dependsOn: Map<string, string[]>): string[] | null {
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const stack: string[] = []

  function dfs(node: string): string[] | null {
    if (visiting.has(node)) {
      const idx = stack.indexOf(node)
      return [...stack.slice(idx), node]
    }
    if (visited.has(node)) return null
    visiting.add(node)
    stack.push(node)
    for (const next of dependsOn.get(node) ?? []) {
      const cycle = dfs(next)
      if (cycle) return cycle
    }
    stack.pop()
    visiting.delete(node)
    visited.add(node)
    return null
  }

  for (const node of dependsOn.keys()) {
    const cycle = dfs(node)
    if (cycle) return cycle
  }
  return null
}

const errors: string[] = []
const registry = loadRegistry()
const byId = indexTopics(registry)
const moduleIds = new Set(registry.modules.map((m) => m.id))

if (new Set(registry.topics.map((t) => t.id)).size !== registry.topics.length) {
  errors.push('Duplicate topic ids found')
}

for (const topic of registry.topics) {
  if (!moduleIds.has(topic.module)) {
    errors.push(`${topic.id}: unknown module ${topic.module}`)
  }
  if (!topic.path.startsWith(`en/${topic.module}/`)) {
    errors.push(`${topic.id}: path must live under en/${topic.module}/ (got ${topic.path})`)
  }

  const refFields: Array<[string, string[]]> = [
    ['prerequisites', topic.prerequisites],
    ['recommended_next', topic.recommended_next],
    ['related', topic.related],
    ['depends_on', topic.depends_on],
    ['dependents', topic.dependents],
    ['children', topic.children],
    ['advanced', topic.advanced],
    ['perspective_of', topic.perspective_of],
  ]
  for (const [field, ids] of refFields) {
    for (const id of ids) {
      if (!byId.has(id)) errors.push(`${topic.id}: ${field} references missing topic ${id}`)
    }
  }
  if (topic.beginner_path && !byId.has(topic.beginner_path)) {
    errors.push(`${topic.id}: beginner_path missing ${topic.beginner_path}`)
  }
  for (const parent of topic.parents) {
    if (parent !== topic.module && !byId.has(parent)) {
      errors.push(`${topic.id}: parent missing ${parent}`)
    }
  }
}

const dependsMap = new Map(registry.topics.map((t) => [t.id, t.depends_on]))
const cycle = detectCycles(dependsMap)
if (cycle) {
  errors.push(`depends_on cycle detected: ${cycle.join(' -> ')}`)
}

const tagsFile = TagsFileSchema.parse(YAML.parse(fs.readFileSync(TAGS_PATH, 'utf8')))
const tagIds = new Set(tagsFile.tags.map((t) => t.id))
for (const topic of registry.topics) {
  for (const tag of topic.tags) {
    if (!tagIds.has(tag)) errors.push(`${topic.id}: unknown tag ${tag}`)
  }
}

const pathsFile = LearningPathsFileSchema.parse(
  YAML.parse(fs.readFileSync(LEARNING_PATHS_PATH, 'utf8')),
)
for (const p of pathsFile.paths) {
  for (const id of p.topic_ids) {
    if (!byId.has(id)) errors.push(`learning path ${p.id}: missing topic ${id}`)
  }
}

if (errors.length) fail(errors)

console.log(`✓ Registry OK — ${registry.topics.length} topics, ${registry.modules.length} modules`)
console.log(`✓ Tags OK — ${tagsFile.tags.length} tags`)
console.log(`✓ Learning paths OK — ${pathsFile.paths.length} paths`)
console.log('✓ depends_on DAG is acyclic')
