<script setup lang="ts">
import {
  addDepartmentRoleSchema,
  type AddDepartmentRoleSchema,
} from '@/schema/add-department-role-schema'
import type { DepartmentType } from '@/types/org'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import BaseHuiModal from '../base-hui-modal.vue'
import { useDepartmentQuery } from '@/queries/departments-query'
import { useDepartmentTitleQuery } from '@/queries/department-title-query'
import { useOrgMembersQuery } from '@/queries/org-members-query'
import type { FormSubmitEvent } from '@primevue/forms'
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  closeModal: () => void
  department: DepartmentType
}>()
const { recordsQuery: dept, addRoleToDepartmentMutation } = useDepartmentQuery({})
const { recordsQuery: titles } = useDepartmentTitleQuery({})
const { recordsQuery: members } = useOrgMembersQuery({})
const resolver = zodResolver(addDepartmentRoleSchema)

const submit = async (e: FormSubmitEvent) => {
  const val = e.values as AddDepartmentRoleSchema
  if (e.valid) {
    await addRoleToDepartmentMutation.mutateAsync(val, {
      onSuccess: () => {
        props.closeModal()
      },
    })
  }
}

const selectableMembers = computed(() => {
  return props.department.members?.map((m) => ({
    label: `${m.user.first_name} ${m.user.last_name}`,
    value: m.user_id,
  }))
})
</script>

<template>
  <BaseHuiModal :show="show" :title="'Add Department Role'" :closeModal="closeModal">
    <PrimeForm
      :resolver
      v-slot="$form"
      :initial-values="{ department_id: props.department.id }"
      @submit="submit($event)"
    >
      <!-- Department -->
      <div class="flex flex-col gap-2 mb-4">
        <label for="department_id" class="text-sm font-medium text-gray-700">Department</label>
        <PrimeSelect
          id="department_id"
          name="department_id"
          disabled
          :options="
            dept.data.value?.map((d) => ({
              name: d.name,
              value: d.id,
            }))
          "
          optionLabel="name"
          optionValue="value"
          placeholder="Select Department"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Message
          v-if="$form.department_id?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="text-red-500 text-sm"
          >{{ $form.department_id.error.message }}</Message
        >
      </div>
      <!-- Title -->
      <div class="flex flex-col gap-2 mb-4">
        <label for="role_title_id" class="text-sm font-medium text-gray-700">Title</label>
        <PrimeSelect
          id="role_title_id"
          name="role_title_id"
          :options="
            titles.data.value?.map((t) => ({
              name: t.name,
              value: t.id,
            }))
          "
          optionLabel="name"
          :option-value="'value'"
          placeholder="Select Title"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Message
          v-if="$form.role_title_id?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="text-red-500 text-sm"
          >{{ $form.role_title_id.error.message }}</Message
        >
      </div>
      <!-- User -->
      <div class="flex flex-col gap-2 mb-4">
        <label for="user_id" class="text-sm font-medium text-gray-700">User</label>
        <PrimeSelect
          id="user_id"
          name="user_id"
          :options="selectableMembers"
          optionLabel="label"
          option-value="value"
          placeholder="Select User"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Message
          v-if="$form.user_id?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="text-red-500 text-sm"
          >{{ $form.user_id.error.message }}</Message
        >
      </div>
      <!-- Start Date -->
      <div class="flex flex-col gap-2 mb-4">
        <label for="start_date" class="text-sm font-medium text-gray-700">Start Date</label>
        <PrimeDatePicker
          id="start_date"
          name="start_date"
          :show-icon="true"
          hourFormat="24"
          :inline="false"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Message
          v-if="$form.start_date?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="text-red-500 text-sm"
          >{{ $form.start_date.error?.message }}</Message
        >
      </div>

      <!-- Submit Button -->
      <PrimeButton
        type="submit"
        label="Submit"
        class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      ></PrimeButton>
    </PrimeForm>
  </BaseHuiModal>
  <Toast position="top-right" />
</template>

<style scoped>
/* Custom styles if needed */
</style>
