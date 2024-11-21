import { z } from 'zod';

export const loginUserRequestSchema = z.object({
  password: z.string().min(8),
  email_or_username: z.string(),
  ip: z.string().ip().optional()
});

export const refreshTokenRequestSchema = z.object({
  refresh_token: z.string(),
  session_id: z.string()
});

export type LoginUserRequestBody = z.infer<typeof loginUserRequestSchema>;

export type RefreshTokenRequestBody = z.infer<typeof refreshTokenRequestSchema>;
