import type {
  CreateOrganizationResponseType,
  InsertOrganizationInterface,
  SelectOrganizationInterface,
} from '@/types/org'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { ref, watch } from 'vue'
import axios from 'axios'
import type { ResponseObject } from '@/types/utils'
export async function useOrganizations() {
  const currentOrg = ref<SelectOrganizationInterface | null>(null)

  async function fetchOrganizations() {
    const data = ref<SelectOrganizationInterface[] | undefined>(undefined)
    const error = ref<any | undefined>(undefined)
    const status = ref<'loading' | 'error' | 'success' | 'idle'>('idle')
    const refresh = fetchOrganizations

    try {
      status.value = 'loading'
      const resp = await axios.get<ArrayBuffer>('/api/v1/organizations', {
        method: 'GET',
        responseType: 'arraybuffer',
      })
      data.value = decodeArrayBuffer<ResponseObject<SelectOrganizationInterface[]>>(resp.data).data
      status.value = 'success'
    } catch (err) {
      error.value = err
      status.value = 'error'
    }
    return { data, error, status, refresh }
  }

  const { data, error, status, refresh } = await fetchOrganizations()

  type CreateOptionParams = {
    onSuccess?: (organization: SelectOrganizationInterface) => void
    onError?: (error: any) => void
  }

  async function createOrganization(
    organization: Pick<InsertOrganizationInterface, 'name' | 'description'>,
    { onSuccess, onError }: CreateOptionParams = {},
  ) {
    try {
      const feed = await axios.post<CreateOrganizationResponseType>(
        '/api/v1/organizations',
        organization,
      )
      // await refresh()
      if (typeof onSuccess === 'function') onSuccess!(feed.data as any)
    } catch (error) {
      if (typeof onError === 'function') onError!(error)
    }
  }

  const setCurrentOrganization = (organization: SelectOrganizationInterface['uuid']) => {
    if (data.value?.length === 0) return
    const org = data.value?.find((org) => org.uuid === organization)
    if (org) currentOrg.value = org
  }

  watch(data, (newState) => {
    if (newState!.length > 0 && !currentOrg.value) {
      currentOrg.value = newState![0]
    }
  })

  return {
    data,
    error,
    status,
    refresh,
    create: createOrganization,
    currentOrg,
    setCurrentOrganization,
  }
}
