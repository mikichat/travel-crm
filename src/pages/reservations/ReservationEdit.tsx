import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ReservationEdit = () => {
  const { id } = useParams();
  const { getReservationById, updateReservation } = useReservations();
  const navigate = useNavigate();
  const reservation = getReservationById(Number(id));

  const [form, setForm] = useState({
    title: '',
    duration: '',
    region: '',
    meetingDate: '',
    meetingTime: '',
    meetingPlace: '',
    manager: '',
    importantDocs: '',
    currencyInfo: '',
    otherItems: '',
    memo: '',
  });

  useEffect(() => {
    if (reservation) {
      setForm({
        title: reservation.title,
        duration: reservation.duration,
        region: reservation.region,
        meetingDate: reservation.meetingDate,
        meetingTime: reservation.meetingTime,
        meetingPlace: reservation.meetingPlace,
        manager: reservation.manager,
        importantDocs: reservation.importantDocs || '',
        currencyInfo: reservation.currencyInfo || '',
        otherItems: reservation.otherItems || '',
        memo: reservation.memo || '',
      });
    }
  }, [reservation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateReservation(Number(id), form);
    navigate(`/reservations/${id}`);
  };

  if (!reservation) {
    return <div className="text-center text-dangerRed mt-10">예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold text-primary mb-6">예약 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-primary font-semibold mb-1">여행 제목</label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">여행 기간</label>
            <Input name="duration" value={form.duration} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">여행 지역</label>
            <Input name="region" value={form.region} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-primary font-semibold mb-1">미팅 일자</label>
              <Input name="meetingDate" type="date" value={form.meetingDate} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-primary font-semibold mb-1">미팅 시간</label>
              <Input name="meetingTime" type="time" value={form.meetingTime} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">미팅 장소</label>
            <Input name="meetingPlace" value={form.meetingPlace} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">담당자</label>
            <Input name="manager" value={form.manager} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-primary font-semibold mb-1">필수 서류</label>
              <Input name="importantDocs" value={form.importantDocs} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-primary font-semibold mb-1">환전 및 결제</label>
              <Input name="currencyInfo" value={form.currencyInfo} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">개인 준비물</label>
            <Input name="otherItems" value={form.otherItems} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">메모/참고사항</label>
            <textarea name="memo" value={form.memo} onChange={handleChange} rows={3} className="w-full border border-lightViolet rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-purple-900 placeholder-purple-300" />
          </div>
          <div className="flex gap-3 mt-6">
            <Button type="submit" color="secondary">수정</Button>
            <Button type="button" color="light" onClick={() => navigate(`/reservations/${id}`)}>취소</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ReservationEdit; 