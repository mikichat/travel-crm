import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/customers - 모든 고객 조회
export async function GET() {
  try {
    const db = getDatabase();
    const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('고객 조회 오류:', error);
    return NextResponse.json({ error: '고객 조회 실패' }, { status: 500 });
  }
}

// POST /api/customers - 고객 등록
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO customers (name, email, phone, address, notes, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      name, 
      email || '', 
      phone || '', 
      address || '', 
      notes || '',
      new Date().toISOString(),
      new Date().toISOString()
    );
    
    const newCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('고객 등록 오류:', error);
    return NextResponse.json({ error: '고객 등록 실패' }, { status: 500 });
  }
} 