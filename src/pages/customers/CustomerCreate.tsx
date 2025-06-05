import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput } from 'antd';

const CustomerCreate = () => {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();
  
  const [form] = AntdForm.useForm();

  const onFinish = (values: any) => {
    addCustomer({
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      ...values,
    });
    navigate('/customers');
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객등록">
        <h2 className="text-2xl font-bold text-primary mb-6">새 고객 등록</h2>
        <AntdForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">이름</span>}
            name="name"
            rules={[{ required: true, message: '이름을 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">연락처</span>}
            name="phone"
            rules={[{ required: true, message: '연락처를 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">이메일</span>}
            name="email"
            rules={[{ required: true, type: 'email', message: '유효한 이메일을 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">주소</span>}
            name="address"
          >
            <Input />
          </AntdForm.Item>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button type="primary" htmlType="submit" buttonColor="secondary">등록</Button>
            <Button type="default" htmlType="button" buttonColor="light" onClick={() => navigate('/customers')}>취소</Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default CustomerCreate; 