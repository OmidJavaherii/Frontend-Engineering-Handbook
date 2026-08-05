# Code Style (in documentation)

## Languages

- Prefer modern JavaScript (`const`/`let`, modules, async/await)
- Use TypeScript when the topic is types, React props, or production APIs
- HTML/CSS examples should be valid and copy-pasteable
- Shell examples use `bash` fences; assume POSIX unless Windows-specific

## Fences

- Always set a language tag: `js`, `ts`, `tsx`, `html`, `css`, `bash`, `json`, `yaml`
- Keep examples focused; split “simple → production” as separate fences
- Annotate non-obvious lines with short inline comments

## Progressive examples

1. Minimal example that shows the idea
2. Corrected / idiomatic version
3. Production-shaped snippet with error handling, abort, types, or edge cases

## Do not

- Paste entire applications into a topic page
- Use outdated APIs without calling out legacy status
- Rely on `var`, implicit globals, or CDN mystery scripts without explanation
- Include secrets, tokens, or real private keys

## React / Next.js

- Show Client vs Server Component boundaries explicitly (`'use client'` when needed)
- Prefer function components
- Match current stable React / Next.js docs unless teaching history

## Formatting

- 2-space indent in fenced examples
- Surround fences with blank lines
- Truncate with `// ...` only when the omitted region is irrelevant
