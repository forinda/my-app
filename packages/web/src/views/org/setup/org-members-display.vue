<script setup lang="ts">
import DTable from '@/components/d-table/d-table.vue'
// import { orgMemberTableCols } from '@/lib/cols/org-member-cols'
import { useOrgMembers } from '@/queries/org-members-query'
import { computed } from 'vue'
const { query } = useOrgMembers()

const data = computed(() => query.data.value ?? [])
</script>
<template>
  <div>
    <div>
      <!-- <d-table :data="data" :columns="orgMemberTableCols"> </d-table> -->
    </div>
  </div>
</template>

<style scoped></style>
