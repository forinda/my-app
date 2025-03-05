import { useState } from 'react';
import type { CreateDesignationType } from '../schema/create-designation-schema';
import { decodeArrayBuffer } from '../utils/decode-array-buffer';
import type { ResponseObject } from '../types';
import type { AddUserToOrgModel } from '../schema/add-to-or-remove-user-from-org-schema copy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { extractAxiosError } from '../utils/extract-axios-error';
import type { FetchOrganizationMembersResponseType } from '../types/org';
import { useAxios } from '~/hooks/use-axios';
import { useNotification } from '~/hooks/use-notification';

export const orgMemberKeys = {
  all: ['org:members'],
  details: () => [orgMemberKeys.all, 'detail'],
  detail: (id: number) => [orgMemberKeys.details(), id],
  pagination: (page: number) => [orgMemberKeys.all, 'page', page],
  search: (query: string) => [orgMemberKeys.all, 'search', query],
  infinite: () => [orgMemberKeys.all, 'infinite'],
};

type Options = {
  page?: number;
  search?: string;
};

type UpdateRecordType = [number, CreateDesignationType];
export const useOrgMembersQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  // const selectedRecordId = ref<number | null>(null)
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  type RecordType = FetchOrganizationMembersResponseType['data'][number];
  const axios = useAxios();
  const { swal } = useNotification();
  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/organization-members', {
      method: 'GET',
      responseType: 'arraybuffer',
    });
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data;
  }

  async function createRecord(
    payload: AddUserToOrgModel & {
      emails: string[];
    },
  ) {
    await axios.post('/organization-members/add', payload);
  }

  async function deleteRecord(payload: AddUserToOrgModel) {
    await axios.post('/organization-members/remove', payload);
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/organization-members/${id}`, payload);
  }

  function fetchSingleRecord(id: number) {
    return axios.get(`/organization-members/${id}`);
  }

  // function setSelectedRecordId(id: number | null) {
  //   selectedRecordId.value = id
  // }
  const recordsQuery = useQuery<RecordType[]>({
    queryKey: orgMemberKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  });

  const singleRecordQuery = useQuery({
    queryKey: orgMemberKeys.detail(selectedRecordId!),
    queryFn: () => fetchSingleRecord(selectedRecordId!),
    enabled: !!selectedRecordId,
  });

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: async (error) => {
      await swal.fire({
        title: 'Error',
        text: extractAxiosError(error),
        icon: 'error',
      });
    },
    onSuccess: async () => {
      await swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Record created successfully',
      });

      queryClient.invalidateQueries({ queryKey: orgMemberKeys.all });
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: updateRecord,
    onMutate: async (payload) => {
      // await queryClient.cancelQueries({
      //   queryKey: [departmentQueryKeys.all, departmentQueryKeys.detail(payload[0])],

      // })
      const previousData = queryClient.getQueryData<RecordType[]>(
        orgMemberKeys.all,
      );
      queryClient.setQueryData<RecordType[]>(orgMemberKeys.all, (old) => {
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
    onError: async (error) => {
      updateRecordMutation.reset();
      await swal.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      });
    },
    onSuccess: async () => {
      await swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Record updated successfully',
      });
      queryClient.invalidateQueries({
        queryKey: [
          orgMemberKeys.all,
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
