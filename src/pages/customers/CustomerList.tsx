import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const CustomerList = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">고객 목록</h2>
        <Button onClick={() => navigate('/customers/create')} color="primary">
          고객 등록
        </Button>
      </div>
      <div className="grid gap-6">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-semibold text-primary">{customer.name}</div>
                <div className="text-sm text-secondary mt-1">{customer.phone} | {customer.email}</div>
                <div className="text-sm text-gray-500 mt-1">주소: {customer.address}</div>
                <div className="text-sm text-gray-400 mt-1">등록일: {customer.createdAt}</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button color="info" className="w-20" onClick={() => navigate(`/customers/${customer.id}`)}>
                  상세
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
