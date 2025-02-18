<script setup lang="ts">
import { ref } from 'vue'
import { getDepartmentTableCols } from '@/lib/cols/departments-col'
import { Icon } from '@iconify/vue'
import { extractAxiosError } from '@/utils/extract-axios-error'
import type { EmptyBareObject, TsFixMeType } from '@/types/utils'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import ModalCreateOrUpdateOrgDesignation from '@/components/modals/modal-create-or-update-org-designation.vue'
import type { OrgDesignationModel } from '@/schema/create-org-designation-schema'
import { useOrgDesignationQuery } from '@/queries/org-designation-query'
import { getOrgDesignationTableCols } from '@/lib/cols/designation-cols'
import { useNotification } from '@/composables/use-notification'

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
      // onError: async (error) => {
      //   // console.error({ error: extractAxiosError(error) })
      //   await $swal.fire({
      //     title: 'Error',
      //     text: extractAxiosError(error),
      //     icon: 'error',
      //   })
      // },
    })
  }
}
const table = useVueTable({
  get data() {
    return recordsQuery.data.value
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

      <!-- <DTable :data="query.data" :columns="getDepartmentTableCols()"> </DTable> -->
      <table class="table-auto w-full">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colspan="header.colSpan"
              class="px-6 py-3 border bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200" v-if="table.getRowModel().rows.length > 0">
          <tr v-for="row in table.getRowModel().rows" :key="row.id" class="border">
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border" colspan="4">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
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
