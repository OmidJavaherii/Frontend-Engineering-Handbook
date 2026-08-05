import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> & { label: string } = {
  label: 'English',
  lang: 'en',
  description:
    'A first-principles handbook for modern frontend engineering — from bits and packets to pixels and production systems.',
  themeConfig: {
    nav: [
      { text: 'Start Here', link: '/start-here' },
      { text: 'Learning Paths', link: '/learning-paths/' },
      { text: 'Modules', link: '/00-foundations/' },
      { text: 'Knowledge Graph', link: '/knowledge-graph/' },
      { text: 'Interview', link: '/24-interview-preparation/' },
      { text: 'Glossary', link: '/glossary/' },
    ],
    outline: { level: [2, 3] },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/OmidJavaherii/Frontend-Engineering-Handbook',
      },
    ],
    editLink: {
      pattern:
        'https://github.com/OmidJavaherii/Frontend-Engineering-Handbook/edit/main/docs/en/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Updated',
    },
    search: undefined,
  },
}
