import type { GenderSchemaType } from '@/schema/gender-schema'

export type SessionUserType = {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
  gender: GenderSchemaType
  username: string
  is_active: boolean
}
