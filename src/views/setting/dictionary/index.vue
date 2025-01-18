<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import CopyText from '@/components/custom/CopyText.vue'
import { useBoolean } from '@/hooks'
import { fetchDictList } from '@/service'
import { useDictStore } from '@/store'
import { NButton, NFlex, NPopconfirm } from 'naive-ui'
import DictModal from './components/DictModal.vue'

const { bool: dictLoading, setTrue: startDictLoading, setFalse: endDictLoading } = useBoolean(false)
const { bool: contentLoading, setTrue: startContentLoading, setFalse: endContentLoading } = useBoolean(false)

const { getDictByNet } = useDictStore()

const dictRef = ref<InstanceType<typeof DictModal>>()
const dictContentRef = ref<InstanceType<typeof DictModal>>()

onMounted(() => {
  getDictList()
})

const dictData = ref<Entity.Dict[]>([])
const dictContentData = ref<Entity.Dict[]>([])

async function getDictList() {
  startDictLoading()
  const { data, isSuccess } = await fetchDictList()
  if (isSuccess) {
    dictData.value = data
  }
  endDictLoading()
}

const lastDictCode = ref('')
async function getDictContent(code: string) {
  startContentLoading()
  dictContentData.value = await getDictByNet(code)
  lastDictCode.value = code
  endContentLoading()
}

const dictColumns: DataTableColumns<Entity.Dict> = [
  {
    title: 'Dictionary',
    key: 'label',
  },
  {
    title: 'Dictionary',
    key: 'code',
    render: (row) => {
      return (
        <CopyText value={row.code} />
      )
    },
  },
  {
    title: 'operate',
    key: 'actions',
    align: 'center',
    render: (row) => {
      return (
        <NFlex justify="center">
          <NButton
            size="small"
            onClick={() => getDictContent(row.code)}
          >
            View the dictionary
          </NButton>
          <NButton
            size="small"
            onClick={() => dictRef.value!.openModal('edit', row)}
          >
            edit
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteDict(row.id!)}>
            {{
              default: () => (
                <span>
                  Confirm the deletion dictionary
                  <b>{row.label}</b>
                  {' '}
                  ？
                </span>
              ),
              trigger: () => <NButton size="small" type="error">delete</NButton>,
            }}
          </NPopconfirm>
        </NFlex>
      )
    },
  },
]

const contentColumns: DataTableColumns<Entity.Dict> = [
  {
    title: 'Dictionary name',
    key: 'label',
  },
  {
    title: 'Dictionary',
    key: 'code',
  },
  {
    title: 'Dictionary',
    key: 'value',
  },
  {
    title: 'operate',
    key: 'actions',
    align: 'center',
    width: '15em',
    render: (row) => {
      return (
        <NFlex justify="center">
          <NButton
            size="small"
            onClick={() => dictContentRef.value!.openModal('edit', row)}
          >
            edit
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteDict(row.id!)}>
            {{
              default: () => (
                <span>
                  Confirm the deletion of the dictionary value
                  <b>{row.label}</b>
                  {' '}
                  ？
                </span>
              ),
              trigger: () => <NButton size="small" type="error">delete</NButton>,
            }}
          </NPopconfirm>
        </NFlex>
      )
    },
  },
]

function deleteDict(id: number) {
  window.$message.error(`Delete dictionary ${id}`)
}
</script>

<template>
  <NFlex>
    <div class="basis-2/5">
      <n-card>
        <template #header>
          <NButton type="primary" @click="dictRef!.openModal('add')">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            Newly built
          </NButton>
        </template>
        <template #header-extra>
          <NFlex>
            <NButton type="primary" secondary @click="getDictList">
              <template #icon>
                <icon-park-outline-refresh />
              </template>
              refresh
            </NButton>
          </NFlex>
        </template>
        <n-data-table
          :columns="dictColumns" :data="dictData" :loading="dictLoading" :pagination="false"
          :bordered="false"
        />
      </n-card>
    </div>
    <div class="flex-1">
      <n-card>
        <template #header>
          <NButton type="primary" :disabled="!lastDictCode" @click="dictContentRef!.openModal('add')">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            Newly built
          </NButton>
        </template>
        <template #header-extra>
          <NFlex>
            <NButton type="primary" :disabled="!lastDictCode" secondary @click="getDictContent(lastDictCode)">
              <template #icon>
                <icon-park-outline-refresh />
              </template>
              refresh
            </NButton>
          </NFlex>
        </template>
        <n-data-table
          :columns="contentColumns" :data="dictContentData" :loading="contentLoading" :pagination="false"
          :bordered="false"
        />
      </n-card>
    </div>

    <DictModal ref="dictRef" modal-name="Dictionary" is-root />
    <DictModal ref="dictContentRef" modal-name="Dictionary" :dict-code="lastDictCode" />
  </NFlex>
</template>

<style scoped></style>
