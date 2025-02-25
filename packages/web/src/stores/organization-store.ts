/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAxios } from '@/composables/use-axios'
import type {
  CreateOrganizationResponseType,
  InsertOrganizationInterface,
  SelectOrganizationInterface,
} from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { extractAxiosError } from '@/utils/extract-axios-error'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth-store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
export const organizationQueryKeysKeys = {
  all: ['org:organizations|all'],
  details: () => [organizationQueryKeysKeys.all, 'detail'],
  detail: (id: number) => [organizationQueryKeysKeys.details(), id],
  pagination: (page: number) => [organizationQueryKeysKeys.all, 'page', page],
  search: (query: string) => [organizationQueryKeysKeys.all, 'search', query],
  infinite: () => [organizationQueryKeysKeys.all, 'infinite'],
}
export const useOrganizationStore = defineStore('app:organization', function () {
  const authStore = useAuthStore()
  const currentOrg = ref<SelectOrganizationInterface | null>(null)
  const axios = useAxios()
  const queryClient = useQueryClient()
  async function fetchOrganizations() {
    const resp = await axios.get<ArrayBuffer>('/organizations', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<SelectOrganizationInterface[]>>(resp.data).data
  }

  type CreateOptionParams = {
    onSuccess?: (organization: SelectOrganizationInterface) => void
    onError?: (error: string) => void
  }

  async function createOrganization(
    organization: Pick<InsertOrganizationInterface, 'name' | 'description'>,
    { onSuccess, onError }: CreateOptionParams = {},
  ) {
    try {
      const feed = await axios.post<CreateOrganizationResponseType>('/organizations', organization)
      if (typeof onSuccess === 'function') onSuccess!(feed.data as any)
    } catch (error) {
      if (typeof onError === 'function') onError!(extractAxiosError(error)!)
    }
  }
  const query = useQuery<SelectOrganizationInterface[]>({
    queryKey: [organizationQueryKeysKeys.all],
    queryFn: fetchOrganizations,
  })

  const setCurrentOrganization = (organization: SelectOrganizationInterface['uuid']) => {
    authStore.setUserCurrentOrganization(organization, {
      onSuccess: () => {
        const org = query.data.value?.find((org) => org.uuid === organization)
        if (org) currentOrg.value = org
      },
    })
  }

  const createOrgMutation = useMutation({
    mutationFn: createOrganization,
    onError: (error) => {
      throw new Error(extractAxiosError(error) ?? 'Error creating organization')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [organizationQueryKeysKeys.all] })
    },
  })

  return {
    query,
    createOrganization: createOrgMutation,
    currentOrg,
    setCurrentOrganization,
  }
})
