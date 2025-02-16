import z from 'zod';

export const newDepartmentTitleSchema = z.object({
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
  is_active: z.boolean({}).default(true),
  created_by: z.number({}).optional(),
  updated_by: z.number({}).optional(),
  organization_id: z.number({}).optional()
});

export const updateDepartmentTitleSchema = z.object({
  title_id: z.number({
    message: 'Title ID is required'
  }),
  id: z.number({
    message: 'ID is required'
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
  is_active: z.boolean({}).optional(),
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

export type DepartmentTitleCreationRequest = z.infer<
  typeof newDepartmentTitleSchema
>;

export type UpdateDepartmentTitleRequest = z.infer<
  typeof updateDepartmentTitleSchema
>;
