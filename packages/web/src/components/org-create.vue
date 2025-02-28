<script setup lang="ts">
import { Dialog, TransitionRoot, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue'
import ModalFormCreateOrg from './modal-form-create-org.vue'
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (event: 'submit', ...args: any[]): void
  (event: 'close', ...args: any[]): void
}>()

const submit = (values: any) => {
  emit('submit', values)
}
</script>
<template>
  <transition-root appear :show="show" as="template">
    <Dialog as="div" @close="emit('close', false)" class="relative z-10">
      <transition-child
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
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
                Create Organization
              </dialog-title>
              <div class="mt-2">
                <modal-form-create-org @submit="submit" />
              </div>
            </dialog-panel>
          </transition-child>
        </div>
      </div>
    </Dialog>
  </transition-root>
</template>

<style scoped></style>
