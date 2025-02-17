import { useAxios } from '@/composables/use-axios'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import type { FetchDepartmentResponseType } from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
// import { defineStore } from 'pinia'

export const useDepartmentQuery = function () {
  const queryClient = useQueryClient()
  type DepartmentType = FetchDepartmentResponseType['data'][number]
  const axios = useAxios()

  async function fetchDepartments() {
    const resp = await axios.get<ArrayBuffer>('/departments', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<DepartmentType[]>>(resp.data).data
  }

  const departmentQuery = useQuery<DepartmentType[]>({
    queryKey: ['org:departments'],
    queryFn: fetchDepartments,
  })

  async function createDepartment(payload: CreateDepartmentType) {
    await axios.post('/departments', payload)
  }

  const createDepartmentMutation = useMutation({
    mutationFn: createDepartment,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['org:departments'] })
    },
  })

  return {
    query: departmentQuery,
    createDepartment: createDepartmentMutation,
  }
}
