<script setup lang="tsx">
import type { DataTableColumns, FormInst, NDataTable } from 'naive-ui'
import { Gender } from '@/constants'
import { useBoolean } from '@/hooks'
import { useTableDrag } from '@/hooks/useTableDrag'
import { fetchUserPage } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
  condition_3: '',
  condition_4: '',
}
const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()
function sendMail(id?: number) {
  window.$message.success(`Delete user ID:${id}`)
}
const columns: DataTableColumns<Entity.User> = [
  {
    title: 'Name',
    align: 'center',
    key: 'userName',
  },
  {
    title: 'age',
    align: 'center',
    key: 'age',
  },
  {
    title: 'gender',
    align: 'center',
    key: 'gender',
    render: (row) => {
      const tagType = {
        0: 'primary',
        1: 'success',
      } as const
      if (row.gender) {
        return (
          <NTag type={tagType[row.gender]}>
            {Gender[row.gender]}
          </NTag>
        )
      }
    },
  },
  {
    title: 'Mail',
    align: 'center',
    key: 'email',
  },
  {
    title: 'state',
    align: 'center',
    key: 'status',
    render: (row) => {
      return (
        <NSwitch
          value={row.status}
          checked-value={1}
          unchecked-value={0}
          onUpdateValue={(value: 0 | 1) =>
            handleUpdateDisabled(value, row.id!)}
        >
          {{ checked: () => 'Open up', unchecked: () => 'Disable' }}
        </NSwitch>
      )
    },
  },
  {
    title: 'operate',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NPopconfirm onPositiveClick={() => sendMail(row.id)}>
            {{
              default: () => 'Confirm delete',
              trigger: () => <NButton size="small">delete</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const listData = ref<Entity.User[]>([])
function handleUpdateDisabled(value: 0 | 1, id: number) {
  const index = listData.value.findIndex(item => item.id === id)
  if (index > -1)
    listData.value[index].status = value
}

const tableRef = ref<InstanceType<typeof NDataTable>>()
useTableDrag({
  tableRef,
  data: listData,
  onRowDrag(data) {
    const target = data[data.length - 1]
    window.$message.success(`Drag data id: ${target.id} name: ${target.userName}`)
  },
})

onMounted(() => {
  getUserList()
})
async function getUserList() {
  startLoading()
  await fetchUserPage().then((res: any) => {
    listData.value = res.data.list
    endLoading()
  })
}
function changePage(page: number, size: number) {
  window.$message.success(`Pagothe:${page},${size}`)
}
function handleResetSearch() {
  model.value = { ...initialModel }
}
</script>

<template>
  <NSpace vertical size="large">
    <n-card>
      <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <n-flex>
          <n-form-item label="Name" path="condition_1">
            <n-input v-model:value="model.condition_1" placeholder="Please enter" />
          </n-form-item>
          <n-form-item label="age" path="condition_2">
            <n-input v-model:value="model.condition_2" placeholder="Please enter" />
          </n-form-item>
          <n-form-item label="gender" path="condition_3">
            <n-input v-model:value="model.condition_3" placeholder="Please enter" />
          </n-form-item>
          <n-form-item label="address" path="condition_4">
            <n-input v-model:value="model.condition_4" placeholder="Please enter" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getUserList">
              <template #icon>
                <icon-park-outline-search />
              </template>
              search
            </NButton>
            <NButton strong secondary @click="handleResetSearch">
              <template #icon>
                <icon-park-outline-redo />
              </template>
              Repossess
            </NButton>
          </n-flex>
        </n-flex>
      </n-form>
    </n-card>
    <n-card>
      <NSpace vertical size="large">
        <n-data-table ref="tableRef" row-class-name="drag-handle" :columns="columns" :data="listData" :loading="loading" />
        <Pagination :count="100" @change="changePage" />
      </NSpace>
    </n-card>
  </NSpace>
</template>
