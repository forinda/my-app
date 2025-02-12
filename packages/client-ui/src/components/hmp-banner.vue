<script setup lang="ts"></script>
<template>
  <section class="max-w-7xl mx-auto grid grid-cols-2 min-h-[50vh] items-center">
    <div class="flex flex-col gap-4">
      <h1 class="text-6xl font-bold">
        <span class="text-primary">Manage</span> your employees, tasks, projects
        and
        <span class="text-danger capitalize underline italic">payroll</span> in
        one place
      </h1>
      <p class="text-dark/50">
        We help you manage your employees, tasks, and projects in one place. A
        well crafted payroll management system.
      </p>
      <button
        class="text-light bg-primary px-4 py-2 rounded w-fit text-lg inline-flex items-center space-x-2"
      >
        <icon :name="'lucide-circle-play'" class="h-6 w-6" />
        <span> Request a demo </span>
      </button>
    </div>
    <div class="ralative overflow-hidden">
      <img
        src="~/assets/img/banner-user.png"
        alt="Banner"
        class="object-contain left-0 top-0 right-0"
      />
    </div>
  </section>
</template>

<style scoped></style>
