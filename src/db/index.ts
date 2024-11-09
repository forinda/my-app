import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!, { casing: 'snake_case' });

export default db;
