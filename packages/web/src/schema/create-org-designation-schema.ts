import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const createOrgDesignationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
})
export const typedCreateOrgDesignationSchema = toTypedSchema(createOrgDesignationSchema)
export type OrgDesignationModel = z.infer<typeof createOrgDesignationSchema>
