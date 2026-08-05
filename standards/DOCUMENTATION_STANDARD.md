# Documentation Standard

Every topic page in this handbook follows the same structure. Consistency is part of the product.

## Page types

| Type | Path pattern | Full template required? |
| --- | --- | --- |
| Topic | `docs/en/{module}/{topic}/index.md` | Yes |
| Module index | `docs/en/{module}/index.md` | No — use category template |
| Learning path | `docs/en/learning-paths/*.md` | No |
| Meta / glossary / KG | `docs/en/{section}/*.md` | No |

Index and cheatsheet pages may set `omit_sections: true` in frontmatter.

## Required frontmatter

```yaml
---
title: Event Loop
description: How browsers schedule JavaScript tasks and render work
topic_id: 03-browser.event-loop
difficulty: mid
reading_time: 45
implementation_time: 30
prerequisites:
  - 01-computer-science.event-loop-cs
  - 03-browser.call-stack
tags:
  - browser-internals
  - async
status: stub
prev_topic: 03-browser.call-stack
next_topic: 03-browser.task-queue
related:
  - 06-javascript.promise
  - 10-react.useeffect
advanced:
  - 03-browser.microtasks
beginner_path: 03-browser.critical-rendering-path
omit_sections: false
---
```

### Field rules

- `topic_id` must exist in `meta/topic-registry.yaml`
- `difficulty`: `beginner` | `junior` | `mid` | `senior` | `expert`
- `status`: `stub` | `outline` | `draft` | `reviewed` | `published`
- `reading_time` / `implementation_time`: integers (minutes); use `0` for implementation when conceptual-only
- Link fields (`prev_topic`, `next_topic`, `related`, `advanced`, `beginner_path`, `prerequisites`) use topic ids, never raw URLs
- Do **not** use VitePress-reserved `prev` / `next` keys for topic ids — use `prev_topic` / `next_topic`

## Required H2 sections (topic pages)

Use exactly this order. Do not rename headings.

1. `# {Title}` (single H1, matches `title`)
2. `## Introduction`
3. `## Why does it exist?`
4. `## Historical Background`
5. `## Mental Model`
6. `## Internal Workflow`
7. `## Lifecycle`
8. `## Browser Perspective`
9. `## JavaScript Engine Perspective`
10. `## React Perspective` — or one line: `Not applicable.`
11. `## Next.js Perspective` — or `Not applicable.`
12. `## Server Perspective` — or `Not applicable.`
13. `## Network Perspective` — or `Not applicable.`
14. `## Memory Perspective`
15. `## Performance`
16. `## Production Example`
17. `## Code Examples`
18. `## Diagrams`
19. `## Common Mistakes` — minimum **10** items for `published`
20. `## Best Practices`
21. `## Anti-patterns`
22. `## Comparison` — include at least one table when peers exist
23. `## Interview Questions` — Easy / Medium / Hard subsections with answers
24. `## Summary`
25. `## References` — prefer official documentation

## Writing rules

- Explain **why** before **how**
- Build a mental model before implementation detail
- Never assume prior knowledge of the concept; do assume listed prerequisites
- Include browser / JS engine / React / Next.js / network / memory perspectives when relevant
- Cross-link related topics by topic id paths (`/03-browser/event-loop/`)
- Avoid buzzwords without definition
- Prefer depth over brevity
- Edge cases and production trade-offs belong in the page, not in footnotes only

## Stub minimum

A `stub` page must include:

- Valid frontmatter
- H1 title
- One-paragraph introduction placeholder
- `Status: stub` admonition
- Empty required H2 headings (so structure is visible)

Use `pnpm scaffold:topic --id {topic_id}` to generate this skeleton.

## Status promotion

| From | To | Gate |
| --- | --- | --- |
| stub | outline | Section bullets filled |
| outline | draft | Full prose + diagrams + code |
| draft | reviewed | Peer review via checklist |
| reviewed | published | ≥10 common mistakes, references, no broken links |

## Category (module index) template

```markdown
---
title: Browser
description: How browsers turn bytes into pixels and run JavaScript
omit_sections: true
---

# Browser

## Scope

## Prerequisites

## Topics in order

## Module knowledge graph

## Suggested learning paths
```

## Admonitions

Only VitePress built-ins:

```md
::: tip
:::

::: info
:::

::: warning
:::

::: danger
:::

::: details Title
:::
```

## Components on topic pages

Place after the H1 (theme may also inject automatically):

- `<TopicMeta />`
- `<Prerequisites />`
- `<RelatedTopics />` near the end (before Summary) or in layout rail
