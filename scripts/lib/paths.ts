import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export const ROOT = path.resolve(here, '../..')
export const META_DIR = path.join(ROOT, 'meta')
export const DOCS_EN = path.join(ROOT, 'docs', 'en')
export const SIDEBARS_DIR = path.join(ROOT, 'docs', '.vitepress', 'sidebars')
export const REGISTRY_PATH = path.join(META_DIR, 'topic-registry.yaml')
export const TAGS_PATH = path.join(META_DIR, 'tags.yaml')
export const LEARNING_PATHS_PATH = path.join(META_DIR, 'learning-paths.yaml')
export const KNOWLEDGE_GRAPH_PATH = path.join(META_DIR, 'knowledge-graph.yaml')
export const KG_OVERVIEW_MD = path.join(DOCS_EN, 'knowledge-graph', 'overview.md')

export function topicHref(topicPath: string): string {
  // en/03-browser/event-loop/index.md -> /03-browser/event-loop/
  const withoutLocale = topicPath.replace(/^en\//, '')
  const withoutIndex = withoutLocale.replace(/\/index\.md$/, '/')
  return `/${withoutIndex}`
}

export function topicIdToFilePath(topicPath: string): string {
  return path.join(ROOT, 'docs', topicPath)
}
