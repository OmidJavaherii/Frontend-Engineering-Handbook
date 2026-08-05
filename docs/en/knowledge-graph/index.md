---
title: Knowledge Graph
description: How handbook concepts connect
omit_sections: true
---

# Knowledge Graph

Topics are nodes. Edges capture prerequisites, hierarchy, related ideas, advanced dives, and perspective twins.

## Edge types

| Type | Meaning |
| --- | --- |
| `depends_on` | Hard prerequisite (acyclic) |
| `child_of` | Hierarchical containment |
| `related_to` | Soft bidirectional link |
| `deepens` | Advanced page in the same family |
| `perspective_of` | Same idea from another layer |

## Views

- [Module dependency overview](/knowledge-graph/overview) (generated)
- Per-module graphs on each [module index](/00-foundations/)
- Per-topic prerequisites and related rails on topic pages

Machine-readable edges: `meta/knowledge-graph.yaml`  
Canonical metadata: `meta/topic-registry.yaml`
