import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'
import { LearningPathsFileSchema } from './lib/types.js'
import { loadRegistry, indexTopics } from './lib/load-registry.js'
import { DOCS_EN, LEARNING_PATHS_PATH, topicHref } from './lib/paths.js'

const pathsFile = LearningPathsFileSchema.parse(
  YAML.parse(fs.readFileSync(LEARNING_PATHS_PATH, 'utf8')),
)
const registry = loadRegistry()
const byId = indexTopics(registry)

const outDir = path.join(DOCS_EN, 'learning-paths')
fs.mkdirSync(outDir, { recursive: true })

for (const p of pathsFile.paths) {
  const items = p.topic_ids.map((id, index) => {
    const topic = byId.get(id)
    if (!topic) throw new Error(`Missing topic ${id} in path ${p.id}`)
    return `${index + 1}. [${topic.title}](${topicHref(topic.path)}) — ${topic.difficulty}, ~${topic.estimated_reading_minutes} min (\`${id}\`)`
  })

  const file = path.join(outDir, `${p.id}.md`)
  fs.writeFileSync(
    file,
    `---
title: ${JSON.stringify(p.title)}
description: ${JSON.stringify(p.description)}
omit_sections: true
---

# ${p.title}

${p.description}

**Audience:** ${p.audience}

<LearningPathNav />

## Sequence

${items.join('\n')}

## Notes

- Complete prerequisites listed on each topic before deep-diving advanced siblings.
- Interview paths always defer to canonical topic pages for answers.
`,
    'utf8',
  )
  console.log(`Wrote ${file}`)
}
