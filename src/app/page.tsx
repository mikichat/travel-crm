import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🚀 Travel CRM
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            여행사 고객 관리 시스템
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/customers" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              고객 관리
            </Link>
            <Link 
              href="/schedules" 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              일정 관리
            </Link>
            <Link 
              href="/reservations" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              예약 관리
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 고객 관리 카드 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">고객 관리</h3>
              <p className="text-gray-600 mb-4">
                고객 정보를 등록, 조회, 수정, 삭제할 수 있습니다.
              </p>
              <Link 
                href="/customers" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                바로가기
              </Link>
            </div>
          </div>

          {/* 일정 관리 카드 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">일정 관리</h3>
              <p className="text-gray-600 mb-4">
                여행 일정을 등록하고 관리할 수 있습니다.
              </p>
              <Link 
                href="/schedules" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                바로가기
              </Link>
            </div>
          </div>

          {/* 예약 관리 카드 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">예약 관리</h3>
              <p className="text-gray-600 mb-4">
                여행 예약을 등록하고 관리할 수 있습니다.
              </p>
              <Link 
                href="/reservations" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                바로가기
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🛠️ 기술 스택
          </h2>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <span>Next.js 15</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
            <span>SQLite</span>
            <span>Ant Design</span>
          </div>
        </div>
      </div>
    </div>
  );
} 