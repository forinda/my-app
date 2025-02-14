<script setup lang="ts">
import HmpBanner from '@/components/hmp/hmp-banner.vue'
import HmpWhyChoice from '@/components/hmp/hmp-why-choice.vue'
import HmpTeam from '@/components/hmp/hmp-team.vue'
import { teamMembers } from '@/lib/data/team'
</script>
<template>
  <hmp-banner />
  <hmp-why-choice />
  <hmp-team :members="teamMembers" />
</template>

<style scoped></style>
