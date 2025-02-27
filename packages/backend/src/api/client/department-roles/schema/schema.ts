import z from 'zod';

export const newDepartmentUserRoleSchema = z.object({
  user_id: z.number(),
  department_id: z.number(),
  role_title_id: z.number(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  is_active: z.boolean({}).default(true),
  created_by: z.number({}).optional(),
  updated_by: z.number({}).optional(),
  organization_id: z.number({})
});

export const updateDepartmentUserRoleSchema = z.object({
  department_role_id: z.number(),
  is_active: z.boolean({}).optional(),
  start_date: z.coerce.string().date().optional(),
  end_date: z.coerce.string().datetime().nullable().optional(),
  updated_by: z.number({}).optional(),
  organization_id: z.number({})
});

// export const getOrganizationMember``

export type DepartmentUserRoleCreationRequest = z.infer<
  typeof newDepartmentUserRoleSchema
>;

export type UpdateUserRoleRequest = z.infer<
  typeof updateDepartmentUserRoleSchema
>;
