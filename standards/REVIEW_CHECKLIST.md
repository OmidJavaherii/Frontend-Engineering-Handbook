# Review Checklist

Use this for promoting `draft` → `reviewed` → `published`.

## Structure

- [ ] Frontmatter complete and matches `meta/topic-registry.yaml`
- [ ] Single H1; required H2 sections present in order (unless `omit_sections`)
- [ ] Prerequisites listed and accurate
- [ ] Prev/next/related/advanced ids resolve

## Depth

- [ ] Why before how; mental model before internals
- [ ] Internal workflow / lifecycle are concrete, not slogans
- [ ] Relevant perspectives filled (Browser / V8 / React / Next / Server / Network / Memory)
- [ ] Performance trade-offs discussed
- [ ] Edge cases called out

## Examples and diagrams

- [ ] Code progresses simple → production
- [ ] Important lines explained
- [ ] At least one Mermaid diagram when the topic has a process or lifecycle
- [ ] Diagrams follow `DIAGRAM_STANDARD.md`

## Quality bar

- [ ] ≥10 common mistakes (`published`)
- [ ] Best practices and anti-patterns are actionable
- [ ] Comparison table when peers exist
- [ ] Interview questions with answers (Easy / Medium / Hard)
- [ ] References point to official docs where possible

## Engineering hygiene

- [ ] No duplicated canonical content from another topic
- [ ] Cross-links use root paths or topic ids
- [ ] `pnpm registry:all` passes
- [ ] No secrets or credential material in examples
