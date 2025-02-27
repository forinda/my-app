import { z } from 'zod'

export const addDepartmentRoleSchema = z.object({
  user_id: z.number(),
  department_id: z.number(),
  role_title_id: z.number(),
  start_date: z.date(),
  is_active: z.boolean({}).default(true),
})

export type AddDepartmentRoleSchema = z.infer<typeof addDepartmentRoleSchema>
