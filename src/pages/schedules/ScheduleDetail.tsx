import { useParams, useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const ScheduleDetail = () => {
  const { id } = useParams();
  const { getScheduleById, deleteSchedule } = useSchedules();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getScheduleById(Number(id));
        setSchedule(data);
        setError(null);
      } catch (error) {
        console.error('일정 정보 불러오기 오류:', error);
        setError('일정 정보를 찾을 수 없습니다.');
        setSchedule(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    if (confirm('정말 이 일정을 삭제하시겠습니까?')) {
      try {
        await deleteSchedule(Number(id));
        message.success('일정이 성공적으로 삭제되었습니다.');
        navigate('/schedules');
      } catch (error) {
        console.error('일정 삭제 오류:', error);
        message.error('일정 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="일정상세">
          <div className="text-center py-10 text-primary">일정 정보를 불러오는 중...</div>
        </SectionCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="일정상세">
          <div className="text-center py-10 text-dangerRed">오류: {error}</div>
        </SectionCard>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="일정상세">
          <div className="text-center py-10 text-dangerRed">일정 정보를 찾을 수 없습니다.</div>
        </SectionCard>
      </div>
    );
  }

  // 날짜 포맷팅 함수
  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정상세">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-primary">{schedule.title}</h1>
          <Button onClick={() => navigate('/schedules')} buttonColor="light">
            목록으로
          </Button>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <span className="block text-gray-500 mb-1 font-medium">제목</span>
            <span className="text-lg font-semibold">{schedule.title}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">날짜</span>
            <span>{formatDate(schedule.date)}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">고객 ID</span>
            <span>{schedule.customerId}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">설명</span>
            <span>{schedule.description || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">메모</span>
            <span>{schedule.memo || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">등록일</span>
            <span>{formatDate(schedule.createdAt)}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={() => navigate(`/schedules/${id}/edit`)} 
            buttonColor="secondary"
          >
            수정
          </Button>
          <Button 
            onClick={handleDelete} 
            buttonColor="danger"
          >
            삭제
          </Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default ScheduleDetail; 