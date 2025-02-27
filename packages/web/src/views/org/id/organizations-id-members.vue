<script setup lang="ts">
import { useOrganizationMembers } from '@/composables/use-organization-members'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const r = useRoute()
const { data, refresh, setCurrentOrganization } = await useOrganizationMembers()
onMounted(async () => {
  setCurrentOrganization(r.params.id as string)
  await refresh()
})
</script>
<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Organization Members</h2>
    <button @click="refresh()">Refresh</button>
    <!-- <d-table :data="[]" :columns="[]"> </d-table> -->
  </div>
</template>

<style scoped></style>
