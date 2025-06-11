import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput, Spin, Alert, message } from 'antd';
import type { Reservation } from '../../types/reservation';

const ReservationEdit = () => {
  const { id } = useParams();
  const { getReservationById, updateReservation } = useReservations();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const [form] = AntdForm.useForm();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getReservationById(Number(id))
      .then(data => {
        setReservation(data);
        setError(null);
        
        // 날짜 형식을 YYYY-MM-DD로 변환
        const formatDateForInput = (dateString: string) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };
        
        // 시간 형식을 HH:MM으로 변환
        const formatTimeForInput = (timeString: string) => {
          if (!timeString) return '';
          // 시간 문자열이 이미 HH:MM 형식이면 그대로 반환
          if (timeString.includes(':')) return timeString;
          // ISO 문자열이면 시간 부분만 추출
          const date = new Date(timeString);
          return date.toTimeString().slice(0, 5);
        };
        
        // 폼 데이터 설정
        form.setFieldsValue({
          title: data.title,
          duration: data.duration,
          region: data.region,
          meetingDate: formatDateForInput(data.meetingDate),
          meetingTime: formatTimeForInput(data.meetingTime),
          meetingPlace: data.meetingPlace,
          manager: data.manager,
          reservationMaker: data.reservationMaker || '',
          reservationMakerContact: data.reservationMakerContact || '',
          importantDocs: data.importantDocs || '',
          currencyInfo: data.currencyInfo || '',
          otherItems: data.otherItems || '',
          memo: data.memo || '',
        });
      })
      .catch(err => {
        setError('예약 정보를 찾을 수 없습니다.');
        setReservation(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onFinish = async (values: any) => {
    try {
      await updateReservation(Number(id), values);
      message.success('예약이 성공적으로 수정되었습니다!');
      navigate(`/reservations/${id}`);
    } catch (error) {
      console.error('예약 수정 오류:', error);
      message.error('예약 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !reservation) {
    return <Alert message={error || '예약 정보를 찾을 수 없습니다.'} type="error" showIcon className="mt-10" />;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약수정">
        <h2 className="text-2xl font-bold text-primary mb-6">예약 수정</h2>
        <AntdForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">여행 제목</span>}
            name="title"
            rules={[{ required: true, message: '여행 제목을 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">여행 기간</span>}
            name="duration"
            rules={[{ required: true, message: '여행 기간을 입력하세요!' }]}
          >
            <Input placeholder="예: 2025년 10월 01일 ~ 10월 07일 (6박 7일)" />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">여행 지역</span>}
            name="region"
            rules={[{ required: true, message: '여행 지역을 입력하세요!' }]}
          >
            <Input placeholder="예: 프랑스 파리, 스위스 인터라켄" />
          </AntdForm.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AntdForm.Item
              label={<span className="block text-primary font-semibold">미팅 일자</span>}
              name="meetingDate"
              rules={[{ required: true, message: '미팅 일자를 입력하세요!' }]}
            >
              <Input type="date" />
            </AntdForm.Item>
            <AntdForm.Item
              label={<span className="block text-primary font-semibold">미팅 시간</span>}
              name="meetingTime"
              rules={[{ required: true, message: '미팅 시간을 입력하세요!' }]}
            >
              <Input type="time" />
            </AntdForm.Item>
          </div>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">미팅 장소</span>}
            name="meetingPlace"
            rules={[{ required: true, message: '미팅 장소를 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">담당자</span>}
            name="manager"
            rules={[{ required: true, message: '담당자를 입력하세요!' }]}
          >
            <Input placeholder="예: 김철수 (010-1234-5678)" />
          </AntdForm.Item>

          <AntdForm.Item
            label={<span className="block text-primary font-semibold">예약자</span>}
            name="reservationMaker"
            rules={[{ required: true, message: '예약자를 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">예약자연락처</span>}
            name="reservationMakerContact"
            rules={[{ required: true, message: '예약자 연락처를 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>

          <SectionCard label="준비물" className="mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AntdForm.Item
                label={<span className="block text-primary font-semibold">필수 서류</span>}
                name="importantDocs"
              >
                <Input />
              </AntdForm.Item>
              <AntdForm.Item
                label={<span className="block text-primary font-semibold">환전 및 결제</span>}
                name="currencyInfo"
              >
                <Input />
              </AntdForm.Item>
            </div>
            <AntdForm.Item
              label={<span className="block text-primary font-semibold mt-4">개인 준비물</span>}
              name="otherItems"
            >
              <Input />
            </AntdForm.Item>
          </SectionCard>

          <SectionCard label="메모" className="mb-0">
            <AntdForm.Item
              label={<span className="block text-primary font-semibold">메모/참고사항</span>}
              name="memo"
            >
              <AntdInput.TextArea rows={3} />
            </AntdForm.Item>
          </SectionCard>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button type="primary" htmlType="submit" buttonColor="secondary">수정</Button>
            <Button type="default" htmlType="button" buttonColor="light" onClick={() => navigate(`/reservations/${id}`)}>취소</Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default ReservationEdit; 