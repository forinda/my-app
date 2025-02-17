import type { FetchDepartmentResponseType } from '@/types/org'
import {  type ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export function getDepartmentTableCols() {
  const orgDepartmentTableCols: ColumnDef<FetchDepartmentResponseType['data'][number]>[] = [
    {
      id: 'index',
      header: 'Index',
      cell: ({ row }) => row.index+1,
    },
    // {
    //   id: 'id',
    //   header: 'ID',
    //   accessorKey: 'id',
    //   cell: (row) => row.getValue(),
    // },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: (row) => row.getValue(),
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      cell: (row) => row.getValue(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) =>
        h(
          'div',
          {
            class: 'flex space-x-2'
          },
          [
            h('button', { onClick: () => console.log('Edit', row) }, 'Edit'),
            h('button', { onClick: () => console.log('Delete', row) }, 'Delete'),
          ],
        ),
    },
  ]
  return orgDepartmentTableCols
}
