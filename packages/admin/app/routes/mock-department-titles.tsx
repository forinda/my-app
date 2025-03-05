import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import DataTable from '~/components/data-table';
import { Table } from '~/components/ui/table';
import { useDepartmentTitleQuery } from '~/lib/queries/department-title-query';
import { useOrgDesignationQuery } from '~/lib/queries/org-designation-query';
import { getOrgDesignationTableCols } from '~/lib/table-cols/designation-cols';

export default function MockDepartmentTitles() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    recordsQuery: { data },
  } = useDepartmentTitleQuery();
  const table = useReactTable({
    data,
    columns: getOrgDesignationTableCols({}),
    state: {
      columnFilters,
      rowSelection,
      globalFilter,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
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
