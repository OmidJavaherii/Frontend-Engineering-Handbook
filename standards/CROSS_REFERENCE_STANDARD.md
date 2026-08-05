# Cross-Reference Standard

## Link classes

| Class | Frontmatter / registry field | UI placement |
| --- | --- | --- |
| Previous | `prev_topic` | Footer nav |
| Next | `next_topic` | Footer nav |
| Prerequisites | `prerequisites` | Top (`<Prerequisites />`) |
| Related | `related` | Rail + before Summary |
| Advanced | `advanced` | After Mental Model note + footer |
| Beginner path | `beginner_path` | Callout on senior/expert pages |
| Recommended next | `recommended_next` | End of Summary / path pages |

## Canonical ownership

- One topic owns the deep explanation of a concept
- Other modules add a **perspective** section and link to the canonical page
- Interview answers must link back to canonical topics — never invent a second source of truth

## Perspective twins

Examples: `01-computer-science.event-loop-cs`, `03-browser.event-loop`, `06-javascript.event-loop-js`

- Connect with `related` / `perspective_of` in the registry
- Do **not** create mutual `depends_on` edges between twins

## URL form

Inside Markdown body:

```md
[Event Loop](/03-browser/event-loop/)
```

With locale readiness, prefer topic ids in frontmatter; the theme resolves ids to locale-aware hrefs.

## Validation

CI runs:

- `pnpm registry:validate` — schema, required fields, `depends_on` DAG acyclic
- `pnpm registry:links` — every referenced topic id exists; every topic path file exists

## Avoiding duplication

| Need | Do |
| --- | --- |
| Same concept, new layer | Perspective section + link |
| Deeper dive | Child topic or `advanced/` + `advanced` link |
| Path-specific ordering | Learning path page, not a forked topic |

## Dependency rules

- `depends_on` / `prerequisites` form a DAG (CI-enforced)
- `related` may be cyclic
- Module order is pedagogical; topic prerequisites may point across modules when justified
