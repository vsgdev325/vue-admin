<script setup lang="ts">
import {
  fetchUpdateToken,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function updataToken() {
  const res = await fetchUpdateToken({ token: 'test token' })
  emit('update', res)
}
</script>

<template>
  <n-card title="Refresh token" size="small">
    <n-button @click="updataToken">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
