import { css } from 'styled-system/css';
// import { Menu, Bell, Search, User } from "lucide-react"
import { useSidebar } from '~/providers/sidebar-context';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';

export function DashboardHeader() {
  const { isMobile, toggleMobileSidebar } = useSidebar();

  return (
    <header
      className={css({
        height: '64px',
        borderBottom: '1px solid',
        borderColor: 'gray.2',
        display: 'flex',
        alignItems: 'center',
        px: 4,
        bg: 'white',
      })}
    >
      {isMobile && (
        <Button
          variant="ghost"
          onClick={toggleMobileSidebar}
          className={css({ mr: 2 })}
        >
          {/* <Menu size={24} /> */}
          <Icon icon="lucide-menu" width="24" height="24" />
        </Button>
      )}

      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          gap: 4,
        })}
      >
        <div
          className={css({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '400px',
            width: '100%',
            // display: { base: 'none', md: 'flex' },
          })}
        >
          <Icon
            icon="lucide-search"
            className={css({
              position: 'absolute',
              left: 3,
              color: 'gray.5',
            })}
          />
          <input
            type="text"
            placeholder="Search..."
            className={css({
              pl: 10,
              pr: 4,
              py: 2,
              border: '1px solid',
              borderColor: 'gray.2',
              borderRadius: 'md',
              width: '100%',
              _focus: {
                outline: 'none',
                borderColor: 'blue.5',
                boxShadow: '0 0 0 1px var(--colors-blue-500)',
              },
            })}
          />
        </div>

        <div className={css({ ml: 'auto', display: 'flex', gap: 3 })}>
          <Button
            variant="ghost"
            className={css({
              position: 'relative',
              borderRadius: 'full',
              p: 2,
            })}
          >
            {/* <Bell size={20} /> */}
            <Icon icon="lucide-bell" width="20" height="20" />
            <span
              className={css({
                position: 'absolute',
                top: 0,
                right: 0,
                width: 2,
                height: 2,
                bg: 'red.5',
                borderRadius: 'full',
              })}
            />
          </Button>

          <Button
            variant="ghost"
            className={css({
              borderRadius: 'full',
              p: 2,
            })}
          >
            {/* <User size={20} /> */}
            <Icon icon="lucide-user" width="20" height="20" />
          </Button>
        </div>
      </div>
    </header>
  );
}
