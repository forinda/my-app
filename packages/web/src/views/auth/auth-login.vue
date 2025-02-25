<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { loginUserSchema, type LoginUserSchemaType } from '@/schema/login-schema'
import type { FormSubmitEvent } from '@primevue/forms'
import { useToast } from 'primevue/usetoast'
import type { TsFixMeType } from '@/types/utils'
const auth = useAuthStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const resolver = zodResolver(loginUserSchema)

const submit = async (ev: FormSubmitEvent) => {
  try {
    if (!ev.valid) {
      toast.add(
        {
          severity: 'error',
          detail: 'Please fix the errors in the form',
          life: 5000,
          summary: 'Submission Error',
        },
      )
      return
    }
    loading.value = true
    const vals  = ev.values as LoginUserSchemaType
    auth.loginUser(vals, {
    onSuccess: async (data: TsFixMeType) => {
      // await $swal.fire({
      //   title: 'Success',
      //   text: data.message,
      //   icon: 'success',
      // })
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: data.message,
        life: 5000,
      })
      await router.push({ name: 'organizations-list' })
    },
    onError: async (error) => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 5000,
      })
    },
  })

    // Add your login logic here
    await router.push({ name: 'organizations-list' })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <PrimeToast />
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Welcome back</h1>
        <p class="text-gray-600 text-center">Sign in to access your account</p>
      </div>

      <PrimeForm @submit="submit" :resolver class="space-y-6" v-slot="$form">
        <!-- Email / Username / Phone -->
        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email / Username / Phone
          </label>
          <InputText
            id="email"
            name="emailOrUsername"
            type="text"
            autocomplete="email"
            placeholder="e.g example@gmail.com"
            class="p-inputtext w-full h-11 text-base"
            aria-required="true"
          />
          <Message
            v-if="$form.emailOrUsername?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.emailOrUsername.error.message }}</Message
          >
        </div>

        <!-- Password -->
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <div class="relative">
            <PrimePassword
              id="password"
              name="password"
              placeholder="Enter your password"
              :feedback="true"
              :toggleMask="true"
              class="w-full password-custom"
              aria-required="true"
              autocomplete="current-password"
              :pt="{
                input: { class: 'h-11 text-base' },
                panel: { class: 'p-password-overlay' },
                meter: { class: 'p-password-meter' },
                meterLabel: { class: 'p-password-meter-label' },
              }"
            />
            <PrimeMessage
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              <ul class="my-0 px-4 flex flex-col gap-1">
                <li v-for="(error, index) of $form.password.errors" :key="index">
                  {{ error.message }}
                </li>
              </ul>
            </PrimeMessage>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <PrimeCheckbox
              id="rememberMe"
              name="rememberMe"
              binary
              class="mr-2"
              aria-label="Remember me"
            />
            <label for="rememberMe" class="text-sm text-gray-600"> Remember me </label>
          </div>
          <router-link
            to="/auth/forgot-password"
            class="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Forgot password?
          </router-link>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          :loading="loading"
          :disabled="loading"
          class="w-full h-11 text-base font-medium"
        >
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </Button>

        <!-- Signup Link -->
        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/auth/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Create an account
          </router-link>
        </p>
      </PrimeForm>
    </div>
  </main>
</template>

<style>
:root {
  --p-password-meter-background: #e5e7eb;
  --p-password-meter-border-radius: 0.375rem;
  --p-password-meter-height: 0.5rem;
  --p-password-icon-color: #6b7280;
  --p-password-overlay-background: white;
  --p-password-overlay-border-color: #e5e7eb;
  --p-password-overlay-border-radius: 0.5rem;
  --p-password-overlay-color: #374151;
  --p-password-overlay-padding: 1rem;
  --p-password-overlay-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --p-password-content-gap: 0.5rem;
  --p-password-strength-weak-background: #ef4444;
  --p-password-strength-medium-background: #f59e0b;
  --p-password-strength-strong-background: #22c55e;
}

.password-custom {
  width: 100%;
}

.password-custom .p-password-input {
  width: 100%;
}

.p-password-panel {
  margin-top: 0.5rem;
}

.p-password-meter {
  margin: 0.5rem 0;
}

/* Improve password strength meter visibility */
.p-password-meter .p-password-strength {
  height: var(--p-password-meter-height);
  border-radius: var(--p-password-meter-border-radius);
  transition: all 0.2s ease;
}

/* Focus styles */
.p-inputtext:focus {
  box-shadow:
    0 0 0 2px #e5e7eb,
    0 0 0 4px var(--primary-color);
  border-color: var(--primary-color);
}
</style>
