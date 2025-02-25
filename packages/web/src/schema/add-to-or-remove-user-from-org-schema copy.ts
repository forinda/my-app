import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const addUserToOrgSchema = z.object({
  // emails: z.array(z.string().email()).min(1, 'At least one user email is required'),
  designation_id: z.number({
    message: 'Please select a designation',
  }),
})

const addOrRemoveMemberEmailSchema = z
  .array(z.string().email())
  .min(1, 'At least one user email is required')

export const typedAddUserToOrgSchema = toTypedSchema(addUserToOrgSchema)
export type AddUserToOrgModel = z.infer<typeof addUserToOrgSchema>

export const typedAddOrRemoveMemberEmailSchema = toTypedSchema(addOrRemoveMemberEmailSchema)
export type AddOrRemoveMemberEmailModel = z.infer<typeof addOrRemoveMemberEmailSchema>
