import { useParams, useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import { useEffect, useState } from 'react';
import { Descriptions, Spin, Alert } from 'antd';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import type { Reservation } from '../../types/reservation';

const ReservationDetail = () => {
  const { id } = useParams();
  const { getReservationById, deleteReservation } = useReservations();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getReservationById(Number(id))
      .then(data => {
        setReservation(data);
        setError(null);
      })
      .catch(err => {
        setError('예약 정보를 찾을 수 없습니다.');
        setReservation(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !reservation) {
    return <Alert message={error || '예약 정보를 찾을 수 없습니다.'} type="error" showIcon className="mt-10" />;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약정보">
        <Descriptions column={1} bordered className="mb-4">
          <Descriptions.Item label="여행 제목"><span className="font-semibold text-primary">{reservation.title}</span></Descriptions.Item>
          <Descriptions.Item label="여행 기간">{reservation.duration}</Descriptions.Item>
          <Descriptions.Item label="여행 지역">{reservation.region}</Descriptions.Item>
          <Descriptions.Item label="미팅 일자">{reservation.meetingDate}</Descriptions.Item>
          <Descriptions.Item label="미팅 시간">{reservation.meetingTime}</Descriptions.Item>
          <Descriptions.Item label="미팅 장소">{reservation.meetingPlace}</Descriptions.Item>
          <Descriptions.Item label="담당자">{reservation.manager}</Descriptions.Item>
          {reservation.importantDocs && <Descriptions.Item label="필수 서류">{reservation.importantDocs}</Descriptions.Item>}
          {reservation.currencyInfo && <Descriptions.Item label="환전 및 결제">{reservation.currencyInfo}</Descriptions.Item>}
          {reservation.otherItems && <Descriptions.Item label="개인 준비물">{reservation.otherItems}</Descriptions.Item>}
          {reservation.memo && <Descriptions.Item label="메모/참고사항">{reservation.memo}</Descriptions.Item>}
        </Descriptions>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button onClick={() => navigate(`/reservations/${reservation.id}/edit`)} buttonColor="secondary">수정</Button>
          <Button onClick={() => { if(window.confirm('정말 삭제하시겠습니까?')) { deleteReservation(reservation.id); navigate('/reservations'); }}} buttonColor="danger">삭제</Button>
          <Button onClick={() => navigate('/reservations')} buttonColor="light">목록</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default ReservationDetail; 