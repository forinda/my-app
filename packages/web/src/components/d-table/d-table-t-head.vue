<script setup lang="ts" generic="T">
import { FlexRender, type Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<T>
}>()
</script>

<template>
  <thead class="bg-blue-50">
    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
      <th
        v-for="header in headerGroup.headers"
        :key="header.id"
        class="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b-2 border-blue-100"
        :class="{
          'cursor-pointer hover:bg-blue-100 transition-colors duration-200':
            header.column.getCanSort(),
        }"
      >
        <div class="flex items-center justify-between">
          <flex-render
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
          <span v-if="header.column.getCanSort()" class="ml-2">
            {{
              header.column.getIsSorted()
                ? header.column.getIsSorted() === 'desc'
                  ? '▼'
                  : '▲'
                : '◆'
            }}
          </span>
        </div>
      </th>
    </tr>
  </thead>
</template>

<style scoped>
thead {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Create a subtle bottom border highlight that animates on hover */
th {
  position: relative;
  overflow: hidden; /* Ensure pseudo-element stays within bounds */
}

th::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #e6effd; /* Light blue */
  transition: background-color 0.2s ease-in-out;
}

/* When hovering, change the underline to a more vibrant blue */
th:hover::after {
  background-color: #3b82f6; /* Tailwind blue-500 */
}
</style>
