<script setup lang="ts">
import type { DashboardSidebarMenuItem } from '~/types/dash';

const props = defineProps<{
  item: DashboardSidebarMenuItem;
  isSidebarOpen: boolean;
  routePath: string;
  depth?: number;
}>();

const isOpen = ref(false);

const isActive = (item: DashboardSidebarMenuItem): boolean => {
  return (
    props.routePath === item.route
    // ||
    // (item.children! && item.children.some(isActive))
  );
};

const toggleOpen = () => {
  if (props.isSidebarOpen) {
    isOpen.value = !isOpen.value;
  }
};

const paddingLeft = computed(() => {
  return props.depth ? `${props.depth * 1}rem` : '1rem';
});
</script>

<template>
  <li class="mb-2">
    <nuxt-link
      v-if="!item.children"
      class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
      :to="item.route"
      :class="{ 'font-semibold bg-gray-200': isActive(item) }"
      :style="{ paddingLeft }"
    >
      <icon :name="item.icon" size="20" class="mr-3" />
      <span v-if="isSidebarOpen">{{ item.name }}</span>
    </nuxt-link>
    <div v-else>
      <div
        class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
        :class="{ 'font-semibold bg-gray-200': isActive(item) }"
        @click="toggleOpen"
        :style="{ paddingLeft }"
      >
        <icon :name="item.icon" size="20" class="mr-3" />
        <span v-if="isSidebarOpen">{{ item.name }}</span>
        <icon
          v-if="isSidebarOpen && item.children"
          :name="isOpen ? 'lucide-chevron-up' : 'lucide-chevron-down'"
          size="16"
          class="ml-auto"
        />
      </div>
      <ul v-if="isOpen && isSidebarOpen" class="ml-4">
        <org-sidebar-menu-item
          v-for="child in item.children"
          :key="child.name"
          :item="child"
          :is-sidebar-open="isSidebarOpen"
          :route-path="routePath"
          :depth="(depth || 0) + 1"
        />
      </ul>
    </div>
  </li>
</template>
