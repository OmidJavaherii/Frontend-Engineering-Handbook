import fs from 'node:fs'
import { loadRegistry, indexTopics } from './lib/load-registry.js'
import { topicIdToFilePath } from './lib/paths.js'

const errors: string[] = []
const registry = loadRegistry()
const byId = indexTopics(registry)

for (const topic of registry.topics) {
  const abs = topicIdToFilePath(topic.path)
  if (!fs.existsSync(abs)) {
    errors.push(`Missing file for ${topic.id}: ${topic.path}`)
  }
}

// Scan markdown for topic_id frontmatter mismatches and broken /module/topic/ links
const linkRe = /\]\((\/[0-9]{2}-[a-z0-9-]+\/[a-z0-9-./]*)\)/g
const pathToId = new Map(
  registry.topics.map((t) => {
    const href = '/' + t.path.replace(/^en\//, '').replace(/\/index\.md$/, '/')
    return [href, t.id] as const
  }),
)

for (const topic of registry.topics) {
  const abs = topicIdToFilePath(topic.path)
  if (!fs.existsSync(abs)) continue
  const body = fs.readFileSync(abs, 'utf8')
  const idMatch = body.match(/^topic_id:\s*(.+)$/m)
  if (idMatch) {
    const fmId = idMatch[1]!.trim()
    if (fmId !== topic.id) {
      errors.push(`${topic.path}: frontmatter topic_id ${fmId} != registry ${topic.id}`)
    }
  }
  for (const match of body.matchAll(linkRe)) {
    let href = match[1]!
    if (!href.endsWith('/')) href += '/'
    // Allow module index links
    const isModule = /^\/[0-9]{2}-[a-z0-9-]+\/$/.test(href)
    if (isModule) {
      const mod = href.slice(1, -1)
      if (!registry.modules.some((m) => m.id === mod)) {
        errors.push(`${topic.id}: broken module link ${href}`)
      }
      continue
    }
    if (!pathToId.has(href) && !pathToId.has(href.replace(/\/$/, '') + '/')) {
      // nested topics may have deeper paths
      const normalized = href.endsWith('/') ? href : `${href}/`
      if (![...pathToId.keys()].some((k) => k === normalized)) {
        errors.push(`${topic.id}: broken link ${href}`)
      }
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`)
  process.exit(1)
}

console.log(`✓ Cross-links OK — ${registry.topics.length} topic files present`)
