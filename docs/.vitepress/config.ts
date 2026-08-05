import { defineConfig } from 'vitepress'
import { sidebars } from './sidebars/index.js'
import { enConfig } from './locales/en.js'
import { topicMap } from './topic-map.js'

/**
 * Content lives in docs/en so future locales (docs/fa, ...) need no file moves.
 * srcDir: 'en' serves English at site root `/`.
 *
 * Future Persian locale (commented stub):
 * locales: {
 *   root: { label: 'English', lang: 'en', ... },
 *   fa: { label: 'فارسی', lang: 'fa', link: '/fa/', ... }
 * }
 */
export default defineConfig({
  title: 'Frontend Engineering Handbook',
  description: enConfig.description,
  srcDir: 'en',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }],
  ],
  themeConfig: {
    ...enConfig.themeConfig,
    logo: '/favicon.svg',
    siteTitle: 'FE Handbook',
    sidebar: sidebars,
    footer: {
      message: 'Open-source frontend engineering handbook',
      copyright: 'Copyright © 2026 Omid Javaheri',
    },
    search: {
      provider: 'local',
      // Algolia / Pagefind reserved when the corpus exceeds ~500 pages
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
    },
    // fa: {
    //   label: 'فارسی',
    //   lang: 'fa',
    //   link: '/fa/',
    // },
  },
  markdown: {
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' },
  },
  transformPageData(pageData) {
    const fm = pageData.frontmatter
    const prevId = fm.prev_topic as string | null | undefined
    const nextId = fm.next_topic as string | null | undefined
    if (prevId && topicMap[prevId]) {
      fm.prev = { text: topicMap[prevId].title, link: topicMap[prevId].href }
    }
    if (nextId && topicMap[nextId]) {
      fm.next = { text: topicMap[nextId].title, link: topicMap[nextId].href }
    }
  },
})
