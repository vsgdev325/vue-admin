<script setup lang="ts">
import {
  fetchGet,
} from '@/service'

import { useRequest } from 'alova/client'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

const { data: fetchGetData, send: sendFetchGet } = useRequest(fetchGet({ a: 112211 }), {
  // when immediate for false At the time, the default is not issued
  immediate: false,
})

async function handleRequestHook() {
  await sendFetchGet()
  emit('update', fetchGetData.value)
}
</script>

<template>
  <n-card title="useRequest style" size="small">
    <n-button @click="handleRequestHook">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
