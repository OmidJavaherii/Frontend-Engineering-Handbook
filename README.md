# Frontend Engineering Handbook

A deep, first-principles open-source handbook for **modern frontend engineering** — from bits, packets, and browser internals to React, Next.js, performance, security, and system design.

## Quick start

```bash
npx pnpm@9.15.0 install
npx pnpm@9.15.0 dev
```

- **Dev server:** VitePress on `docs/`
- **Content:** `docs/en/` (English; ready for future `docs/fa/`)
- **Topic registry (SSOT):** `meta/topic-registry.yaml`

```bash
npx pnpm@9.15.0 build
npx pnpm@9.15.0 verify
```

## Repository map

| Path | Purpose |
| --- | --- |
| `docs/en/` | Handbook content (modules `00`–`25`) |
| `docs/.vitepress/` | Site config, theme, generated sidebars |
| `meta/` | Topic registry, learning paths, tags, glossary, schemas |
| `scripts/` | Registry validation, nav generation, scaffolding |
| `standards/` | Documentation and review standards |

## Deploy (GitHub Pages)

One workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — verify on PRs; verify + deploy on `main`.

**One-time setup** (fixes Pages `404` deploy):

1. Open [Settings → Pages](https://github.com/OmidJavaherii/Frontend-Engineering-Handbook/settings/pages)
2. **Source** → **GitHub Actions**
3. Re-run CI on `main`

Live: https://omidjavaherii.github.io/Frontend-Engineering-Handbook/

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [standards/DOCUMENTATION_STANDARD.md](standards/DOCUMENTATION_STANDARD.md).

```bash
npx pnpm@9.15.0 scaffold:topic --id 03-browser.event-loop
npx pnpm@9.15.0 content:publish --all   # or --module / --id
npx pnpm@9.15.0 verify
```

## License

[MIT](LICENSE) © 2026 Omid Javaheri
