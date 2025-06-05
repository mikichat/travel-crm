import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import { Descriptions } from 'antd';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';

const CustomerDetail = () => {
  const { id } = useParams();
  const { getCustomerById } = useCustomers();
  const navigate = useNavigate();
  const customer = getCustomerById(Number(id));

  if (!customer) {
    return <div className="text-center text-dangerRed mt-10">고객 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객정보">
        <h2 className="text-2xl font-bold text-primary mb-6">고객 상세</h2>
        <Descriptions column={1} bordered className="mb-4">
          <Descriptions.Item label="이름"><span className="font-semibold text-primary">{customer.name}</span></Descriptions.Item>
          <Descriptions.Item label="연락처">{customer.phone}</Descriptions.Item>
          <Descriptions.Item label="이메일">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="주소">{customer.address}</Descriptions.Item>
          <Descriptions.Item label="등록일">{customer.createdAt}</Descriptions.Item>
        </Descriptions>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button onClick={() => navigate('/customers')} buttonColor="light">목록</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default CustomerDetail; 