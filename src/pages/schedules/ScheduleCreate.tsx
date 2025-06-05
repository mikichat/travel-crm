import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';

const ScheduleCreate = () => {
  const { addSchedule } = useSchedules();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    date: '',
    customerId: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSchedule({
      ...form,
      customerId: Number(form.customerId),
    });
    navigate('/schedules');
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>일정 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>날짜</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>
        <div>
          <label>고객ID</label>
          <input name="customerId" value={form.customerId} onChange={handleChange} required />
        </div>
        <div>
          <label>설명</label>
          <input name="description" value={form.description} onChange={handleChange} />
        </div>
        <button type="submit">등록</button>
        <button type="button" onClick={() => navigate('/schedules')}>취소</button>
      </form>
    </div>
  );
};

export default ScheduleCreate; 