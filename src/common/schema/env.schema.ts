import z from "zod";

const numberString = z.string().refine((value) => {
  return !isNaN(Number(value));
});

const env = z.enum(["development", "production", "test"]);

export const envSchema = z.object({
  MODE: env.default("development"),
  PORT: numberString.default("8080"),
  HOST: z.string().default("localhost"),
});

export type EnvType = z.infer<typeof envSchema>;
