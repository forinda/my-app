<script setup lang="ts">
import { addDepartmentRoleSchema } from '@/schema/add-department-role-schema'
import type { DepartmentType } from '@/types/org'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import BaseHuiModal from '../base-hui-modal.vue'

const props = defineProps<{
  show: boolean
  closeModal: () => void
  department: DepartmentType
}>()

const resolver = zodResolver(addDepartmentRoleSchema)
</script>

<template>
  <BaseHuiModal :show="show" :title="'Add Department Role'" :closeModal="closeModal">
    <PrimeForm :resolver> </PrimeForm>
  </BaseHuiModal>
  <Toast position="top-right" />
</template>

<style scoped>
:deep(.email-chips) .p-chips-multiple-container {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  transition: all 0.2s ease;
}

:deep(.email-chips) .p-chips-multiple-container:hover {
  border-color: var(--primary-color);
}

:deep(.email-chips) .p-chips-multiple-container:focus-within {
  border-color: var(--primary-color);
  box-shadow:
    0 0 0 2px #e5e7eb,
    0 0 0 4px var(--primary-color);
}

:deep(.email-chips) .p-chips-token {
  background-color: var(--primary-50);
  color: var(--primary-700);
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin: 0.125rem;
}

:deep(.p-inputtext),
:deep(.p-dropdown) {
  width: 100%;
  border-radius: 0.5rem;
  min-height: 2.75rem;
  transition: all 0.2s ease;
}

:deep(.p-dropdown:hover) {
  border-color: var(--primary-color);
}

:deep(.p-dropdown:focus) {
  border-color: var(--primary-color);
  box-shadow:
    0 0 0 2px #e5e7eb,
    0 0 0 4px var(--primary-color);
}

:deep(.p-button) {
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(.p-button:not(:disabled):hover) {
  transform: translateY(-1px);
}

:deep(.p-message) {
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

/* Loading state styles */
:deep(.p-button-loading) {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Toast customization */
:deep(.p-toast) {
  opacity: 0.95;
}

:deep(.p-toast-message) {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
</style>
