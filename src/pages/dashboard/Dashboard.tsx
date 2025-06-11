import { useCustomers } from '../../hooks/useCustomers';
import { useSchedules } from '../../hooks/useSchedules';
import { useReservations } from '../../hooks/useReservations';
import { Card, Statistic, Row, Col, Progress, List, Avatar, Tag, Space, Typography, Divider } from 'antd';
import { 
  UserOutlined, 
  ScheduleOutlined, 
  CalendarOutlined, 
  RiseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { customers, loading: customersLoading } = useCustomers();
  const { schedules, loading: schedulesLoading } = useSchedules();
  const { reservations, loading: reservationsLoading } = useReservations();
  
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState<any[]>([]);

  useEffect(() => {
    // 최근 고객 5명
    if (customers.length > 0) {
      setRecentCustomers(customers.slice(0, 5));
    }
    
    // 다가오는 일정 5개
    if (schedules.length > 0) {
      setUpcomingSchedules(schedules.slice(0, 5));
    }
  }, [customers, schedules]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return '확정';
      case 'pending': return '대기중';
      case 'cancelled': return '취소';
      default: return '알 수 없음';
    }
  };

  const StatCard = ({ title, value, icon, color, trend }: any) => (
    <Card 
      className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ 
        borderRadius: 16,
        border: 'none',
        background: 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-white">
          <div className="text-sm opacity-80 mb-1">{title}</div>
          <div className="text-3xl font-bold">{value}</div>
          {trend && (
            <div className="text-xs mt-2 opacity-80">
              <RiseOutlined className="mr-1" />
              {trend}
            </div>
          )}
        </div>
        <div 
          className="p-3 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <Title level={2} className="text-gray-800 mb-2">
            🚀 여행 CRM 대시보드
          </Title>
          <Text type="secondary" className="text-lg">
            실시간 비즈니스 현황을 한눈에 확인하세요
          </Text>
        </div>

        {/* 통계 카드 */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="총 고객 수"
              value={customers.length}
              icon={<UserOutlined className="text-2xl text-white" />}
              trend="+12% 이번 달"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="활성 일정"
              value={schedules.length}
              icon={<ScheduleOutlined className="text-2xl text-white" />}
              trend="+8% 이번 주"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="총 예약"
              value={reservations.length}
              icon={<CalendarOutlined className="text-2xl text-white" />}
              trend="+15% 이번 달"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="완료율"
              value="87%"
              icon={<CheckCircleOutlined className="text-2xl text-white" />}
              trend="+5% 지난 달 대비"
            />
          </Col>
        </Row>

        {/* 메인 콘텐츠 */}
        <Row gutter={[24, 24]}>
          {/* 왼쪽 컬럼 */}
          <Col xs={24} lg={16}>
            {/* 최근 활동 */}
            <Card 
              title={
                <div className="flex items-center">
                  <ClockCircleOutlined className="mr-2 text-gray-600" />
                  <span className="text-lg font-semibold">최근 활동</span>
                </div>
              }
              className="mb-6 shadow-lg"
              style={{ borderRadius: 16 }}
            >
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Avatar icon={<UserOutlined />} className="mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">새 고객 등록</div>
                    <div className="text-sm text-gray-500">김철수님이 시스템에 등록되었습니다</div>
                  </div>
                  <Text type="secondary" className="text-sm">2분 전</Text>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Avatar icon={<CheckCircleOutlined />} className="mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">예약 확정</div>
                    <div className="text-sm text-gray-500">제주도 3박4일 패키지 예약이 확정되었습니다</div>
                  </div>
                  <Text type="secondary" className="text-sm">15분 전</Text>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Avatar icon={<ExclamationCircleOutlined />} className="mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">일정 변경</div>
                    <div className="text-sm text-gray-500">부산 여행 일정이 변경되었습니다</div>
                  </div>
                  <Text type="secondary" className="text-sm">1시간 전</Text>
                </div>
              </div>
            </Card>

            {/* 성과 지표 */}
            <Card 
              title={
                <div className="flex items-center">
                  <RiseOutlined className="mr-2 text-gray-600" />
                  <span className="text-lg font-semibold">성과 지표</span>
                </div>
              }
              className="shadow-lg"
              style={{ borderRadius: 16 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">92%</div>
                    <div className="text-sm text-gray-600 mb-2">고객 만족도</div>
                    <Progress percent={92} strokeColor="#6b7280" showInfo={false} />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">87%</div>
                    <div className="text-sm text-gray-600 mb-2">예약 완료율</div>
                    <Progress percent={87} strokeColor="#4b5563" showInfo={false} />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">78%</div>
                    <div className="text-sm text-gray-600 mb-2">재방문율</div>
                    <Progress percent={78} strokeColor="#374151" showInfo={false} />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">95%</div>
                    <div className="text-sm text-gray-600 mb-2">응답률</div>
                    <Progress percent={95} strokeColor="#1f2937" showInfo={false} />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* 오른쪽 컬럼 */}
          <Col xs={24} lg={8}>
            {/* 최근 고객 */}
            <Card 
              title={
                <div className="flex items-center">
                  <UserOutlined className="mr-2 text-gray-600" />
                  <span className="text-lg font-semibold">최근 고객</span>
                </div>
              }
              className="mb-6 shadow-lg"
              style={{ borderRadius: 16 }}
            >
              <List
                dataSource={recentCustomers}
                renderItem={(customer) => (
                  <List.Item className="border-0 py-2">
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={<div className="font-medium">{customer.name}</div>}
                      description={
                        <div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* 다가오는 일정 */}
            <Card 
              title={
                <div className="flex items-center">
                  <ScheduleOutlined className="mr-2 text-gray-600" />
                  <span className="text-lg font-semibold">다가오는 일정</span>
                </div>
              }
              className="shadow-lg"
              style={{ borderRadius: 16 }}
            >
              <List
                dataSource={upcomingSchedules}
                renderItem={(schedule) => (
                  <List.Item className="border-0 py-2">
                    <List.Item.Meta
                      avatar={<Avatar icon={<ScheduleOutlined />} />}
                      title={<div className="font-medium">{schedule.title}</div>}
                      description={
                        <div>
                          <div className="text-sm text-gray-500">{schedule.destination}</div>
                          <Tag color="default" className="mt-1">
                            {schedule.start_date}
                          </Tag>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
