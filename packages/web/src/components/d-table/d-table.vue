<script setup lang="ts" generic="D, Col = any">
import { valueUpdater } from "@/utils/state-update";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from "@tanstack/vue-table";
import { ref } from "vue";
import DTableTBody from "./d-table-t-body.vue";
type Props<T = any[], U = any> = {
  data: T[];
  columns: ColumnDef<U, any>[];
};

const pagination = ref<PaginationState>({
  pageIndex: 1,
  pageSize: 10,
});
const sorting = ref<SortingState>([]);

const props = defineProps<Props<D, Col>>();

const table = useVueTable({
  data: props.data as any,
  columns: props.columns,
  pageCount: 1,
  state: {
    pagination: pagination.value,
    sorting: sorting.value,
  },
  onPaginationChange: (updateOrValue) =>
    valueUpdater(updateOrValue, pagination),
  onSortingChange: (updateOrValue) => valueUpdater(updateOrValue, sorting),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  manualPagination: true,
  manualSorting: true,
});
</script>

<template>
  <div class="overflow-hidden bg-white shadow-md rounded-lg border border-gray-200">
    <table class="min-w-full table-auto">
      <slot name="thead" :data-table="table">
        <d-table-t-head :table="table" />
      </slot>
      <slot name="tbody" :data-table="table">
        <d-table-t-body :table="table" />
      </slot>
    </table>
  </div>
</template>

<style scoped></style>
