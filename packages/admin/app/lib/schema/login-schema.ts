import { z } from 'zod';
import { passwordSchema } from './password-schema';

export const loginUserSchema = z.object({
  emailOrUsername: z
    .string({ message: 'Email or username is required' })
    .nonempty('Email or username is required'),
  password: passwordSchema,

  rememberMe: z.coerce.boolean().default(false),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
