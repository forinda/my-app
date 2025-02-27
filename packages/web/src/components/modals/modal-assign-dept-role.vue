<script setup lang="ts">
import { addDepartmentRoleSchema } from '@/schema/add-department-role-schema'
import type { DepartmentType } from '@/types/org'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import BaseHuiModal from '../base-hui-modal.vue'
import { useDepartmentQuery } from '@/queries/departments-query'
import { useDepartmentTitleQuery } from '@/queries/department-title-query'
import { useOrgMembersQuery } from '@/queries/org-members-query'

const props = defineProps<{
  show: boolean
  closeModal: () => void
  department: DepartmentType
}>()
const { recordsQuery: dept } = useDepartmentQuery({})
const { recordsQuery: titles } = useDepartmentTitleQuery({})
const { recordsQuery: members } = useOrgMembersQuery({})
const resolver = zodResolver(addDepartmentRoleSchema)
</script>

<template>
  <BaseHuiModal :show="show" :title="'Add Department Role'" :closeModal="closeModal">
    <PrimeForm :resolver v-slot="$form" :initial-values="{ department_id: props.department.id }">
      <!-- Department -->
      <div class="flex flex-col gap-1">
        <PrimeSelect
          name="department_id"
          disabled
          :options="
            dept.data.value?.map((d) => ({
              name: d.name,
              value: d.id,
            }))
          "
          optionLabel="name"
          placeholder="Select Department"
          fluid
        />
        <Message
          v-if="$form.department_id?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.department_id.error.message }}</Message
        >
      </div>
      <!-- Title -->
      <div class="flex flex-col gap-1">
        <PrimeSelect
          name="role_title_id"
          :options="
            titles.data.value?.map((t) => ({
              name: t.name,
              value: t.id,
            }))
          "
          optionLabel="name"
          placeholder="Select Title"
          fluid
        />
        <Message
          v-if="$form.role_title_id?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.role_title_id.error.message }}</Message
        >
      </div>
      <!-- User -->
      <div class="flex flex-col gap-1">
        <PrimeSelect
          name="user_id"
          :options="
            members.data.value?.map((m) => ({
              name: `${m.user.first_name} ${m.user.last_name}`,
              value: m.user.id,
            }))
          "
          optionLabel="name"
          placeholder="Select User"
          fluid
        />
        <Message v-if="$form.user_id?.invalid" severity="error" size="small" variant="simple">{{
          $form.user_id.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <PrimeDatePicker name="start_date" inline :show-icon="true" :show-time="true" />
        <Message v-if="$form.start_date?.invalid" severity="error" size="small" variant="simple">{{
          $form.start_date.error?.message
        }}</Message>
      </div>

      <PrimeButton type="submit" label="Submit" class="mt-4"></PrimeButton>
    </PrimeForm>
  </BaseHuiModal>
  <Toast position="top-right" />
</template>

<style scoped></style>
