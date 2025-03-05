import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import type { FetchOrganizationDesignationResponseType } from '../types/org';
import TableIndeterminateCheckbox from '~/components/table-indeterminate-checkbox';

const colHelper =
  createColumnHelper<
    FetchOrganizationDesignationResponseType['data'][number]
  >();
type RecordColType = FetchOrganizationDesignationResponseType['data'][number];
type Props = {
  editRecord?: (row: RecordColType) => void;
  deleteRecord?: (row: RecordColType['id']) => void;
};

export function getOrgDesignationTableCols(props: Props) {
  const orgDesignationTableCols: ColumnDef<RecordColType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <TableIndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <TableIndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      cell: (row) => row.row.index + 1,
      header: 'Index',
      enableColumnFilter: true,
    },
    {
      accessorFn: (row) => row.name,
      cell: (row) => row.getValue(),
      header: 'Name',
    },
    {
      accessorFn: (row) => row.description,
      cell: (row) => row.getValue(),
      header: 'Description',
    },
    // {
    //   // cell: ({ row }) =>
    //   //   h(
    //   //     'div',
    //   //     {
    //   //       class: 'flex space-x-2',
    //   //     },
    //   //     [
    //   //       h(
    //   //         'button',
    //   //         {
    //   //           onClick: () => props.editRecord(row.original),
    //   //           class:
    //   //             'p-1 text-primary border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //   //         },
    //   //         [h(Icon, { icon: 'akar-icons:edit', class: 'text-blue-500' })],
    //   //       ),
    //   //       [
    //   //         h(
    //   //           'button',
    //   //           {
    //   //             onClick: () => console.log('Delete', row),
    //   //             class:
    //   //               'p-1 border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //   //           },
    //   //           [h(Icon, { icon: 'lucide-trash', class: 'text-red-500' })],
    //   //         ),
    //   //       ],
    //   //     ],
    //   //   ),
    //   // header: 'Actions',
    // },
  ];
  return orgDesignationTableCols;
}
