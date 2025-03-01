import { z } from 'zod'

export const createDesignationSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type CreateDesignationType = z.infer<typeof createDesignationSchema>
