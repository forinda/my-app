<script setup lang="ts">
import type { TeamMemberInterface } from '@/lib/data/team'
import { Icon } from '@iconify/vue'
defineProps<TeamMemberInterface>()
</script>
<template>
  <div class="flex flex-col">
    <img :src="image" alt="Team Member" class="" />
    <div>
      <h3 class="text-xl font-bold">{{ name }}</h3>
      <p class="text-dark/50">{{ role }}</p>
      <div v-if="Object.keys(social ?? {}).length > 0" class="flex gap-4 mt-4">
        <a
          :href="url"
          v-for="url in social"
          :key="url"
          class="text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :icon="url!" class="h-6 w-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
