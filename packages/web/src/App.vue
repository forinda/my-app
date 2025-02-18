<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
</script>

<template>
  <PrimeToast class="text-red-500" />
  <router-view />
  <VueQueryDevtools />
</template>
