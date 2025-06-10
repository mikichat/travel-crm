import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/schedules - 모든 일정 조회
export async function GET() {
  try {
    const db = getDatabase();
    const schedules = db.prepare('SELECT * FROM schedules ORDER BY createdAt DESC').all();
    return NextResponse.json(schedules);
  } catch (error) {
    console.error('일정 조회 오류:', error);
    return NextResponse.json({ error: '일정 조회 실패' }, { status: 500 });
  }
}

// POST /api/schedules - 일정 등록
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, customerId, description, memo } = body;

    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO schedules (title, date, customerId, description, memo, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      title, 
      date, 
      customerId || null, 
      description || '', 
      memo || '',
      new Date().toISOString()
    );
    
    const newSchedule = db.prepare('SELECT * FROM schedules WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    console.error('일정 등록 오류:', error);
    return NextResponse.json({ error: '일정 등록 실패' }, { status: 500 });
  }
} 