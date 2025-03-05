import {
  type ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import { useState } from 'react';
import DataTable from '~/components/data-table';
import { Table } from '~/components/ui/table';
import { useDepartmentQuery } from '~/lib/queries/departments-query';
import { getDepartmentTableCols } from '~/lib/table-cols/departments-col';

export default function MockDepartments() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    recordsQuery: { data },
  } = useDepartmentQuery();
  const table = useReactTable({
    data,
    columns: getDepartmentTableCols({}),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const props: Table.RootProps = {};
  return (
    <div>
      <div>
        <DataTable table={table} />
      </div>
    </div>
  );
}
