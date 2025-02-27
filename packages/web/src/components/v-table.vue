<script setup lang="ts">
import type { TsFixMeType } from '@/types/utils'
import { FlexRender, type Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<TsFixMeType>
}>()
</script>
<template>
  <table class="table-auto w-full">
    <thead>
      <tr
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
        class="bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border"
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colspan="header.colSpan"
          class="px-6 py-3 border bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200" v-if="table.getRowModel().rows.length > 0">
      <tr v-for="row in table.getRowModel().rows" :key="row.id" class="border">
        <td
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border"
        >
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border" colspan="4">
          No data available
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
