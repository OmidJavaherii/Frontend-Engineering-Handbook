import { withMermaid } from 'vitepress-plugin-mermaid'
import { sidebars } from './sidebars/index.js'
import { enConfig } from './locales/en.js'
import { topicMap } from './topic-map.js'

/**
 * Content lives in docs/en so future locales (docs/fa, ...) need no file moves.
 * srcDir: 'en' serves English at site root `/`.
 * Static assets: docs/en/public (VitePress publicDir = srcDir/public).
 */
const base =
  process.env.GITHUB_ACTIONS === 'true' ? '/Frontend-Engineering-Handbook/' : '/'

const siteOrigin = 'https://omidjavaherii.github.io'
const siteUrl = `${siteOrigin}${base}`
const ogImage = `${siteUrl}og/banner.png`
const description =
  enConfig.description ??
  'A first-principles handbook for modern frontend engineering — from bits and packets to pixels and production systems.'

export default withMermaid({
  title: 'Frontend Engineering Handbook',
  description,
  // Project Pages: https://omidjavaherii.github.io/Frontend-Engineering-Handbook/
  base,
  srcDir: 'en',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Frontend Engineering Handbook' }],
    ['meta', { property: 'og:title', content: 'Frontend Engineering Handbook' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:image:alt', content: 'Frontend Engineering Handbook banner' }],
    ['meta', { property: 'og:url', content: siteUrl }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Frontend Engineering Handbook' }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImage }],
  ],
  themeConfig: {
    ...enConfig.themeConfig,
    // VitePress prefixes themeConfig.logo with `base` — do not include base here.
    logo: '/favicon.svg',
    siteTitle: 'FE Handbook',
    sidebar: sidebars,
    footer: {
      message: 'Open-source frontend engineering handbook',
      copyright: 'Copyright © 2026 Omid Javaheri',
    },
    search: {
      provider: 'local',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
    },
  },
  markdown: {
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' },
  },
  mermaid: {
    securityLevel: 'loose',
    theme: 'default',
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
