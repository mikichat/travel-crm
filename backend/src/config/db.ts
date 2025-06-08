import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'travel',
  password: process.env.DB_PASSWORD || 'travel',
  database: process.env.DB_NAME || 'travel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 