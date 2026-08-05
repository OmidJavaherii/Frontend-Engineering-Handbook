<script setup lang="ts">
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page, frontmatter } = useData()

const showBreadcrumbs = computed(() => {
  if (frontmatter.value.layout === 'home') return false
  if (frontmatter.value.omit_sections) return false
  return Boolean(page.value.relativePath)
})

const crumbs = computed(() => {
  const relative = page.value.relativePath || ''
  const withoutIndex = relative.replace(/\/index\.md$/i, '').replace(/\.md$/i, '')
  const parts = withoutIndex.split('/').filter(Boolean)
  const items: { text: string; link?: string }[] = [{ text: 'Home', link: '/' }]

  let acc = ''
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!
    acc += `/${part}`
    const isLast = i === parts.length - 1
    items.push({
      text: isLast ? String(frontmatter.value.title || part) : part,
      link: isLast ? undefined : `${acc}/`,
    })
  }

  return items.filter((item) => Boolean(item?.text))
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <nav v-if="showBreadcrumbs" class="fe-breadcrumbs" aria-label="Breadcrumb">
        <template v-for="(crumb, index) in crumbs" :key="`${crumb.text}-${index}`">
          <a v-if="crumb.link" :href="crumb.link">{{ crumb.text }}</a>
          <span v-else>{{ crumb.text }}</span>
          <span v-if="index < crumbs.length - 1">/</span>
        </template>
      </nav>
    </template>
  </Layout>
</template>
