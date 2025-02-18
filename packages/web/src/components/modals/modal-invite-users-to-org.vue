<script setup lang="ts">
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useOrgDesignationQuery } from '@/queries/org-designation-query'
import { useDepartmentQuery } from '@/queries/departments-query'

const { recordsQuery: desig } = useOrgDesignationQuery()
const { recordsQuery: dept } = useDepartmentQuery()

const emailSchema = z.string().email({ message: 'Invalid email format' })

const schema = z.object({
  department: z.number({ message: 'Department is required' }).min(1, { message: 'Department is required' }),
  designation: z.number({ message: 'Designation is required' }).min(1, { message: 'Designation is required' }),
})

const emails = ref<string[]>([])
const invalidEmails = computed(() => emails.value.filter((email) => !emailSchema.safeParse(email).success))

const resolver = zodResolver(schema)
const toast = useToast()

const onSubmit = (data: unknown) => {
  if (emails.value.length === 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter at least one email address', life: 3000 })
    return
  }

  if (invalidEmails.value.length > 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please correct invalid email addresses', life: 3000 })
    return
  }

  console.log('Inviting users with data:', { ...data, emails: emails.value })
  toast.add({ severity: 'success', summary: 'Success', detail: 'Invitations sent successfully', life: 3000 })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Invite Users</h1>
      <p class="text-center text-gray-600 mb-4">to Organization X</p>
      <PrimeForm :resolver="resolver" @submit="onSubmit" v-slot="$form">
        <div class="flex flex-col gap-4">
          <!-- Emails Input -->
          <div>
            <label class="block mb-1 font-medium text-gray-700" for="emails">User Emails</label>
            <PrimeChips
              id="emailChips"
              name="emails"
              v-model="emails"
              separator=","
              placeholder="Enter email addresses"
              class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
            />
            <PrimeMessage v-if="invalidEmails.length" severity="error" size="small" class="mt-1 text-sm">
              Invalid email(s): {{ invalidEmails.join(', ') }}
            </PrimeMessage>
          </div>

          <!-- Department Dropdown -->
          <div>
            <label class="block mb-1 font-medium text-gray-700" for="department">Department</label>
            <PrimeSelect
              id="department"
              name="department"
              :options="dept.data.value.map((d) => ({ label: d.name, value: d.id }))"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Department"
              class="w-full"
            />
            <PrimeMessage v-if="$form.department?.errors.length" severity="error" size="small" class="mt-1 text-sm">
              {{ $form.department?.error.message }}
            </PrimeMessage>
          </div>

          <!-- Designation Dropdown -->
          <div>
            <label class="block mb-1 font-medium text-gray-700" for="designation">Designation</label>
            <PrimeSelect
              id="designation"
              name="designation"
              :options="desig.data.value.map((d) => ({ label: d.name, value: d.id }))"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Designation"
              class="w-full"
            />
            <PrimeMessage v-if="$form.designation?.error" severity="error" size="small" class="mt-1 text-sm">
              {{ $form.designation?.error.message }}
            </PrimeMessage>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            label="Send Invites"
            class="mt-4 w-full p-button-primary bg-indigo-600 hover:bg-indigo-700"
            icon="pi pi-send"
          />
        </div>
      </PrimeForm>
    </div>
  </div>
  <Toast />
</template>

<style scoped>
/* Custom styles */
:deep(.p-chips) .p-chips-multiple-container {
  width: 100%;
  min-height: 2.5rem;
}

:deep(.p-button) {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

:deep(.p-button):hover {
  background-color: #4338ca;
  border-color: #4338ca;
}

:deep(.p-chips) .p-chips-token {
  background-color: #e0e7ff;
  color: #4f46e5;
}
</style>
