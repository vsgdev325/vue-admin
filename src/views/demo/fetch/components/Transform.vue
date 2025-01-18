<script setup lang="ts">
import {
  dictData,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function getDictData() {
  const res = await dictData()
  emit('update', res)
}
</script>

<template>
  <n-card title="Transform Data" size="small">
    <n-button @click="getDictData">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
