import { useAxios } from '@/composables/use-axios'
import { useNotification } from '@/composables/use-notification'
import type { AddUserToOrgModel } from '@/schema/add-to-or-remove-user-from-org-schema copy'
import type { CreateDesignationType } from '@/schema/create-designation-schema'
import { organizationQueryKeysKeys } from '@/stores/organization-store'
import type { FetchUserOrganizationInvitesResponseType } from '@/types/org'
import { decodeArrayBuffer, extractAxiosError, type ResponseObject } from '@app/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

export const orgMemberInviteKeys = {
  all: ['org:member-invites'],
  details: () => [orgMemberInviteKeys.all, 'detail'],
  detail: (id: number) => [orgMemberInviteKeys.details(), id],
  pagination: (page: number) => [orgMemberInviteKeys.all, 'page', page],
  search: (query: string) => [orgMemberInviteKeys.all, 'search', query],
  infinite: () => [orgMemberInviteKeys.all, 'infinite'],
}

type Options = {
  page?: number
  search?: string
}

export const useOrgMemberInvitesQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  const notify = useNotification().$swal
  const selectedRecordId = ref<number | null>(null)
  const queryClient = useQueryClient()
  type RecordType = FetchUserOrganizationInvitesResponseType['data'][number]

  type RespondPayload = { action: 'accepted' | 'rejected' }
  type RespondToInviteType = [number, RespondPayload]
  const axios = useAxios()
  const toast = useToast()
  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/organization-members/invites', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data
  }

  async function respondToInvite([id, payload]: RespondToInviteType) {
    await axios.post('/organization-members/respond/' + id, payload)
  }

  const recordsQuery = useQuery<RecordType[]>({
    queryKey: orgMemberInviteKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  })

  const respondToInviteMutation = useMutation({
    mutationFn: respondToInvite,
    onError: (error) => {
      toast.add({
        severity: 'error',
        closable: true,
        detail: extractAxiosError(error),
        summary: 'Error',
      })
    },
    onSuccess: async () => {
      toast.add({
        severity: 'success',
        closable: true,
        detail: 'Successfully responded to invite',
        summary: 'Success',
      })
      //  await queryClient.invalidateQueries([...orgMemberInviteKeys.all, ...organizationQueryKeysKeys.all])
      await queryClient.invalidateQueries({ queryKey: orgMemberInviteKeys.all })
      await queryClient.invalidateQueries({ queryKey: organizationQueryKeysKeys.all })
    },
  })

  return {
    recordsQuery,
    respondToInviteMutation,
  }
}
