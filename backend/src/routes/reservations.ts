import express from 'express';
import db from '../config/sqlite';

const router = express.Router();

// 모든 예약 조회
router.get('/', (req, res) => {
  try {
    const reservations = db.prepare('SELECT * FROM reservations ORDER BY createdAt DESC').all();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: '예약 조회 실패' });
  }
});

// 특정 예약 조회
router.get('/:id', (req, res) => {
  try {
    const reservation = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: '예약을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '예약 조회 실패' });
  }
});

// 예약 등록
router.post('/', (req, res) => {
  try {
    const { title, duration, region, meetingDate, meetingTime, meetingPlace, manager, reservationMaker, reservationMakerContact, importantDocs, currencyInfo, otherItems, memo } = req.body;
    
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
    
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('예약 등록 오류:', error);
    res.status(500).json({ error: '예약 등록 실패' });
  }
});

// 예약 수정
router.put('/:id', (req, res) => {
  try {
    const { title, duration, region, meetingDate, meetingTime, meetingPlace, manager, reservationMaker, reservationMakerContact, importantDocs, currencyInfo, otherItems, memo } = req.body;
    
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
      req.params.id
    );
    
    if (result.changes > 0) {
      const updatedReservation = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id);
      res.json(updatedReservation);
    } else {
      res.status(404).json({ error: '예약을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '예약 수정 실패' });
  }
});

// 예약 삭제
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM reservations WHERE id = ?').run(req.params.id);
    
    if (result.changes > 0) {
      res.json({ message: '예약이 삭제되었습니다' });
    } else {
      res.status(404).json({ error: '예약을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '예약 삭제 실패' });
  }
});

export default router; 