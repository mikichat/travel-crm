import { useCustomers } from '../../hooks/useCustomers';
import { useSchedules } from '../../hooks/useSchedules';
import SectionCard from '../../components/ui/SectionCard';
import { Card, Statistic, Row, Col } from 'antd';

const Dashboard = () => {
  const { customers } = useCustomers();
  const { schedules } = useSchedules();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="대시보드">
        <h2 className="text-3xl font-bold text-primary mb-6">대시보드</h2>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderColor: '#D1C4E9' }}>
              <Statistic title={<span className="text-primary font-semibold">총 고객 수</span>} value={customers.length} valueStyle={{ color: '#7E57C2' }} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderColor: '#D1C4E9' }}>
              <Statistic title={<span className="text-primary font-semibold">총 일정 수</span>} value={schedules.length} valueStyle={{ color: '#722ed1' }} />
            </Card>
          </Col>
        </Row>
      </SectionCard>
    </div>
  );
};

export default Dashboard;
