import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB = process.env.POSTGRES_DB;
export const DB_USER = process.env.POSTGRES_USER;
export const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
