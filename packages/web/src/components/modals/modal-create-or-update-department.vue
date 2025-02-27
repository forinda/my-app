<script setup lang="ts">
import {
  typedCreateDepartmentSchema,
  type CreateDepartmentType,
} from '@/schema/create-department-schema'
import { Form } from 'vee-validate'
import FormTextInput from '../form/form-text-input.vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import BaseHuiModal from '../base-hui-modal.vue'
defineProps<{
  showModal: boolean
  mode: 'create' | 'edit'
  initialValues: CreateDepartmentType
  openCreateModal: () => void
  openEditModal: (department: CreateDepartmentType) => void
  closeModal: () => void
  saveDepartment: (value: Record<string, unknown>) => void
}>()
</script>
<template>
  <BaseHuiModal
    :show="showModal"
    :title="mode === 'edit' ? 'Edit Department' : 'Create New Department'"
    :closeModal="closeModal"
  >
    <Form
      @submit="saveDepartment"
      :initial-values="initialValues"
      :validation-schema="typedCreateDepartmentSchema"
    >
      <FormTextInput
        id="departmentName"
        label-text="Department Name"
        placeholder="e.g. Human Resources"
        required
        name="name"
        :auto-complete="'off'"
        :type="'text'"
        :icon-name="'lucide-briefcase'"
      />
      <FormTextInput
        id="departmentDescription"
        label-text="Department Description"
        required
        name="description"
        placeholder="e.g. Responsible for hiring and managing employees."
        :auto-complete="'off'"
        :type="'text'"
        :as="'textarea'"
        class="h-50"
      />

      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-300 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300 ease-in-out"
        >
          Save
        </button>
      </div>
    </Form>
  </BaseHuiModal>
</template>

<style scoped></style>
