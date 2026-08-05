<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DifficultyBadge from './DifficultyBadge.vue'

const { frontmatter } = useData()

const meta = computed(() => ({
  difficulty: frontmatter.value.difficulty as string | undefined,
  reading: frontmatter.value.reading_time as number | undefined,
  implementation: frontmatter.value.implementation_time as number | undefined,
  status: frontmatter.value.status as string | undefined,
  topicId: frontmatter.value.topic_id as string | undefined,
}))
</script>

<template>
  <div v-if="meta.topicId || meta.difficulty" class="fe-topic-meta">
    <div class="fe-topic-meta__row">
      <DifficultyBadge :difficulty="meta.difficulty" />
      <span v-if="meta.reading != null">Reading: ~{{ meta.reading }} min</span>
      <span v-if="meta.implementation != null">
        Implementation: ~{{ meta.implementation }} min
      </span>
      <span v-if="meta.status">Status: {{ meta.status }}</span>
      <code v-if="meta.topicId">{{ meta.topicId }}</code>
    </div>
  </div>
</template>
