import z from 'zod';

const numberString = z.string().refine((value) => {
  return !isNaN(Number(value));
});

const env = z.enum(['development', 'production', 'test']);

export const envSchema = z.object({
  NODE_ENV: env.default('development'),
  PORT: numberString.default('8080'),
  HOST: z.string().default('localhost'),
  DATABASE_URL: z.string(),
  REF_JWT_SECRET: z.string(),
  REF_JWT_EXPIRES_IN: z.string(),
  AC_JWT_ACCESS_SECRET: z.string(),
  AC_JWT_ACCESS_EXPIRES_IN: z.string(),
  DEFAULT_USER_PASSWORD: z.string(),
  DEFAULT_USER_EMAIL: z.string(),
  DEFAULT_USER_NAME: z.string()
});

export type EnvType = z.infer<typeof envSchema>;
