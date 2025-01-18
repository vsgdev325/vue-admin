<script setup lang="ts">
import {
  FailedResponseWithoutTip,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function failedResponse() {
  const res = await FailedResponseWithoutTip()
  emit('update', res)
}
</script>

<template>
  <n-card title="Failure-business operation errors (no prompts) " size="small">
    <n-button type="error" @click="failedResponse">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
