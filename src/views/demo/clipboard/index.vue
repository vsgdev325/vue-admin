<script setup lang="ts">
const text = ref('Hello nova-admin')
</script>

<template>
  <n-card title="Cutting plate example">
    <n-h3>v-copy instruction</n-h3>
    <n-input-group>
      <n-input v-model:value="text" placeholder="Please enter the content to be copied" />
      <n-button v-copy="text" type="primary">
        v-copy copy
      </n-button>
    </n-input-group>
    <n-h3>copy-text Component</n-h3>
    <copy-text v-model:value="text" />
  </n-card>
</template>

<style scoped></style>
