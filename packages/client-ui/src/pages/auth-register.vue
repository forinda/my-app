<script setup lang="ts">
import { registerUserSchema } from '~/server/lib/validation-schemas/register-user.schema';
import type { CreateAccountResponseType } from '~/types/response';

definePageMeta({
  title: 'Create Account',
  description: 'Create account page description',
  layout: 'empty',
  middleware: 'no-auth',
});

const userSignupSchema = toTypedSchema(registerUserSchema);
const { $swal } = useNuxtApp();
const {
  public: { API_URL },
} = useRuntimeConfig();
const router = useRouter();
const submit = async (values: any) => {
  try {
    const data = await $fetch<CreateAccountResponseType>(
      API_URL + '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    await $swal.fire({
      title: 'Success',
      text: data.message,
      icon: 'success',
    });
    await router.push({ name: 'auth-login' });
  } catch (error: any) {
    const errmsg =
      error.response?._data?.message ?? error.message ?? 'An error occurred';

    await $swal.fire({
      title: 'Error',
      text: errmsg,
      icon: 'error',
    });
  }
};
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <Form
      action=""
      :validation-schema="userSignupSchema"
      @submit="submit"
      class="w-full max-w-xl border border-gray-300 rounded-md shadow-sm p-6 flex flex-col gap-4"
    >
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Create Account</h1>
        <p class="text-gray-500">Fill in the form to create an account</p>
      </div>
      <div class="grid md:grid-cols-1 gap-4">
        <form-text-input
          labelText="First Name"
          placeholder="e.g John"
          type="text"
          name="first_name"
          auto-complete="given-name"
        />

        <form-text-input
          labelText="Last Name"
          placeholder="e.g Doe"
          type="text"
          name="last_name"
          auto-complete="family-name"
        />

        <form-text-input
          labelText="Email"
          placeholder="e.g example@gmail.com"
          type="email"
          name="email"
          icon-name="lucide-mail"
        />
        <form-text-input
          label-text="Phone Number"
          placeholder="e.g 07012345678"
          type="phone"
          name="phone_number"
          icon-name="lucide-phone"
        />
        <form-text-input
          label-text="username"
          placeholder="e.g johndoe"
          type="text"
          name="username"
          icon-name="lucide-user"
          auto-complete="username"
        />
        <form-password-input
          label-text="Password"
          placeholder="Enter your password"
          name="password"
        />
      </div>
      <div>
        <button
          type="submit"
          class="btn bg-primary text-light px-4 py-2 rounded"
        >
          Create Account
        </button>
        <hr class="my-4" />
        <p class="text-gray-500 text-center">
          Already have an account?
          <nuxt-link to="/auth/login" class="text-primary">Login</nuxt-link>
        </p>
      </div>
    </Form>
  </div>
</template>

<style scoped></style>
