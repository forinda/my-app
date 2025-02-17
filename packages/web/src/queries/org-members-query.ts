import { useAxios } from '@/composables/use-axios'
import type {
  FetchOrganizationMembersResponseType,
} from '@/types/org'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { useQuery } from '@tanstack/vue-query'

// export const useOrganizationMemberStore = defineStore('app:org:members', function () {
//   type MemberType = FetchOrganizationMembersResponseType['data'][number]
//   const dataFetchState = ref<{
//     data?: MemberType[]
//     error?: any
//     status: 'loading' | 'error' | 'success' | 'idle'
//   }>({
//     status: 'idle',
//   })
//   const axios = useAxios()
//   async function fetchOrganizations() {
//     try {
//       dataFetchState.value.status = 'loading'
//       const resp = await axios.get<ArrayBuffer>('/organization-members', {
//         method: 'GET',
//         responseType: 'arraybuffer',
//       })

//       dataFetchState.value.data = decodeArrayBuffer<ResponseObject<MemberType[]>>(
//         resp.data,
//       ).data
//       dataFetchState.value.status = 'success'
//       return dataFetchState
//     } catch (err) {
//       console.log(err);

//       dataFetchState.value.error = extractAxiosError(err)
//       dataFetchState.value.status = 'error'
//       return dataFetchState
//     }
//   }

//   // type CreateOptionParams = {
//   //   onSuccess?: (organization: SelectOrganizationInterface) => void
//   //   onError?: (error: string) => void
//   // }

//   // async function createMember(
//   //   organization: Pick<InsertOrganizationInterface, 'name' | 'description'>,
//   //   { onSuccess, onError }: CreateOptionParams = {},
//   // ) {
//   //   try {
//   //     const feed = await axios.post<CreateOrganizationResponseType>('/organizations', organization)
//   //     // await refresh()
//   //     if (typeof onSuccess === 'function') onSuccess!(feed.data as any)
//   //   } catch (error) {
//   //     if (typeof onError === 'function') onError!(extractAxiosError(error)!)
//   //   }
//   // }



//   return {
//     payload: dataFetchState,
//     refresh: fetchOrganizations,
//   }
// })

export const useOrgMembers = function(){
  const axios = useAxios()
  // const queryClient = useQueryClient()
  const fetchMembers = async () => {
    const resp = await axios.get<ArrayBuffer>('/organization-members', {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    return decodeArrayBuffer<ResponseObject<FetchOrganizationMembersResponseType['data']>>(resp.data).data
  }
  const membersQuery = useQuery<FetchOrganizationMembersResponseType['data']>({
    queryKey: ['org:members'],
    queryFn: fetchMembers,
  })

return {
  query: membersQuery,
}

}
