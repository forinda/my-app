import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z.string().nonempty('Organization name is required'),
  description: z.string().nonempty('Organization description is required'),
})

export const typedCreateOrganizationSchema = toTypedSchema(createOrganizationSchema)
export type CreateOrganizationSchemaType = z.infer<typeof createOrganizationSchema>
