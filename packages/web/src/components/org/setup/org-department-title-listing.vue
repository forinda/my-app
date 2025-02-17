<script setup lang="ts">
import { departmentTitleTableCols } from '@/lib/cols/org-department-title-col'
import type { FetchDepartmentTitleResponseType } from '@/types/org'
import DTable from '@/components/d-table/d-table.vue'
import { useDepartmentTitleQuery } from '@/queries/department-title-query'
const { query } = useDepartmentTitleQuery()
</script>
<template>
  <div>
    Data
    <div>
      <DTable :data="query.data.value!" :columns="departmentTitleTableCols"> </DTable>
    </div>
  </div>
</template>
