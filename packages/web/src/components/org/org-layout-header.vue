<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
const emits = defineEmits<{
  (event: 'toggleModal', state: boolean): void
}>()
const handleCreateOrganization = () => {
  emits('toggleModal', true)
}
const auth = useAuthStore()
</script>
<template>
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-semibold">Organizations</h1>
    <div class="flex items-center gap-4">
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        @click="handleCreateOrganization"
      >
        + Create
      </button>
      <router-link
        to="/auth/logout"
        class="hover:text-gray-700 bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger-600 transition"
      >
        Logout
      </router-link>
    </div>
  </div>
</template>
