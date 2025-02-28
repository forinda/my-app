<script setup lang="ts">
import { Form } from 'vee-validate'
import FormTextInput from './form-text-input.vue'
import {
  typedCreateOrgDesignationSchema,
  type OrgDesignationModel,
} from '@/schema/create-org-designation-schema'
import BaseHuiModal from './base-hui-modal.vue'
defineProps<{
  showModal: boolean
  mode: 'create' | 'edit'
  initialValues: OrgDesignationModel
  openCreateModal: () => void
  openEditModal: (department: OrgDesignationModel) => void
  closeModal: () => void
  saveRecord: (value: Record<string, unknown>) => void
}>()
</script>
<template>
  <BaseHuiModal
    :show="showModal"
    :title="mode === 'edit' ? 'Edit Designation' : 'Create New Designation'"
    :closeModal="closeModal"
  >
    <Form
      @submit="saveRecord"
      :initial-values="initialValues"
      :validation-schema="typedCreateOrgDesignationSchema"
    >
      <FormTextInput
        id="name"
        label-text="Designation Name"
        placeholder="e.g. Chief Technology Officer"
        required
        name="name"
        :auto-complete="'off'"
        :type="'text'"
        :icon-name="'lucide-briefcase'"
      />
      <FormTextInput
        id="description"
        label-text="Description"
        required
        name="description"
        placeholder="e.g. Responsible for the overall technology strategy and implementation"
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
