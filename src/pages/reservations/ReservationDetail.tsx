import { useParams, useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ReservationDetail = () => {
  const { id } = useParams();
  const { getReservationById, deleteReservation } = useReservations();
  const navigate = useNavigate();
  const reservation = getReservationById(Number(id));

  if (!reservation) {
    return <div className="text-center text-dangerRed mt-10">예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold text-primary mb-4">예약 상세</h2>
        <div className="mb-2"><span className="font-semibold text-primary">여행 제목:</span> {reservation.title}</div>
        <div className="mb-2"><span className="font-semibold text-primary">여행 기간:</span> {reservation.duration}</div>
        <div className="mb-2"><span className="font-semibold text-primary">여행 지역:</span> {reservation.region}</div>
        <div className="mb-2"><span className="font-semibold text-primary">미팅 일자:</span> {reservation.meetingDate}</div>
        <div className="mb-2"><span className="font-semibold text-primary">미팅 시간:</span> {reservation.meetingTime}</div>
        <div className="mb-2"><span className="font-semibold text-primary">미팅 장소:</span> {reservation.meetingPlace}</div>
        <div className="mb-2"><span className="font-semibold text-primary">담당자:</span> {reservation.manager}</div>
        {reservation.importantDocs && <div className="mb-2"><span className="font-semibold text-primary">필수 서류:</span> {reservation.importantDocs}</div>}
        {reservation.currencyInfo && <div className="mb-2"><span className="font-semibold text-primary">환전 및 결제:</span> {reservation.currencyInfo}</div>}
        {reservation.otherItems && <div className="mb-2"><span className="font-semibold text-primary">개인 준비물:</span> {reservation.otherItems}</div>}
        {reservation.memo && <div className="mb-2"><span className="font-semibold text-primary">메모/참고사항:</span> {reservation.memo}</div>}
        <div className="flex gap-3 mt-6">
          <Button onClick={() => navigate(`/reservations/${reservation.id}/edit`)} color="secondary">수정</Button>
          <Button onClick={() => { if(window.confirm('정말 삭제하시겠습니까?')) { deleteReservation(reservation.id); navigate('/reservations'); }}} color="danger">삭제</Button>
          <Button onClick={() => navigate('/reservations')} color="light">목록</Button>
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetail; 