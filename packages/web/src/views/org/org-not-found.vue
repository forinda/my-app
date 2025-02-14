<template>
  <div class="h-screen flex flex-col items-center justify-center text-gray-700">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="text-lg mt-2">Oops! Page not found.</p>
    <router-link
      :to="{ name: 'organization-id' }"
      class="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
    >
      Go Back to Dashboard
    </router-link>
  </div>
</template>
