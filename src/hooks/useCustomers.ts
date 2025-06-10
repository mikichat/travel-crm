import { useState, useEffect } from 'react';
import type { Customer } from '@/types/customer';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 고객 목록 조회
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('고객 조회 실패');
      }
      const data = await response.json();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 조회 실패');
      console.error('고객 조회 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 고객 등록
  const addCustomer = async (customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error('고객 등록 실패');
      }

      const newCustomer = await response.json();
      setCustomers(prev => [newCustomer, ...prev]);
      return newCustomer;
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 등록 실패');
      console.error('고객 등록 오류:', err);
      throw err;
    }
  };

  // 특정 고객 조회
  const getCustomerById = async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`);
      if (!response.ok) {
        throw new Error('고객 조회 실패');
      }
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 조회 실패');
      console.error('고객 조회 오류:', err);
      throw err;
    }
  };

  // 고객 수정
  const updateCustomer = async (id: number, updatedCustomer: Partial<Omit<Customer, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      });

      if (!response.ok) {
        throw new Error('고객 수정 실패');
      }

      const updatedData = await response.json();
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === id ? updatedData : customer
        )
      );
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 수정 실패');
      console.error('고객 수정 오류:', err);
      throw err;
    }
  };

  // 고객 삭제
  const deleteCustomer = async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('고객 삭제 실패');
      }

      setCustomers(prev => prev.filter(customer => customer.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 삭제 실패');
      console.error('고객 삭제 오류:', err);
      throw err;
    }
  };

  // 컴포넌트 마운트 시 고객 목록 조회
  useEffect(() => {
    fetchCustomers();
  }, []);

  return { 
    customers, 
    loading, 
    error, 
    addCustomer, 
    getCustomerById, 
    updateCustomer, 
    deleteCustomer,
    refetch: fetchCustomers
  };
} 