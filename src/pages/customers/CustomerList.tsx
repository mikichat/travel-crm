import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Customer } from '../../types/customer';
import React, { useMemo } from 'react';

const CustomerList = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();

  const nameFilters = useMemo(() => {
    const uniqueNames = [...new Set(customers.map(c => c.name))];
    return uniqueNames.map(name => ({ text: name, value: name }));
  }, [customers]);

  const phoneFilters = useMemo(() => {
    const uniquePhones = [...new Set(customers.map(c => c.phone))];
    return uniquePhones.map(phone => ({ text: phone, value: phone }));
  }, [customers]);

  const emailFilters = useMemo(() => {
    const uniqueEmails = [...new Set(customers.map(c => c.email))];
    return uniqueEmails.map(email => ({ text: email, value: email }));
  }, [customers]);

  const columns: ColumnsType<Customer> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: nameFilters,
      onFilter: (value, record) => record.name.includes(value as string),
      render: (text: string, record: Customer) => <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/customers/${record.id}`)}>{text}</span>,
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      filters: phoneFilters,
      onFilter: (value, record) => record.phone.includes(value as string),
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      filters: emailFilters,
      onFilter: (value, record) => record.email.includes(value as string),
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '동작',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button buttonColor="info" onClick={() => navigate(`/customers/${record.id}`)}>
            상세
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">고객 목록</h2>
          <Button onClick={() => navigate('/customers/create')} buttonColor="primary">
            고객 등록
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={customers.map(c => ({ ...c, key: c.id }))}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            className="rounded-lg overflow-hidden border border-lightViolet"
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default CustomerList;
