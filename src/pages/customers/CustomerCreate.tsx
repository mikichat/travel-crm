import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CustomerCreate = () => {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer(form);
    navigate('/customers');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <h2 className="text-2xl font-bold text-primary mb-6">고객 등록</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-primary font-semibold mb-1">이름</label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">연락처</label>
            <Input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">이메일</label>
            <Input name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">주소</label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="flex gap-3 mt-6">
            <Button type="submit" color="primary">등록</Button>
            <Button type="button" color="light" onClick={() => navigate('/customers')}>취소</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CustomerCreate; 