<script setup lang="ts">
import type { DepartmentType } from '@/queries/departments-query'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import BaseHuiModal from '../base-hui-modal.vue'
const props = defineProps<{
  department: DepartmentType
  show: boolean
  closeModal: () => void
}>()
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
              <p>Roles</p>
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
