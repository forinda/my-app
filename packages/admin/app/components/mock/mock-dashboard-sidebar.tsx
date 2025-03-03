import { css } from 'styled-system/css';
import { useMockSidebar } from '~/hooks/use-mock-sidebar';
import { mockSidebarLinks } from '~/lib/data/mock-sidebar-links';
import MockSidebarItem from './mock-sidebar-item';
import { Menu } from '../ui/menu';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import { HStack } from 'styled-system/jsx';
import { Text } from '../ui/text';

export default function MockDashboardSidebar() {
  const { isCollapsed, toggleSidebar } = useMockSidebar();

  return (
    <nav
      className={css({
        width: isCollapsed ? 80 : 250,
        backgroundColor: 'var(--primary-color)',
        color: 'var(--light-color)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease-in-out',
        zIndex: 1025,
      })}
    >
      {/* Sidebar Header */}
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 4,
          paddingY: 3,
          borderBottom: '1px solid var(--light-color)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          height: '80px',
        })}
      >
        {!isCollapsed && <span>Dashboard</span>}
        <button
          onClick={toggleSidebar}
          className={css({
            background: 'none',
            border: 'none',
            color: 'var(--light-color)',
            cursor: 'pointer',
            fontSize: '1.5rem',
          })}
        >
          <Icon
            icon={
              isCollapsed
                ? 'akar-icons:chevron-right'
                : 'akar-icons:chevron-left'
            }
          />
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        className={css({
          flex: 1,
          overflowY: 'auto',
          paddingY: 4,
          scrollbar: 'hidden',
        })}
      >
        <ul
          className={css({
            listStyle: 'none',
            margin: 0,
            padding: 0,
            marginBottom: 5,
          })}
        >
          {mockSidebarLinks.map((link) => (
            <MockSidebarItem key={link.title} item={link} />
          ))}
        </ul>
        {/* User Profile Section */}
        <div
          className={css({
            // borderTop: '1px solid var(--light-color)',
            padding: 3,
            width: '100%',
          })}
        >
          <Menu.Root>
            <Menu.Trigger className={css({ width: '100%' })}>
              <Button
                className={css({
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  padding: 4,
                  borderRadius: 'md',
                  transition: 'background 0.3s',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--light-color)',
                  _hover: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  paddingY: 6,
                })}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/54212400?v=4"
                  alt="User Avatar"
                  className={css({
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    marginRight: 3,
                  })}
                />
                {!isCollapsed && (
                  <div
                    className={css({
                      display: 'flex',
                      flexDirection: 'column',
                    })}
                  >
                    <span className={css({ fontWeight: 'bold' })}>
                      John Doe
                    </span>
                    <span className={css({ fontSize: 'sm', opacity: 0.8 })}>
                      Admin
                    </span>
                  </div>
                )}
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content
                className={css({
                  width: 200,
                  backgroundColor: 'var(--light-color)',
                  color: 'var(--primary-color)',
                  borderRadius: 'md',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                })}
              >
                <Menu.ItemGroup>
                  <Menu.ItemGroupLabel>My Account</Menu.ItemGroupLabel>
                  <Menu.Separator />
                  <Menu.Item value="profile">
                    <HStack gap="6" justify="space-between" flex="1">
                      <HStack gap="2">
                        <Icon icon="bi:person-fill" width="20" height="20" />
                        Profile
                      </HStack>
                      <Text as="span" color="fg.subtle" size="sm">
                        ⇧⌘P
                      </Text>
                    </HStack>
                  </Menu.Item>
                  <Menu.Item value="billing">
                    <HStack gap="2">
                      <Icon icon="bi:credit-card-fill" width="20" height="20" />
                      Billing
                    </HStack>
                  </Menu.Item>
                  <Menu.Item value="settings">
                    <HStack gap="6" justify="space-between" flex="1">
                      <HStack gap="2">
                        <Icon icon="bi:gear-fill" width="20" height="20" />
                        Settings
                      </HStack>
                      <Text as="span" color="fg.subtle" size="sm">
                        ⌘,
                      </Text>
                    </HStack>
                  </Menu.Item>
                  <Menu.Root
                    positioning={{ placement: 'right-start', gutter: -2 }}
                  >
                    <Menu.TriggerItem justifyContent="space-between">
                      <HStack gap="2">
                        <Icon
                          icon="akar-icons:user-add"
                          width="20"
                          height="20"
                        />
                        Invite member
                      </HStack>
                      <Icon
                        icon="akar-icons:chevron-right"
                        width="20"
                        height="20"
                      />
                    </Menu.TriggerItem>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item value="email">
                          <HStack gap="2">
                            <Icon
                              icon="arcticons:mail"
                              width="20"
                              height="20"
                            />
                            Email
                          </HStack>
                        </Menu.Item>
                        <Menu.Item value="message">
                          <HStack gap="2">
                            {/* <MessageSquareIcon /> */}
                            <Icon
                              icon="hugeicons:message-unlock-01"
                              width="20"
                              height="20"
                            />
                            Message
                          </HStack>
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item value="other">
                          <HStack gap="2">
                            <Icon icon="ph:plus-thin" width="20" height="20" />
                            More Options...
                          </HStack>
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu.Root>
                  <Menu.Separator />
                  <Menu.Item value="logout">
                    <HStack gap="2">
                      {/* <LogOutIcon /> */}
                      <Icon icon="lucide-log-out" width="20" height="20" />
                      Logout
                    </HStack>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </div>
      </div>
    </nav>
  );
}
