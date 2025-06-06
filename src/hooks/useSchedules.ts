import { useState } from 'react';
import type { Schedule } from '../types/schedule';

const initialSchedules: Schedule[] = [
  {
    id: 1,
    title: '부산 여행',
    date: '2024-07-01',
    customerId: 1,
    description: '부산 해운대 투어',
    memo: JSON.stringify({
      time: Date.now(),
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: '부산 여행에 대한 추가 메모입니다.',
          },
        },
      ],
      version: '2.29.1',
    }),
    createdAt: '2024-06-10',
  },
  {
    id: 2,
    title: '제주도 여행',
    date: '2024-07-10',
    customerId: 2,
    description: '제주 올레길 트레킹',
    memo: JSON.stringify({
      time: Date.now(),
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: '제주도 여행에 대한 추가 메모입니다.',
          },
        },
      ],
      version: '2.29.1',
    }),
    createdAt: '2024-06-12',
  },
];

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);

  const addSchedule = (schedule: Omit<Schedule, 'id' | 'createdAt'>) => {
    const newSchedule: Schedule = {
      ...schedule,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const getScheduleById = (id: number) =>
    schedules.find((s) => s.id === id);

  const updateSchedule = (id: number, updatedSchedule: Partial<Omit<Schedule, 'id' | 'createdAt'>>) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule
      )
    );
  };

  return { schedules, addSchedule, getScheduleById, updateSchedule };
} 