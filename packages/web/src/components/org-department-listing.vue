<script setup lang="ts">
import { ref } from 'vue'
import { getDepartmentTableCols } from '@/lib/cols/departments-col'
import { Icon } from '@iconify/vue'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import ModalCreateOrUpdateDepartment from '@/components/modal-create-or-update-department.vue'
import { useDepartmentQuery } from '@/queries/departments-query'
import { extractAxiosError } from '@/utils/extract-axios-error'
import type { TsFixMeType } from '@/types/utils'
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { useNotification } from '@/composables/use-notification'
import ModalAddDepartmentMember from '@/components/modal-add-department-member.vue'
import VTable from '@/components/v-table.vue'
import ModalViewDepartment from '@/components/modal-view-department.vue'
import ModalAssignDeptRole from '@/components/modal-assign-dept-role.vue'
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

const {
  createRecordMutation,
  recordsQuery,
  setSelectedRecordId,
  updateRecordMutation,

  selectedDepartment,
} = useDepartmentQuery({})

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

const showDepartAddMemberModal = ref(false)
const openDepartAddMemberModal = (id: string) => {
  setSelectedRecordId(id)
  showDepartAddMemberModal.value = true
}

const closeAddDepartmentMemberModal = () => {
  showDepartAddMemberModal.value = false
}

const showSelectedDepartment = ref<boolean>(false)
const openSelectedDepartment = (id: string) => {
  setSelectedRecordId(id)
  showSelectedDepartment.value = true
}

const closeSelectedDepartment = () => {
  showSelectedDepartment.value = false
}
const showAssignRoleModal = ref(false)
const openAssignRoleModal = (id: string) => {
  setSelectedRecordId(id)
  showAssignRoleModal.value = true
}

const closeAssignRoleModal = () => {
  showAssignRoleModal.value = false
}
const table = useVueTable({
  get data() {
    return recordsQuery.data.value
  },
  columns: getDepartmentTableCols({
    deleteDepartment: del,
    editDepartment: openEditModal,
    openAddUserToDepartment: openDepartAddMemberModal,
    closeShowDepartment: closeSelectedDepartment,
    openShowDepartment: openSelectedDepartment,
    closeAssignRole: closeAssignRoleModal,
    openAssignRole: openAssignRoleModal,
  }),
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
          Add
        </button>
      </div>
      <VTable :table />
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
    <ModalAddDepartmentMember
      :closeModal="closeAddDepartmentMemberModal"
      :show="showDepartAddMemberModal"
      :department="selectedDepartment!"
    />
    <ModalViewDepartment
      :closeModal="closeSelectedDepartment"
      :show="showSelectedDepartment"
      :department="selectedDepartment!"
    />
    <ModalAssignDeptRole
      :closeModal="closeAssignRoleModal"
      :show="showAssignRoleModal"
      :department="selectedDepartment!"
    />
  </div>
</template>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
