import { Menu } from '../ui/menu';
import { Button } from '../ui/button';
import { HStack } from 'styled-system/jsx';
import { Text } from '../ui/text';
import { Icon } from '@iconify/react';
import { css } from 'styled-system/css';
import { Avatar } from '../ui/avatar';

export default function DashboardHeaderUserProfile() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className={css({
            p: 2,
            color: 'fg.subtle',
            _focus: { border: 'none', outline: 'none' },
            position: 'relative',
          })}
        >
          <Avatar src="https://i.pravatar.cc/300" />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content
          className={css({
            color: 'fg.default',
          })}
        >
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>My Account</Menu.ItemGroupLabel>
            <Menu.Separator />
            <Menu.Item value="profile">
              <HStack gap="6" justify="space-between" flex="1">
                <HStack gap="2">
                  {/* <UserIcon /> */}
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
                {/* <CreditCardIcon />  */}
                <Icon icon="bi:credit-card-fill" width="20" height="20" />
                Billing
              </HStack>
            </Menu.Item>
            <Menu.Item value="settings">
              <HStack gap="6" justify="space-between" flex="1">
                <HStack gap="2">
                  {/* <SettingsIcon />  */}
                  <Icon icon="bi:gear-fill" width="20" height="20" />
                  Settings
                </HStack>
                <Text as="span" color="fg.subtle" size="sm">
                  ⌘,
                </Text>
              </HStack>
            </Menu.Item>
            <Menu.Root positioning={{ placement: 'right-start', gutter: -2 }}>
              <Menu.TriggerItem justifyContent="space-between">
                <HStack gap="2">
                  {/* <UserPlusIcon /> */}
                  <Icon icon="akar-icons:user-add" width="20" height="20" />
                  Invite member
                </HStack>
                {/* <ChevronRightIcon /> */}
                <Icon icon="akar-icons:chevron-right" width="20" height="20" />
              </Menu.TriggerItem>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="email">
                    <HStack gap="2">
                      {/* <MailIcon />  */}
                      <Icon icon="arcticons:mail" width="20" height="20" />
                      Email
                    </HStack>
                  </Menu.Item>
                  <Menu.Item value="message">
                    <HStack gap="2">
                      {/* <MessageSquareIcon />  */}
                      <Icon
                        icon="bi:chat-left-text-fill"
                        width="20"
                        height="20"
                      />
                      Message
                    </HStack>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="other">
                    <HStack gap="2">
                      {/* <PlusCircleIcon /> */}
                      <Icon icon="bi:plus-circle-fill" width="20" height="20" />
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
                <Icon icon="bi:box-arrow-right" width="20" height="20" />
                Logout
              </HStack>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
