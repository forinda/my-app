import { useMemo } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { Accordion } from '../ui/accordion';
import { css } from 'styled-system/css';
import type { MockSidebarProps } from '~/lib/types/mock-sidebar';
import { sidebarIconSize } from '~/lib/utils/sidebar-icon-size';
import { Tooltip } from '../ui/tooltip';

const triggerStyles = css({
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
});

const tooltipProps: Tooltip.RootProps = {
  positioning: { placement: 'right-end', strategy: 'fixed' },
};

export default function MockSidebarItem({
  item,
  isNavCollapsed,
}: MockSidebarProps) {
  const hasChildren = useMemo(
    () => item.children && item.children.length > 0,
    [item.children],
  );

  return hasChildren ? (
    <MockSidebarItemWithChildren item={item} isNavCollapsed={isNavCollapsed} />
  ) : (
    <MockSidebarItemWithoutChildren
      item={item}
      isNavCollapsed={isNavCollapsed}
    />
  );
}

function MockSidebarItemWithChildren({
  item,
  isNavCollapsed,
}: MockSidebarProps) {
  return (
    <li className={css({ listStyle: 'none' })}>
      <Accordion.Root multiple className={css({ border: 'none' })}>
        <Accordion.Item
          value={item.title}
          className={css({
            border: 'none',
            bg: 'transparent',
            width: '100%',
            cursor: 'pointer',
          })}
        >
          {isNavCollapsed ? (
            <Accordion.ItemTrigger className={triggerStyles}>
              <Tooltip.Root {...tooltipProps}>
                <Tooltip.Trigger
                  className={
                    css({
                      width: '100%',
                      cursor: 'pointer',
                    }) // Add your styles here
                  }
                >
                  <Icon
                    icon={item.icon!}
                    className={css({
                      mr: isNavCollapsed ? 0 : 2,
                      fontSize: '1.2rem',
                      ...sidebarIconSize(),
                    })}
                  />
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Arrow>
                    <Tooltip.ArrowTip />
                  </Tooltip.Arrow>
                  <Tooltip.Content>{item.title}</Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            </Accordion.ItemTrigger>
          ) : (
            <>
              <Accordion.ItemTrigger className={triggerStyles}>
                <Icon
                  icon={item.icon!}
                  className={css({
                    mr: isNavCollapsed ? 0 : 2,
                    fontSize: '1.2rem',
                    ...sidebarIconSize(),
                  })}
                />
                {isNavCollapsed ? null : item.title}
                {!isNavCollapsed && (
                  <Accordion.ItemIndicator
                    asChild
                    className={css({ ml: 'auto' })}
                  >
                    <Icon icon="akar-icons:chevron-down" />
                  </Accordion.ItemIndicator>
                )}
              </Accordion.ItemTrigger>
            </>
          )}

          <Accordion.ItemContent
            className={css({
              overflow: 'hidden',
              transition: 'height 0.3s ease',
              border: 'none',
              pl: isNavCollapsed ? 0 : 2, // Indent sub-items
            })}
          >
            <ul className={css({ listStyle: 'none', padding: 0, margin: 0 })}>
              {item.children?.map((child) => (
                <MockSidebarItem
                  key={child.title}
                  item={child}
                  isNavCollapsed={isNavCollapsed}
                />
              ))}
            </ul>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </li>
  );
}

function MockSidebarItemWithoutChildren({
  item,
  isNavCollapsed,
}: MockSidebarProps) {
  return (
    <li className={css({ listStyle: 'none' })}>
      {isNavCollapsed ? (
        <>
          <Tooltip.Root {...tooltipProps}>
            <Tooltip.Trigger>
              <Link
                to={item.href}
                className={triggerStyles}
                aria-label={item.title}
              >
                <Icon
                  icon={item.icon!}
                  className={css({
                    mr: isNavCollapsed ? 0 : 2,
                    fontSize: '1.2rem',
                    ...sidebarIconSize(),
                  })}
                />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              <Tooltip.Content>{item.title}</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>
        </>
      ) : (
        <>
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
            <Icon
              icon={item.icon!}
              className={css({
                mr: isNavCollapsed ? 0 : 2,
                fontSize: '1.2rem',
                ...sidebarIconSize(),
              })}
            />

            {
              // If the sidebar is collapsed, show only the icon
              !isNavCollapsed && item.title
            }
          </Link>
        </>
      )}
    </li>
  );
}
