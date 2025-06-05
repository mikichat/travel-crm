import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';

const ReservationCreate = () => {
  const { addReservation } = useReservations();
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation(form);
    navigate('/reservations');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-lightViolet min-h-screen">
      <SectionCard label="기본안내">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-primary font-semibold mb-1">여행 제목</label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-primary font-semibold mb-1">여행 기간</label>
              <Input name="duration" value={form.duration} onChange={handleChange} required placeholder="예: 2025년 10월 01일 ~ 10월 07일 (6박 7일)" />
            </div>
            <div>
              <label className="block text-primary font-semibold mb-1">여행 지역</label>
              <Input name="region" value={form.region} onChange={handleChange} required placeholder="예: 프랑스 파리, 스위스 인터라켄" />
            </div>
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
            <Input name="manager" value={form.manager} onChange={handleChange} required placeholder="예: 김철수 (010-1234-5678)" />
          </div>
          <SectionCard label="준비물" className="mb-0">
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
            <div className="mt-4">
              <label className="block text-primary font-semibold mb-1">개인 준비물</label>
              <Input name="otherItems" value={form.otherItems} onChange={handleChange} />
            </div>
          </SectionCard>
          <SectionCard label="메모" className="mb-0">
            <label className="block text-primary font-semibold mb-1">메모/참고사항</label>
            <textarea name="memo" value={form.memo} onChange={handleChange} rows={3} className="w-full border border-lightViolet rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-purple-900 placeholder-purple-300" />
          </SectionCard>
          <div className="flex gap-3 mt-6">
            <Button type="submit" color="primary">등록</Button>
            <Button type="button" color="light" onClick={() => navigate('/reservations')}>취소</Button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
};

export default ReservationCreate; 