<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface iconPorps {
  /* Имя значка */
  icon?: string
  /* Цвет значков */
  color?: string
  /* Размер значков */
  size?: number
  /* Глубина иконы */
  depth?: 1 | 2 | 3 | 4 | 5
}
const { size = 18, icon } = defineProps<iconPorps>()

const isLocal = computed(() => {
  return icon && icon.startsWith('local:')
})

function getLocalIcon(icon: string) {
  const svgName = icon.replace('local:', '')
  const svg = import.meta.glob<string>('@/assets/svg-icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })

  return svg[`/src/assets/svg-icons/${svgName}.svg`]
}
</script>

<template>
  <n-icon
    v-if="icon"
    :size="size"
    :depth="depth"
    :color="color"
  >
    <template v-if="isLocal">
      <i v-html="getLocalIcon(icon)" />
    </template>
    <template v-else>
      <Icon :icon="icon" />
    </template>
  </n-icon>
</template>
