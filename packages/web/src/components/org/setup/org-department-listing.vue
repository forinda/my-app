<script setup lang="ts">
import { computed, ref } from 'vue'
import { getDepartmentTableCols } from '@/lib/cols/departments-col'
import type { FetchDepartmentResponseType } from '@/types/org'
import { Icon } from '@iconify/vue'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import ModalCreateOrUpdateDepartment from '@/components/modals/modal-create-or-update-department.vue'
import { useDepartmentQuery } from '@/queries/departments-query'
import { extractAxiosError } from '@/utils/extract-axios-error'
import type { EmptyBareObject } from '@/types/utils'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
type DepartmentType = FetchDepartmentResponseType['data'][number]
const { query } = useDepartmentQuery()
const { createDepartment } = useDepartmentQuery()
const initialState: CreateDepartmentType = {
  description: '',
  name: '',
}
const showModal = ref(false)
const editMode = ref<'create' | 'edit'>('create')
const editingDepartment = ref<CreateDepartmentType>(initialState)

const openCreateModal = () => {
  editMode.value = 'create'
  editingDepartment.value = initialState
  showModal.value = true
}

const openEditModal = (department: CreateDepartmentType) => {
  editMode.value = 'edit'
  editingDepartment.value = department
  showModal.value = true
}

const closeModal = () => {
  editMode.value = 'create'
  showModal.value = false
  editingDepartment.value = initialState
}

const del = async (id: number) => {
  // await deleteDepartment.mutateAsync(id)
  console.log('delete', id)
}

const saveDepartment = async (payload: EmptyBareObject) => {
  await createDepartment.mutateAsync(payload, {
    onSuccess: () => {
      closeModal()
    },
    onError: async (error) => {
      console.error(extractAxiosError(error))
    },
  })
}
const table = useVueTable({
  get data() {
    return query.data.value
  },
  columns: getDepartmentTableCols({ deleteDepartment: del, editDepartment: openEditModal }),
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Departments</h2>
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
        >
          <Icon :icon="'lucide-pencil'" class="w-5 h-5 mr-2" />
          Add Department
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
        <tbody>
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
