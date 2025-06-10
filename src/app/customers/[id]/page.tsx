import { useEffect, useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { useRouter, useParams } from 'next/navigation';

export default function CustomerDetailPage() {
  const { getCustomerById, updateCustomer, deleteCustomer } = useCustomers();
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [customer, setCustomer] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCustomerById(id)
      .then((data) => {
        setCustomer(data);
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          notes: data.notes || '',
        });
      })
      .catch(() => setError('고객 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await updateCustomer(id, form);
      setEditMode(false);
      // 최신 정보 다시 불러오기
      const updated = await getCustomerById(id);
      setCustomer(updated);
    } catch {
      setError('수정에 실패했습니다.');
    }
  }

  async function handleDelete() {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteCustomer(id);
      router.push('/customers');
    }
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-500">로딩 중...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  if (!customer) {
    return <div className="text-center py-10 text-gray-400">고객 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">고객 상세</h1>
      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block mb-1 font-medium">이름 <span className="text-red-500">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">이메일</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">전화번호</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">주소</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">메모</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <span className="block text-gray-500 mb-1">이름</span>
            <span className="font-medium text-lg">{customer.name}</span>
          </div>
          <div>
            <span className="block text-gray-500 mb-1">이메일</span>
            <span>{customer.email || '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 mb-1">전화번호</span>
            <span>{customer.phone || '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 mb-1">주소</span>
            <span>{customer.address || '-'}</span>
          </div>
          <div>
            <span className="block text-gray-500 mb-1">메모</span>
            <span>{customer.notes || '-'}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 