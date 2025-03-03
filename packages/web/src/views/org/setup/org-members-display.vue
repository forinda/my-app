<script setup lang="ts">
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { useOrgMembersQuery } from '@/queries/org-members-query'
import { getOrgMembersTableCols } from '@/lib/cols/org-member-cols'
import ModalInviteUsersToOrg from '@/components/modal-invite-users-to-org.vue'
import { ref } from 'vue'
import VTable from '@/components/v-table.vue'
const invitemembersOpen = ref(false)
const invitemembersClose = () => {
  invitemembersOpen.value = false
}

const { recordsQuery } = useOrgMembersQuery()

const table = useVueTable({
  get data() {
    return recordsQuery.data.value!
  },
  columns: getOrgMembersTableCols({}),
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <ModalInviteUsersToOrg :showModal="invitemembersOpen" :closeModal="invitemembersClose" />
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Members</h2>
        <PrimeButton
          @click="invitemembersOpen = true"
          class="flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Invite Members
        </PrimeButton>
      </div>
      <VTable :table />
    </div>

    <!-- <ModalCreateOrUpdateOrgDesignation
      :close-modal="closeModal"
      :save-record="saveChanges"
      :initial-values="selectedValue"
      :mode="editMode"
      :show-modal="showModal"
      :open-create-modal="openCreateModal"
      :open-edit-modal="openEditModal"
    /> -->
  </div>
</template>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
