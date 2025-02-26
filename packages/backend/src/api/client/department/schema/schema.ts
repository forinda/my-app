import z from 'zod';
export const newDepartmentSchema = z.object({
  name: z
    .string({
      message: 'Name is required'
    })
    .min(2, {
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
  organization_id: z.number({
    message: 'Organization ID is required'
  })
});

export const updateDepartmentSchema = z.object({
  department_id: z.string({
    message: 'ID is required'
  }),
  name: z
    .string({
      message: 'Name is required'
    })
    .min(2, {
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
  organization_id: z.number({
    message: 'Organization ID is required'
  })
});

export const addUsersToDepartmentSchema = z.object({
  department_id: z.number({
    message: 'Department ID is required'
  }),
  users: z
    .array(
      z.number({
        message: 'User ID is required'
      })
    )
    .min(1, {
      message: 'At least one user is required'
    }),
  created_by: z.number({}),
  updated_by: z.number({}),
  organization_id: z.number({
    message: 'Organization ID is required'
  })
});
// export const getOrganizationMember``

export type NewDepartmentPayload = z.infer<typeof newDepartmentSchema>;

export type UpdateDepartmentPayload = z.infer<typeof updateDepartmentSchema>;

export type AddUsersToDepartmentPayload = z.infer<
  typeof addUsersToDepartmentSchema
>;
