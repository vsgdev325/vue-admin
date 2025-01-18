<script setup lang="ts">
import { usePermission } from '@/hooks'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const { hasPermission } = usePermission()
const { role } = authStore.userInfo!

const roleList: Entity.RoleType[] = ['super', 'admin', 'user']

function toggleUserRole(role: Entity.RoleType) {
  authStore.login(role, '123456')
}
</script>

<template>
  <n-card title="Permissions example">
    <n-h1> Current authority：{{ role }}</n-h1>
    <n-button-group>
      <n-button v-for="item in roleList" :key="item" type="default" @click="toggleUserRole(item)">
        {{ item }}
      </n-button>
    </n-button-group>
    <n-h2>v-permission Instruction</n-h2>
    <n-space>
      <n-button v-permission="'super'">
        only super visible
      </n-button>
      <n-button v-permission="['admin']">
        admin visible
      </n-button>
    </n-space>

    <n-h2>usePermission Function usage</n-h2>
    <n-space>
      <n-button v-if="hasPermission('super')">
        super visible
      </n-button>
      <n-button v-if="hasPermission('admin')">
        admin visible
      </n-button>
      <n-button v-if="hasPermission(['admin', 'user'])">
        admin and user visible
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped></style>
