import { useCustomers } from '@/hooks/useCustomers';
import Link from 'next/link';

export default function CustomersPage() {
  const { customers, loading, error, deleteCustomer, refetch } = useCustomers();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">고객 목록</h1>
        <Link href="/customers/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">고객 등록</Link>
      </div>
      {loading && <div className="text-center text-gray-500">로딩 중...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">이름</th>
            <th className="py-2 px-4 text-left">이메일</th>
            <th className="py-2 px-4 text-left">전화번호</th>
            <th className="py-2 px-4 text-left">주소</th>
            <th className="py-2 px-4">관리</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b last:border-b-0">
              <td className="py-2 px-4">
                <Link href={`/customers/${customer.id}`} className="text-blue-600 hover:underline">
                  {customer.name}
                </Link>
              </td>
              <td className="py-2 px-4">{customer.email}</td>
              <td className="py-2 px-4">{customer.phone}</td>
              <td className="py-2 px-4">{customer.address}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={async () => {
                    if (confirm('정말 삭제하시겠습니까?')) {
                      await deleteCustomer(customer.id);
                      refetch();
                    }
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && !loading && (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">등록된 고객이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 