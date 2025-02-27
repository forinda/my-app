import z from 'zod';

export const newProjectCategorySchema = z.object({
  name: z
    .string({
      message: 'Name is required'
    })
    .min(3, {
      message: 'Name must be at least 3 characters long'
    })
    .max(255, {
      message: 'Name must be at most 255 characters long'
    }),
  description: z
    .string({
      message: 'Description is required'
    })
    .min(3, {
      message: 'Description must be at least 3 characters long'
    })
    .max(255, {
      message: 'Description must be at most 255 characters long'
    }),
  created_by: z.number({}).optional(),
  updated_by: z.number({}).optional(),
  organization_id: z.number({}).optional()
});

export const updateProjectCategorySchema = z.object({
  category_id: z.number({
    message: 'Category ID is required'
  }),
  name: z
    .string({
      message: 'Name is required'
    })
    .min(3, {
      message: 'Name must be at least 3 characters long'
    })
    .max(255, {
      message: 'Name must be at most 255 characters long'
    })
    .optional(),
  description: z
    .string({
      message: 'Description is required'
    })
    .min(3, {
      message: 'Description must be at least 3 characters long'
    })
    .max(255, {
      message: 'Description must be at most 255 characters long'
    })
    .optional(),
  updated_by: z.number({}).optional(),
  organization_id: z.number({}).optional()
});

// export const getOrganizationMember``

export type CreateProductCategoryPayloadType = z.infer<
  typeof newProjectCategorySchema
>;

export type UpdateProjectCategoryPayloadType = z.infer<
  typeof updateProjectCategorySchema
>;
