import z from 'zod';

export const registerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
  gender: z.enum(['Male', 'Female', 'Other']),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
