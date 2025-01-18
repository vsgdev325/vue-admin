<script setup lang="ts">
import lib from '@/../package.json'
</script>

<template>
  <n-space vertical>
    <n-card title="about">
      Nova-admin It is a background management template based on Vue3+VITE+TYPEScript+Naiveui. It strives to use simple code to achieve complete functions, reduce learning threshold and maintenance costs, so that everyone can do their own things early
    </n-card>
    <n-card title="information">
      <n-descriptions
        label-placement="left"
        bordered
        :column="2"
      >
        <n-descriptions-item label="Github">
          <n-button
            text
            tag="a"
            href="https://github.com/chansee97/nova-admin"
            target="_blank"
            type="primary"
          >
            Github
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Github">
          <n-button
            text
            tag="a"
            href="https://gitee.com/chansee97/nova-admin"
            target="_blank"
            type="primary"
          >
            Gitee
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Preview address">
          <n-button
            text
            tag="a"
            href="https://admin-nova.vercel.app/"
            target="_blank"
            type="primary"
          >
            Preview address
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Version">
          <n-tag :bordered="false">
            {{ lib.version }}
          </n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="Production environment dependence">
      <n-descriptions
        label-placement="left"
        bordered
        :column="4"
      >
        <n-descriptions-item
          v-for="(item, key, index) in lib.dependencies"
          :key="index"
          :label="key"
        >
          {{ item }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="Development environment dependence">
      <n-descriptions
        label-placement="left"
        bordered
        :column="4"
      >
        <n-descriptions-item
          v-for="(item, key, index) in lib.devDependencies"
          :key="index"
          :label="key"
        >
          {{ item }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-space>
</template>

<style scoped></style>
