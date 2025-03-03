import { useMemo } from 'react';
import { Link } from 'react-router';
import type { MockSidebarLinkItem } from '~/lib/data/mock-sidebar-links';
import { Icon } from '@iconify/react';
import { Accordion } from '../ui/accordion';
import { css } from 'styled-system/css';

type Props = {
  item: MockSidebarLinkItem;
};

export default function MockSidebarItem({ item }: Props) {
  const hasChildren = useMemo(
    () => item.children && item.children.length > 0,
    [item.children]
  );

  return hasChildren ? (
    <li className={css({ listStyle: 'none' })}>
      <Accordion.Root multiple className={css({ border: 'none' })}>
        <Accordion.Item
          value={item.title}
          className={css({
            border: 'none',
            bg: 'transparent',
            width: '100%',
          })}
        >
          <Accordion.ItemTrigger
            className={css({
              display: 'flex',
              alignItems: 'center',
              paddingX: 3,
              paddingY: 2,
              border: 'none',
              borderRadius: 'md',
              color: 'gray.7',
              fontWeight: 'medium',
              fontSize: 'md',
              cursor: 'pointer',
              transition: 'all 0.3s',
              _hover: {
                bg: 'gray.1',
                color: 'gray.9',
              },
            })}
          >
            {item.icon && (
              <Icon
                icon={item.icon!}
                className={css({ mr: 2, fontSize: '1.2rem' })}
              />
            )}
            {item.title}
            <Accordion.ItemIndicator asChild className={css({ ml: 'auto' })}>
              <Icon icon="akar-icons:chevron-down" />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent
            className={css({
              overflow: 'hidden',
              transition: 'height 0.3s ease',
              border: 'none',
              pl: 2, // Indent sub-items
            })}
          >
            <ul className={css({ listStyle: 'none', padding: 0, margin: 0 })}>
              {item.children?.map((child) => (
                <MockSidebarItem key={child.title} item={child} />
              ))}
            </ul>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </li>
  ) : (
    <li className={css({ listStyle: 'none' })}>
      <Link
        to={item.href}
        className={css({
          display: 'flex',
          alignItems: 'center',
          paddingX: 3,
          paddingY: 2,
          border: 'none',
          borderRadius: 'md',
          textDecoration: 'none',
          color: 'gray.7',
          fontWeight: 'medium',
          fontSize: 'md',
          transition: 'all 0.3s',
          _hover: {
            bg: 'gray.1',
            color: 'gray.9',
          },
        })}
      >
        {item.icon && (
          <Icon
            icon={item.icon!}
            className={css({ mr: 2, fontSize: '1.2rem' })}
          />
        )}
        {item.title}
      </Link>
    </li>
  );
}
