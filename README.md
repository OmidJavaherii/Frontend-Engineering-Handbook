# Frontend Engineering Handbook

A deep, first-principles open-source handbook for **modern frontend engineering** — from bits, packets, and browser internals to React, Next.js, performance, security, and system design.

Comparable in ambition to resources like MDN, javascript.info, web.dev, and the V8 / Chrome developer blogs: **why before how**, internals whenever possible, and a strong mental model on every page.

## Quick start

```bash
# Node 20+ recommended. Uses pnpm (via packageManager field).
npx pnpm@9.15.0 install
npx pnpm@9.15.0 dev
```

- **Dev server:** VitePress on `docs/`
- **Content root:** `docs/en/` (English; locale layout ready for future `docs/fa/`)
- **Topic registry (SSOT):** `meta/topic-registry.yaml`

```bash
npx pnpm@9.15.0 build      # production docs build
npx pnpm@9.15.0 verify     # validate registry + typecheck + build
```

## Who this is for

Beginners, junior → senior frontend engineers, full-stack and backend engineers learning the client, interview candidates, and anyone who wants browser / network internals — not only framework APIs.

## Repository map

| Path | Purpose |
| --- | --- |
| `docs/en/` | Handbook content (modules `00`–`25`) |
| `docs/.vitepress/` | Site config, theme, generated sidebars |
| `meta/` | Topic registry, learning paths, tags, glossary, schemas |
| `scripts/` | Validate registry, generate nav, scaffold stubs |
| `standards/` | Documentation, naming, diagram, and review standards |
| `examples/` | Optional runnable demos (later) |

## Learning paths

- [Beginner](docs/en/learning-paths/beginner.md)
- [Junior](docs/en/learning-paths/junior.md)
- [Mid-level](docs/en/learning-paths/mid-level.md)
- [Senior](docs/en/learning-paths/senior.md)
- [Backend → Frontend](docs/en/learning-paths/backend-to-frontend.md)
- [Interview Prep](docs/en/learning-paths/interview-prep.md)

## Modules (00–25)

Foundations → CS → Internet → Browser → HTML → CSS → JavaScript → TypeScript → JSX/Fiber → Browser APIs → React → Next.js → Rendering → Performance → Build Tools → Architecture → Testing → Security → Accessibility → Deployment → Observability → Frontend System Design → Design Patterns → PWA → Interview → Appendix.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [standards/DOCUMENTATION_STANDARD.md](standards/DOCUMENTATION_STANDARD.md).

```bash
# After editing meta/curriculum (scripts/lib/curriculum-data.ts):
npx pnpm@9.15.0 registry:seed
npx pnpm@9.15.0 registry:all
npx pnpm@9.15.0 scaffold:stubs
npx pnpm@9.15.0 scaffold:paths

# Scaffold a single topic page
npx pnpm@9.15.0 scaffold:topic --id 03-browser.event-loop
```

## License

[MIT](LICENSE) © 2026 Omid Javaheri
