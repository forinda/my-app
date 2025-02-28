<script setup lang="ts">
import type { DepartmentType } from '@/queries/departments-query'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import BaseHuiModal from './base-hui-modal.vue'
import { computed } from 'vue'
const props = defineProps<{
  department: DepartmentType
  show: boolean
  closeModal: () => void
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const departmentRolesSorted = computed(() => {
  return props.department.user_roles.sort((a, b) => {
    return a.created_at > b.created_at ? -1 : 1
  })
})
</script>
<template>
  <BaseHuiModal :show="show" :title="''" :closeModal="closeModal">
    <div class="card w-full">
      <PrimeTabs value="0">
        <PrimeTabList>
          <PrimeTab value="0" as="div" class="flex items-center gap-2">
            <Icon :icon="'bx:bx-info-circle'" class="w-5 h-5" />
            <span class="font-bold whitespace-nowrap">Info</span>
          </PrimeTab>
          <Tab value="1" as="div" class="flex items-center gap-2">
            <Icon :icon="'lucide-unlink'" class="w-5 h-5" />
            <span class="font-bold whitespace-nowrap">Roles</span>
          </Tab>
          <Tab value="2" class="flex items-center gap-2">
            <Icon :icon="'lucide-users'" class="w-5 h-5" />
            <span class="font-bold whitespace-nowrap">Members</span>
          </Tab>
        </PrimeTabList>
        <TabPanels>
          <TabPanel value="0" as="div" class="m-0">
            <div>
              <h2>
                {{ department.name }}
              </h2>
              <p>
                {{ department.description }}
              </p>
            </div>
          </TabPanel>
          <TabPanel value="1" as="div" class="m-0">
            <div>
              <h2>Roles</h2>
              <ul class="space-y-4">
                <li
                  v-for="role in departmentRolesSorted"
                  :key="role.id"
                  class="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                    <!-- Status and Role Title -->
                    <div class="flex items-center space-x-3">
                      <span
                        :class="{
                          'bg-green-100 text-green-800 border border-green-300': role.is_active,
                          'bg-red-100 text-red-800 border border-red-300': !role.is_active,
                        }"
                        class="px-3 py-1 text-sm font-semibold rounded-full"
                      >
                        {{ role.is_active ? 'Active' : 'Inactive' }}
                      </span>
                      <span class="text-gray-800 font-semibold text-base">
                        Role: {{ role.role_title.name }}
                      </span>
                    </div>

                    <!-- Dates -->
                    <div class="text-sm text-gray-600 mt-2 sm:mt-0">
                      <span>📅 Start: {{ formatDate(role.start_date) }}</span>
                      <span class="mx-2 text-gray-400">|</span>
                      <span>End: {{ role.end_date ? formatDate(role.end_date) : 'N/A' }}</span>
                    </div>
                  </div>

                  <!-- User Name -->
                  <div class="mt-3 text-sm text-gray-700 font-medium">
                    👤 {{ role.user.first_name }} {{ role.user.last_name }}
                  </div>
                </li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div class="card">
              <PrimeDataTable
                :show-gridlines="true"
                :sort-mode="'multiple'"
                :value="department.members"
              >
                <PrimeColumn field="user.avatar" header="Avatar">
                  <template #body="{ data }">
                    <div>
                      <PrimeAvatar
                        :image="data.user.avatar"
                        alt="avatar"
                        class="w-8 h-8 rounded-full"
                        width="32"
                        style="vertical-align: middle"
                      />
                    </div>
                  </template>
                </PrimeColumn>
                <PrimeColumn field="user.first_name" header="First Name"></PrimeColumn>
                <PrimeColumn field="user.last_name" header="Last Name"></PrimeColumn>
                <PrimeColumn field="user.gender" header="Gender"></PrimeColumn>
              </PrimeDataTable>
            </div>
          </TabPanel>
        </TabPanels>
      </PrimeTabs>
    </div>
  </BaseHuiModal>
</template>

<style scoped></style>
