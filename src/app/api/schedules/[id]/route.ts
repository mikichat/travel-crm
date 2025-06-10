import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/schedules/[id] - 특정 일정 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const schedule = db.prepare('SELECT * FROM schedules WHERE id = ?').get(params.id);
    
    if (schedule) {
      return NextResponse.json(schedule);
    } else {
      return NextResponse.json({ error: '일정을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('일정 조회 오류:', error);
    return NextResponse.json({ error: '일정 조회 실패' }, { status: 500 });
  }
}

// PUT /api/schedules/[id] - 일정 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, date, customerId, description, memo } = body;

    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE schedules 
      SET title = ?, date = ?, customerId = ?, description = ?, memo = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      title, 
      date, 
      customerId || null, 
      description || '', 
      memo || '',
      params.id
    );
    
    if (result.changes > 0) {
      const updatedSchedule = db.prepare('SELECT * FROM schedules WHERE id = ?').get(params.id);
      return NextResponse.json(updatedSchedule);
    } else {
      return NextResponse.json({ error: '일정을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('일정 수정 오류:', error);
    return NextResponse.json({ error: '일정 수정 실패' }, { status: 500 });
  }
}

// DELETE /api/schedules/[id] - 일정 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM schedules WHERE id = ?').run(params.id);
    
    if (result.changes > 0) {
      return NextResponse.json({ message: '일정이 삭제되었습니다' });
    } else {
      return NextResponse.json({ error: '일정을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('일정 삭제 오류:', error);
    return NextResponse.json({ error: '일정 삭제 실패' }, { status: 500 });
  }
} 