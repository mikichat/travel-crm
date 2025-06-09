import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput, message } from 'antd';

const CustomerCreate = () => {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [form] = AntdForm.useForm();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await addCustomer({
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address || '',
        notes: values.notes || '',
      });
      
      message.success('고객이 성공적으로 등록되었습니다!');
      navigate('/customers');
    } catch (error) {
      console.error('고객 등록 오류:', error);
      message.error('고객 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
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
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">메모</span>}
            name="notes"
          >
            <AntdInput.TextArea rows={3} />
          </AntdForm.Item>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              type="primary" 
              htmlType="submit" 
              buttonColor="secondary"
              disabled={loading}
            >
              {loading ? '등록 중...' : '등록'}
            </Button>
            <Button 
              type="default" 
              htmlType="button" 
              buttonColor="light" 
              onClick={() => navigate('/customers')}
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

export default CustomerCreate; 