<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
const route = useRoute()
type NavLink = {
  name: string
  href: string
  children?: NavLink[]
}
const isMega = computed(() => props.children && props.children.length > 0)
const isCurrent = computed(() => route.path === props.href)
const props = defineProps<NavLink>()
</script>
<template>
  <div>
    <router-link
      :to="props.href"
      class="text-dark/50"
      v-if="!isMega"
      :class="isCurrent ? 'text-primary' : 'text-dark'"
      >{{ props.name }}</router-link
    >
    <Menu v-else as="div" class="relative">
      <menu-button class="flex items-center space-x-2 cursor-pointer">
        <span>{{ props.name }}</span>
        <Icon icon="lucide-chevron-down" class="h-4 w-4 text-primary" />
      </menu-button>
      <menu-items
        class="bg-white p-4 absolute top-12 right-0 w-fit min-w-64 flex flex-col border shadow-lg"
      >
        <menu-item
          v-for="child in props.children"
          as="div"
          class="p-2 w-full flex flex-col space-y-2 hover:bg-dark/10"
        >
          <router-link :to="child.href" class="text-dark w-full" :key="child.href">{{
            child.name
          }}</router-link>
        </menu-item>
      </menu-items>
    </Menu>
  </div>
</template>

<style scoped></style>
