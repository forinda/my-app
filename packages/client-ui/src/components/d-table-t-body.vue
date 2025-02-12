<script setup lang="ts" generic="T">
import { FlexRender, type Table } from '@tanstack/vue-table';
defineProps<{
  table: Table<T>;
}>();
</script>
<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr
      v-for="row in table.getRowModel().rows"
      :key="row.id"
      class="text-center"
    >
      <td
        v-for="cell in row.getVisibleCells()"
        :key="cell.id"
        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      >
        <flex-render
          :render="cell.column.columnDef.cell"
          :props="cell.getContext()"
        />
      </td>
    </tr>
  </tbody>
</template>

<style scoped></style>
