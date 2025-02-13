<script setup lang="ts">
import { navlinks } from '@/data/nav';
import navBarItem from './nav-bar-item.vue';
</script>
<template>
  <div class="bg-white border-b py-4">
    <header class="flex items-center justify-between max-w-7xl mx-auto">
      <div class="text-2xl font-bold flex items-center capitalize space-x-2">
        <!-- <Icon icon="lucide-piggy-bank" class="h-8 w-8 text-primary" /> -->
        <span> pay X </span>
      </div>
      <div>
        <nav class="flex items-center space-x-4">
          <nav-bar-item v-for="navlink in navlinks" v-bind="navlink" />
        </nav>
      </div>
      <div class="items-center space-x-4">
        <router-link
          to="/auth/login"
          class="text-light bg-primary px-4 py-2 rounded"
          >Get Started</router-link
        >
      </div>
    </header>
  </div>
</template>

<style scoped></style>
