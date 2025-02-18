<script setup lang="ts">
import { computed } from 'vue'
import { type Table } from '@tanstack/vue-table'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  table: Table<any>
}>()

const currentPage = computed(() => props.table.getState().pagination.pageIndex)
const currentPageNumber = computed(() => currentPage.value + 1)
const totalPages = computed(() => props.table.getPageCount())
const canPreviousPage = computed(() => props.table.getCanPreviousPage())
const canNextPage = computed(() => props.table.getCanNextPage())

const pageSizeOptions = [10, 20, 30, 40, 50]

const pageRange = computed(() => {
  if (totalPages.value <= 3) return Array.from({ length: totalPages.value }, (_, i) => i + 1)

  const start = Math.max(1, currentPageNumber.value - 1)
  const end = Math.min(totalPages.value, start + 2)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<template>
  <div class="px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
    <div class="flex flex-col items-center justify-between sm:flex-row gap-4">
      <!-- Rows Per Page -->
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-700">Rows per page:</span>
        <select
          v-model="table.getState().pagination.pageSize"
          @change="table.setPageSize(Number((<HTMLSelectElement>$event.target).value))"
          class="py-1 pl-3 pr-10 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="pageSize in pageSizeOptions" :key="pageSize" :value="pageSize">
            {{ pageSize }}
          </option>
        </select>
      </div>

      <!-- Pagination Controls -->
      <div class="flex items-center space-x-2">
        <button
          class="p-1 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canPreviousPage"
          @click="table.setPageIndex(0)"
          aria-label="First page"
        >
          <Icon icon="lucide:chevrons-left" class="w-5 h-5 text-blue-600" />
        </button>
        <button
          class="p-1 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canPreviousPage"
          @click="table.previousPage()"
          aria-label="Previous page"
        >
          <Icon icon="lucide:chevron-left" class="w-5 h-5 text-blue-600" />
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center space-x-1">
          <button
            v-for="page in pageRange"
            :key="page"
            @click="table.setPageIndex(page - 1)"
            :class="[
              'px-3 py-1 rounded-md text-sm font-medium',
              currentPageNumber === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-100',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="p-1 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canNextPage"
          @click="table.nextPage()"
          aria-label="Next page"
        >
          <Icon icon="lucide:chevron-right" class="w-5 h-5 text-blue-600" />
        </button>
        <button
          class="p-1 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canNextPage"
          @click="table.setPageIndex(totalPages - 1)"
          aria-label="Last page"
        >
          <Icon icon="lucide:chevrons-right" class="w-5 h-5 text-blue-600" />
        </button>
      </div>

      <!-- Page Info -->
      <div class="text-sm text-gray-700" aria-live="polite">
        Page {{ currentPageNumber }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>
