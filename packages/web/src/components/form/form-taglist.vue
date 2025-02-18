<template>
  <div class="card flex justify-center">
    <Toast />

    <Form
      v-slot="$form"
      :initialValues
      :resolver
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      :validateOnMount="['firstName']"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText
          name="firstName"
          type="text"
          placeholder="First Name"
          fluid
          :formControl="{ validateOnValueUpdate: true }"
        />
        <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{
          $form.firstName.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="lastName" type="text" placeholder="Last Name" fluid />
        <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{
          $form.lastName.error.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const initialValues = ref({
  username: '',
  firstName: '',
  lastName: '',
})

const resolver = ({ values }) => {
  const errors = {}

  if (!values.username) {
    errors.username = [{ message: 'Username is required.' }]
  }

  if (!values.name) {
    errors.firstName = [{ message: 'First name is required.' }]
  }

  if (!values.surname) {
    errors.lastName = [{ message: 'Last name is required.' }]
  }

  return {
    errors,
  }
}

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
</script>
