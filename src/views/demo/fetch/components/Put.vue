<script setup lang="ts">
import {
  fetchPut,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function put() {
  const res = await fetchPut({ a: 112211, b: false })
  emit('update', res)
}
</script>

<template>
  <n-card title="Put" size="small">
    <n-button @click="put">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
