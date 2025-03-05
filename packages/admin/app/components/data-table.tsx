'use client';

import { type Table as TTableType, flexRender } from '@tanstack/react-table';
import { css } from 'styled-system/css';
import { Table } from './ui/table';
import { Text } from './ui/text';
import { Icon } from '@iconify/react';
import { Button } from './ui/button';
import { useState } from 'react';
import DataTableHeader from './data-table-header';

type DataTableProps<T> = {
  table: TTableType<T>;
};

export default function DataTable<T = unknown>({ table }: DataTableProps<T>) {
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);

  return (
    <div
      className={css({
        fontFamily: 'sans',
        maxWidth: '100%',
        overflow: 'hidden',
        borderRadius: 'xl',
        boxShadow: 'lg',
        backgroundColor: 'white',
      })}
    >
      {/* Column Visibility Toggle */}
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '3',
          backgroundColor: 'gray.50',
        })}
      >
        <Button
          onClick={() => setIsColumnSelectorOpen(!isColumnSelectorOpen)}
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'gray.12',
            backgroundColor: 'white',
            borderRadius: 'md',
            padding: '2',
            boxShadow: 'sm',
            _hover: {
              backgroundColor: 'gray.5',
            },
            transition: 'all 0.2s',
          })}
        >
          <Icon icon="carbon:column" />
          Columns
        </Button>
      </div>

      {/* Column Selector Dropdown */}
      {isColumnSelectorOpen && (
        <div
          className={css({
            margin: '2',
            padding: '4',
            borderRadius: 'lg',
            backgroundColor: 'white',
            boxShadow: 'md',
            border: '1px solid',
            borderColor: 'gray.200',
            maxWidth: '300px',
            position: 'absolute',
            right: '4',
            zIndex: '10',
          })}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3',
              paddingBottom: '2',
              borderBottom: '1px solid',
              borderColor: 'gray.200',
            })}
          >
            <Text
              className={css({ fontWeight: 'semibold', color: 'gray.800' })}
            >
              Toggle Columns
            </Text>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '2',
              })}
            >
              <input
                type="checkbox"
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
                className={css({
                  accentColor: 'primary.500',
                  width: '4',
                  height: '4',
                })}
              />
              <span className={css({ fontSize: 'sm', color: 'gray.700' })}>
                All
              </span>
            </label>
          </div>
          <div
            className={css({
              display: 'grid',
              gap: '2',
            })}
          >
            {table
              .getAllLeafColumns()
              .map(
                ({
                  id,
                  getIsVisible,
                  getToggleVisibilityHandler,
                  getCanHide,
                }) => (
                  <label
                    key={id}
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2',
                      borderRadius: 'md',
                      cursor: 'pointer',
                      _hover: {
                        backgroundColor: 'gray.50',
                      },
                      gap: '2',
                    })}
                  >
                    <input
                      type="checkbox"
                      checked={getIsVisible()}
                      disabled={!getCanHide()}
                      onChange={getToggleVisibilityHandler()}
                      className={css({
                        accentColor: 'primary.5',
                        width: '4',
                        height: '4',
                      })}
                    />
                    <span className={css({ fontSize: 'sm', color: 'gray.7' })}>
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </span>
                  </label>
                )
              )}
          </div>
        </div>
      )}

      {/* Main Table */}
      <Table.Root
        className={css({
          width: 'full',
          borderCollapse: 'collapse',
          borderSpacing: 0,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'gray.2',
        })}
      >
        <DataTableHeader table={table} />
        <Table.Body>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <Table.Row
                key={row.id}
                className={css({
                  backgroundColor: index % 2 === 0 ? 'white' : 'gray.5',
                  _hover: {
                    backgroundColor: 'gray.1',
                  },
                  transition: 'background-color 0.2s',
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    className={css({
                      padding: '4',
                      fontSize: 'sm',
                      color: 'gray.12',
                      border: '1px solid',
                      borderColor: 'gray.8',
                      verticalAlign: 'middle',
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
                  padding: '6',
                  textAlign: 'center',
                  color: 'gray.5',
                  fontSize: 'sm',
                  borderBottom: '1px solid',
                  borderColor: 'gray.2',
                })}
                colSpan={table.getAllColumns().length}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2',
                    padding: '8',
                  })}
                >
                  <Icon
                    icon="carbon:data-table"
                    className={css({
                      fontSize: '3xl',
                      color: 'gray.12',
                    })}
                  />
                  <Text className={css({ fontWeight: 'medium' })}>
                    No data available
                  </Text>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {/* Pagination and Info Footer */}
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '3',
          marginTop: '2',
          backgroundColor: 'gray.2',
          borderTop: '1px solid',
          borderColor: 'gray.2',
          fontSize: 'sm',
          color: 'gray.12',
        })}
      >
        <div>{table.getRowModel().rows.length} rows</div>
        <div
          className={css({
            display: 'flex',
            gap: '2',
          })}
        >
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className={css({
              padding: '2',
              minWidth: 'auto',
              backgroundColor: 'white',
              borderRadius: 'md',
              boxShadow: 'sm',
              _hover: {
                backgroundColor: 'gray.50',
              },
              _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed',
              },
              transition: 'all 0.2s',
            })}
          >
            <Icon icon="lucide:chevron-left" />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className={css({
              padding: '2',
              minWidth: 'auto',
              backgroundColor: 'white',
              borderRadius: 'md',
              boxShadow: 'sm',
              _hover: {
                backgroundColor: 'gray.50',
              },
              _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed',
              },
              transition: 'all 0.2s',
            })}
          >
            <Icon icon="lucide:chevron-right" />
          </Button>
        </div>
      </div>
    </div>
  );
}
