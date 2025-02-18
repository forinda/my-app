import { useAxios } from '@/composables/use-axios'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import type { CreateDepartmentTitleType } from '@/schema/create-department-title-schema'
import type { FetchOrganizationMemberDesignationResponseType } from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
// import { defineStore } from 'pinia'

export const useOrgDesignationQuery = function () {
  const queryClient = useQueryClient()
  type MemberDesignationType = FetchOrganizationMemberDesignationResponseType['data'][number]
  const axios = useAxios()

  async function fetchData() {
    const resp = await axios.get<ArrayBuffer>('/organization-designations', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<MemberDesignationType[]>>(resp.data).data
  }

  const query = useQuery<MemberDesignationType[]>({
    queryKey: ['org:designations'],
    queryFn: fetchData,
    initialData: [],
  })

  async function createRecord(payload: any /*CreateDepartmentTitleType*/) {
    await axios.post('/organization-designations', payload)
  }

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['org:designations'] })
    },
  })

  return {
    query,
    createRecordMutation,
  }
}
