<script setup lang="ts">
import { useOrganizationMembers } from '@/composables/use-organization-members';
import type { FetchOrganizationMembersResponseType } from '@/types/org';
import { createColumnHelper } from '@tanstack/vue-table';
import moment from 'moment';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DTable from '@/components/d-table/d-table.vue';
const r = useRoute();
const { data, refresh, setCurrentOrganization } =
  await useOrganizationMembers();
onMounted(async () => {
  setCurrentOrganization(r.params.id as string);
  await refresh();
});
const colHelper =
  createColumnHelper<FetchOrganizationMembersResponseType['data'][number]>();
const columns = [
  colHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  colHelper.accessor('user.first_name', {
    cell: (row) => row.getValue(),
    header: 'First Name',
  }),
  colHelper.accessor('user.last_name', {
    cell: (row) => row.getValue(),
    header: 'Last Name',
  }),
  colHelper.accessor('organization.name', {
    cell: (row) => row.getValue(),
    header: 'Organization',
  }),
  colHelper.accessor('date_joined', {
    cell: (row) => moment(row.getValue()).format('MMM DD, YYYY'),
    header: 'Date Joined',
  }),
  colHelper.accessor('is_active', {
    cell: (row) => (row.getValue() ? 'Active' : 'Inactive'),
    header: 'Status',
  }),
];
</script>
<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Organization Members</h2>
    <button @click="refresh()">Refresh</button>
    <d-table :data="data ?? []" :columns="columns"> </d-table>
  </div>
</template>

<style scoped></style>
