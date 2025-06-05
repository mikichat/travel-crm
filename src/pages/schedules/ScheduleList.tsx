import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Schedule } from '../../types/schedule';

const ScheduleList = () => {
  const { schedules } = useSchedules();
  const navigate = useNavigate();

  const columns: ColumnsType<Schedule> = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Schedule) => <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/schedules/${record.id}`)}>{text}</span>,
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '고객ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '동작',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button color="info" onClick={() => navigate(`/schedules/${record.id}`)}>
            상세
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정목록">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">일정 목록</h2>
          <Button onClick={() => navigate('/schedules/create')} color="primary">
            일정 등록
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={schedules.map(s => ({ ...s, key: s.id }))}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          className="rounded-lg overflow-hidden border border-lightViolet"
        />
      </SectionCard>
    </div>
  );
};

export default ScheduleList; 