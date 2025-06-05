import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ReservationList = () => {
  const { reservations, deleteReservation } = useReservations();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">예약 목록</h2>
        <Button onClick={() => navigate('/reservations/create')} color="primary">
          예약 등록
        </Button>
      </div>
      <div className="grid gap-6">
        {reservations.map((r) => (
          <Card key={r.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-semibold text-primary">{r.title}</div>
                <div className="text-sm text-secondary mt-1">{r.duration} | {r.region}</div>
                <div className="text-sm text-gray-500 mt-1">미팅: {r.meetingDate} {r.meetingTime} @ {r.meetingPlace}</div>
                <div className="text-sm text-gray-400 mt-1">담당자: {r.manager}</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button color="info" className="w-20" onClick={() => navigate(`/reservations/${r.id}`)}>
                  상세
                </Button>
                <Button color="secondary" className="w-20" onClick={() => navigate(`/reservations/${r.id}/edit`)}>
                  수정
                </Button>
                <Button color="danger" className="w-20" onClick={() => { if(window.confirm('정말 삭제하시겠습니까?')) deleteReservation(r.id); }}>
                  삭제
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReservationList; 