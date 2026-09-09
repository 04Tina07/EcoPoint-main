import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Base de datos conectada con éxito a Neon/PostgreSQL');
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;