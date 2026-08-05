<script setup lang="ts">
defineProps<{
  difficulty?: string
}>()
</script>

<template>
  <span v-if="difficulty" class="fe-badge">{{ difficulty }}</span>
</template>
