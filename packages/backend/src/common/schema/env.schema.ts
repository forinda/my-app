import z from 'zod';

const numberString = z.string().refine((value) => {
  return !isNaN(Number(value));
});

const env = z.enum(['development', 'production', 'test']);

export const envSchema = z.object({
  NODE_ENV: env.default('development'),
  PORT: numberString.default('5050'),
  HOST: z.string().default('localhost'),
  DATABASE_URL: z.string(),
  REF_JWT_SECRET: z.string(),
  REF_JWT_EXPIRES_IN: z.string().default('1d'),
  AC_JWT_ACCESS_SECRET: z.string(),
  AC_JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  COOKIE_SECRET: z
    .string()
    .default('f39c3e1f61e8dcd17ff18b09ef38c4bc4ea2b785374b459d4fa50389b6'),
  SESSION_COOKIE_NAME: z.string().default('_sid_lsd'),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  COOKIE_DOMAIN: z.string().default('localhost'),
  COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).default('strict'),
  COOKIE_HTTP_ONLY: z.coerce.boolean().default(true),
  RESEND_MAIL_KEY: z.string(),
  RESEND_MAIL_FROM: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_TLS: z.coerce.boolean().default(false)
});

export type EnvType = z.infer<typeof envSchema>;
