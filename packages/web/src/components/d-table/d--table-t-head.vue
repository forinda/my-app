<script setup lang="ts" generic="T">
import { FlexRender, type Table } from '@tanstack/vue-table';
defineProps<{
  table: Table<T>;
}>(); // 1️⃣
</script>
<template>
  <thead>
    <tr class="bg-gray-200" v-for="headerGroup in table.getHeaderGroups()">
      <th
        v-for="header in headerGroup.headers"
        :key="header.id"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        <!-- <span v-if=""></span> -->
        <flex-render
          v-if="!header.isPlaceholder"
          :render="header.column.columnDef.header"
          :props="header.getContext()"
        />
      </th>
    </tr>
  </thead>
</template>

<style scoped></style>
