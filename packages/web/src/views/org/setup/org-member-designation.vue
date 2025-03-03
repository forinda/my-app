<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import ModalCreateOrUpdateOrgDesignation from '@/components/modal-create-or-update-org-designation.vue'
import type { OrgDesignationModel } from '@/schema/create-org-designation-schema'
import { useOrgDesignationQuery } from '@/queries/org-designation-query'
import { getOrgDesignationTableCols } from '@/lib/cols/designation-cols'
import { useNotification } from '@/composables/use-notification'
import VTable from '@/components/v-table.vue'
import type { TsFixMeType } from '@app/shared'

const { createRecordMutation, recordsQuery, setSelectedRecordId, updateRecordMutation } =
  useOrgDesignationQuery()
const initialState: OrgDesignationModel = {
  description: '',
  name: '',
}
const { $swal } = useNotification()
const showModal = ref(false)
const editMode = ref<'create' | 'edit'>('create')
const selectedValue = ref<
  OrgDesignationModel & {
    id?: number
  }
>(initialState)

const openCreateModal = () => {
  editMode.value = 'create'
  selectedValue.value = initialState
  showModal.value = true
}

const openEditModal = (
  record: OrgDesignationModel & {
    id?: number
  },
) => {
  setSelectedRecordId(record.id!)
  editMode.value = 'edit'
  selectedValue.value = record
  showModal.value = true
}

const closeModal = () => {
  editMode.value = 'create'
  showModal.value = false
  selectedValue.value = initialState
}

const del = async (id: number) => {
  // await deleteDepartment.mutateAsync(id)
  console.log('delete', id)
}

const saveChanges = async (payload: TsFixMeType) => {
  if (editMode.value === 'create') {
    await createRecordMutation.mutateAsync(payload, {
      onSuccess: () => {
        closeModal()
      },
      onError: async (error) => {
        console.error({ error })
      },
    })
  } else {
    await updateRecordMutation.mutateAsync([selectedValue.value.id!, payload], {
      onSuccess: () => {
        closeModal()
      },
    })
  }
}
const table = useVueTable({
  get data() {
    return recordsQuery.data.value!
  },
  columns: getOrgDesignationTableCols({ deleteRecord: del, editRecord: openEditModal }),
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Designations</h2>
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
        >
          <Icon :icon="'lucide-pencil'" class="w-5 h-5 mr-2" />
          Add
        </button>
      </div>
      <VTable :table />
    </div>

    <ModalCreateOrUpdateOrgDesignation
      :close-modal="closeModal"
      :save-record="saveChanges"
      :initial-values="selectedValue"
      :mode="editMode"
      :show-modal="showModal"
      :open-create-modal="openCreateModal"
      :open-edit-modal="openEditModal"
    />
  </div>
</template>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
