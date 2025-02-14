<script setup lang="ts">
import type { TeamMemberInterface } from '@/lib/data/team'
import HmpTeamMember from './hmp-team-member.vue'

defineOptions({
  layout: 'default',
  middleware: 'auth',
})
defineProps<{ members: TeamMemberInterface[] }>()
</script>
<template>
  <div>
    <!-- Our team -->
    <section class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center">
          <h2 class="text-3xl font-bold">Our Team</h2>
          <p class="text-dark/50">Meet the team behind Pay X</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div v-for="member in members" class="bg-white border shadow-lg p-4 rounded-lg">
            <HmpTeamMember v-bind="member" :key="member.name" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
