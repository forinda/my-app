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
} from '@tanstack/react-table';
import { useState } from 'react';
import DataTable from '~/components/data-table';
import { Table } from '~/components/ui/table';
import { useOrgDesignationQuery } from '~/lib/queries/org-designation-query';
import { getOrgDesignationTableCols } from '~/lib/table-cols/designation-cols';

export default function MockDesignations() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    recordsQuery: { data },
  } = useOrgDesignationQuery();
  const table = useReactTable({
    data,
    columns: getOrgDesignationTableCols({}),
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
