import Database from 'better-sqlite3';
import path from 'path';

// SQLite 데이터베이스 파일 경로
const dbPath = path.join(process.cwd(), 'data', 'travel_crm.db');

// 데이터베이스 연결
let db: Database.Database;

// 데이터베이스 초기화 함수
export function initializeDatabase() {
  try {
    // 데이터 디렉토리 생성
    const dataDir = path.join(process.cwd(), 'data');
    const fs = require('fs');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 데이터베이스 연결
    db = new Database(dbPath);

    // 샘플 데이터
    const sampleCustomers = [
      { name: '홍길동', phone: '010-1234-5678', email: 'hong@example.com', address: '서울시 강남구', createdAt: new Date().toISOString() },
      { name: '김영희', phone: '010-2345-6789', email: 'kim@example.com', address: '부산시 해운대구', createdAt: new Date().toISOString() },
      { name: '이철수', phone: '010-3456-7890', email: 'lee@example.com', address: '대구시 수성구', createdAt: new Date().toISOString() },
    ];

    const sampleSchedules = [
      { title: '제주도 3박4일', date: '2024-07-01', customerId: 1, description: '제주도 여행', memo: '', createdAt: new Date().toISOString() },
      { title: '부산 당일치기', date: '2024-07-10', customerId: 2, description: '부산 투어', memo: '', createdAt: new Date().toISOString() },
      { title: '강릉 2박3일', date: '2024-07-20', customerId: 3, description: '강릉 바다 여행', memo: '', createdAt: new Date().toISOString() },
    ];

    const sampleReservations = [
      { title: '제주도 3박4일', duration: '3박4일', region: '제주', meetingDate: '2024-06-25', meetingTime: '10:00', meetingPlace: '김포공항', manager: '홍길동', reservationMaker: '박민수', reservationMakerContact: '010-5555-1111', createdAt: new Date().toISOString() },
      { title: '부산 당일치기', duration: '1일', region: '부산', meetingDate: '2024-07-05', meetingTime: '08:00', meetingPlace: '서울역', manager: '김영희', reservationMaker: '최지훈', reservationMakerContact: '010-5555-2222', createdAt: new Date().toISOString() },
      { title: '강릉 2박3일', duration: '2박3일', region: '강릉', meetingDate: '2024-07-15', meetingTime: '09:00', meetingPlace: '청량리역', manager: '이철수', reservationMaker: '정유진', reservationMakerContact: '010-5555-3333', createdAt: new Date().toISOString() },
    ];

    // 테이블 생성
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        address TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        customerId INTEGER,
        description TEXT,
        memo TEXT,
        createdAt TEXT,
        FOREIGN KEY (customerId) REFERENCES customers (id)
      );

      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        duration TEXT,
        region TEXT,
        meetingDate TEXT,
        meetingTime TEXT,
        meetingPlace TEXT,
        manager TEXT,
        reservationMaker TEXT,
        reservationMakerContact TEXT,
        importantDocs TEXT,
        currencyInfo TEXT,
        otherItems TEXT,
        memo TEXT,
        createdAt TEXT
      );
    `);

    // 샘플 데이터 입력 (고객)
    const customerResult = db.prepare('SELECT COUNT(*) as count FROM customers').get() as { count: number };
    const customerCount = customerResult.count;
    if (customerCount === 0) {
      const stmt = db.prepare('INSERT INTO customers (name, phone, email, address, created_at) VALUES (?, ?, ?, ?, ?)');
      for (const c of sampleCustomers) {
        stmt.run(c.name, c.phone, c.email, c.address, c.createdAt);
      }
      console.log('✅ 샘플 고객 데이터 입력 완료!');
    }

    // 샘플 데이터 입력 (일정)
    const scheduleResult = db.prepare('SELECT COUNT(*) as count FROM schedules').get() as { count: number };
    const scheduleCount = scheduleResult.count;
    if (scheduleCount === 0) {
      const stmt = db.prepare('INSERT INTO schedules (title, date, customerId, description, memo, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
      for (const s of sampleSchedules) {
        stmt.run(s.title, s.date, s.customerId, s.description, s.memo, s.createdAt);
      }
      console.log('✅ 샘플 일정 데이터 입력 완료!');
    }

    // 샘플 데이터 입력 (예약)
    const reservationResult = db.prepare('SELECT COUNT(*) as count FROM reservations').get() as { count: number };
    const reservationCount = reservationResult.count;
    if (reservationCount === 0) {
      const stmt = db.prepare('INSERT INTO reservations (title, duration, region, meetingDate, meetingTime, meetingPlace, manager, reservationMaker, reservationMakerContact, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
      for (const r of sampleReservations) {
        stmt.run(r.title, r.duration, r.region, r.meetingDate, r.meetingTime, r.meetingPlace, r.manager, r.reservationMaker, r.reservationMakerContact, r.createdAt);
      }
      console.log('✅ 샘플 예약 데이터 입력 완료!');
    }

    console.log('✅ SQLite 데이터베이스 초기화 완료!');
    console.log(`📁 데이터베이스 파일: ${dbPath}`);
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 실패:', error);
    throw error;
  }
}

// 데이터베이스 연결 테스트
export function testConnection() {
  try {
    const result = db.prepare('SELECT 1 as test').get();
    console.log('✅ SQLite 데이터베이스 연결 성공!');
    return true;
  } catch (error) {
    console.error('❌ SQLite 데이터베이스 연결 실패:', error);
    return false;
  }
}

// 데이터베이스 인스턴스 가져오기
export function getDatabase() {
  if (!db) {
    initializeDatabase();
  }
  return db;
}

// 데이터베이스 인스턴스 내보내기
export default getDatabase; 