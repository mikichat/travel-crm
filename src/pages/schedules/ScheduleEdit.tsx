import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput, message } from 'antd';
import type { Schedule } from '../../types/schedule';

const ScheduleEdit = () => {
  const { id } = useParams();
  const { getScheduleById, updateSchedule } = useSchedules();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  const [form] = AntdForm.useForm();

  useEffect(() => {
    if (!id) return;
    setInitialLoading(true);
    getScheduleById(Number(id))
      .then(data => {
        setSchedule(data);
        
        // 날짜 형식을 YYYY-MM-DD로 변환
        const formatDateForInput = (dateString: string) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };
        
        // 폼 데이터 설정
        form.setFieldsValue({
          title: data.title,
          date: formatDateForInput(data.date),
          customerId: data.customerId,
          description: data.description,
          memo: data.memo || '',
        });
      })
      .catch(err => {
        message.error('일정 정보를 찾을 수 없습니다.');
        navigate('/schedules');
      })
      .finally(() => setInitialLoading(false));
  }, [id]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await updateSchedule(Number(id), values);
      message.success('일정이 성공적으로 수정되었습니다!');
      navigate(`/schedules/${id}`);
    } catch (error) {
      console.error('일정 수정 오류:', error);
      message.error('일정 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="일정수정">
          <div className="text-center py-10 text-primary">일정 정보를 불러오는 중...</div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정수정">
        <h2 className="text-2xl font-bold text-primary mb-6">일정 수정</h2>
        <AntdForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">제목</span>}
            name="title"
            rules={[{ required: true, message: '제목을 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">날짜</span>}
            name="date"
            rules={[{ required: true, message: '날짜를 입력하세요!' }]}
          >
            <Input type="date" />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">고객 ID</span>}
            name="customerId"
            rules={[{ required: true, message: '고객 ID를 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">설명</span>}
            name="description"
          >
            <AntdInput.TextArea rows={3} />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">메모</span>}
            name="memo"
          >
            <AntdInput.TextArea rows={5} />
          </AntdForm.Item>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              type="primary" 
              htmlType="submit" 
              buttonColor="secondary"
              disabled={loading}
            >
              {loading ? '수정 중...' : '수정'}
            </Button>
            <Button 
              type="default" 
              htmlType="button" 
              buttonColor="light" 
              onClick={() => navigate(`/schedules/${id}`)}
              disabled={loading}
            >
              취소
            </Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default ScheduleEdit; 