import type { FetchDepartmentTitleResponseType } from '@/types/org'
import { createColumnHelper } from '@tanstack/vue-table'

const colHelper = createColumnHelper<FetchDepartmentTitleResponseType['data'][number]>()
export const departmentTitleTableCols = [
  colHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  colHelper.accessor('name', {
    cell: (row) => row.getValue(),
    header: 'Name',
  }),
  colHelper.accessor('description', {
    cell: (row) => row.getValue(),
    header: 'Description',
  }),
]
