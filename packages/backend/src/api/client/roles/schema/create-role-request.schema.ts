import { z } from 'zod';

export const createRoleRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.number()).optional()
});

export const updateRoleRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  permissions: z.array(z.number()).optional(),
  role_id: z.number()
});

export type CreateRoleRequestBody = z.infer<typeof createRoleRequestSchema>;

export type UpdateRoleRequestBody = z.infer<typeof updateRoleRequestSchema>;
