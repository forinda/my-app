import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
export const PHONE_REGEX = /^(07|01|\+2547|\+2541|2547|2541)\d{8}$/
export const validatePhone = {
  // Kenyan phone numbers must start with 07 or 01 or +2547 or +2541 or 2541 or 2547 with the rest of the 8 digits being numbers
  validate: (phone: string) => PHONE_REGEX.test(phone.toString().trim()),

  message: 'Invalid phone number',
}
export const registerUserSchema = z.object({
  first_name: z.string({ message: 'First name is required' }),
  last_name: z.string({ message: 'Last name is required' }),
  email: z
    .string({
      message: 'Email is required',
    })
    .email({ message: 'Invalid email address' }),
  username: z.string({
    message: 'Username is required',
  }),
  gender: z.enum(['Male', 'Female', 'Other']).default('Other'),
  phone_number: z
    .string({
      message: 'Phone number is required',
    })
    .min(10, 'Phone number must be at least 10 characters')
    .refine(validatePhone.validate, validatePhone.message),
  password: z
    .string({
      message: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters')
    // regex lowercase
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // regex uppercase
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // regex number
    .regex(/[0-9]/, 'Password must contain at least one number')
    // regex special character
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
})

export const typedRegisterUserSchema = toTypedSchema(registerUserSchema)

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>
