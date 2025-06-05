import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Customer } from '../../types/customer';

const CustomerList = () => {
  const { customers } = useCustomers();
  const navigate = useNavigate();

  const columns: ColumnsType<Customer> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Customer) => <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/customers/${record.id}`)}>{text}</span>,
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '동작',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button color="info" onClick={() => navigate(`/customers/${record.id}`)}>
            상세
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객목록">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">고객 목록</h2>
          <Button onClick={() => navigate('/customers/create')} color="primary">
            고객 등록
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={customers.map(c => ({ ...c, key: c.id }))}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          className="rounded-lg overflow-hidden border border-lightViolet"
        />
      </SectionCard>
    </div>
  );
};

export default CustomerList;
