<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'
import OrgCreate from '@/components/org/org-create.vue'
import OrgLayoutHeader from '@/components/org/org-layout-header.vue'
import { useNotification } from '@/composables/use-notification'
import { useOrganizationStore } from '@/stores/organization-store'
import { useOrgMemberInvitesQuery } from '@/queries/org-members-invite-query'

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
                  class="p-5 border rounded-2xl shadow-md hover:shadow-lg transition bg-white space-y-3"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xl font-semibold text-gray-800">
                        {{ invite.organization.name }}
                      </div>
                      <div class="text-gray-500 text-sm">Role: {{ invite.designation.name }}</div>
                    </div>
                    <span
                      class="px-3 py-1 text-sm font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-700': invite.status === 'accepted',
                        'bg-yellow-100 text-yellow-700': invite.status === 'pending',
                        'bg-red-100 text-red-700': invite.status === 'rejected',
                      }"
                    >
                      {{ invite.status }}
                    </span>
                  </div>

                  <p class="text-gray-600 text-sm">
                    Invited by:
                    <span class="font-medium">
                      {{
                        [invite.creator.first_name || '', invite.creator.last_name || ''].join(' ')
                      }}
                    </span>
                  </p>

                  <p class="text-gray-500 text-sm">
                    Date Invited: {{ moment(invite.created_at).format('LL') }}
                  </p>

                  <div class="flex justify-end space-x-3" v-if="invite.status === 'pending'">
                    <Primebutton
                      @click="
                        inviteQuery.respondToInviteMutation.mutateAsync([
                          invite.id,
                          { action: 'accepted' },
                        ])
                      "
                      class="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      Accept
                    </Primebutton>
                    <Primebutton
                      @click="
                        inviteQuery.respondToInviteMutation.mutateAsync([
                          invite.id,
                          { action: 'rejected' },
                        ])
                      "
                      class="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                      Decline
                    </Primebutton>
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
