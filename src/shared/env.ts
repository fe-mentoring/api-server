import z from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  SWAGGER_USER: z.string(),
  SWAGGER_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
