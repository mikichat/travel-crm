import { useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { useRouter } from 'next/navigation';

export default function CustomerNewPage() {
  const { addCustomer } = useCustomers();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addCustomer(form);
      router.push('/customers');
    } catch (err) {
      setError('고객 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">고객 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
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
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/customers')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
} 