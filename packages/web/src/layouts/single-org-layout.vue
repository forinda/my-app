<script setup lang="ts">
import { useOrganizations } from '@/composables/use-organizations'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import OrgDashboardSidebar from '@/components/org/org-dashboard-sidebar.vue'
import OrgDashboardHeader from '@/components/org/org-dashboard-header.vue'

const {  refresh, setCurrentOrganization } = await useOrganizations()
const route = useRoute()
const isSidebarOpen = ref(true)
const orgId = computed(() => route.params.id as string)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const currentRoute = computed(() => route.path)

onMounted(async () => {
  await refresh()
  setCurrentOrganization(orgId.value)
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <org-dashboard-sidebar
      :isSidebarOpen="isSidebarOpen"
      :org-id="orgId"
      :route-path="currentRoute"
      @toggleSidebar="toggleSidebar"
    />
    <!-- Main content -->
    <div class="flex-1 overflow-hidden">
      <org-dashboard-header />
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
