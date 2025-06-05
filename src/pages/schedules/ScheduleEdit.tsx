import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput } from 'antd';

const ScheduleEdit = () => {
  const { id } = useParams();
  const { getScheduleById, updateSchedule } = useSchedules();
  const navigate = useNavigate();
  const schedule = getScheduleById(Number(id));

  const [form] = AntdForm.useForm();

  useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        title: schedule.title,
        date: schedule.date,
        customerId: schedule.customerId,
        description: schedule.description || '',
      });
    }
  }, [schedule, form]);

  const onFinish = (values: any) => {
    updateSchedule(Number(id), {
      ...values,
      customerId: Number(values.customerId),
    });
    navigate(`/schedules/${id}`);
  };

  if (!schedule) {
    return <div className="text-center text-dangerRed mt-10">일정 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정수정">
        <h2 className="text-2xl font-bold text-primary mb-6">일정 수정</h2>
        <AntdForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={form.getFieldsValue()}
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
            <Button type="primary" htmlType="submit" buttonColor="secondary">수정</Button>
            <Button type="default" htmlType="button" buttonColor="light" onClick={() => navigate(`/schedules/${id}`)}>취소</Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default ScheduleEdit; 