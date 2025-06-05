import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';

const CustomerDetail = () => {
  const { id } = useParams();
  const { getCustomerById } = useCustomers();
  const navigate = useNavigate();
  const customer = getCustomerById(Number(id));

  if (!customer) {
    return <div>고객 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>고객 상세</h2>
      <div><b>이름:</b> {customer.name}</div>
      <div><b>연락처:</b> {customer.phone}</div>
      <div><b>이메일:</b> {customer.email}</div>
      <div><b>주소:</b> {customer.address}</div>
      <div><b>등록일:</b> {customer.createdAt}</div>
      <button onClick={() => navigate('/customers')}>목록으로</button>
    </div>
  );
};

export default CustomerDetail; 