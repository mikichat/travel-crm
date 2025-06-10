import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/reservations/[id] - 특정 예약 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const reservation = db.prepare('SELECT * FROM reservations WHERE id = ?').get(params.id);
    
    if (reservation) {
      return NextResponse.json(reservation);
    } else {
      return NextResponse.json({ error: '예약을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('예약 조회 오류:', error);
    return NextResponse.json({ error: '예약 조회 실패' }, { status: 500 });
  }
}

// PUT /api/reservations/[id] - 예약 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      title, duration, region, meetingDate, meetingTime, meetingPlace, 
      manager, reservationMaker, reservationMakerContact, 
      importantDocs, currencyInfo, otherItems, memo 
    } = body;

    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE reservations 
      SET 
        title = ?, duration = ?, region = ?, meetingDate = ?, meetingTime = ?, meetingPlace = ?, 
        manager = ?, reservationMaker = ?, reservationMakerContact = ?, 
        importantDocs = ?, currencyInfo = ?, otherItems = ?, memo = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      title, duration, region, meetingDate, meetingTime, meetingPlace,
      manager, reservationMaker, reservationMakerContact,
      importantDocs || '', currencyInfo || '', otherItems || '', memo || '',
      params.id
    );
    
    if (result.changes > 0) {
      const updatedReservation = db.prepare('SELECT * FROM reservations WHERE id = ?').get(params.id);
      return NextResponse.json(updatedReservation);
    } else {
      return NextResponse.json({ error: '예약을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('예약 수정 오류:', error);
    return NextResponse.json({ error: '예약 수정 실패' }, { status: 500 });
  }
}

// DELETE /api/reservations/[id] - 예약 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM reservations WHERE id = ?').run(params.id);
    
    if (result.changes > 0) {
      return NextResponse.json({ message: '예약이 삭제되었습니다' });
    } else {
      return NextResponse.json({ error: '예약을 찾을 수 없습니다' }, { status: 404 });
    }
  } catch (error) {
    console.error('예약 삭제 오류:', error);
    return NextResponse.json({ error: '예약 삭제 실패' }, { status: 500 });
  }
} 