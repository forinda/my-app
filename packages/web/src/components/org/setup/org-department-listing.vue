<script setup lang="ts">
import { ref } from 'vue'
import { getDepartmentTableCols } from '@/lib/cols/departments-col'
import { Icon } from '@iconify/vue'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import ModalCreateOrUpdateDepartment from '@/components/modals/modal-create-or-update-department.vue'
import { useDepartmentQuery } from '@/queries/departments-query'
import { extractAxiosError } from '@/utils/extract-axios-error'
import type { TsFixMeType } from '@/types/utils'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { useNotification } from '@/composables/use-notification'
import ModalInviteUsersToOrg from '@/components/modals/modal-invite-users-to-org.vue'
const showModal = ref(false)
const initialState: CreateDepartmentType = {
  description: '',
  name: '',
}
const $swal = useNotification().$swal
const editMode = ref<'create' | 'edit'>('create')
const editingDepartment = ref<
  CreateDepartmentType & {
    uuid?: string
  }
>(initialState)

const { createRecordMutation, recordsQuery, setSelectedRecordId, updateRecordMutation } =
  useDepartmentQuery({})

const openCreateModal = () => {
  editMode.value = 'create'
  editingDepartment.value = initialState
  showModal.value = true
}

const openEditModal = (
  record: CreateDepartmentType & {
    uuid?: string
  },
) => {
  setSelectedRecordId(record.uuid!)

  editMode.value = 'edit'
  editingDepartment.value = record
  showModal.value = true
}

const closeModal = () => {
  editMode.value = 'create'
  showModal.value = false
  editingDepartment.value = initialState
  setSelectedRecordId('')
}

const del = async (id: number) => {
  // await deleteDepartment.mutateAsync(id)
  console.log('delete', id)
}

const saveDepartment = async (payload: TsFixMeType) => {
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
    await updateRecordMutation.mutateAsync([editingDepartment.value.uuid!, payload], {
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
  }
}
const table = useVueTable({
  get data() {
    return recordsQuery.data.value
  },
  columns: getDepartmentTableCols({ deleteDepartment: del, editDepartment: openEditModal }),
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <ModalInviteUsersToOrg/>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Departments</h2>
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

    <ModalCreateOrUpdateDepartment
      v-model:showModal="showModal"
      :initialValues="editingDepartment"
      :openCreateModal="openCreateModal"
      :openEditModal="openEditModal"
      :closeModal="closeModal"
      :saveDepartment="saveDepartment"
      :mode="editMode"
    />
  </div>
</template>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
