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

export const useOrganizationStore = defineStore('app:organization', function () {
  const authStore = useAuthStore()
  const dataFetchState = ref<{
    data?: SelectOrganizationInterface[]
    error?: any
    status: 'loading' | 'error' | 'success' | 'idle'
  }>({
    status: 'idle',
  })
  const currentOrg = ref<SelectOrganizationInterface | null>(null)
  const axios = useAxios()
  async function fetchOrganizations() {
    try {
      dataFetchState.value.status = 'loading'
      const resp = await axios.get<ArrayBuffer>('/organizations', {
        method: 'GET',
        responseType: 'arraybuffer',
      })
      dataFetchState.value.data = decodeArrayBuffer<ResponseObject<SelectOrganizationInterface[]>>(
        resp.data,
      ).data
      dataFetchState.value.status = 'success'
      return dataFetchState
    } catch (err) {
      dataFetchState.value.error = err
      dataFetchState.value.status = 'error'
      return dataFetchState
    }
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
      // await refresh()
      if (typeof onSuccess === 'function') onSuccess!(feed.data as any)
    } catch (error) {
      if (typeof onError === 'function') onError!(extractAxiosError(error)!)
    }
  }

  const setCurrentOrganization = (organization: SelectOrganizationInterface['uuid']) => {
    // if (dataFetchState.value.data?.length === 0) return
    // const org = dataFetchState.value.data?.find((org) => org.uuid === organization)
    // if (org) currentOrg.value = org
    authStore.setUserCurentOrganization(organization, {
      onSuccess: () => {
        const org = dataFetchState.value.data?.find((org) => org.uuid === organization)
        if (org) currentOrg.value = org
      },
    })
  }

  // watch(dataFetchState!, (newState) => {
  //   console.log({ newState })
  // })

  return {
    payload: dataFetchState,
    refresh: fetchOrganizations,
    createOrganization,
    currentOrg,
    setCurrentOrganization,
  }
})
