import { useParams, useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import { Descriptions } from 'antd';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';

const ScheduleDetail = () => {
  const { id } = useParams();
  const { getScheduleById } = useSchedules();
  const navigate = useNavigate();
  const schedule = getScheduleById(Number(id));

  if (!schedule) {
    return <div className="text-center text-dangerRed mt-10">일정 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정정보">
        <h2 className="text-2xl font-bold text-primary mb-6">일정 상세</h2>
        <Descriptions column={1} bordered className="mb-4">
          <Descriptions.Item label="제목"><span className="font-semibold text-primary">{schedule.title}</span></Descriptions.Item>
          <Descriptions.Item label="날짜">{schedule.date}</Descriptions.Item>
          <Descriptions.Item label="고객ID">{schedule.customerId}</Descriptions.Item>
          <Descriptions.Item label="설명">{schedule.description}</Descriptions.Item>
          <Descriptions.Item label="등록일">{schedule.createdAt}</Descriptions.Item>
        </Descriptions>
        <div className="flex gap-3 mt-6">
          <Button onClick={() => navigate('/schedules')} color="light">목록</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default ScheduleDetail; 