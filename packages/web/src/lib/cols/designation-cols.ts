import type { FetchOrganizationDesignationResponseType } from '@/types/org'
import { createColumnHelper } from '@tanstack/vue-table'

const colHelper = createColumnHelper<FetchOrganizationDesignationResponseType['data'][number]>()
export const orgDesignationTableCols = [
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
