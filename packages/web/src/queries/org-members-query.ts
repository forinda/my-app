// import { useAxios } from '@/composables/use-axios'
// import type { FetchOrganizationMembersResponseType } from '@/types/org'
// import type { ResponseObject } from '@/types/utils'
// import { decodeArrayBuffer } from '@/utils/resp-decode'
// import { useQuery } from '@tanstack/vue-query'

// export const useOrgMembers = function () {
//   const axios = useAxios()
//   // const queryClient = useQueryClient()
//   const fetchMembers = async () => {
//     const resp = await axios.get<ArrayBuffer>('/organization-members', {
//       method: 'GET',
//       responseType: 'arraybuffer',
//     })
//     return decodeArrayBuffer<ResponseObject<FetchOrganizationMembersResponseType['data']>>(
//       resp.data,
//     ).data
//   }
//   const membersQuery = useQuery<FetchOrganizationMembersResponseType['data']>({
//     queryKey: ['org:members'],
//     queryFn: fetchMembers,
//   })

//   return {
//     query: membersQuery,
//   }
// }
import { useAxios } from '@/composables/use-axios'
import { useNotification } from '@/composables/use-notification'
import type { CreateDesignationType } from '@/schema/create-designation-schema'
import type {
  FetchOrganizationMemberDesignationResponseType,
  FetchOrganizationMembersResponseType,
} from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { extractAxiosError } from '@/utils/extract-axios-error'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const orgMemberKeys = {
  all: ['org:members'],
  details: () => [orgMemberKeys.all, 'detail'],
  detail: (id: number) => [orgMemberKeys.details(), id],
  pagination: (page: number) => [orgMemberKeys.all, 'page', page],
  search: (query: string) => [orgMemberKeys.all, 'search', query],
  infinite: () => [orgMemberKeys.all, 'infinite'],
}

type Options = {
  page?: number
  search?: string
}

type UpdateRecordType = [number, CreateDesignationType]
export const useOrgMembersQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  const notify = useNotification().$swal
  const selectedRecordId = ref<number | null>(null)
  const queryClient = useQueryClient()
  type RecordType = FetchOrganizationMembersResponseType['data'][number]
  const axios = useAxios()

  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/organization-members', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data
  }

  async function createRecord(payload: CreateDesignationType) {
    await axios.post('/organization-members', payload)
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/organization-members/${id}`, payload)
  }

  function fetchSingleRecord(id: number) {
    return axios.get(`/organization-members/${id}`)
  }

  function setSelectedRecordId(id: number | null) {
    selectedRecordId.value = id
  }
  const recordsQuery = useQuery<RecordType[]>({
    queryKey: orgMemberKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  })

  const singleRecordQuery = useQuery({
    queryKey: orgMemberKeys.detail(selectedRecordId.value!),
    queryFn: () => fetchSingleRecord(selectedRecordId.value!),
    enabled: !!selectedRecordId.value,
  })

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      notify.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      })
    },
    onSuccess: () => {
      notify.fire({
        icon: 'success',
        title: 'Success',
        text: 'Record created successfully',
      })
      queryClient.invalidateQueries({ queryKey: orgMemberKeys.all })
    },
  })

  const updateRecordMutation = useMutation({
    mutationFn: updateRecord,
    onMutate: async (payload) => {
      // await queryClient.cancelQueries({
      //   queryKey: [departmentQueryKeys.all, departmentQueryKeys.detail(payload[0])],

      // })
      const previousData = queryClient.getQueryData<RecordType[]>(orgMemberKeys.all)
      queryClient.setQueryData<RecordType[]>(orgMemberKeys.all, (old) => {
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
      updateRecordMutation.reset()
      notify.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      })
    },
    onSuccess: () => {
      notify.fire({
        icon: 'success',
        title: 'Success',
        text: 'Record updated successfully',
      })
      queryClient.invalidateQueries({
        queryKey: [
          orgMemberKeys.all,
          // departmentQueryKeys.detail(payload[0]),
        ],
      })
    },
  })
  return {
    recordsQuery,
    createRecordMutation,
    updateRecordMutation,
    singleRecordQuery,
    setSelectedRecordId,
  }
}
