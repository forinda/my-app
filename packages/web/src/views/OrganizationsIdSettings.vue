<script setup lang="ts">

</script>
<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Settings</h2>

    <div class="mb-4">
      <label class="block font-semibold">Company Name</label>
      <input type="text" class="w-full border p-2 rounded" placeholder="Enter company name" />
    </div>

    <div class="mb-4">
      <label class="block font-semibold">Task Management Settings</label>
      <div class="flex items-center mt-2">
        <input type="checkbox" id="enable-tasks" class="mr-2" />
        <label for="enable-tasks">Enable Task Management</label>
      </div>
    </div>

    <div class="mb-4">
      <label class="block font-semibold">Payroll Settings</label>
      <input type="number" class="w-full border p-2 rounded" placeholder="Enter payroll cycle in days" />
    </div>

    <button class="bg-blue-500 text-white px-4 py-2 rounded">
      Save Settings
    </button>
  </div>
</template>

<style scoped></style>
