'use client';

import type { Column, Table } from '@tanstack/react-table';
import { css } from 'styled-system/css';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

type TableFilterProps<T> = {
  column: Column<T, unknown>;
  table: Table<T>;
};

export default function TableFilter<T>({ column, table }: TableFilterProps<T>) {
  const [filterValue, setFilterValue] = useState<string>(
    (column.getFilterValue() as string) ?? ''
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      column.setFilterValue(filterValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filterValue, column]);

  return (
    <div
      className={css({
        position: 'relative',
        width: 'full',
        maxWidth: '200px',
      })}
    >
      <div
        className={css({
          position: 'absolute',
          left: '2',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'gray.400',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <Icon icon="lucide:search" className={css({ fontSize: 'sm' })} />
      </div>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className={css({
          width: 'full',
          paddingY: '1.5',
          paddingLeft: '7',
          paddingRight: '2',
          fontSize: 'xs',
          borderRadius: 'md',
          border: '1px solid',
          borderColor: 'gray.300',
          backgroundColor: 'white',
          outline: 'none',
          _focus: {
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px var(--colors-primary-500)',
          },
          _placeholder: {
            color: 'gray.400',
          },
          transition: 'all 0.2s',
        })}
      />
      {filterValue && (
        <button
          onClick={() => {
            setFilterValue('');
            column.setFilterValue('');
          }}
          className={css({
            position: 'absolute',
            right: '2',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'gray.400',
            _hover: {
              color: 'gray.600',
            },
            transition: 'color 0.2s',
          })}
        >
          <Icon icon="lucide:x" className={css({ fontSize: 'xs' })} />
        </button>
      )}
    </div>
  );
}
