import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export * from 'drizzle-orm';
 
neonConfig.fetchConnectionCache = true;
 
const sql = neon(process.env.DRIZZLE_DB_URL!);

export const db = drizzle(sql, { logger: true });