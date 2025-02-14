<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { Icon } from '@iconify/vue'
import {
  Menu as HuiMenu,
  MenuButton as HuiMenuButton,
  MenuItems as HuiMenuItems,
  MenuItem as HuiMenuItem,
} from '@headlessui/vue'
const { user } = useAuthStore()
const profileLinks = [
  {
    name: 'Profile',
    href: '/profile',
    icon: 'lucide-user',
  },
  {
    name: 'Setting',
    href: '/settings',
    icon: 'lucide-settings',
  },
  {
    name: 'Logout',
    href: '/auth/logout',
    icon: 'lucide-log-out',
  },
]
const notifications = [
  {
    title: 'New User',
    description: 'A new user has been added to the system',
    icon: 'lucide-user-plus',
  },
  {
    title: 'New User',
    description: 'A new user has been added to the system',
    icon: 'lucide-user-plus',
  },
  {
    title: 'New User',
    description: 'A new user has been added to the system',
    icon: 'lucide-user-plus',
  },
  {
    title: 'New User',
    description: 'A new user has been added to the system',
    icon: 'lucide-user-plus',
  },
]
</script>
<template>
  <header class="bg-white shadow-sm w-full px-4">
    <div class="py-4 flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold leading-tight text-gray-900">Dashboard</h2>
      </div>
      <div class="flex items-center">
        <div class="flex items-center bg-gray-100 rounded-lg p-2">
          <Icon icon="lucide-search" class="h-6 w-6 mr-2 text-gray-400" />
          <input
            type="text"
            class="border-none focus:outline-none bg-transparent"
            placeholder="Search..."
          />
        </div>
        <div class="ml-4 relative">
          <hui-menu as="div" class="relative">
            <hui-menu-button class="flex items-center space-x-2">
              <Icon icon="lucide-bell" class="h-6 w-6 text-gray-400" />
            </hui-menu-button>
            <hui-menu-items
              class="bg-white p-4 absolute top-12 right-0 w-fit min-w-64 flex flex-col border shadow-lg z-[1000]"
            >
              <hui-menu-item
                v-for="item in notifications"
                as="div"
                class="p-2 w-full flex flex-col space-y-2 hover:bg-dark/10"
              >
                <div class="text-dark w-full flex items-center space-x-2" :key="item.title">
                  <Icon :icon="item.icon" class="h-4 w-4" />
                  <div>
                    <h3 class="text-sm font-medium">{{ item.title }}</h3>
                    <p class="text-xs text-gray-500">{{ item.description }}</p>
                  </div>
                </div>
              </hui-menu-item>
            </hui-menu-items>
          </hui-menu>
        </div>
        <div class="ml-4 relative">
          <hui-menu as="div" class="relative">
            <hui-menu-button class="flex items-center space-x-2">
              <img :src="user?.avatar" class="h-8 w-8 rounded-full border bg-gray-400" />
              <Icon icon="lucide-chevron-down" class="h-4 w-4 text-primary" />
            </hui-menu-button>
            <hui-menu-items
              class="bg-white p-4 absolute top-12 right-0 w-fit min-w-64 flex flex-col border shadow-lg z-[10000]"
            >
              <hui-menu-item
                class="p-2 w-full flex items-center space-x-2 text-primary cursor-pointer"
                as="div"
              >
                @{{ user?.first_name + ' ' + user?.last_name }}
              </hui-menu-item>
              <hui-menu-item
                v-for="item in profileLinks"
                as="div"
                class="p-2 w-full flex flex-col space-y-2 hover:bg-dark/10"
              >
                <router-link
                  :to="item.href"
                  class="text-dark w-full flex items-center gap-2"
                  :key="item.href"
                >
                  <Icon :icon="item.icon" class="h-4 w-4" />
                  {{ item.name }}
                </router-link>
              </hui-menu-item>
            </hui-menu-items>
          </hui-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
