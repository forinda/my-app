import { type Table as TTableType, flexRender } from '@tanstack/react-table';
import { css } from 'styled-system/css';
import { Table } from './ui/table';

type DataTableProps<T> = {
  table: TTableType<T>;
};

const tableProps: Table.RootProps = {
  // color: 'gray.7',
  fontSmooth: 'large',
  outline: 'ActiveBorder',
};
export default function DataTable<T = unknown>({ table }: DataTableProps<T>) {
  return (
    <Table.Root
      {...tableProps}
      className={css({
        display: 'table',
        width: 'full',
        borderCollapse: 'collapse',
        borderSpacing: 0,
      })}
    >
      <Table.Head>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row
            key={headerGroup.id}
            className={css({
              backgroundColor: 'gray.100',
              textAlign: 'left',
              fontSize: 'xs',
              fontWeight: 'medium',
              color: 'gray.500',
              textTransform: 'uppercase',
              letterSpacing: 'wider',
              border: '1px solid',
            })}
          >
            {headerGroup.headers.map((header) => (
              <Table.Header
                key={header.id}
                colSpan={header.colSpan}
                className={css({
                  paddingX: 6,
                  paddingY: 3,
                  border: '1px solid',
                  backgroundColor: 'gray.50',
                  color: 'gray.500',
                  textAlign: 'left',
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  textTransform: 'uppercase',
                  letterSpacing: 'wider',
                })}
              >
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </Table.Header>
            ))}
          </Table.Row>
        ))}
      </Table.Head>
      <Table.Body
        className={css({
          backgroundColor: 'white',
          divideY: 'divide-gray-200',
        })}
      >
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              className={css({
                border: '1px solid',
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  className={css({
                    paddingX: 6,
                    paddingY: 4,
                    whiteSpace: 'nowrap',
                    fontSize: 'sm',
                    color: 'gray.700',
                    border: '1px solid',
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell
              className={css({
                paddingX: 6,
                paddingY: 4,
                whiteSpace: 'nowrap',
                fontSize: 'sm',
                color: 'gray.700',
                border: '1px solid',
              })}
              colSpan={table.getAllColumns().length}
            >
              No data available
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
