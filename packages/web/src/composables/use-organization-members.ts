import type { FetchOrganizationMembersResponseType, SelectOrganizationInterface } from '@/types/org'
import { decodeArrayBuffer } from 'shared'
import axios from 'axios'
import { ref } from 'vue'

export async function useOrganizationMembers() {
  const organization = ref<SelectOrganizationInterface['uuid'] | null>(null)

  const setCurrentOrganization = (id: SelectOrganizationInterface['uuid']) => {
    organization.value = id
  }

  async function fetchOrganizationMembers() {
    const data = ref<FetchOrganizationMembersResponseType['data'] | undefined>(undefined)
    const error = ref<any | undefined>(undefined)
    const status = ref<'loading' | 'error' | 'success' | 'idle'>('idle')
    const refresh = fetchOrganizationMembers

    try {
      status.value = 'loading'
      const resp = await axios.get<ArrayBuffer>(
        `/api/v1/organizations/${organization.value}/members`,
        {
          method: 'GET',
          responseType: 'arraybuffer',
        },
      )
      data.value = decodeArrayBuffer<FetchOrganizationMembersResponseType>(resp.data).data
      status.value = 'success'
    } catch (err) {
      error.value = err
      status.value = 'error'
    }
    return { data, error, status, refresh }
  }

  const { data, error, status, refresh } = await fetchOrganizationMembers()

  return {
    data,
    error,
    status,
    refresh,
    setCurrentOrganization,
    organization,
  }
}
