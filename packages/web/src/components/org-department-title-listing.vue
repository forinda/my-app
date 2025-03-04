<script setup lang="ts">
import { getDepartmentTitleCols } from '@/lib/cols/org-department-title-col'
import { useDepartmentTitleQuery } from '@/queries/department-title-query'
import ModalCreateOrUpdateDepartmentTitle from '@/components/modal-create-or-update-department-title.vue'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import type { CreateDepartmentTitleType } from '@/schema/create-department-title-schema'
import { ref } from 'vue'
const { recordsQuery, createRecordMutation, setSelectedRecordId, updateRecordMutation } =
  useDepartmentTitleQuery()
import { Icon } from '@iconify/vue'
import { useNotification } from '@/composables/use-notification'
import VTable from '@/components/v-table.vue'
import { extractAxiosError, type TsFixMeType } from 'shared'

const initialState = {
  name: '',
  description: '',
}
const $swal = useNotification().$swal
const showModal = ref(false)
const editMode = ref<'create' | 'edit'>('create')
const selectedRecord = ref<
  CreateDepartmentTitleType & {
    id?: number
  }
>(initialState)

const openCreateModal = () => {
  editMode.value = 'create'
  selectedRecord.value = initialState
  showModal.value = true
}

const openEditModal = (
  record: CreateDepartmentTitleType & {
    id?: number
  },
) => {
  setSelectedRecordId(record.id!)
  editMode.value = 'edit'
  selectedRecord.value = record
  showModal.value = true
}

const closeModal = () => {
  setSelectedRecordId(null)
  editMode.value = 'create'
  showModal.value = false
  selectedRecord.value = initialState
}

const del = async (id: number) => {
  // await deleteDepartment.mutateAsync(id)
  console.log('delete', id)
}

const saveRecord = async (payload: TsFixMeType) => {
  if (editMode.value === 'create') {
    await createRecordMutation.mutateAsync(payload, {
      onSuccess: () => {
        closeModal()
      },
      onError: async (error) => {
        await $swal.fire({
          title: 'Error',
          text: extractAxiosError(error),
          icon: 'error',
        })
      },
    })
  } else {
    await updateRecordMutation.mutateAsync([selectedRecord.value.id!, payload], {
      onSuccess: async () => {
        closeModal()
      },
      onError: async (error) => {
        await $swal.fire({
          title: 'Error',
          text: extractAxiosError(error),
          icon: 'error',
        })
      },
    })
  }
}

const table = useVueTable({
  get data() {
    return recordsQuery.data.value!
  },
  columns: getDepartmentTitleCols({
    deleteDepartmentTitle: del,
    editDepartmentTitle: openEditModal,
  }),
  getCoreRowModel: getCoreRowModel(),
})
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Department titles</h2>
      <button @click="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center">
        <Icon :icon="'lucide-pencil'" class="w-5 h-5 mr-2" />
        Add
      </button>
    </div>
    <div>
      <VTable :table />
    </div>
    <ModalCreateOrUpdateDepartmentTitle :close-modal="closeModal" :initial-values="selectedRecord" :mode="editMode"
      :save-title="saveRecord" :show-modal="showModal" :open-create-modal="openCreateModal"
      :open-edit-modal="openEditModal" />
  </div>
</template>
