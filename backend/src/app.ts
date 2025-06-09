import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeDatabase, testConnection } from './config/sqlite';
import schedulesRouter from './routes/schedules';
import customersRouter from './routes/customers';
import reservationsRouter from './routes/reservations';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 데이터베이스 초기화
initializeDatabase();
testConnection();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Travel CRM Backend is running!',
    database: 'SQLite',
    timestamp: new Date().toISOString()
  });
});

// API 라우트
app.use('/api/schedules', schedulesRouter);
app.use('/api/customers', customersRouter);
app.use('/api/reservations', reservationsRouter);

app.listen(port, () => {
  console.log(`🚀 Travel CRM Backend 서버가 포트 ${port}에서 실행 중입니다!`);
  console.log(`🌐 접속 주소: http://localhost:${port}`);
  console.log(`🔍 상태 확인: http://localhost:${port}/api/health`);
  console.log(`📅 일정 API: http://localhost:${port}/api/schedules`);
  console.log(`👤 고객 API: http://localhost:${port}/api/customers`);
  console.log(`🎫 예약 API: http://localhost:${port}/api/reservations`);
});
