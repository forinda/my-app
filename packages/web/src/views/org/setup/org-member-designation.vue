<script setup lang="ts">
import { useDesignationQuery } from '@/queries/designations-query'
import DTable from '@/components/d-table/d-table.vue'
import { orgDesignationTableCols } from '@/lib/cols/designation-cols'
import { computed } from 'vue';
const { query } = useDesignationQuery()
const data = computed(() => query.data.value ?? [])
</script>
<template>
  <div><DTable :data="data" :columns="orgDesignationTableCols"> </DTable></div>
</template>

<style scoped></style>
