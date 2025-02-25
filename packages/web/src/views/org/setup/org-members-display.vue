<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { useOrgMembersQuery } from '@/queries/org-members-query'
import { getOrgMembersTableCols } from '@/lib/cols/org-member-cols'
import ModalInviteUsersToOrg from '@/components/modals/modal-invite-users-to-org.vue'
import { ref } from 'vue'
const invitemembersOpen = ref(false)
const invitemembersClose = () => {
  invitemembersOpen.value = false
}

const { recordsQuery } = useOrgMembersQuery()

const table = useVueTable({
  get data() {
    return recordsQuery.data.value
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

      <!-- <DTable :data="query.data" :columns="getDepartmentTableCols()"> </DTable> -->
      <table class="table-auto w-full">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colspan="header.colSpan"
              class="px-6 py-3 border bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200" v-if="table.getRowModel().rows.length > 0">
          <tr v-for="row in table.getRowModel().rows" :key="row.id" class="border">
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border" colspan="4">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
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
