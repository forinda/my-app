import z from 'zod';
import { passwordSchema } from './password-schema';

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({ message: 'Invalid email address' }),
  otp: z
    .string({ message: 'OTP is required' })
    .length(6, 'OTP must be 6 characters'),
  password: passwordSchema,
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
