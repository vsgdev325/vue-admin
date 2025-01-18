<script setup lang="ts">
import {
  FailedRequest,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function failedRequest() {
  const res = await FailedRequest()
  emit('update', res)
}
</script>

<template>
  <n-card title="Failure-server error" size="small">
    <n-button type="error" @click="failedRequest">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
