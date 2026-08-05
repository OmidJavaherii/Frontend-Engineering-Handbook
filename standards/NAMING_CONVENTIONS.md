# Naming Conventions

## Repository

| Kind | Convention | Example |
| --- | --- | --- |
| Module folder | `NN-kebab-case` | `03-browser` |
| Topic folder | `kebab-case` | `event-loop` |
| Topic page file | always `index.md` | `event-loop/index.md` |
| Topic assets | `assets/` under topic | `event-loop/assets/crp.svg` |
| Topic id | `{module}.{topic}` | `03-browser.event-loop` |
| Child topic id | `{module}.{parent}-{child}` or nested path id | `01-computer-science.data-structures-array` |
| Tag id | `kebab-case` | `browser-internals` |
| Script files | `kebab-case.ts` | `validate-registry.ts` |
| Vue components | `PascalCase.vue` | `TopicMeta.vue` |
| Generated sidebars | `{module}.ts` | `03-browser.ts` |

## Reserved future module ids

Do not reuse. Create only when content phase needs them:

- `26-graphics` — Canvas, SVG, WebGL overview
- `27-languages-ecosystem` — Vue / Svelte / Solid comparisons

## Paths

- Content root: `docs/en/`
- Future locales: `docs/{locale}/` mirroring `en/`
- Public assets: `docs/public/`
- Shared diagrams (3+ topics): `docs/public/diagrams/{module}/`
- Topic-local media: `docs/en/{module}/{topic}/assets/`

## URLs (VitePress)

- Module: `/03-browser/`
- Topic: `/03-browser/event-loop/`
- Never use cross-module relative links (`../../`)

## Git branches / PRs

- `content/{topic-id}` for topic writing — e.g. `content/03-browser.event-loop`
- `chore/{short-name}` for tooling
- One topic per content PR when possible

## YAML keys

- `snake_case` for registry fields: `estimated_reading_minutes`
- Arrays of topic ids stay kebab module + dot topic form
