<script setup lang="ts">
import { Form } from 'vee-validate'
import FormTextInput from '../form/form-text-input.vue'
import {
  typedCreateDepartmentTitleSchema,
  type CreateDepartmentTitleType,
} from '@/schema/create-department-title-schema'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import BaseHuiModal from '../base-hui-modal.vue'
defineProps<{
  showModal: boolean
  mode: 'create' | 'edit'
  initialValues: CreateDepartmentTitleType
  openCreateModal: () => void
  openEditModal: (department: CreateDepartmentTitleType) => void
  closeModal: () => void
  saveTitle: (value: Record<string, unknown>) => void
}>()
</script>
<template>
  <BaseHuiModal
    :show="showModal"
    :title="mode === 'edit' ? 'Edit Title' : 'Create New Title'"
    :closeModal="closeModal"
  >
    <Form
      @submit="saveTitle"
      :validation-schema="typedCreateDepartmentTitleSchema"
      :initial-values="initialValues"
    >
      <FormTextInput
        id="titleName"
        label-text="Title Name"
        placeholder="e.g. Manager"
        required
        name="name"
        :auto-complete="'off'"
        :type="'text'"
        :icon-name="'lucide-briefcase'"
      />
      <FormTextInput
        id="description"
        label-text="Title Description"
        required
        name="description"
        placeholder="e.g. Responsible for managing a team."
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
