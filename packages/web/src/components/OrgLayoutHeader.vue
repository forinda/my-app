<script setup lang="ts">
const emits = defineEmits<{
  (event: 'toggleModal', state: boolean): void;
}>();
const handleCreateOrganization = () => {
  console.log('create organization');

  emits('toggleModal', true);
};
</script>
<template>
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-semibold">Organizations</h1>
    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      @click="handleCreateOrganization">
      + Create Organization
    </button>
  </div>
</template>
