<script setup lang="ts">
import { teamMembers } from '@/lib/data/team'
</script>
<template>
  <hmp-banner />
  <hmp-why-choice />
  <hmp-team :members="teamMembers" />
</template>

<style scoped></style>
