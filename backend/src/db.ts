import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Base de datos conectada con éxito a Neon/PostgreSQL');
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;