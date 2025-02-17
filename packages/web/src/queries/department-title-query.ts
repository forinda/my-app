import { useAxios } from '@/composables/use-axios'
import type { CreateDepartmentTitleType } from '@/schema/create-department-title-schema'
import type { FetchDepartmentTitleResponseType } from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const departmentTitleQueryKeys = {
  all: ['org:department-titles'],
  details: () => [departmentTitleQueryKeys.all, 'detail'],
  detail: (id: number) => [departmentTitleQueryKeys.details(), id],
  pagination: (page: number) => [departmentTitleQueryKeys.all, 'page', page],
  search: (query: string) => [departmentTitleQueryKeys.all, 'search', query],
  infinite: () => [departmentTitleQueryKeys.all, 'infinite'],
}

type Options = {
  page?: number
  search?: string
}

type UpdateRecordType = [number, CreateDepartmentTitleType]
export const useDepartmentTitleQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  const selectedRecordId = ref<number | null>(null)
  const queryClient = useQueryClient()
  type DepartmentTitle = FetchDepartmentTitleResponseType['data'][number]
  const axios = useAxios()

  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/department-titles', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<DepartmentTitle[]>>(resp.data).data
  }

  async function createRecord(payload: CreateDepartmentTitleType) {
    await axios.post('/department-titles', payload)
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/department-titles/${id}`, payload)
  }

  function fetchSingleRecord(id: number) {
    return axios.get(`/department-titles/${id}`)
  }

  function setSelectedRecordId(id: number | null) {
    selectedRecordId.value = id
  }
  const recordsQuery = useQuery<DepartmentTitle[]>({
    queryKey: departmentTitleQueryKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  })

  const singleRecordQuery = useQuery({
    queryKey: departmentTitleQueryKeys.detail(selectedRecordId.value!),
    queryFn: () => fetchSingleRecord(selectedRecordId.value!),
    enabled: !!selectedRecordId.value,
  })

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentTitleQueryKeys.all })
    },
  })

  const updateRecordMutation = useMutation({
    mutationFn: updateRecord,
    onMutate: async (payload) => {
      // await queryClient.cancelQueries({
      //   queryKey: [departmentQueryKeys.all, departmentQueryKeys.detail(payload[0])],

      // })
      const previousData = queryClient.getQueryData<DepartmentTitle[]>(departmentTitleQueryKeys.all)
      queryClient.setQueryData<DepartmentTitle[]>(departmentTitleQueryKeys.all, (old) => {
        return old?.map((record) => {
          if (record.id === payload[0]) {
            return {
              ...record,
              ...payload[1],
            }
          }
          return record
        })
      })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          departmentTitleQueryKeys.all,
          // departmentQueryKeys.detail(payload[0]),
        ],
      })
    },
  })

  // watch(
  //   props,
  //   (newVal) => {
  //     console.log('options changed', newVal)
  //   },
  //   { deep: true },
  // )
  // const data = computed(() => (Array.isArray(deptsData.value) ? deptsData.value : []))
  return {
    recordsQuery,
    createRecordMutation,
    updateRecordMutation,
    singleRecordQuery,
    setSelectedRecordId,
  }
}
