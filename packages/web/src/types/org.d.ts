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
  user_id: number
  organization_id: number
  organization: SelectOrganizationInterface
  user: SelectUserInterface
  date_joined: string
  is_active: boolean
}
export interface CreateOrganizationResponseType {}
export interface GetOrganizationsResponseType {}
export type FetchOrganizationMembersResponseType = ResponseObject<OrganizationMemberType[]>
