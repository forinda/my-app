import { useAxios } from '@/composables/use-axios'
import type { CreateDepartmentType } from '@/schema/create-department-schema'
import type { FetchDepartmentResponseType } from '@/types/org'
import type { EmptyBareObject, ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
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

  const query = useQuery<DepartmentType[]>({
    queryKey: ['org:departments'],
    queryFn: fetchDepartments,
    initialData: [],
  })

  async function createDepartment(payload: any /**CreateDepartmentType & EmptyBareObject*/) {
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
  // const data = computed(() => (Array.isArray(deptsData.value) ? deptsData.value : []))
  return {
    query,
    createDepartment: createDepartmentMutation,
  }
}
