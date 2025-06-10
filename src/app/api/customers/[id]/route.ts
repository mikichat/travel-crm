import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/customers/[id] - 특정 고객 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(params.id);
    
    if (customer) {
      return NextResponse.json(customer);
    } else {
      return NextResponse.json({ error: '고객을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('고객 조회 오류:', error);
    return NextResponse.json({ error: '고객 조회 실패' }, { status: 500 });
  }
}

// PUT /api/customers/[id] - 고객 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE customers 
      SET name = ?, email = ?, phone = ?, address = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      name, 
      email || '', 
      phone || '', 
      address || '', 
      notes || '',
      new Date().toISOString(),
      params.id
    );
    
    if (result.changes > 0) {
      const updatedCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(params.id);
      return NextResponse.json(updatedCustomer);
    } else {
      return NextResponse.json({ error: '고객을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('고객 수정 오류:', error);
    return NextResponse.json({ error: '고객 수정 실패' }, { status: 500 });
  }
}

// DELETE /api/customers/[id] - 고객 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM customers WHERE id = ?').run(params.id);
    
    if (result.changes > 0) {
      return NextResponse.json({ message: '고객이 삭제되었습니다' });
    } else {
      return NextResponse.json({ error: '고객을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('고객 삭제 오류:', error);
    return NextResponse.json({ error: '고객 삭제 실패' }, { status: 500 });
  }
} 