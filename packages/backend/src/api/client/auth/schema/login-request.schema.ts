import { z } from 'zod';

export const loginUserRequestSchema = z.object({
  password: z.string().min(8),
  emailOrUsername: z.string(),
  ip: z.string().ip().optional()
});

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
  sessionId: z.string()
});

export type LoginUserRequestBody = z.infer<typeof loginUserRequestSchema>;

export type RefreshTokenRequestBody = z.infer<typeof refreshTokenRequestSchema>;
