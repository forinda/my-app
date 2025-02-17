<script setup lang="ts">
import { ref } from 'vue'
import DTable from '@/components/d-table/d-table.vue'
import { getDepartmentTableCols } from '@/lib/cols/departments-col'
import type { FetchDepartmentResponseType } from '@/types/org'
import { Icon } from '@iconify/vue'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import ModalCreateOrUpdateDepartment from '@/components/modals/modal-create-or-update-department.vue'
import { useDepartmentQuery } from '@/queries/departments-query'
import { extractAxiosError } from '@/utils/extract-axios-error'
import type { EmptyBareObject } from '@/types/utils'
type DepartmentType = FetchDepartmentResponseType['data'][number]
defineProps<{
  data: DepartmentType[]
}>()
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

const saveDepartment =async (data:EmptyBareObject) => {
  await createDepartment.mutateAsync(data,{
    onSuccess: () => {
      closeModal()
    },
    onError:async (error) => {
      console.error(extractAxiosError(error))
    },
  })
}
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

      <DTable :data="data" :columns="getDepartmentTableCols()"> </DTable>
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
