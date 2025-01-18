<script setup lang="ts">
import { useAuthStore } from '@/store'

const authStore = useAuthStore()

const { userInfo } = authStore
const formRef = ref()
const formValue = ref({
  user: {
    name: '',
    age: '',
  },
  phone: '',
})
const rules = {
  user: {
    name: {
      required: true,
      message: 'Please enter the name',
      trigger: 'blur',
    },
    age: {
      required: true,
      message: 'Please enter the age',
      trigger: ['input', 'blur'],
    },
  },
  phone: {
    required: true,
    message: 'Please enter the phone number',
    trigger: ['input'],
  },
}

function handleValidateClick() {
  formRef.value?.validate((errors: any) => {
    if (!errors)
      window.$message.success('Verify')
    else window.$message.error('Verify not pass')
  })
}
</script>

<template>
  <n-space vertical>
    <n-card title="personal information">
      <n-space size="large">
        <n-avatar round :size="128" :src="userInfo?.avatar" />

        <n-descriptions label-placement="left" :column="2" :title="`Good evening，${userInfo?.nickname}，This is a simple personal center template`">
          <n-descriptions-item label="id">
            {{ userInfo?.id }}
          </n-descriptions-item>
          <n-descriptions-item label="username">
            {{ userInfo?.userName }}
          </n-descriptions-item>
          <n-descriptions-item label="Real name">
            {{ userInfo?.nickname }}
          </n-descriptions-item>
          <n-descriptions-item label="Role">
            {{ userInfo?.role }}
          </n-descriptions-item>
        </n-descriptions>
      </n-space>
    </n-card>
    <n-card title="Information modification">
      <n-space justify="center">
        <n-form ref="formRef" class="w-500px" :label-width="80" :model="formValue" :rules="rules">
          <n-form-item label="Name" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="Enter the name" />
          </n-form-item>
          <n-form-item label="Age" path="user.age">
            <n-input v-model:value="formValue.user.age" placeholder="Input age" />
          </n-form-item>
          <n-form-item label="Telephone number" path="phone">
            <n-input v-model:value="formValue.phone" placeholder="telephone number" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" attr-type="button" block @click="handleValidateClick">
              verify
            </n-button>
          </n-form-item>
        </n-form>
      </n-space>
    </n-card>
  </n-space>
</template>

<style scoped></style>
