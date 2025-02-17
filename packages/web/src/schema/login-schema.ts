import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const loginUserSchema = z.object({
  emailOrUsername: z.string({ message: "Email or username is required" }),
  password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      // regex lowercase
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      // regex uppercase
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      // regex number
      .regex(/[0-9]/, "Password must contain at least one number")
      // regex special character
      .regex(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character",
      ),

  rememberMe: z.boolean().default(false),
});

export const typedLoginUserSchema = toTypedSchema(loginUserSchema)

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>
