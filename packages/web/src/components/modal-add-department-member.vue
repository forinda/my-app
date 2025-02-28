<script setup lang="ts">
import { useOrgMembersQuery } from '@/queries/org-members-query'
import { computed, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useDepartmentQuery, type DepartmentType } from '@/queries/departments-query'
import { z } from 'zod'
import BaseHuiModal from './base-hui-modal.vue'
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
  <BaseHuiModal :show :title="'Add Department Member'" :closeModal="closeModal">
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
      <PrimeButton type="submit" label="Submit" class="mt-4" @click="submit"></PrimeButton>
    </div>
  </BaseHuiModal>
</template>

<style scoped></style>
