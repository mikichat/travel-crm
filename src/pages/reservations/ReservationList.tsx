import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Reservation } from '../../types/reservation';

const ReservationList = () => {
  const { reservations, deleteReservation } = useReservations();
  const navigate = useNavigate();

  const columns: ColumnsType<Reservation> = [
    {
      title: '여행 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Reservation) => <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/reservations/${record.id}`)}>{text}</span>,
    },
    {
      title: '여행 기간',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '여행 지역',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '미팅 일자',
      dataIndex: 'meetingDate',
      key: 'meetingDate',
    },
    {
      title: '담당자',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '동작',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button color="info" onClick={() => navigate(`/reservations/${record.id}`)}>
            상세
          </Button>
          <Button color="secondary" onClick={() => navigate(`/reservations/${record.id}/edit`)}>
            수정
          </Button>
          <Button color="danger" onClick={() => { if(window.confirm('정말 삭제하시겠습니까?')) deleteReservation(record.id); }}>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약목록">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">예약 목록</h2>
          <Button onClick={() => navigate('/reservations/create')} color="primary">
            예약 등록
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={reservations.map(r => ({ ...r, key: r.id }))}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          className="rounded-lg overflow-hidden border border-lightViolet"
        />
      </SectionCard>
    </div>
  );
};

export default ReservationList; 