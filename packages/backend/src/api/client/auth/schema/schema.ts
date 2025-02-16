import { validatePhone } from '@/common/utils/phone-number-format';
import { z } from 'zod';

export const registerUserSchema = z.object({
  first_name: z.string({ message: 'First name is required' }),
  last_name: z.string({ message: 'Last name is required' }),
  email: z
    .string({
      message: 'Email is required'
    })
    .email({ message: 'Invalid email address' }),
  username: z.string({
    message: 'Username is required'
  }),
  gender: z.enum(['Male', 'Female', 'Other']),
  phone_number: z
    .string({
      message: 'Phone number is required'
    })
    .min(10, 'Phone number must be at least 10 characters')
    .refine(validatePhone.validate, validatePhone.message),
  password: z
    .string({
      message: 'Password is required'
    })
    .min(8, 'Password must be at least 8 characters')
    // regex lowercase
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // regex uppercase
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // regex number
    .regex(/[0-9]/, 'Password must contain at least one number')
    // regex special character
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    )
});

export const loginUserSchema = z.object({
  emailOrUsername: z.string({ message: 'Email or username is required' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    // regex lowercase
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // regex uppercase
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // regex number
    .regex(/[0-9]/, 'Password must contain at least one number')
    // regex special character
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    ),

  rememberMe: z.boolean().default(false),
  ip: z.string({ message: 'IP address is required' })
});

export const validateSwitchOrganizationSchema = z.object({
  organization_id: z.string({ message: 'Organization ID is required' })
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type ValidateSwitchOrganizationInput = z.infer<
  typeof validateSwitchOrganizationSchema
>;
