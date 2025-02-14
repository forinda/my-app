<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
const auth = useAuthStore()
const router = useRouter()
onMounted(async () => {
  await auth.logout()
  await router.push({ name: 'auth-login' })
})
</script>

<style scoped></style>
