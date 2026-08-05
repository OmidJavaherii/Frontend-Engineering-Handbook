import fs from 'node:fs'
import path from 'node:path'
import { loadRegistry, indexTopics } from './lib/load-registry.js'
import { topicIdToFilePath } from './lib/paths.js'
import { stubMarkdown } from './lib/stub-template.js'

function parseArgs(argv: string[]) {
  const out: { id?: string; force?: boolean } = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--id') out.id = argv[++i]
    else if (a === '--force') out.force = true
  }
  return out
}

const args = parseArgs(process.argv.slice(2))
if (!args.id) {
  console.error('Usage: pnpm scaffold:topic --id <topic_id> [--force]')
  process.exit(1)
}

const registry = loadRegistry()
const byId = indexTopics(registry)
const topic = byId.get(args.id)
if (!topic) {
  console.error(`Unknown topic id: ${args.id}`)
  process.exit(1)
}

const moduleTopics = registry.topics
  .filter((t) => t.module === topic.module)
  .sort((a, b) => a.order - b.order)
const idx = moduleTopics.findIndex((t) => t.id === topic.id)
const prev = idx > 0 ? moduleTopics[idx - 1] : undefined
const next = idx < moduleTopics.length - 1 ? moduleTopics[idx + 1] : undefined

const filePath = topicIdToFilePath(topic.path)
if (fs.existsSync(filePath) && !args.force) {
  console.log(`Exists, skipping (use --force): ${filePath}`)
  process.exit(0)
}

fs.mkdirSync(path.dirname(filePath), { recursive: true })
fs.writeFileSync(filePath, stubMarkdown(topic, prev, next), 'utf8')
console.log(`Wrote ${filePath}`)
