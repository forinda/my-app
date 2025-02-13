import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { PATHS } from './paths';
config({ path: PATHS.ENV_FILE });
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
