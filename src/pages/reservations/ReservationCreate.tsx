import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput } from 'antd';

const ReservationCreate = () => {
  const { addReservation } = useReservations();
  const navigate = useNavigate();

  const [form] = AntdForm.useForm();

  const onFinish = (values: any) => {
    addReservation({
      id: Date.now(),
      ...values,
    });
    navigate('/reservations');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약등록">
        <h2 className="text-2xl font-bold text-primary mb-6">새 예약 등록</h2>
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
          <div className="grid grid-cols-2 gap-4">
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

          <SectionCard label="준비물" className="mb-0">
            <div className="grid grid-cols-2 gap-4">
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

          <div className="flex gap-3 mt-6">
            <Button type="primary" htmlType="submit" color="secondary">등록</Button>
            <Button type="default" htmlType="button" color="light" onClick={() => navigate('/reservations')}>취소</Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default ReservationCreate; 