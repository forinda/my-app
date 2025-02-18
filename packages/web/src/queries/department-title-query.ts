import { useAxios } from '@/composables/use-axios'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import type { CreateDepartmentTitleType } from '@/schema/create-department-title-schema'
import type { FetchDepartmentResponseType } from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
// import { defineStore } from 'pinia'

export const useDepartmentTitleQuery = function () {
  const queryClient = useQueryClient()
  type DepartmentType = FetchDepartmentResponseType['data'][number]
  const axios = useAxios()

  async function fetchData() {
    const resp = await axios.get<ArrayBuffer>('/department-titles', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<DepartmentType[]>>(resp.data).data
  }

  const query = useQuery<DepartmentType[]>({
    queryKey: ['org:department-titles'],
    queryFn: fetchData,
    initialData: [],
  })

  async function createRecord(payload: any /*CreateDepartmentTitleType*/) {
    await axios.post('/department-titles', payload)
  }

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['org:department-titles'] })
    },
  })

  return {
    query,
    createRecordMutation,
  }
}
