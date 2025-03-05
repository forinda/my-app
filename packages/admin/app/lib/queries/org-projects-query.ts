import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '~/hooks/use-axios';
import { decodeArrayBuffer } from '../utils/decode-array-buffer';
import type { ResponseObject } from '../types';
import { useNotification } from '~/hooks/use-notification';
import { extractAxiosError } from '../utils/extract-axios-error';
import type { CreateOrgProjectType } from '../schema/create-org-project-schema';
import type { FetchOrgProjectsResponseType } from '../types/org';

export const orgProjectCategoryKeys = {
  all: ['org:projects'],
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

type UpdateRecordType = [number, CreateOrgProjectType];
export const useOrgProjectsQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  const { swal } = useNotification();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  type RecordType = FetchOrgProjectsResponseType['data'][number];
  const axios = useAxios();

  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/projects', {
      method: 'GET',
      responseType: 'arraybuffer',
    });
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data;
  }

  async function createRecord(payload: CreateOrgProjectType) {
    return await axios.post('/projects', payload);
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/projects/${id}`, payload);
  }

  function fetchSingleRecord(id: number) {
    return axios.get(`/projects/${id}`);
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
    onError: async (error) => {
      await swal.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      });
    },
    onSuccess: async (resp) => {
      await swal.fire({
        icon: 'success',
        title: 'Success',
        text: decodeArrayBuffer<any>(resp.data).message,
      });
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
        orgProjectCategoryKeys.all,
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
        },
      );
    },
    onError: async (error) => {
      updateRecordMutation.reset();
      await swal.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      });
    },
    onSuccess: async (resp) => {
      await swal.fire({
        icon: 'success',
        title: 'Success',
        text: decodeArrayBuffer<any>(resp.data).message,
      });
      queryClient.invalidateQueries({
        queryKey: [
          orgProjectCategoryKeys.all,
          // departmentQueryKeys.detail(payload[0]),
        ],
      });
    },
  });

  return {
    recordsQuery,
    createRecordMutation,
    updateRecordMutation,
    singleRecordQuery,
    setSelectedRecordId,
  };
};
