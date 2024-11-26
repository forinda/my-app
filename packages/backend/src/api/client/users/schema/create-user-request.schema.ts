import { genderSchema } from '@/common/schema/gender';
import { z } from 'zod';

export const createUserRequestSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  gender: genderSchema,
  username: z.string(),
  password: z.string().min(8)
});

export const asssignOrRemoveUserRoleRequestSchema = z.object({
  user_id: z.number(),
  role_ids: z.array(z.number())
});

export type CreateUserRequestBody = z.infer<typeof createUserRequestSchema>;

export type AssignOrRemoveUserRoleRequestBody = z.infer<
  typeof asssignOrRemoveUserRoleRequestSchema
>;
