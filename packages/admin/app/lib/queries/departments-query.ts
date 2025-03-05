import { useMemo, useState } from 'react';
import type { CreateDepartmentType } from '../schema/create-department-schema';
import type { FetchDepartmentResponseType } from '../types/org';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '~/hooks/use-axios';
import { useNotification } from '~/hooks/use-notification';
import type { ResponseObject } from '../types';
import { decodeArrayBuffer } from '../utils/decode-array-buffer';
import type { AddDepartmentRoleSchema } from '../schema/add-department-role-schema';
import { extractAxiosError } from '../utils/extract-axios-error';

export const departmentQueryKeys = {
  all: ['org:departments'],
  details: () => [departmentQueryKeys.all, 'detail'],
  detail: (id: string) => [departmentQueryKeys.details(), id],
  pagination: (page: number) => [departmentQueryKeys.all, 'page', page],
  search: (query: string) => [departmentQueryKeys.all, 'search', query],
  infinite: () => [departmentQueryKeys.all, 'infinite'],
};

type Options = {
  page?: number;
  search?: string;
};

type AddDepartmentMemberPayload = {
  users: number[];
};

type UpdateRecordType = [string, CreateDepartmentType];
type AddUserToDepartmentType = [number, AddDepartmentMemberPayload];
// type AddRoleToDepartmentType = [number, AddDepartmentRolePayload]
export type DepartmentType = FetchDepartmentResponseType['data'][number];
export const useDepartmentQuery = function (
  props: Options = {
    page: 1,
    search: '',
  }
) {
  // const selectedRecordId = ref<DepartmentType['uuid'] | null>(null)
  const [selectedRecordId, setSelectedRecordId] = useState<
    DepartmentType['uuid'] | null
  >(null);
  const queryClient = useQueryClient();
  const axios = useAxios();
  const { swal } = useNotification();
  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/departments', {
      method: 'GET',
      responseType: 'arraybuffer',
    });
    return decodeArrayBuffer<ResponseObject<DepartmentType[]>>(resp.data).data;
  }

  async function createRecord(payload: CreateDepartmentType) {
   return await axios.post('/departments', payload);
  }

  function updateRecord([id, payload]: UpdateRecordType) {
    return axios.put(`/departments/${id}`, payload);
  }

  function fetchSingleRecord(id: DepartmentType['uuid']) {
    return axios.get(`/departments/${id}`);
  }

  function addDepartmentMember([id, payload]: AddUserToDepartmentType) {
    return axios.post(`/departments/add-member/${id}`, payload);
  }

  function addRoleToDepartment(payload: AddDepartmentRoleSchema) {
    return axios.post(`/department-roles`, payload);
  }

  const recordsQuery = useQuery<DepartmentType[]>({
    queryKey: departmentQueryKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  });

  const singleRecordQuery = useQuery({
    queryKey: departmentQueryKeys.detail(selectedRecordId!),
    queryFn: () => fetchSingleRecord(selectedRecordId!),
    enabled: !!selectedRecordId,
  });

  const createRecordMutation = useMutation({
    mutationFn: createRecord,
    onError: (error) => {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: extractAxiosError(error),
      });
    },
    onSuccess:async (resp) => {
      console.log({resp});

await swal.fire({
  icon: 'success',
  title: 'Success',
  text: decodeArrayBuffer<any>(resp.data).message,
})
      queryClient.invalidateQueries({ queryKey: departmentQueryKeys.all });
    },
  });

  const updateRecordMutation = useMutation({
    mutationFn: updateRecord,
    onMutate: async (payload) => {
      // await queryClient.cancelQueries({
      //   queryKey: [departmentQueryKeys.all, departmentQueryKeys.detail(payload[0])],

      // })
      const previousData = queryClient.getQueryData<DepartmentType[]>(
        departmentQueryKeys.all
      );
      queryClient.setQueryData<DepartmentType[]>(
        departmentQueryKeys.all,
        (old) => {
          return old?.map((record) => {
            if (record.uuid === payload[0]) {
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
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          departmentQueryKeys.all,
          // departmentQueryKeys.detail(payload[0]),
        ],
      });
    },
  });

  const addUserToDepartmentMutation = useMutation({
    mutationFn: addDepartmentMember,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: departmentQueryKeys.all,
      });
    },
  });
  const addRoleToDepartmentMutation = useMutation({
    mutationFn: addRoleToDepartment,
    onError: async (error) => {
      // toast.add({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: extractAxiosError(error),
      //   closable: true,
      //   life: 5000,
      // })
      await swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: departmentQueryKeys.all,
      });
    },
  });

  const selectedDepartment = useMemo(() => {
    if (!selectedRecordId) return null;
    return recordsQuery.data!.find(
      (record) => record.uuid === selectedRecordId
    );
  }, [selectedRecordId, recordsQuery.data]);

  return {
    recordsQuery,
    createRecordMutation,
    updateRecordMutation,
    singleRecordQuery,
    setSelectedRecordId,
    addUserToDepartmentMutation,
    addRoleToDepartmentMutation,
    selectedDepartment,
  };
};
