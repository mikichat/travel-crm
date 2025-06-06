import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Schedule } from '../../types/schedule';
import React, { useMemo } from 'react';

const ScheduleList = () => {
  const { schedules } = useSchedules();
  const navigate = useNavigate();

  const titleFilters = useMemo(() => {
    const uniqueTitles = [...new Set(schedules.map(s => s.title))];
    return uniqueTitles.map(title => ({ text: title, value: title }));
  }, [schedules]);

  const dateFilters = useMemo(() => {
    const uniqueDates = [...new Set(schedules.map(s => s.date))];
    return uniqueDates.map(date => ({ text: date, value: date }));
  }, [schedules]);

  const customerIdFilters = useMemo(() => {
    const uniqueCustomerIds = [...new Set(schedules.map(s => s.customerId))];
    return uniqueCustomerIds.map(id => ({ text: id.toString(), value: id }));
  }, [schedules]);

  const columns: ColumnsType<Schedule> = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      filters: titleFilters,
      onFilter: (value, record) => record.title.includes(value as string),
      render: (text: string, record: Schedule) => <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/schedules/${record.id}`)}>{text}</span>,
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      filters: dateFilters,
      onFilter: (value, record) => record.date.includes(value as string),
    },
    {
      title: '고객ID',
      dataIndex: 'customerId',
      key: 'customerId',
      sorter: (a, b) => a.customerId - b.customerId,
      filters: customerIdFilters,
      onFilter: (value, record) => record.customerId === (value as number),
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
          <Button buttonColor="info" onClick={() => navigate(`/schedules/${record.id}`)}>
            상세
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">일정 목록</h2>
          <Button onClick={() => navigate('/schedules/create')} buttonColor="primary">
            일정 등록
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={schedules.map(s => ({ ...s, key: s.id }))}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            className="rounded-lg overflow-hidden border border-lightViolet"
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ScheduleList; 