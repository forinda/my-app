<script setup lang="ts">
import { useAuth } from '@/composables/use-auth';
import { useRouter } from 'vue-router';
import { typedLoginUserSchema } from '@/schema/login-schema';
import { useNotification } from '@/composables/use-notification';
import { Field, Form } from 'vee-validate';
import FormPasswordInput from '@/components/FormPasswordInput.vue';
import FormTextInput from '@/components/FormTextInput.vue';
const router = useRouter();
const auth = useAuth();
const { $swal } = useNotification();

const submit = async (values: any) => {
  (auth).loginUser(values, {
    onSuccess: async (data: any) => {
      await $swal.fire({
        title: 'Success',
        text: data.message,
        icon: 'success',
      });
      await router.push({ name: 'organizations' });
    },
    onError: async (error: any) => {
      const errmsg = error.message ?? 'An error occurred';

      await $swal.fire({
        title: 'Error',
        text: errmsg,
        icon: 'error',
      });
    },
  });
};
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <Form action="" :validation-schema="typedLoginUserSchema" @submit="submit"
      class="w-full max-w-lg border border-gray-300 rounded-md shadow-sm p-6 flex flex-col gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Login</h1>
        <p class="text-gray-500">Fill in the form access your account</p>
      </div>
      <div class="gap-4 w-full">
        <form-text-input labelText="Email/username/Phone" placeholder="e.g example@gmail.com" type="text"
          name="emailOrUsername" auto-complete="given-name" />

        <form-password-input label-text="Password" placeholder="Enter your password" name="password" />
        <!-- <div class="flex items-center justify-between">
					<nuxt-link to="/auth/forgot-password" class="text-primary">
						Forgot Password?
					</nuxt-link>
					</div> -->
        <!-- Remember me -->
        <div class="flex items-center mt-2">
          <Field type="checkbox" name="rememberMe" id="rememberMe" class="form-checkbox h-4 w-4 text-primary" />
          <label for="rememberMe" class="ml-2 text-gray-500">
            Remember me
          </label>
        </div>
      </div>
      <div>
        <button type="submit" class="btn bg-primary text-light px-4 py-2 rounded">
          Login
        </button>
        <hr class="my-4" />
        <p class="text-gray-500 text-center">
          Don't have an account?
          <router-link to="/auth/register" class="text-primary">Create Account</router-link>
        </p>
      </div>
    </Form>
  </div>
</template>

<style scoped></style>
