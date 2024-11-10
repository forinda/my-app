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

export type CreateUserRequestBody = z.infer<typeof createUserRequestSchema>;
