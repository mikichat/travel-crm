import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';

const ScheduleList = () => {
  const { schedules } = useSchedules();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2>일정 목록</h2>
      <button onClick={() => navigate('/schedules/create')}>일정 등록</button>
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>제목</th>
            <th>날짜</th>
            <th>고객ID</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              key={schedule.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/schedules/${schedule.id}`)}
            >
              <td>{schedule.title}</td>
              <td>{schedule.date}</td>
              <td>{schedule.customerId}</td>
              <td>{schedule.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList; 