<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { topicHrefById, topicTitleById } from '../../topic-map'

const { frontmatter } = useData()

const prerequisites = computed(() => {
  const value = frontmatter.value.prerequisites
  return Array.isArray(value) ? (value as string[]) : []
})
</script>

<template>
  <div v-if="prerequisites.length" class="fe-prerequisites">
    <strong>Prerequisites</strong>
    <ul>
      <li v-for="id in prerequisites" :key="id">
        <a :href="topicHrefById(id)">{{ topicTitleById(id) }}</a>
      </li>
    </ul>
  </div>
</template>
