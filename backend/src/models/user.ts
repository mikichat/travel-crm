import { RowDataPacket } from 'mysql2';
import pool from '../config/db';

export interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
}

export const findUserById = async (id: number): Promise<User | undefined> => {
  const [rows] = await pool.execute<User[]>(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}; 