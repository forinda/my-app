<template>
  <div class="p-fluid">
    <label for="emailChips">Invite Users (Enter emails)</label>
    <Chips
      id="emailChips"
      v-model="emails"
      separator=","
      placeholder="Enter email addresses"
    />
    <div v-if="invalidEmails.length" class="error">
      Invalid email(s): {{ invalidEmails.join(', ') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Chips from 'primevue/chips';

const emails = ref([]);

// Simple email regex for basic validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Computed property that filters out any invalid emails
const invalidEmails = computed(() =>
  emails.value.filter(email => !emailRegex.test(email))
);
</script>

<style scoped>
.error {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>
