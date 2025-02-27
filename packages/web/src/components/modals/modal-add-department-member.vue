<script setup lang="ts">
import { useOrgMembersQuery } from '@/queries/org-members-query'
import { computed, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useDepartmentQuery, type DepartmentType } from '@/queries/departments-query'
import { z } from 'zod'
const {
  recordsQuery: { data },
} = useOrgMembersQuery()
const prop = defineProps<{
  show: boolean
  closeModal: () => void
  department: DepartmentType
}>()
const { addUserToDepartmentMutation } = useDepartmentQuery({})

const selectableUsers = computed(() => {
  return data.value?.map(({ user }) => ({
    label: `${user.first_name} ${user.last_name}`,
    value: user.id,
  }))
})
const schema = z.object({
  users: z.array(z.number()),
})
const submit = async () => {
  const { users } = schema.parse({ users: selectedUsers.value })
  await addUserToDepartmentMutation.mutateAsync([prop.department!.id, { users }], {
    onSuccess: () => {
      prop.closeModal()
    },
  })
}

const selectedUsers = ref<number[]>([])
</script>
<template>
  <transition-root appear :show="show" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <transition-child
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/70" />
      </transition-child>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <transition-child
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <dialog-panel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <dialog-title as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-4">
                Add Department Member
              </dialog-title>
              ss{{ department }}
              <div class="mt-2 flex flex-col space-y-4">
                <!-- <PrimeFieldset legend="Users" class="w-full mb-4"> -->
                <PrimeMultiSelect
                  filter
                  :options="selectableUsers"
                  option-label="label"
                  option-value="value"
                  :placeholder="'Select users...'"
                  display="chip"
                  name="users"
                  v-model="selectedUsers"
                  :auto-complete="'off'"
                  class="w-full"
                />
                <!-- </PrimeFieldset> -->
                <PrimeButton
                  type="submit"
                  label="Submit"
                  class="mt-4"
                  @click="submit"
                ></PrimeButton>
              </div>
            </dialog-panel>
          </transition-child>
        </div></div></Dialog
  ></transition-root>
</template>

<style scoped></style>
