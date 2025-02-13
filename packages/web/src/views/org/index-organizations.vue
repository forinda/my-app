<script setup lang="ts">
import { useOrganizations } from '@/composables/use-organizations';
import { onMounted, ref } from 'vue';
import OrgCreate from '@/components/org/org-create.vue';
import OrgLayoutHeader from '@/components/org/org-layout-header.vue';
const createOrgOpen = ref(false);
const { data, create, refresh } = await useOrganizations();

const toggleCreateOrganizationModal = (state: boolean) => {
  createOrgOpen.value = state;
};

const handleCreate = async (
  values: Parameters<typeof create>[0],
  options?: Parameters<typeof create>[1],
) => {
  await create(values, options);
  toggleCreateOrganizationModal(false);
};

onMounted(async () => {
  await refresh();
});
</script>
<template>
  <div>
    <org-layout-header @toggleModal="toggleCreateOrganizationModal" />
    <org-create :show="createOrgOpen" @submit="handleCreate" @close="toggleCreateOrganizationModal" />
    <!-- List of Organizations -->
    <div v-if="data?.length" class="grid gap-4">
      <router-link :to="{ name: 'organizations-id', params: { id: org.uuid } }" v-for="org in data" :key="org.id"
        class="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
        <div class="text-lg font-medium">{{ org.name }}</div>
        <div class="text-gray-500 text-sm">Desc: {{ org.description }}</div>
        <!-- <div class="text-gray-500 text-sm">Date Joined: {{ o }}</div> -->
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-else class="text-gray-500 text-center mt-6">
      You are not part of any organizations.
    </div>
  </div>
</template>

<style scoped></style>
