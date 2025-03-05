import { flexRender, type Table as TanTable } from '@tanstack/react-table';
import { Table } from './ui/table';
import { css } from 'styled-system/css';
import TableFilter from './table-filter';
import { Icon } from '@iconify/react';
import { Button } from './ui/button';
type Props = {
  table: TanTable<any>;
};

export default function DataTableHeader({ table }: Props) {
  const sortIcons = (type: string) =>
    ({
      asc: (
        <Icon
          icon="hugeicons:sort-by-up-02"
          className={css({ color: 'primary.10' })}
        />
      ),
      desc: (
        <Icon
          icon="hugeicons:sorting-01"
          className={css({ color: 'primary.10' })}
        />
      ),
    }[type] ?? (
      <Icon icon="basil:sort-solid" className={css({ color: 'gray.8' })} />
    ));
  return (
    <Table.Head>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row
          key={headerGroup.id}
          className={css({
            backgroundColor: 'gray.2',
            borderBottom: '1px solid',
            borderColor: 'gray',
            border: '1px solid',
          })}
        >
          {headerGroup.headers.map((header) => (
            <Table.Header
              key={header.id}
              colSpan={header.colSpan}
              className={css({
                padding: 4,
                textAlign: 'left',
                fontSize: 'xs',
                fontWeight: 'semibold',
                color: 'gray.12',
                textTransform: 'uppercase',
                letterSpacing: 'wider',
                border: '1px solid',
                borderColor: 'gray.8',
                position: 'relative',
                whiteSpace: 'nowrap',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  gap: '2',
                  alignItems: 'center',
                })}
              >
                <div
                  className={css({
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2',
                  })}
                >
                  {!header.isPlaceholder && (
                    <div
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1',
                      })}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                  {header.column.getCanFilter() ? (
                    <div
                      className={css({
                        marginTop: '2',
                      })}
                    >
                      <TableFilter column={header.column} table={table} />
                    </div>
                  ) : null}
                </div>
                {header.column.getCanSort() && (
                  <Button
                    variant={'ghost'}
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Sort ascending'
                          : header.column.getNextSortingOrder() === 'desc'
                          ? 'Sort descending'
                          : 'Clear sort'
                        : undefined
                    }
                    className={css({
                      padding: '1',
                      minWidth: 'auto',
                      height: 'auto',
                      color: header.column.getIsSorted()
                        ? 'primary.500'
                        : 'gray.400',
                      _hover: {
                        backgroundColor: 'gray.100',
                        color: 'primary.600',
                      },
                      transition: 'all 0.2s',
                    })}
                  >
                    {sortIcons(header.column.getIsSorted() as string)}
                  </Button>
                )}
              </div>
            </Table.Header>
          ))}
        </Table.Row>
      ))}
    </Table.Head>
  );
}
