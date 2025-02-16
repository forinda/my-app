<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import OrgDashboardSidebar from '@/components/org/org-dashboard-sidebar.vue'
import OrgDashboardHeader from '@/components/org/org-dashboard-header.vue'
import { useOrganizationStore } from '@/stores/organization-store'
import {useAuthStore} from "@/stores/auth-store.ts";

const orgStore = useOrganizationStore()
const authStore = useAuthStore()
const route = useRoute()
const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const currentRoute = route.path
const organizationId = route.params.id as string
// const currentRoute = computed(() => route.path)

onMounted(async () => {
  await orgStore.refresh()
 await authStore.setUserCurrentOrganization(organizationId,{
    onSuccess:()=>authStore.getSession(true),
    onError: () => {}
  })
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <org-dashboard-sidebar
      :isSidebarOpen="isSidebarOpen"
      :org-id="organizationId"
      :route-path="currentRoute"
      @toggleSidebar="toggleSidebar"
    />
    <!-- Main content -->
    <div class="flex-1 overflow-hidden">
      <org-dashboard-header />
      <!-- <main class=""> -->
      <router-view />
      <!-- </main> -->
    </div>
  </div>
</template>

<style scoped></style>
