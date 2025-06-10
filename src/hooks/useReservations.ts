import { useState, useEffect } from 'react';
import type { Reservation } from '@/types/reservation';

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 예약 목록 조회
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error('예약 조회 실패');
      }
      const data = await response.json();
      setReservations(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 조회 실패');
      console.error('예약 조회 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 예약 등록
  const addReservation = async (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error('예약 등록 실패');
      }

      const newReservation = await response.json();
      setReservations(prev => [newReservation, ...prev]);
      return newReservation;
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 등록 실패');
      console.error('예약 등록 오류:', err);
      throw err;
    }
  };

  // 특정 예약 조회
  const getReservationById = async (id: number) => {
    try {
      const response = await fetch(`/api/reservations/${id}`);
      if (!response.ok) {
        throw new Error('예약 조회 실패');
      }
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 조회 실패');
      console.error('예약 조회 오류:', err);
      throw err;
    }
  };

  // 예약 수정
  const updateReservation = async (id: number, updatedReservation: Partial<Omit<Reservation, 'id' | 'createdAt'>>) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReservation),
      });

      if (!response.ok) {
        throw new Error('예약 수정 실패');
      }

      const updatedData = await response.json();
      setReservations(prev =>
        prev.map(reservation =>
          reservation.id === id ? updatedData : reservation
        )
      );
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 수정 실패');
      console.error('예약 수정 오류:', err);
      throw err;
    }
  };

  // 예약 삭제
  const deleteReservation = async (id: number) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('예약 삭제 실패');
      }

      setReservations(prev => prev.filter(reservation => reservation.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 삭제 실패');
      console.error('예약 삭제 오류:', err);
      throw err;
    }
  };

  // 컴포넌트 마운트 시 예약 목록 조회
  useEffect(() => {
    fetchReservations();
  }, []);

  return { 
    reservations, 
    loading, 
    error, 
    addReservation, 
    getReservationById, 
    updateReservation, 
    deleteReservation,
    refetch: fetchReservations
  };
} 