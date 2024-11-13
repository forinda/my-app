import { z } from 'zod';

export const loginUserRequestSchema = z.object({
  password: z.string().min(8),
  emailOrUsername: z.string()
});

export type LoginUserRequestBody = z.infer<typeof loginUserRequestSchema>;
