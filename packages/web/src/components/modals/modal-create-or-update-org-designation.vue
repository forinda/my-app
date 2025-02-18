<script setup lang="ts">
import { Form } from 'vee-validate'
import FormTextInput from '../form/form-text-input.vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import {
  typedCreateOrgDesignationSchema,
  type OrgDesignationModel,
} from '@/schema/create-org-designation-schema'
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
  <transition-root appear :show="showModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <transition-child
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/70" />
      </transition-child>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <transition-child
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <dialog-panel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <dialog-title as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ mode === 'edit' ? 'Edit Designation' : 'Create New Designation' }}
              </dialog-title>
              <div class="mt-2">
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
              </div>
            </dialog-panel>
          </transition-child>
        </div>
      </div>
    </Dialog>
  </transition-root>
</template>

<style scoped></style>
