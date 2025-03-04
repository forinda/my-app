import type { GenderSchemaType } from '@/schema/gender-schema'
import type { RouteMeta } from 'vue-router'

type UserSession = {
  id: number
  auth_session_organization_id?: string
  organization?: {
    id: number
    name: string
  }
}
export type SessionUserType = {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: GenderSchemaType
  username: string
  is_active: boolean
  phone_number: string
  is_email_verified: boolean
  is_admin: boolean
  avatar: string
  sessions: UserSession[]
}

export type RouteMetaType = RouteMeta & {
  requiresAuth?: boolean
  requiresAdmin?: boolean
  permissions?: string[]
}
