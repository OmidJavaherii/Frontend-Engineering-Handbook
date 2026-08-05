# Contributing

Thank you for helping build a definitive frontend engineering handbook.

## Ground rules

- Follow [`standards/DOCUMENTATION_STANDARD.md`](standards/DOCUMENTATION_STANDARD.md)
- One canonical topic owns the deep explanation; other modules link and add perspectives
- Prefer official documentation in **References**
- Do not commit secrets, credentials, or proprietary code
- Keep `depends_on` acyclic — CI will fail on cycles

## Development setup

```bash
npx pnpm@9.15.0 install
npx pnpm@9.15.0 dev
```

## Adding or changing topics

1. Update `scripts/lib/curriculum-data.ts` (inventory) **or** edit `meta/topic-registry.yaml` carefully
2. If you changed curriculum-data: `pnpm registry:seed`
3. `pnpm registry:all`
4. `pnpm scaffold:topic --id {topic_id}` (or `pnpm scaffold:stubs`)
5. Write content toward `published` using the standard template
6. Run `pnpm verify` before opening a PR

## Status workflow

`stub` → `outline` → `draft` → `reviewed` → `published`

Use [`standards/REVIEW_CHECKLIST.md`](standards/REVIEW_CHECKLIST.md) for `reviewed` / `published`.

## PR expectations

- Prefer **one topic per PR** for content
- Tooling / registry changes can be grouped when cohesive
- Describe *why* the change exists in the PR body
- Link related issues

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
