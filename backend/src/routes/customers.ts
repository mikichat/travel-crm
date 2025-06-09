import express from 'express';
import db from '../config/sqlite';

const router = express.Router();

// 모든 고객 조회
router.get('/', (req, res) => {
  try {
    const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: '고객 조회 실패' });
  }
});

// 특정 고객 조회
router.get('/:id', (req, res) => {
  try {
    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: '고객을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '고객 조회 실패' });
  }
});

// 고객 등록
router.post('/', (req, res) => {
  try {
    const { name, phone, email, address, notes } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO customers (name, phone, email, address, notes, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(name, phone, email, address || '', notes || '', new Date().toISOString(), new Date().toISOString());
    
    const newCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('고객 등록 오류:', error);
    res.status(500).json({ error: '고객 등록 실패' });
  }
});

// 고객 수정
router.put('/:id', (req, res) => {
  try {
    const { name, phone, email, address, notes } = req.body;
    
    const stmt = db.prepare(`
      UPDATE customers 
      SET name = ?, phone = ?, email = ?, address = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(name, phone, email, address || '', notes || '', new Date().toISOString(), req.params.id);
    
    if (result.changes > 0) {
      const updatedCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: '고객을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '고객 수정 실패' });
  }
});

// 고객 삭제
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
    
    if (result.changes > 0) {
      res.json({ message: '고객이 삭제되었습니다' });
    } else {
      res.status(404).json({ error: '고객을 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ error: '고객 삭제 실패' });
  }
});

export default router; 