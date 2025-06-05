import { useState } from 'react';
import type { Customer } from '../types/customer';

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    address: '서울시 강남구',
    createdAt: '2024-06-01',
  },
  {
    id: 2,
    name: '김영희',
    phone: '010-8765-4321',
    email: 'kim@example.com',
    address: '부산시 해운대구',
    createdAt: '2024-06-02',
  },
];

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const getCustomerById = (id: number) =>
    customers.find((c) => c.id === id);

  return { customers, addCustomer, getCustomerById };
} 