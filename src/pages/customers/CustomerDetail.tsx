import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import { useEffect, useState } from 'react';
import SectionCard from '../../components/ui/SectionCard';

const CustomerDetail = () => {
  const { id } = useParams();
  const { getCustomerById, loading, error } = useCustomers();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        const data = await getCustomerById(Number(id));
        setCustomer(data);
      }
    };
    fetchCustomer();
  }, [id, getCustomerById]);

  if (loading) {
    return <div className="text-center text-primary mt-10">고객 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-dangerRed mt-10">오류: {error}</div>;
  }

  if (!customer) {
    return <div className="text-center text-dangerRed mt-10">고객 정보를 찾을 수 없습니다.</div>;
  }

  // 날짜 포맷팅 함수
  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', border: '1px solid #eee' }}>
      <div style={{ paddingBottom: '24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{customer.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#555' }}>
            <span>연락처: {customer.phone}</span>
            <span>이메일: {customer.email}</span>
            <span>등록일: {formatDate(customer.created_at)}</span>
          </div>
        </div>
        <Button onClick={() => navigate('/customers')} buttonColor="light">목록으로</Button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>주소</h2>
        <div style={{ backgroundColor: '#f9f9f9', padding: '16px', border: '1px solid #ddd', minHeight: '80px' }}>
          {customer.address || <span style={{ color: '#aaa' }}>주소 없음</span>}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>메모</h2>
        <div style={{ backgroundColor: '#f9f9f9', padding: '16px', border: '1px solid #ddd', minHeight: '80px' }}>
          {customer.notes || <span style={{ color: '#aaa' }}>메모 없음</span>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail; 