import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const registerUserSchema = z.object({})

export const typedRegisterUserSchema = toTypedSchema(registerUserSchema)

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>
