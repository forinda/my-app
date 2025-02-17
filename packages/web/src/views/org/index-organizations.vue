<script setup lang="ts">
import {  ref } from 'vue'
import OrgCreate from '@/components/org/org-create.vue'
import OrgLayoutHeader from '@/components/org/org-layout-header.vue'
import { useNotification } from '@/composables/use-notification'
import { useOrganizationStore } from '@/stores/organization-store'

const createOrgOpen = ref(false)
const orgStore = useOrganizationStore()
// const { query } = storeToRefs(orgStore)

const { $swal } = useNotification()
const toggleCreateOrganizationModal = (state: boolean) => {
  createOrgOpen.value = state
}

const handleCreate = async (
  values: Parameters<typeof orgStore.createOrganization.mutate>[0],
  // options?: Parameters<typeof createOrganization>[1],
) => {
  await orgStore.createOrganization.mutateAsync(values, {
    onError: async (error) => {
      // console.error(error)
      await $swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      })
    },
    onSuccess: async () => {
      toggleCreateOrganizationModal(false)
    },
  })
}
</script>
<template>
  <div>
    <org-layout-header @toggleModal="toggleCreateOrganizationModal" />
    <org-create :show="createOrgOpen" @submit="handleCreate" />
    <!-- List of Organizations -->
    <div v-if="orgStore.query.isFetched" class="grid gap-4">
      <router-link
        :to="{ name: 'organization-id', params: { id: org.uuid } }"
        v-for="org in orgStore.query.data"
        :key="org.id"
        class="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
      >
        <div class="text-lg font-medium">{{ org.name }}</div>
        <div class="text-gray-500 text-sm">Desc: {{ org.description }}</div>
        <!-- <div class="text-gray-500 text-sm">Date Joined: {{ o }}</div> -->
      </router-link>
    </div>
    <div v-else-if="orgStore.query.isLoading" class="text-gray-500 text-center mt-6">
      Loading...
    </div>
    <div v-else-if="orgStore.query.isError" class="text-gray-500 text-center mt-6">
      Error loading organizations.
    </div>

    <!-- Empty State -->
    <div v-else class="text-gray-500 text-center mt-6">You are not part of any organizations.</div>
  </div>
</template>

<style scoped></style>
