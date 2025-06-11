import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput, message } from 'antd';

const CustomerEdit = () => {
  const { id } = useParams();
  const { getCustomerById, updateCustomer } = useCustomers();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [form] = AntdForm.useForm();

  // 기존 고객 데이터 불러오기
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      
      try {
        setInitialLoading(true);
        const customer = await getCustomerById(Number(id));
        form.setFieldsValue({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address || '',
          notes: customer.notes || '',
        });
      } catch (error) {
        console.error('고객 정보 불러오기 오류:', error);
        message.error('고객 정보를 불러올 수 없습니다.');
        navigate('/customers');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const onFinish = async (values: any) => {
    if (!id) return;
    
    try {
      setLoading(true);
      await updateCustomer(Number(id), {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address || '',
        notes: values.notes || '',
      });
      
      message.success('고객 정보가 성공적으로 수정되었습니다!');
      navigate(`/customers/${id}`);
    } catch (error) {
      console.error('고객 수정 오류:', error);
      message.error('고객 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="고객수정">
          <div className="text-center py-10 text-primary">고객 정보를 불러오는 중...</div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객수정">
        <h2 className="text-2xl font-bold text-primary mb-6">고객 정보 수정</h2>
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
              {loading ? '수정 중...' : '수정'}
            </Button>
            <Button 
              type="default" 
              htmlType="button" 
              buttonColor="light" 
              onClick={() => navigate(`/customers/${id}`)}
            >
              취소
            </Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default CustomerEdit;