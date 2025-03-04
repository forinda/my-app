import { useState } from 'react';
import type { CreateDesignationType } from '../schema/create-designation-schema';
import type { FetchOrganizationMemberDesignationResponseType } from '../types/org';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '~/hooks/use-axios';
import { decodeArrayBuffer } from '../utils/decode-array-buffer';
import type { ResponseObject } from '../types';
import { useNotification } from '~/hooks/use-notification';
import { extractAxiosError } from '../utils/extract-axios-error';

export const orgDesignationKeys = {
  all: ['org:designations'],
  details: () => [orgDesignationKeys.all, 'detail'],
  detail: (id: number) => [orgDesignationKeys.details(), id],
  pagination: (page: number) => [orgDesignationKeys.all, 'page', page],
  search: (query: string) => [orgDesignationKeys.all, 'search', query],
  infinite: () => [orgDesignationKeys.all, 'infinite'],
};

type Options = {
  page?: number;
  search?: string;
};

type UpdateRecordType = [number, CreateDesignationType];
export const useOrgDesignationQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  const { swal } = useNotification();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  type RecordType =
    FetchOrganizationMemberDesignationResponseType['data'][number];
  const axios = useAxios();

  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/organization-designations', {
      method: 'GET',
      responseType: 'arraybuffer',
    });
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data;
  }

  async function createRecord(payload: CreateDesignationType) {
    await axios.post('/organization-designations', payload);
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/organization-designations/${id}`, payload);
  }

  function fetchSingleRecord(id: number) {
    return axios.get(`/organization-designations/${id}`);
  }

  const recordsQuery = useQuery<RecordType[]>({
    queryKey: orgDesignationKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  });

  const singleRecordQuery = useQuery({
    queryKey: orgDesignationKeys.detail(selectedRecordId!),
    queryFn: () => fetchSingleRecord(selectedRecordId!),
    enabled: !!selectedRecordId,
  });

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orgDesignationKeys.all });
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: updateRecord,
    onMutate: async (payload) => {
      // await queryClient.cancelQueries({
      //   queryKey: [departmentQueryKeys.all, departmentQueryKeys.detail(payload[0])],

      // })
      const previousData = queryClient.getQueryData<RecordType[]>(
        orgDesignationKeys.all,
      );
      queryClient.setQueryData<RecordType[]>(orgDesignationKeys.all, (old) => {
        return old?.map((record) => {
          if (record.id === payload[0]) {
            return {
              ...record,
              ...payload[1],
            };
          }
          return record;
        });
      });
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
          orgDesignationKeys.all,
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
