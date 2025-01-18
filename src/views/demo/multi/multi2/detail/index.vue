<script setup lang="ts">
import { useTabStore } from '@/store'

const { modifyTab } = useTabStore()

const { fullPath, query } = useRoute()

modifyTab(fullPath, (target) => {
  target.meta.title = `Detail page ${query.id}`
})
</script>

<template>
  <n-space vertical>
    <n-alert title="Current information that can be made public" type="warning">
      This is the details page. He will not appear on the side bar. He is actually the same level of the previous page, not a lower level. Pay attention to this
    </n-alert>

    <n-h2>
      Detail page id:{{ query.id }}
    </n-h2>
  </n-space>
</template>

<style scoped></style>
