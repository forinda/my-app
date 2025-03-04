import { useState } from 'react';
import type { CreateDesignationType } from '../schema/create-designation-schema';
import type {
  FetchOrganizationMemberDesignationResponseType,
  FetchOrgProjectCategoryResponseType,
} from '../types/org';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '~/hooks/use-axios';
import { decodeArrayBuffer } from '../utils/decode-array-buffer';
import type { ResponseObject } from '../types';
import { useNotification } from '~/hooks/use-notification';
import { extractAxiosError } from '../utils/extract-axios-error';
import type { CreateProjectCategoryType } from '../schema/create-org-project-category-schema';

export const orgProjectCategoryKeys = {
  all: ['org:project-categories'],
  details: () => [orgProjectCategoryKeys.all, 'detail'],
  detail: (id: number) => [orgProjectCategoryKeys.details(), id],
  pagination: (page: number) => [orgProjectCategoryKeys.all, 'page', page],
  search: (query: string) => [orgProjectCategoryKeys.all, 'search', query],
  infinite: () => [orgProjectCategoryKeys.all, 'infinite'],
};

type Options = {
  page?: number;
  search?: string;
};

type UpdateRecordType = [number, CreateProjectCategoryType];
export const useOrgProjectCategoriesQuery = function (
  props: Options = {
    page: 1,
    search: '',
  }
) {
  const { swal } = useNotification();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  type RecordType = FetchOrgProjectCategoryResponseType['data'][number];
  const axios = useAxios();

  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/project-categories', {
      method: 'GET',
      responseType: 'arraybuffer',
    });
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data;
  }

  async function createRecord(payload: CreateProjectCategoryType) {
    await axios.post('/project-categories', payload);
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/project-categories/${id}`, payload);
  }

  function fetchSingleRecord(id: number) {
    return axios.get(`/project-categories/${id}`);
  }

  const recordsQuery = useQuery<RecordType[]>({
    queryKey: orgProjectCategoryKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  });

  const singleRecordQuery = useQuery({
    queryKey: orgProjectCategoryKeys.detail(selectedRecordId!),
    queryFn: () => fetchSingleRecord(selectedRecordId!),
    enabled: !!selectedRecordId,
  });

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orgProjectCategoryKeys.all });
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: updateRecord,
    onMutate: async (payload) => {
      // await queryClient.cancelQueries({
      //   queryKey: [departmentQueryKeys.all, departmentQueryKeys.detail(payload[0])],

      // })
      const previousData = queryClient.getQueryData<RecordType[]>(
        orgProjectCategoryKeys.all
      );
      queryClient.setQueryData<RecordType[]>(
        orgProjectCategoryKeys.all,
        (old) => {
          return old?.map((record) => {
            if (record.id === payload[0]) {
              return {
                ...record,
                ...payload[1],
              };
            }
            return record;
          });
        }
      );
    },
    onError: (error) => {
      updateRecordMutation.reset();
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          orgProjectCategoryKeys.all,
          // departmentQueryKeys.detail(payload[0]),
        ],
      });
    },
  });

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
  };
};
