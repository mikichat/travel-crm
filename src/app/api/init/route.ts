import { NextResponse } from 'next/server';
import { initializeDatabase, testConnection } from '@/lib/database';

// POST /api/init - 데이터베이스 초기화
export async function POST() {
  try {
    initializeDatabase();
    const isConnected = testConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        message: '데이터베이스 초기화 완료',
        status: 'success'
      });
    } else {
      return NextResponse.json({ 
        error: '데이터베이스 연결 실패' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('데이터베이스 초기화 오류:', error);
    return NextResponse.json({ 
      error: '데이터베이스 초기화 실패' 
    }, { status: 500 });
  }
}

// GET /api/init - 데이터베이스 상태 확인
export async function GET() {
  try {
    const isConnected = testConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        message: '데이터베이스 연결 성공',
        status: 'connected'
      });
    } else {
      return NextResponse.json({ 
        error: '데이터베이스 연결 실패' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('데이터베이스 상태 확인 오류:', error);
    return NextResponse.json({ 
      error: '데이터베이스 상태 확인 실패' 
    }, { status: 500 });
  }
} 