import { useParams, useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';

const ScheduleDetail = () => {
  const { id } = useParams();
  const { getScheduleById } = useSchedules();
  const navigate = useNavigate();
  const schedule = getScheduleById(Number(id));

  if (!schedule) {
    return <div>일정 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>일정 상세</h2>
      <div><b>제목:</b> {schedule.title}</div>
      <div><b>날짜:</b> {schedule.date}</div>
      <div><b>고객ID:</b> {schedule.customerId}</div>
      <div><b>설명:</b> {schedule.description}</div>
      <div><b>등록일:</b> {schedule.createdAt}</div>
      <button onClick={() => navigate('/schedules')}>목록으로</button>
    </div>
  );
};

export default ScheduleDetail; 