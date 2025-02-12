<script setup lang="ts">
const route = useRoute();
type NavLink = {
  name: string;
  href: string;
  children?: NavLink[];
};
const isMega = computed(() => props.children && props.children.length > 0);
const isCurrent = computed(() => route.path === props.href);
const props = defineProps<NavLink>();
</script>
<template>
  <div>
    <nuxt-link
      :to="props.href"
      class="text-dark/50"
      v-if="!isMega"
      :class="isCurrent ? 'text-primary' : 'text-dark'"
      >{{ props.name }}</nuxt-link
    >
    <hui-menu v-else as="div" class="relative">
      <hui-menu-button class="flex items-center space-x-2">
        <span>{{ props.name }}</span>
        <icon name="lucide-chevron-down" class="h-4 w-4 text-primary" />
      </hui-menu-button>
      <hui-menu-items
        class="bg-white p-4 absolute top-12 right-0 w-fit min-w-64 flex flex-col border shadow-lg"
      >
        <hui-menu-item
          v-for="child in props.children"
          as="div"
          class="p-2 w-full flex flex-col space-y-2 hover:bg-dark/10"
        >
          <nuxt-link
            :to="child.href"
            class="text-dark w-full"
            :key="child.href"
            >{{ child.name }}</nuxt-link
          >
        </hui-menu-item>
      </hui-menu-items>
    </hui-menu>
  </div>
</template>

<style scoped></style>
