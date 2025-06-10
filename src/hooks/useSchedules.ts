import { useState, useEffect } from 'react';
import type { Schedule } from '@/types/schedule';

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 일정 목록 조회
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schedules');
      if (!response.ok) {
        throw new Error('일정 조회 실패');
      }
      const data = await response.json();
      setSchedules(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '일정 조회 실패');
      console.error('일정 조회 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 일정 등록
  const addSchedule = async (schedule: Omit<Schedule, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });

      if (!response.ok) {
        throw new Error('일정 등록 실패');
      }

      const newSchedule = await response.json();
      setSchedules(prev => [newSchedule, ...prev]);
      return newSchedule;
    } catch (err) {
      setError(err instanceof Error ? err.message : '일정 등록 실패');
      console.error('일정 등록 오류:', err);
      throw err;
    }
  };

  // 특정 일정 조회
  const getScheduleById = async (id: number) => {
    try {
      const response = await fetch(`/api/schedules/${id}`);
      if (!response.ok) {
        throw new Error('일정 조회 실패');
      }
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : '일정 조회 실패');
      console.error('일정 조회 오류:', err);
      throw err;
    }
  };

  // 일정 수정
  const updateSchedule = async (id: number, updatedSchedule: Partial<Omit<Schedule, 'id' | 'createdAt'>>) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSchedule),
      });

      if (!response.ok) {
        throw new Error('일정 수정 실패');
      }

      const updatedData = await response.json();
      setSchedules(prev =>
        prev.map(schedule =>
          schedule.id === id ? updatedData : schedule
        )
      );
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : '일정 수정 실패');
      console.error('일정 수정 오류:', err);
      throw err;
    }
  };

  // 일정 삭제
  const deleteSchedule = async (id: number) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('일정 삭제 실패');
      }

      setSchedules(prev => prev.filter(schedule => schedule.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '일정 삭제 실패');
      console.error('일정 삭제 오류:', err);
      throw err;
    }
  };

  // 컴포넌트 마운트 시 일정 목록 조회
  useEffect(() => {
    fetchSchedules();
  }, []);

  return { 
    schedules, 
    loading, 
    error, 
    addSchedule, 
    getScheduleById, 
    updateSchedule, 
    deleteSchedule,
    refetch: fetchSchedules
  };
} 