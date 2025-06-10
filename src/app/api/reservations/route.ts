import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/reservations - 모든 예약 조회
export async function GET() {
  try {
    const db = getDatabase();
    const reservations = db.prepare('SELECT * FROM reservations ORDER BY createdAt DESC').all();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('예약 조회 오류:', error);
    return NextResponse.json({ error: '예약 조회 실패' }, { status: 500 });
  }
}

// POST /api/reservations - 예약 등록
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, duration, region, meetingDate, meetingTime, meetingPlace, 
      manager, reservationMaker, reservationMakerContact, 
      importantDocs, currencyInfo, otherItems, memo 
    } = body;

    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO reservations (
        title, duration, region, meetingDate, meetingTime, meetingPlace, 
        manager, reservationMaker, reservationMakerContact, 
        importantDocs, currencyInfo, otherItems, memo, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      title, duration, region, meetingDate, meetingTime, meetingPlace,
      manager, reservationMaker, reservationMakerContact,
      importantDocs || '', currencyInfo || '', otherItems || '', memo || '',
      new Date().toISOString()
    );
    
    const newReservation = db.prepare('SELECT * FROM reservations WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('예약 등록 오류:', error);
    return NextResponse.json({ error: '예약 등록 실패' }, { status: 500 });
  }
} 