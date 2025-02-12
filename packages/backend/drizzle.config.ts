import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema',
  dialect: 'postgresql',
  casing: 'snake_case',
  migrations: {
    prefix: 'unix'
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
