<script setup lang="ts">
import { useDepartmentQuery } from '@/queries/departments-query'
import { useDepartmentTitleQuery } from '@/queries/department-title-query.ts'
import { computed, reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import OrgDepartmentListing from '@/components/org/setup/org-department-listing.vue'
import OrgDepartmentTitleListing from '@/components/org/setup/org-department-title-listing.vue'

const deptTitle = useDepartmentTitleQuery()
const titlesData = computed(() => deptTitle.recordsQuery.data.value ?? [])

const tabs = reactive([
  { name: 'Departments', iconName: 'lucide-wallet-cards' },
  { name: 'Titles', iconName: 'lucide-briefcase' },
  // { name: 'Roles', iconName: 'lucide-lock-keyhole' },
  // { name: 'Members', iconName: 'lucide-users' },
] as const)

const selectedTab = ref<(typeof tabs)[number]['name']>(tabs[0].name)
const handleTabChange = (tabIndex: number) => {
  selectedTab.value = tabs.find((_, index) => index === tabIndex)?.name ?? tabs[0].name
}
</script>

<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <TabGroup as="div" @change="handleTabChange">
      <TabList class="flex bg-gray-50 p-1 space-x-1">
        <Tab v-for="{ iconName, name } in tabs" :key="name" v-slot="{ selected }">
          <button
            class="w-full cursor-pointer py-2.5 px-3 text-sm font-medium leading-5 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="[
              selected
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800',
            ]"
          >
            <div class="flex items-center justify-center space-x-2">
              <Icon :icon="iconName" class="h-5 w-5" />
              <span>{{ name }}</span>
            </div>
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2 p-4">
        <TabPanel
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
        >
          <OrgDepartmentListing />
        </TabPanel>
        <TabPanel
          class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
        >
          <OrgDepartmentTitleListing :data="titlesData" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
