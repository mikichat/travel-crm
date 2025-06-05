import { useState } from 'react';
import type { Reservation } from '../types/reservation';

const initialReservations: Reservation[] = [
  {
    id: 1,
    title: '꿈결같은 바이올렛 여정',
    duration: '2025년 10월 01일 ~ 10월 07일 (6박 7일)',
    region: '프랑스 파리, 스위스 인터라켄',
    meetingDate: '2025-10-01',
    meetingTime: '14:00',
    meetingPlace: '인천국제공항 제1여객터미널 H카운터 앞',
    manager: '김철수 (010-1234-5678)',
    importantDocs: '여권, 항공권 E-티켓',
    currencyInfo: '유로, 국제 신용카드',
    otherItems: '상비약, 어댑터, 우산',
    memo: '현지 날씨, 관광지 정보 참고',
    createdAt: '2024-06-15',
  },
  {
    id: 2,
    title: '동유럽 클래식 투어',
    duration: '2025년 11월 10일 ~ 11월 18일 (8박 9일)',
    region: '체코 프라하, 오스트리아 빈, 헝가리 부다페스트',
    meetingDate: '2025-11-10',
    meetingTime: '09:30',
    meetingPlace: '인천국제공항 제2여객터미널 F카운터 앞',
    manager: '이영희 (010-5678-1234)',
    importantDocs: '여권, 비자, 항공권',
    currencyInfo: '유로, 헝가리 포린트',
    otherItems: '방한복, 카메라, 멀티어댑터',
    memo: '유럽은 일교차가 큼, 환전 필수',
    createdAt: '2024-06-20',
  },
  {
    id: 3,
    title: '일본 벚꽃 명소 탐방',
    duration: '2026년 3월 25일 ~ 3월 29일 (4박 5일)',
    region: '도쿄, 오사카, 교토',
    meetingDate: '2026-03-25',
    meetingTime: '07:00',
    meetingPlace: '김포공항 국제선 3번 게이트 앞',
    manager: '박민수 (010-9999-8888)',
    importantDocs: '여권, 항공권',
    currencyInfo: '엔화, 신용카드',
    otherItems: '우산, 편한 신발, 마스크',
    memo: '벚꽃 개화시기 참고, 우천 대비',
    createdAt: '2024-06-25',
  },
];

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setReservations((prev) => [...prev, newReservation]);
  };

  const updateReservation = (id: number, data: Partial<Reservation>) => {
    setReservations((prev) => prev.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const deleteReservation = (id: number) => {
    setReservations((prev) => prev.filter(r => r.id !== id));
  };

  const getReservationById = (id: number) =>
    reservations.find((r) => r.id === id);

  return { reservations, addReservation, updateReservation, deleteReservation, getReservationById };
} 