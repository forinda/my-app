<script setup lang="ts">
import type { DepartmentType } from '@/queries/departments-query'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
const props = defineProps<{
  department: DepartmentType
  show: boolean
  closeModal: () => void
}>()
</script>
<template>
  <transition-root appear :show as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <transition-child
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/70" />
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
              class="w-full max-w-[40rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="card">
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
            </dialog-panel>
          </transition-child>
        </div>
      </div>
    </Dialog>
  </transition-root>
</template>

<style scoped></style>
