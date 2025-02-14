import type { GenderSchemaType } from '@/schema/gender-schema'
import type { RouteMeta } from 'vue-router'
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
}

export type RouteMetaType = RouteMeta & {
  requiresAuth?: boolean
  requiresAdmin?: boolean
  permissions?: string[]
}
