<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (event: 'submit', ...args: any[]): void;
  (event: 'close', ...args: any[]): void;
}>();
</script>
<template>
  <hui-transition-root appear :show="show" as="template">
    <hui-dialog as="div" @close="emit('close', false)" class="relative z-10">
      <hui-transition-child
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </hui-transition-child>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <hui-transition-child
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <hui-dialog-panel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <hui-dialog-title
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create Organization
              </hui-dialog-title>
              <div class="mt-2">
                <modal-form-create-organization @submit="emit('submit')" />
              </div>
            </hui-dialog-panel>
          </hui-transition-child>
        </div>
      </div>
    </hui-dialog>
  </hui-transition-root>
</template>

<style scoped></style>
