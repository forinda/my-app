<script setup lang="ts">
const { sessionUser } = await useAuth();
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
];
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
];
</script>
<template>
  <header class="bg-white shadow-sm">
    <div
      class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <div>
        <h2 class="text-2xl font-bold leading-tight text-gray-900">
          Dashboard
        </h2>
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
          <menu as="div" class="relative">
            <menu-button class="flex items-center space-x-2">
              <Icon icon="lucide-bell" class="h-6 w-6 text-gray-400" />
            </menu-button>
            <menu-items
              class="bg-white p-4 absolute top-12 right-0 w-fit min-w-64 flex flex-col border shadow-lg"
            >
              <menu-item
                v-for="item in notifications"
                as="div"
                class="p-2 w-full flex flex-col space-y-2 hover:bg-dark/10"
              >
                <div
                  class="text-dark w-full flex items-center space-x-2"
                  :key="item.title"
                >
                  <Icon :icon="item.icon" class="h-4 w-4" />
                  <div>
                    <h3 class="text-sm font-medium">{{ item.title }}</h3>
                    <p class="text-xs text-gray-500">{{ item.description }}</p>
                  </div>
                </div>
              </menu-item>
            </menu-items>
          </menu>
        </div>
        <div class="ml-4 relative">
          <menu as="div" class="relative">
            <menu-button class="flex items-center space-x-2">
              <img :src="sessionUser?.avatar" class="h-8 w-8 rounded-full" />
              <Icon icon="lucide-chevron-down" class="h-4 w-4 text-primary" />
            </menu-button>
            <menu-items
              class="bg-white p-4 absolute top-12 right-0 w-fit min-w-64 flex flex-col border shadow-lg"
            >
              <menu-item
                v-for="item in profileLinks"
                as="div"
                class="p-2 w-full flex flex-col space-y-2 hover:bg-dark/10"
              >
                <nuxt-link
                  :to="item.href"
                  class="text-dark w-full"
                  :key="item.href"
                >
                  <Icon :icon="item.icon" class="h-4 w-4" />
                  {{ item.name }}
                </nuxt-link>
              </menu-item>
            </menu-items>
          </menu>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
