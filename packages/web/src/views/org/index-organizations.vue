<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'
import OrgCreate from '@/components/org/org-create.vue'
import OrgLayoutHeader from '@/components/org/org-layout-header.vue'
import { useNotification } from '@/composables/use-notification'
import { useOrganizationStore } from '@/stores/organization-store'
import { useOrgMemberInvitesQuery } from '@/queries/org-members-invite-query'
import { Icon } from '@iconify/vue'
const createOrgOpen = ref(false)
const orgStore = useOrganizationStore()
const inviteQuery = useOrgMemberInvitesQuery()
// const { query } = storeToRefs(orgStore)

const { $swal } = useNotification()
const toggleCreateOrganizationModal = (state: boolean) => {
  createOrgOpen.value = state
}

const handleCreate = async (
  values: Parameters<typeof orgStore.createOrganization.mutate>[0],
  // options?: Parameters<typeof createOrganization>[1],
) => {
  await orgStore.createOrganization.mutateAsync(values, {
    onError: async (error) => {
      // console.error(error)
      await $swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      })
    },
    onSuccess: async () => {
      toggleCreateOrganizationModal(false)
    },
  })
}
</script>
<template>
  <div>
    <org-layout-header @toggleModal="toggleCreateOrganizationModal" />
    <org-create :show="createOrgOpen" @submit="handleCreate" />
    <div class="card">
      <PrimeTabs value="0">
        <PrimeTabList>
          <Tab value="0">Organizations Joined</Tab>
          <Tab value="1">Invites</Tab>
        </PrimeTabList>
        <PrimeTabPanels>
          <PrimeTabPanel value="0">
            <!-- List of Organizations -->
            <div v-if="orgStore.query.data && orgStore.query.data.length > 0" class="grid gap-4">
              <router-link
                :to="{ name: 'organization-id', params: { id: org.uuid } }"
                v-for="org in orgStore.query.data"
                :key="org.id"
                class="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div class="text-lg font-medium">{{ org.name }}</div>
                <div class="text-gray-500 text-sm">Desc: {{ org.description }}</div>
                <!-- <div class="text-gray-500 text-sm">Date Joined: {{ o }}</div> -->
              </router-link>
            </div>
            <div v-else-if="orgStore.query.isLoading" class="text-gray-500 text-center mt-6">
              Loading...
            </div>
            <div v-else-if="orgStore.query.isError" class="text-gray-500 text-center mt-6">
              Error loading organizations.
            </div>

            <!-- Empty State -->
            <div v-else class="text-gray-500 text-center mt-6">
              You are not part of any organizations.
            </div>
          </PrimeTabPanel>
          <PrimeTabPanel value="1">
            <div>
              <div
                v-if="
                  inviteQuery.recordsQuery.data.value &&
                  inviteQuery.recordsQuery.data.value.length > 0
                "
                class="grid gap-4"
              >
                <div
                  v-for="invite in inviteQuery.recordsQuery.data.value"
                  :key="invite.id"
                  class="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                >
                  <!-- Header with Organization and Status -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="space-y-1">
                      <div class="text-xl font-semibold text-gray-800 flex items-center">
                        <BuildingIcon class="w-5 h-5 mr-2 text-gray-600" />
                        {{ invite.organization.name }}
                      </div>
                      <div class="text-gray-500 text-sm flex items-center">
                        <BriefcaseIcon class="w-4 h-4 mr-1 text-gray-400" />
                        Role: {{ invite.designation.name }}
                      </div>
                    </div>

                    <span
                      class="px-3 py-1 text-sm font-medium rounded-full flex items-center"
                      :class="{
                        'bg-green-100 text-green-700': invite.status === 'accepted',
                        'bg-amber-100 text-amber-700': invite.status === 'pending',
                        'bg-red-100 text-red-700': invite.status === 'rejected',
                      }"
                    >
                      <span v-if="invite.status === 'accepted'" class="mr-1">
                        <CheckCircleIcon class="w-4 h-4" />
                      </span>
                      <span v-else-if="invite.status === 'pending'" class="mr-1">
                        <ClockIcon class="w-4 h-4" />
                      </span>
                      <span v-else-if="invite.status === 'rejected'" class="mr-1">
                        <XCircleIcon class="w-4 h-4" />
                      </span>
                      {{ invite.status.charAt(0).toUpperCase() + invite.status.slice(1) }}
                    </span>
                  </div>

                  <!-- Divider -->
                  <div class="border-t border-gray-100 my-3"></div>

                  <!-- Invitation Details -->
                  <div class="space-y-2 mb-4">
                    <p class="text-gray-600 text-sm flex items-center">
                      <UserIcon class="w-4 h-4 mr-2 text-gray-400" />
                      Invited by:
                      <span class="font-medium ml-1">
                        {{
                          [invite.creator.first_name || '', invite.creator.last_name || ''].join(
                            ' ',
                          )
                        }}
                      </span>
                    </p>

                    <p class="text-gray-500 text-sm flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-2 text-gray-400" />
                      Date Invited: {{ moment(invite.created_at).format('LL') }}
                    </p>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex justify-end space-x-3 mt-4" v-if="invite.status === 'pending'">
                    <button
                      @click="
                        inviteQuery.respondToInviteMutation.mutateAsync([
                          invite.id,
                          { action: 'accepted' },
                        ])
                      "
                      class="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center"
                    >
                      <!-- <CheckIcon class="w-4 h-4 mr-1" /> -->
                      <Icon icon="lucide-check" class="w-4 h-4 mr-1" />
                      Accept
                    </button>
                    <button
                      @click="
                        inviteQuery.respondToInviteMutation.mutateAsync([
                          invite.id,
                          { action: 'rejected' },
                        ])
                      "
                      class="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center border border-gray-200"
                    >
                      <!-- <XIcon class="w-4 h-4 mr-1" /> -->
                      <Icon icon="lucide-x" class="w-4 h-4 mr-1" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-else-if="inviteQuery.recordsQuery.isLoading.value"
                class="text-gray-500 text-center mt-6"
              >
                Loading...
              </div>
              <div
                v-else-if="inviteQuery.recordsQuery.isError.value"
                class="text-gray-500 text-center mt-6"
              >
                Error loading invites.
              </div>
              <div v-else class="text-gray-500 text-center mt-6">You have no pending invites.</div>
            </div>
          </PrimeTabPanel>
        </PrimeTabPanels>
      </PrimeTabs>
    </div>
  </div>
</template>

<style scoped></style>
