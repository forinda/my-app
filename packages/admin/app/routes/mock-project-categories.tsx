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
import { useOrgProjectCategoriesQuery } from '~/lib/queries/org-project-category-query';
import { getOrgProjectCategoriesTableCols } from '~/lib/table-cols/project-categories-cols';
import type { OrgProjectCategoryType } from '~/lib/types/org';

export default function MockDepartments() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    recordsQuery: { data },
  } = useOrgProjectCategoriesQuery();
  const table = useReactTable({
    data,
    columns: getOrgProjectCategoriesTableCols({}),
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
        <DataTable<OrgProjectCategoryType> table={table} />
      </div>
    </div>
  );
}
