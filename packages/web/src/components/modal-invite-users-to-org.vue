<script setup lang="ts">
import { z } from 'zod'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
// import { zodResolver } from '@primevue/forms/resolvers/zod'
import { computed, reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { Icon } from '@iconify/vue'
import { useOrgMembersQuery } from '@/queries/org-members-query'
import { useOrgDesignationQuery } from '@/queries/org-designation-query'
import {
  addUserToOrgSchema,
  type AddUserToOrgModel,
} from '@/schema/add-to-or-remove-user-from-org-schema copy'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import type { FormSubmitEvent } from '@primevue/forms'
import BaseHuiModal from './base-hui-modal.vue'
import type { TsFixMeType } from 'shared'

const props = defineProps<{
  showModal: boolean
  closeModal: () => void
}>()
const loading = ref(false)
const { createRecordMutation } = useOrgMembersQuery()
const emailSchema = z.string().email({ message: 'Invalid email format' })
const { recordsQuery: desig } = useOrgDesignationQuery()
const emails = ref<string[]>([])
// const searchQuery = ref('')
const invalidEmails = computed(() =>
  emails.value.filter((email) => !emailSchema.safeParse(email).success),
)

// const resolver = zodResolver(schema)
const toast = useToast()
const resolver = zodResolver(addUserToOrgSchema)
const onSubmit = async (ev: FormSubmitEvent) => {
  if (!ev.valid) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fix the errors in the form',
      life: 3000,
    })
    return
  }
  if (emails.value.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please enter at least one email address',
      life: 3000,
    })
    return
  }

  if (invalidEmails.value.length > 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please correct invalid email addresses',
      life: 3000,
    })
    return
  }

  try {
    loading.value = true
    await createRecordMutation.mutateAsync(
      {
        emails: emails.value,
        designation_id: ev.values.designation_id,
      },
      {
        onError: (err) => {},
        onSuccess: async (data) => {
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Invitations sent successfully',
            life: 3000,
          })
          props.closeModal()
        },
      },
    )
  } catch (_error: TsFixMeType) {
    // toast.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'Failed to send invitations',
    //   life: 3000,
    // })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseHuiModal :show="props.showModal" :title="''" :closeModal="props.closeModal">
    <section class="flex items-center justify-center p-4">
      <div class="w-full bg-white rounded-2xl">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Invite Team Members</h1>
          <p class="text-gray-600">Add new members to your organization</p>
        </div>

        <div class="space-y-6">
          <!-- Emails Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700" for="emailChips">
              Email Addresses
              <span class="text-gray-500 text-xs ml-1">(separate with comma)</span>
            </label>
            <PrimeChips
              id="emailChips"
              name="emails"
              v-model="emails"
              separator=","
              placeholder="Enter email addresses"
              class="w-full email-chips"
              aria-label="Email addresses input"
            />
            <PrimeMessage v-if="invalidEmails.length" severity="error" class="text-sm">
              Invalid email(s): {{ invalidEmails.join(', ') }}
            </PrimeMessage>
          </div>

          <PrimeForm
            :resolver
            class="gap-6"
            @submit="onSubmit"
            v-slot="$form"
            :validate-on-submit="true"
          >
            <!-- Designation Selection -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700" for="designation">
                Designation
              </label>
              <div class="relative">
                <PrimeSelect
                  id="designation_id"
                  name="designation_id"
                  :options="desig.data.value!.map((d) => ({ label: d.name, value: d.id }))"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select Designation"
                  class="w-full"
                  :filter="true"
                  :loading="desig.isLoading.value"
                />
              </div>
              <PrimeMessage v-if="$form.designation_id?.error" severity="error" class="text-sm">
                {{ $form.designation_id?.error.message }}
              </PrimeMessage>
            </div>
            <br />
            <PrimeButton type="submit" :loading="loading" :disabled="loading" class="w-full h-11">
              <!-- <template #icon>
            <UserPlusIcon class="h-5 w-5" />
          </template> -->
              <Icon class="h-5 w-5" :icon="'lucide-user-plus'" />
              {{ loading ? 'Sending Invites...' : 'Send Invitations' }}
            </PrimeButton>
          </PrimeForm>

          <!-- Search Field -->
          <!-- <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700"
            for="search"
          >
            Search Members
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon class="h-5 w-5 text-gray-400" />
            </span>
            <InputText
              id="search"
              v-model="searchQuery"
              placeholder="Search by name or email..."
              class="pl-10 w-full"
            />
          </div>
        </div> -->

          <!-- Submit Button -->
        </div>
      </div>
    </section>
  </BaseHuiModal>
  <Toast position="top-right" />
</template>

<style scoped>
:deep(.email-chips) .p-chips-multiple-container {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  transition: all 0.2s ease;
}

:deep(.email-chips) .p-chips-multiple-container:hover {
  border-color: var(--primary-color);
}

:deep(.email-chips) .p-chips-multiple-container:focus-within {
  border-color: var(--primary-color);
  box-shadow:
    0 0 0 2px #e5e7eb,
    0 0 0 4px var(--primary-color);
}

:deep(.email-chips) .p-chips-token {
  background-color: var(--primary-50);
  color: var(--primary-700);
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin: 0.125rem;
}

:deep(.p-inputtext),
:deep(.p-dropdown) {
  width: 100%;
  border-radius: 0.5rem;
  min-height: 2.75rem;
  transition: all 0.2s ease;
}

:deep(.p-dropdown:hover) {
  border-color: var(--primary-color);
}

:deep(.p-dropdown:focus) {
  border-color: var(--primary-color);
  box-shadow:
    0 0 0 2px #e5e7eb,
    0 0 0 4px var(--primary-color);
}

:deep(.p-button) {
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(.p-button:not(:disabled):hover) {
  transform: translateY(-1px);
}

:deep(.p-message) {
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

/* Loading state styles */
:deep(.p-button-loading) {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Toast customization */
:deep(.p-toast) {
  opacity: 0.95;
}

:deep(.p-toast-message) {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
</style>
