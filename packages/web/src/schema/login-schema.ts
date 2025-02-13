import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const loginUserSchema = z.object({
  emailOrUsername: z.string().nonempty('Email or username is required'),
  password: z.string().nonempty('Password is required'),
})

export const typedLoginUserSchema = toTypedSchema(loginUserSchema)

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>
