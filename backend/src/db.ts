import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Base de datos conectada con éxito a Neon/PostgreSQL');
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;