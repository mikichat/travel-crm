import express from 'express';
import db from '../config/sqlite';

const router = express.Router();

// 모든 일정 조회
router.get('/', (req, res) => {
  try {
    const schedules = db.prepare('SELECT * FROM schedules ORDER BY createdAt DESC').all();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: '일정 조회 실패' });
  }
});

// 특정 일정 조회
router.get('/:id', (req, res) => {
  try {
    const schedule = db.prepare('SELECT * FROM schedules WHERE id = ?').get(req.params.id);
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ error: '일정을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '일정 조회 실패' });
  }
});

// 일정 등록
router.post('/', (req, res) => {
  try {
    const { title, date, customerId, description, memo } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO schedules (title, date, customerId, description, memo, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(title, date, customerId, description, memo || '', new Date().toISOString());
    
    const newSchedule = db.prepare('SELECT * FROM schedules WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('일정 등록 오류:', error);
    res.status(500).json({ error: '일정 등록 실패' });
  }
});

// 일정 수정
router.put('/:id', (req, res) => {
  try {
    const { title, date, customerId, description, memo } = req.body;
    
    const stmt = db.prepare(`
      UPDATE schedules 
      SET title = ?, date = ?, customerId = ?, description = ?, memo = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(title, date, customerId, description, memo || '', req.params.id);
    
    if (result.changes > 0) {
      const updatedSchedule = db.prepare('SELECT * FROM schedules WHERE id = ?').get(req.params.id);
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ error: '일정을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '일정 수정 실패' });
  }
});

// 일정 삭제
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM schedules WHERE id = ?').run(req.params.id);
    
    if (result.changes > 0) {
      res.json({ message: '일정이 삭제되었습니다' });
    } else {
      res.status(404).json({ error: '일정을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '일정 삭제 실패' });
  }
});

export default router; 