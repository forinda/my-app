import type { ColumnDef } from '@tanstack/react-table';
import type { FetchDepartmentTitleResponseType } from '../types/org';

// const colHelper = createColumnHelper<FetchDepartmentTitleResponseType['data'][number]>()
type DeptTitleType = FetchDepartmentTitleResponseType['data'][number];
type Props = {
  editDepartmentTitle: (row: DeptTitleType) => void;
  deleteDepartmentTitle: (row: DeptTitleType['id']) => void;
};
export function getDepartmentTitleCols(props: Props) {
  const departmentTitleTableCols: ColumnDef<DeptTitleType>[] = [
    {
      cell: (row) => row.row.index + 1,
      header: 'Index',
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
    //             onClick: () => props.editDepartmentTitle(row.original),
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
  return departmentTitleTableCols;
}
