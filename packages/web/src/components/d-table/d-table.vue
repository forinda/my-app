<script setup lang="ts" generic="D, Col = any">
import { valueUpdater } from '@/utils/state-update'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import DTableTBody from './d-table-t-body.vue'
import DTableTHead from './d-table-t-head.vue'
import DTableTPagination from './d-table-t-pagination.vue'
type Props<T = any[], U = any> = {
  data: T[]
  columns: ColumnDef<U, any>[]
}

const pagination = ref<PaginationState>({
  pageIndex: 1,
  pageSize: 10,
})
const sorting = ref<SortingState>([])

const props = defineProps<Props<D, Col>>()

const table = useVueTable({
  data: props.data as any,
  columns: props.columns,
  pageCount: 1,
  state: {
    pagination: pagination.value,
    sorting: sorting.value,
  },
  onPaginationChange: (updateOrValue) => valueUpdater(updateOrValue, pagination),
  onSortingChange: (updateOrValue) => valueUpdater(updateOrValue, sorting),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  manualPagination: true,
  manualSorting: true,
})
</script>

<template>
  <div class="w-full overflow-hidden bg-white shadow-lg rounded-lg border border-gray-200">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 table table-fixed">
        <slot name="thead" :data-table="table">
          <d-table-t-head :table="table" />
        </slot>
        <slot name="tbody" :data-table="table">
          <d-table-t-body :table="table" />
        </slot>
      </table>
      <slot name="tfoot" :data-table="table">
        <d-table-t-pagination :table="table" />
      </slot>
    </div>
    <div class="px-4 py-3 bg-gray-50 border-t border-gray-200">
      <!-- Pagination controls can be added here -->
    </div>
  </div>
</template>

<style scoped>
.w-full {
  width: 100%;
}

.overflow-x-auto {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.min-w-full {
  min-width: 100%;
}

@media (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }
}
</style>
