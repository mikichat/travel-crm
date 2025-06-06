import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Table, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Reservation } from '../../types/reservation';

const ReservationList = () => {
  const { reservations, deleteReservation, updateReservation } = useReservations();
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');

  const handleTitleClick = (record: Reservation) => {
    setEditingId(record.id);
    setEditedTitle(record.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = async (record: Reservation) => {
    if (editingId === record.id && editedTitle !== record.title) {
      // Assuming useReservations provides an updateReservation function
      await updateReservation(record.id, { ...record, title: editedTitle });
    }
    setEditingId(null);
    setEditedTitle('');
  };

  const columns: ColumnsType<Reservation> = [
    {
      title: '여행 제목',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text: string, record: Reservation) => (
        editingId === record.id ? (
          <Input
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={() => handleTitleBlur(record)}
            onPressEnter={() => handleTitleBlur(record)}
            autoFocus
          />
        ) : (
          <span
            className="font-semibold text-primary cursor-pointer"
            onClick={() => handleTitleClick(record)}
          >
            {text}
          </span>
        )
      ),
    },
    {
      title: '여행 기간',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration.localeCompare(b.duration),
    },
    {
      title: '여행 지역',
      dataIndex: 'region',
      key: 'region',
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: '미팅 일자',
      dataIndex: 'meetingDate',
      key: 'meetingDate',
      sorter: (a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime(),
    },
    {
      title: '담당자',
      dataIndex: 'manager',
      key: 'manager',
      sorter: (a, b) => a.manager.localeCompare(b.manager),
    },
    {
      title: '동작',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button buttonColor="info" onClick={() => navigate(`/reservations/${record.id}`)}>
            상세
          </Button>
          <Button buttonColor="secondary" onClick={() => navigate(`/reservations/${record.id}/edit`)}>
            수정
          </Button>
          <Button buttonColor="danger" onClick={() => { if(window.confirm('정말 삭제하시겠습니까?')) deleteReservation(record.id); }}>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">예약 목록</h2>
          <Button onClick={() => navigate('/reservations/create')} buttonColor="primary">
            예약 등록
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={reservations.map(r => ({ ...r, key: r.id }))}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            className="rounded-lg overflow-hidden border border-lightViolet"
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ReservationList; 