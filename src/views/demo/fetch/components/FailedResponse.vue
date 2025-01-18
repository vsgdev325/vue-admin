<script setup lang="ts">
import {
  FailedResponse,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function failedResponse() {
  const res = await FailedResponse()
  emit('update', res)
}
</script>

<template>
  <n-card title="Failure-business operation error" size="small">
    <n-button type="error" @click="failedResponse">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
