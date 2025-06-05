import { useCustomers } from '../../hooks/useCustomers';
import { useSchedules } from '../../hooks/useSchedules';

const Dashboard = () => {
  const { customers } = useCustomers();
  const { schedules } = useSchedules();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>대시보드</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, background: '#f0f2f5', padding: 24, borderRadius: 8 }}>
          <h3>고객 수</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold' }}>{customers.length}</p>
        </div>
        <div style={{ flex: 1, background: '#f0f2f5', padding: 24, borderRadius: 8 }}>
          <h3>일정 수</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold' }}>{schedules.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
