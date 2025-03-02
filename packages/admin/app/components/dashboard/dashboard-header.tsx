import { css } from 'styled-system/css';
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
        borderColor: 'gray.200',
        display: 'flex',
        alignItems: 'center',
        px: 4,
        bg: 'white',
        boxShadow: 'sm', // Add a subtle shadow for depth
      })}
    >
      {isMobile && (
        <Button
          variant="ghost"
          onClick={toggleMobileSidebar}
          className={css({ mr: 2, p: 2, borderRadius: 'md' })}
        >
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
        {/* Search Bar */}
        <div
          className={css({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '400px',
            width: '100%',
          })}
        >
          <Icon
            icon="lucide-search"
            className={css({
              position: 'absolute',
              left: 3,
              color: 'gray.500',
              zIndex: 1, // Ensure the icon is above the input
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
              borderColor: 'gray.200',
              borderRadius: 'lg', // Slightly larger border radius
              width: '100%',
              bg: 'gray.50', // Light background for the input
              _focus: {
                outline: 'none',
                borderColor: 'blue.500',
                boxShadow: '0 0 0 2px var(--colors-blue-100)', // Subtle focus shadow
              },
              _placeholder: {
                color: 'gray.400', // Lighter placeholder text
              },
            })}
          />
        </div>

        {/* Icons Section */}
        <div className={css({ ml: 'auto', display: 'flex', gap: 3 })}>
          {/* Notification Button */}
          <Button
            variant="ghost"
            className={css({
              position: 'relative',
              borderRadius: 'full',
              p: 2,
              _hover: {
                bg: 'gray.100', // Add hover effect
              },
            })}
          >
            <Icon icon="lucide-bell" width="20" height="20" />
            <span
              className={css({
                position: 'absolute',
                top: 1,
                right: 1,
                width: 2,
                height: 2,
                bg: 'red.500',
                borderRadius: 'full',
              })}
            />
          </Button>

          {/* User Button */}
          <Button
            variant="ghost"
            className={css({
              borderRadius: 'full',
              p: 2,
              _hover: {
                bg: 'gray.100', // Add hover effect
              },
            })}
          >
            <Icon icon="lucide-user" width="20" height="20" />
          </Button>
        </div>
      </div>
    </header>
  );
}
