<template>
  <suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <loading />
    </template>
  </suspense>
</template>

<script setup lang="ts">
import loading from '@/components/loading-component.vue'
</script>

<style scoped></style>
