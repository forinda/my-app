<script setup lang="ts">
import { typedCreateOrganizationSchema } from '~/server/lib/validation-schemas/create-organization-schema';

const emit = defineEmits<{
  (event: 'submit', values: any): void;
}>();
const handleSubmit = async (values: any) => {
  emit('submit', values);
};
</script>
<template>
  <div class="flex flex-col items-center justify-center w-full">
    <Form
      class="w-full p-4 bg-white rounded-lg"
      :validation-schema="typedCreateOrganizationSchema"
      @submit="handleSubmit"
    >
      <form-text-input
        :auto-complete="'off'"
        labelText="Organization Name"
        name="name"
        placeholder="Enter organization name"
        type="text"
      />
      <form-text-input
        :auto-complete="'organization'"
        labelText="Organization Description"
        name="description"
        placeholder="Enter organization description"
        :as="'textarea'"
      />
      <div class="flex mt-4">
        <button
          type="submit"
          variant="primary"
          class="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:shadow-lg transition"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped></style>
