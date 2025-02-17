import { useAxios } from '@/composables/use-axios'
import type { CreateDesignationType } from '@/schema/create-designation-schema'
import type {  FetchOrganizationDesignationResponseType } from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
// import { defineStore } from 'pinia'

export const useDesignationQuery = function () {
  const queryClient = useQueryClient()
  type QueryResponseType = FetchOrganizationDesignationResponseType['data'][number]
  const axios = useAxios()

  async function fetchData() {
    const resp = await axios.get<ArrayBuffer>('/organization-designations', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<QueryResponseType[]>>(resp.data).data
  }

  const query = useQuery<QueryResponseType[]>({
    queryKey: ['org:designations'],
    queryFn: fetchData,
  })

  async function createDesignation(payload: CreateDesignationType) {
    await axios.post('/organization-designations', payload)
  }

  const createDesignationMutation = useMutation({
    mutationFn: createDesignation,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['org:departments'] })
    },
  })

  return {
    query,
    createDesignation: createDesignationMutation,
  }
}
