import type { FetchOrganizationMembersResponseType } from "@/types/org";
import { createColumnHelper } from "@tanstack/vue-table";
import moment from "moment";

const colHelper =
  createColumnHelper<FetchOrganizationMembersResponseType['data'][number]>();
export const orgMemberTableCols = [
  colHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  colHelper.accessor('user.first_name', {
    cell: (row) => row.getValue(),
    header: 'First Name',
  }),
  colHelper.accessor('user.last_name', {
    cell: (row) => row.getValue(),
    header: 'Last Name',
  }),
  colHelper.accessor('organization.name', {
    cell: (row) => row.getValue(),
    header: 'Organization',
  }),
  colHelper.accessor('date_joined', {
    cell: (row) => moment(row.getValue()).format('MMM DD, YYYY'),
    header: 'Date Joined',
  }),
  colHelper.accessor('is_active', {
    cell: (row) => (row.getValue() ? 'Active' : 'Inactive'),
    header: 'Status',
  }),
];
