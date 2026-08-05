<script setup lang="ts">
import { withBase } from 'vitepress'

const paths = [
  { text: 'Beginner', link: '/learning-paths/beginner' },
  { text: 'Junior', link: '/learning-paths/junior' },
  { text: 'Mid-level', link: '/learning-paths/mid-level' },
  { text: 'Senior', link: '/learning-paths/senior' },
  { text: 'Backend → Frontend', link: '/learning-paths/backend-to-frontend' },
  { text: 'Interview Prep', link: '/learning-paths/interview-prep' },
]
</script>

<template>
  <nav class="fe-path-nav" aria-label="Learning paths">
    <a v-for="path in paths" :key="path.link" :href="withBase(path.link)">{{ path.text }}</a>
  </nav>
</template>
