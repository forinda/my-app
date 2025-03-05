import type { ColumnDef } from '@tanstack/react-table';
import type { FetchDepartmentResponseType } from '../types/org';

type DeptType = FetchDepartmentResponseType['data'][number];
type Props = {
  editDepartment?: (row: DeptType) => void;
  deleteDepartment?: (row: DeptType['id']) => void;
  // openShowDepartment: (row: DeptType) => void
  openShowDepartment?: (row: DeptType['uuid']) => void;
  closeShowDepartment?: () => void;
  openAssignRole?: (row: DeptType['uuid']) => void;
  closeAssignRole?: () => void;
};
export function getDepartmentTableCols(props: Props = {}) {
  const orgDepartmentTableCols: ColumnDef<DeptType>[] = [
    {
      id: 'index',
      header: 'Index',
      cell: ({ row }) => row.index + 1,
    },
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
    // {
    //   id: 'actions',
    //   header: 'Actions',
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
    //             onClick: () => props.editDepartment(row.original),
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
    //         h(
    //           'button',
    //           {
    //             onClick: () => props.openAddUserToDepartment(row.original.uuid),
    //             class:
    //               'p-1 border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //           },
    //           [h(Icon, { icon: 'lucide-user-plus', class: 'text-green-500' })],
    //         ),
    //         h(
    //           'button',
    //           {
    //             onClick: () => props.openShowDepartment(row.original.uuid),
    //             class:
    //               'p-1 border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //           },
    //           [h(Icon, { icon: 'akar-icons:eye', class: 'text-blue-500' })],
    //         ),
    //         h(
    //           'button',
    //           {
    //             onClick: () => props.openAssignRole(row.original.uuid),
    //             class:
    //               'p-1 border border-gray-400 rounded text-white inline-flex items-center gap-2 cursor-pointer',
    //           },
    //           [h(Icon, { icon: 'oui:app-users-roles', class: 'text-blue-500' })],
    //         ),
    //       ],
    //     ),
    // },
  ];
  return orgDepartmentTableCols;
}
