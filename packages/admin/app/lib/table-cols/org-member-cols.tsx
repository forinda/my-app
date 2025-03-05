import type { ColumnDef } from '@tanstack/react-table';
import type { FetchOrganizationMembersResponseType } from '../types/org';

type RecordColType = FetchOrganizationMembersResponseType['data'][number];
type Props = {
  editRecord?: (row: RecordColType) => void;
  deleteRecord?: (row: RecordColType['id']) => void;
};

export function getOrgMembersTableCols(props: Props = {}) {
  const cols: ColumnDef<RecordColType>[] = [
    {
      cell: (row) => row.row.index + 1,
      header: 'Index',
    },
    {
      accessorFn: (row) => `${row.user.first_name} ${row.user.last_name}`,
      cell: (row) => row.getValue(),
      header: 'Name',
    },
    {
      accessorFn: (row) => row.organization.name,
      cell: (row) => row.getValue(),
      header: 'Organization',
    },
    // {
    //   cell: ({ row }) =>
    //     h(
    //       'div',
    //       {
    //         class: 'flex space-x-2',
    //       },
    //       [
    //         h(
    //           'button',
    //           {
    //             onClick: () => props.editRecord!(row.original),
    //             class:
    //               'p-1 text-primary border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //           },
    //           [h(Icon, { icon: 'akar-icons:edit', class: 'text-blue-500' })],
    //         ),
    //         [
    //           h(
    //             'button',
    //             {
    //               onClick: () => console.log('Delete', row),
    //               class:
    //                 'p-1 border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //             },
    //             [h(Icon, { icon: 'lucide-trash', class: 'text-red-500' })],
    //           ),
    //         ],
    //       ],
    //     ),
    //   header: 'Actions',
    // },
  ];
  return cols;
}
