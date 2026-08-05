import fs from 'node:fs'
import path from 'node:path'
import { loadRegistry } from './lib/load-registry.js'
import { DOCS_EN, topicIdToFilePath } from './lib/paths.js'
import { stubMarkdown } from './lib/stub-template.js'

const registry = loadRegistry()

function writeIfMissing(filePath: string, content: string) {
  if (fs.existsSync(filePath)) return false
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
  return true
}

for (const mod of registry.modules) {
  const topics = registry.topics
    .filter((t) => t.module === mod.id && t.parents[0] === mod.id)
    .sort((a, b) => a.order - b.order)

  const list = topics
    .map((t) => {
      const href = '/' + t.path.replace(/^en\//, '').replace(/\/index\.md$/, '/')
      return `- [${t.title}](${href}) — ${t.difficulty}, ~${t.estimated_reading_minutes} min`
    })
    .join('\n')

  const safeIds = topics.slice(0, 12).map((t) => {
    const node = t.id.split('.').pop()!.replace(/-/g, '_')
    return `  moduleNode --> ${node}`
  })

  writeIfMissing(
    path.join(DOCS_EN, mod.id, 'index.md'),
    `---
title: ${JSON.stringify(mod.title)}
description: ${JSON.stringify(mod.description)}
omit_sections: true
---

# ${mod.title}

## Scope

${mod.description}

## Prerequisites

See the learning paths and each topic's prerequisites in the registry.

## Topics in order

${list}

## Module knowledge graph

\`\`\`mermaid
flowchart TD
  moduleNode[${mod.id.replace(/-/g, '_')}]
${safeIds.join('\n')}
\`\`\`

## Suggested learning paths

Browse [Learning Paths](/learning-paths/).
`,
  )
}

let created = 0
let skipped = 0

for (const mod of registry.modules) {
  const moduleTopics = registry.topics
    .filter((t) => t.module === mod.id)
    .sort((a, b) => a.order - b.order)

  for (let i = 0; i < moduleTopics.length; i++) {
    const topic = moduleTopics[i]!
    const filePath = topicIdToFilePath(topic.path)
    if (fs.existsSync(filePath)) {
      skipped++
      continue
    }
    const prev = i > 0 ? moduleTopics[i - 1] : undefined
    const next = i < moduleTopics.length - 1 ? moduleTopics[i + 1] : undefined
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, stubMarkdown(topic, prev, next), 'utf8')
    created++
  }
}

console.log(`Module indexes ready under docs/en/*/index.md`)
console.log(`Topic stubs: ${created} written, ${skipped} already present`)
