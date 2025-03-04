import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { FetchUserOrganizationInvitesResponseType } from '../types/org';
import { useAxios } from '~/hooks/use-axios';
import { decodeArrayBuffer } from '../utils/decode-array-buffer';
import type { ResponseObject } from '../types';
import { organizationQueryKeysKeys } from './use-organization';
import { useNotification } from '~/hooks/use-notification';
import { extractAxiosError } from '../utils/extract-axios-error';

export const orgMemberInviteKeys = {
  all: ['org:member-invites'],
  details: () => [orgMemberInviteKeys.all, 'detail'],
  detail: (id: number) => [orgMemberInviteKeys.details(), id],
  pagination: (page: number) => [orgMemberInviteKeys.all, 'page', page],
  search: (query: string) => [orgMemberInviteKeys.all, 'search', query],
  infinite: () => [orgMemberInviteKeys.all, 'infinite'],
};

type Options = {
  page?: number;
  search?: string;
};

export const useOrgMemberInvitesQuery = function (
  props: Options = {
    page: 1,
    search: '',
  },
) {
  // const selectedRecordId = ref<number | null>(null)
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  type RecordType = FetchUserOrganizationInvitesResponseType['data'][number];
  const { swal } = useNotification();
  type RespondPayload = { action: 'accepted' | 'rejected' };
  type RespondToInviteType = [number, RespondPayload];
  const axios = useAxios();
  async function fetchRecords() {
    const resp = await axios.get<ArrayBuffer>('/organization-members/invites', {
      method: 'GET',
      responseType: 'arraybuffer',
    });
    return decodeArrayBuffer<ResponseObject<RecordType[]>>(resp.data).data;
  }

  async function respondToInvite([id, payload]: RespondToInviteType) {
    await axios.post('/organization-members/respond/' + id, payload);
  }

  const recordsQuery = useQuery<RecordType[]>({
    queryKey: orgMemberInviteKeys.all,
    queryFn: fetchRecords,
    initialData: [],
  });

  const respondToInviteMutation = useMutation({
    mutationFn: respondToInvite,
    onError: async (error) => {
      // toast.add({
      //   severity: 'error',
      //   closable: true,
      //   detail: extractAxiosError(error),
      //   summary: 'Error',
      // })
      await swal.fire({
        title: 'Error',
        text: extractAxiosError(error),
        icon: 'error',
      });
    },
    onSuccess: async () => {
      // toast.add({
      //   severity: 'success',
      //   closable: true,
      //   detail: 'Successfully responded to invite',
      //   summary: 'Success',
      // })
      await swal.fire({
        title: 'Success',
        text: 'Successfully responded to invite',
        icon: 'success',
      });
      //  await queryClient.invalidateQueries([...orgMemberInviteKeys.all, ...organizationQueryKeysKeys.all])
      await queryClient.invalidateQueries({
        queryKey: orgMemberInviteKeys.all,
      });
      await queryClient.invalidateQueries({
        queryKey: organizationQueryKeysKeys.all,
      });
    },
  });

  return {
    recordsQuery,
    respondToInviteMutation,
  };
};
