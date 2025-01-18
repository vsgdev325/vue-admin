<script setup lang="ts">
import {
  expiredTokenRequest,
} from '@/service'

const emit = defineEmits<{
  update: [data: any] // Named Yuan Group grammar
}>()

async function expiredToken() {
  const res = await expiredTokenRequest()
  emit('update', res)
}
</script>

<template>
  <n-card title="Token Expiration" size="small">
    Pay attention to the second request, token has been refreshed
    <n-button type="error" @click="expiredToken">
      click
    </n-button>
  </n-card>
</template>

<style scoped>

</style>
