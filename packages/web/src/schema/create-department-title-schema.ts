import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const createDepartmentTitleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
})
export const typedCreateDepartmentTitleSchema = toTypedSchema(createDepartmentTitleSchema)
export type CreateDepartmentTitleType = z.infer<typeof createDepartmentTitleSchema>
