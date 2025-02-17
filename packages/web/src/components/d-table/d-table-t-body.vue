<script setup lang="ts" generic="T">
import { FlexRender, type Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<T>
}>()
</script>

<template>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="hover:bg-blue-50 transition-colors duration-200"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
          >
            <flex-render :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>

</template>

<style scoped>
.min-w-full {
  min-width: 100%;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

tbody tr:last-child td:first-child {
  border-bottom-left-radius: 0.5rem;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 0.5rem;
}

td {
  border-bottom: 1px solid #e5e7eb;
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>
