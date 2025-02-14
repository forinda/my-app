<script setup lang="ts">
import { useOrganizations } from '@/composables/use-organizations'
import type { DashboardSidebarMenuItem } from '@/types/dash'
import { reactive } from 'vue'
// import type { DashboardSidebarMenuItem } from '~/types/dash';
import orgSidebarMenuItem from './org-sidebar-menu-item.vue'
import { Icon } from '@iconify/vue'
const { currentOrg } = await useOrganizations()

const props = defineProps<{
  isSidebarOpen: boolean
  orgId: string
  routePath: string
}>()
const menuItems = reactive<DashboardSidebarMenuItem[]>([
  {
    name: 'Dashboard',
    icon: 'lucide-layout-dashboard',
    route: '#',
    children: [
      {
        name: 'Overview',
        icon: 'lucide-layout-dashboard',
        route: `/organizations/${props.orgId}`,
      },
      {
        name: 'Activity',
        icon: 'lucide-activity',
        route: `/organizations/${props.orgId}/activity`,
      },
      {
        name: 'Reports',
        icon: 'lucide-chart-bar',
        route: `/organizations/${props.orgId}/reports`,
      },
    ],
  },
  {
    name: 'Members',
    icon: 'lucide-users',
    route: `#`,
    children: [
      {
        name: 'All Members',
        icon: 'lucide-users',
        route: `/organizations/${props.orgId}/members`,
      },
      {
        name: 'Invite Members',
        icon: 'lucide-user-plus',
        route: `/organizations/${props.orgId}/members/invite`,
      },
    ],
  },
  {
    name: 'Workspaces',
    icon: 'lucide-briefcase',
    route: `#`,
    children: [
      {
        name: 'All Workspaces',
        icon: 'lucide-briefcase',
        route: `/organizations/${props.orgId}/workspaces`,
      },
      {
        name: 'Create Workspace',
        icon: 'lucide-briefcase-plus',
        route: `/organizations/${props.orgId}/workspaces/create`,
      },
    ],
  },
  {
    name: 'Settings',
    icon: 'lucide-settings',
    route: `/organizations/${props.orgId}/settings`,
  },
])

const emit = defineEmits<{
  (event: 'toggleSidebar'): void
}>() // 2️⃣
</script>
<template>
  <div
    class="bg-white shadow-lg transition-all duration-300 overflow-hidden border-r"
    :class="isSidebarOpen ? 'w-64' : 'w-16'"
  >
    <div class="p-4 flex items-center justify-between">
      <h1 v-if="isSidebarOpen" class="text-xl font-bold text-gray-800">
        {{ currentOrg?.name }}
      </h1>
      <button @click="emit('toggleSidebar')" class="text-gray-500 hover:text-gray-700">
        <Icon
          :icon="isSidebarOpen ? 'lucide-panel-right-open' : 'lucide-panel-left-open'"
          size="24"
        />
      </button>
    </div>
    <nav class="mt-8">
      <ul>
        <org-sidebar-menu-item
          v-for="item in menuItems"
          :is-sidebar-open="isSidebarOpen"
          :item="item"
          :route-path="routePath"
          :depth="0"
        />
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
