<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { topicHrefById, topicTitleById } from '../../topic-map'

const { frontmatter } = useData()

const related = computed(() => {
  const value = frontmatter.value.related
  return Array.isArray(value) ? (value as string[]) : []
})

const advanced = computed(() => {
  const value = frontmatter.value.advanced
  return Array.isArray(value) ? (value as string[]) : []
})

const beginner = computed(() => frontmatter.value.beginner_path as string | undefined)
</script>

<template>
  <div v-if="related.length || advanced.length || beginner" class="fe-related">
    <div v-if="related.length">
      <strong>Related topics</strong>
      <ul>
        <li v-for="id in related" :key="id">
          <a :href="topicHrefById(id)">{{ topicTitleById(id) }}</a>
        </li>
      </ul>
    </div>
    <div v-if="advanced.length" style="margin-top: 0.75rem">
      <strong>Advanced</strong>
      <ul>
        <li v-for="id in advanced" :key="id">
          <a :href="topicHrefById(id)">{{ topicTitleById(id) }}</a>
        </li>
      </ul>
    </div>
    <p v-if="beginner" style="margin: 0.75rem 0 0">
      Prefer a gentler start?
      <a :href="topicHrefById(beginner)">{{ topicTitleById(beginner) }}</a>
    </p>
  </div>
</template>
