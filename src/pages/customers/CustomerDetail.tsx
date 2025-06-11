import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const CustomerDetail = () => {
  const { id } = useParams();
  const { getCustomerById, deleteCustomer, loading, error } = useCustomers();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        try {
          const data = await getCustomerById(Number(id));
          setCustomer(data);
        } catch (error) {
          console.error('고객 정보 불러오기 오류:', error);
          message.error('고객 정보를 불러올 수 없습니다.');
          navigate('/customers');
        }
      }
    };
    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    if (confirm('정말 이 고객을 삭제하시겠습니까?')) {
      try {
        await deleteCustomer(Number(id));
        message.success('고객이 성공적으로 삭제되었습니다.');
        navigate('/customers');
      } catch (error) {
        console.error('고객 삭제 오류:', error);
        message.error('고객 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="고객상세">
          <div className="text-center py-10 text-primary">고객 정보를 불러오는 중...</div>
        </SectionCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="고객상세">
          <div className="text-center py-10 text-dangerRed">오류: {error}</div>
        </SectionCard>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="고객상세">
          <div className="text-center py-10 text-dangerRed">고객 정보를 찾을 수 없습니다.</div>
        </SectionCard>
      </div>
    );
  }

  // 날짜 포맷팅 함수
  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객상세">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-primary">{customer.name}</h1>
          <Button onClick={() => navigate('/customers')} buttonColor="light">
            목록으로
          </Button>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <span className="block text-gray-500 mb-1 font-medium">이름</span>
            <span className="text-lg font-semibold">{customer.name}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">연락처</span>
            <span>{customer.phone || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">이메일</span>
            <span>{customer.email || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">주소</span>
            <span>{customer.address || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">메모</span>
            <span>{customer.notes || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">등록일</span>
            <span>{formatDate(customer.created_at)}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">수정일</span>
            <span>{formatDate(customer.updated_at)}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={() => navigate(`/customers/${id}/edit`)} 
            buttonColor="secondary"
          >
            수정
          </Button>
          <Button 
            onClick={handleDelete} 
            buttonColor="danger"
          >
            삭제
          </Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default CustomerDetail; 