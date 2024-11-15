import z from 'zod';

export const loginSchema = z.object({
    emailOrUsername: z.string(),
  password: z.string().min(6)});

export type LoginSchema = z.infer<typeof loginSchema>;
