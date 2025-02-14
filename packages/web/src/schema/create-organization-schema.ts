import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z
      .string({
          message: "Name is required",
      })
      .min(3, {
          message: "Name must be at least 3 characters long",
      })
      .max(255, {
          message: "Name must be at most 255 characters long",
      }),
  description: z
      .string({
          message: "Description is required",
      })
      .min(3, {
          message: "Description must be at least 3 characters long",
      })
      .max(255, {
          message: "Description must be at most 255 characters long",
      }),
})

export const typedCreateOrganizationSchema = toTypedSchema(createOrganizationSchema)
export type CreateOrganizationSchemaType = z.infer<typeof createOrganizationSchema>
