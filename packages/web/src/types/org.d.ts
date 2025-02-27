import type { GenderSchemaType } from '@/schema/gender-schema'
import type { ResponseObject } from './utils'

export interface InsertOrganizationInterface {
  name: string
  description: string
}
export interface SelectOrganizationInterface {
  id: string
  name: string
  description: string
  uuid: string
}

export interface SelectUserInterface {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface OrganizationMemberType {
  id: number
  organization_id: number
  user_id: number
  is_active: boolean
  designation_id: number | null
  department_id: null | number
  date_joined: string
  created_by: number
  updated_by: number
  deleted_by: null
  created_at: string
  updated_at: string
  deleted_at: null | number
  user: {
    first_name: string
    last_name: string
    gender: GenderSchemaType
    email: string
    is_admin: boolean
    username: string
    id: number
  }
  organization: {
    name: string
    description: string
    id: number
    uuid: string
  }
  department: null
  role: null
}

type DepartmentType = {
  id: number
  uuid: string
  organization_id: number
  name: string
  description: string
  created_by: number
  updated_by: number
  deleted_by: null
  created_at: string
  updated_at: string
  deleted_at: null | string
  members: {
    id: number
    user_id: number
    department_id: number
    user: {
      username: string
      email: string
      first_name: string
      last_name: string
      phone_number: string
      avatar: string
      gender: GenderSchemaType
    }
  }[]
  user_roles: []
}

type OrganizationDesignationType = {
  id: number
  name: string
  description: string
  organization_id: number
  created_by: number
  updated_by: number
  deleted_by: null
  created_at: string
  updated_at: string
  deleted_at: null
}

type DepartmentTitleType = {
  id: number
  name: string
  description: string
  organization_id: number
  created_by: number
  updated_by: number
  deleted_by: null
  created_at: string
  updated_at: string
  deleted_at: null
}

export type OrganizationmemberDesignationType = {
  id: number
  name: string
  description: string
  organization_id: number
  created_by: number
  updated_by: number
  deleted_by: null
  created_at: string
  updated_at: string
  deleted_at: null
}

export interface UserOrganizationInviteInterface {
  id: number
  user_id: number
  organization_id: number
  designation_id: number
  email: string
  status: 'pending' | 'accepted' | 'rejected'
  expiry_date: string
  created_by: number
  updated_by: number
  deleted_by: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  organization: { id: number; name: string }
  designation: { id: number; name: string }
  user: { id: number; first_name: string; last_name: string; avatar: string }
  creator: { id: number; first_name: string; last_name: string; avatar: string }
}

// export type OrganizationMemberInterface={}
export interface CreateOrganizationResponseType {}
export interface GetOrganizationsResponseType {}
export type FetchOrganizationMembersResponseType = ResponseObject<OrganizationMemberType[]>
export type FetchOrganizationResponseType = ResponseObject<SelectOrganizationInterface[]>
export type FetchDepartmentResponseType = ResponseObject<DepartmentType[]>
export type FetchOrganizationDesignationResponseType = ResponseObject<OrganizationDesignationType[]>
export type FetchDepartmentTitleResponseType = ResponseObject<DepartmentTitleType[]>
export type FetchOrganizationMemberDesignationResponseType = ResponseObject<
  OrganizationmemberDesignationType[]
>
export type FetchUserOrganizationInvitesResponseType = ResponseObject<
  UserOrganizationInviteInterface[]
>
