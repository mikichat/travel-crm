import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput } from 'antd';

const ScheduleCreate = () => {
  const { addSchedule } = useSchedules();
  const navigate = useNavigate();

  const [form] = AntdForm.useForm();

  const onFinish = (values: any) => {
    addSchedule({
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      ...values,
      customerId: Number(values.customerId),
    });
    navigate('/schedules');
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정등록">
        <h2 className="text-2xl font-bold text-primary mb-6">새 일정 등록</h2>
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
            label={<span className="block text-primary font-semibold">고객ID</span>}
            name="customerId"
            rules={[
              { required: true, message: '고객ID를 입력하세요!' },
              { pattern: /^[0-9]*$/, message: '고객ID는 숫자만 입력 가능합니다!' }
            ]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">설명</span>}
            name="description"
          >
            <AntdInput.TextArea rows={3} />
          </AntdForm.Item>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button type="primary" htmlType="submit" buttonColor="secondary">등록</Button>
            <Button type="default" htmlType="button" buttonColor="light" onClick={() => navigate('/schedules')}>취소</Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default ScheduleCreate; 