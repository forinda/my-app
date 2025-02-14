<template>
  <transition name="fade">
    <div class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="flex flex-col items-center">
        <div class="loader"></div>
        <p class="text-lg font-semibold mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts"></script>
<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Loader Animation */
.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #e0e0e0;
  border-top: 5px solid #3b82f6; /* Tailwind blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
