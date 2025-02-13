<script setup lang="ts">
import HmpBanner from '@/components/HmpBanner.vue'
import HmpWhyChoice from '@/components/HmpWhyChoice.vue'
import HmpTeam from '@/components/HmpTeam.vue'
import { teamMembers } from '@/lib/data/team'
</script>
<template>
  <hmp-banner />
  <hmp-why-choice />
  <hmp-team :members="teamMembers" />
</template>

<style scoped></style>
