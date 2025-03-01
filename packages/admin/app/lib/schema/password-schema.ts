import { z } from 'zod';

export const passwordSchema = z
  .string({ message: 'Password is required' })

  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password must be at most 20 characters')
  .refine((val) => /[a-z]/.test(val), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), {
    message: 'Password must contain at least one special character',
  });
