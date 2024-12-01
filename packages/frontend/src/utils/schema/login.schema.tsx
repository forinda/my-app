import z from 'zod';

export const loginSchema = z.object({
  email_or_username: z.string(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;
