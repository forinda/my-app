<script setup lang="ts">
import { departmentTitleTableCols } from '@/lib/cols/org-department-title-col'
import type {  FetchDepartmentTitleResponseType } from '@/types/org'
import DTable from '@/components/d-table/d-table.vue';
defineProps<{
  data: FetchDepartmentTitleResponseType['data']
}>()
</script>
<template>
  <div>
    Data
    <div>
      <DTable :data="data" :columns="departmentTitleTableCols"> </DTable>
    </div>
  </div>
</template>
