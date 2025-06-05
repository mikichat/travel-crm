import { useParams, useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';

const ScheduleDetail = () => {
  const { id } = useParams();
  const { getScheduleById } = useSchedules();
  const navigate = useNavigate();
  const schedule = getScheduleById(Number(id));

  if (!schedule) {
    return <div className="text-center text-dangerRed mt-10">일정 정보를 찾을 수 없습니다.</div>;
  }

  // test2.html에서 가져온 인라인 스타일.
  // 실제 애플리케이션에서는 별도의 .css 파일이나 전역 스타일로 관리하는 것이 좋습니다.
  const inlineStyles = `
    body {
      font-family: 'Noto Sans KR', sans-serif;
      background-color: #f3f4f6;
      min-height: max(884px, 100dvh);
    }
    .timeline-item:not(:last-child)::before {
      content: "";
      position: absolute;
      left: 2rem;
      top: 2.5rem;
      bottom: -2.5rem;
      width: 2px;
      background-color: #e5e7eb;
      z-index: 0;
    }
    .timeline-dot {
      position: absolute;
      left: 1.5rem;
      top: 1.5rem;
      width: 1rem;
      height: 1rem;
      background-color: #3b82f6;
      border-radius: 9999px;
      z-index: 1;
    }
  `;

  return (
    <>
      {/* test2.html의 <style> 블록 내용을 여기에 삽입합니다. */}
      {/* 실제 애플리케이션에서는 public/index.html 또는 전역 CSS 파일에 다음 링크와 스타일을 추가해야 합니다. */}
      {/* <link href="https://cdn.tailwindcss.com?plugins=forms,container-queries" rel="stylesheet"/> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet"/> */}
      {/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/> */}
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <img alt="Company logo" className="h-8 w-8 mr-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpaPQvuYRVYOCRmckhEPUIvZ1rBxrlsQk-H1b6jXmBw6ssZOB7CzOmspQt41s4p64RrC9o99CqJ-pySPOT2qtQNlkN0-7SML3qQAjGggUsEa4OgxMU5_CVi60g95qGkhvyJHQb0WMZnSIKatiP3zb95Hg56MpEGOexu4StvQ4vA1bF4ZsAithovzPyHSQAaEGX_kCahXxiq-Cw7JP8ex4Fb6g68KGEe8Bc9s0IoIQV4HhUe8pqfHSnbheHNHCsQJ7X9ToinX79TCs"/>
                <p className="text-xs text-gray-500">여행세상 (TRAVWORLD)</p>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{schedule.title} <span className="text-red-500">?박</span> ?일</h1>
            </div>
            <div className="text-right">
              <img alt="Plane and globe illustration" className="h-16 w-16 ml-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnDiY1H7L5gG2-1YXMw241fP7t_jZMZ05do8Vu_Y2jtvWHkrNa47MFRkmFXbQvFxsuIYHG_3eEQYTJjQGU4UZLkNzz54ToL6zN1ijMEcRHMj1ni4ffQGX7ekh71EynofjPAdUh3I6Z5Cxi8si4F05_Gy3d9LSpKQfgyVePwK_SUPLEPzmWl0I4LFchlnZE3-xv-VjSx203_c8vT4dENcYJLkqRBEr9Peuja3-lEgMEOoarGchh5am8JkPxKbc8zEKxK-hVrwcHv6o"/>
            </div>
          </div>
        </header>
        <div className="p-4">
          <div className="space-y-8">
            {/* 현재 schedule 객체의 데이터를 기반으로 한 타임라인 아이템 예시 */}
            <div className="relative timeline-item">
              <div className="timeline-dot"></div>
              <div className="ml-8 pl-4">
                <div className="flex items-center mb-1">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">상세 정보</span>
                  <span className="ml-2 text-lg font-semibold text-gray-700">{schedule.title}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="material-icons text-base mr-1">event</span>
                    <strong>날짜:</strong> {schedule.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="material-icons text-base mr-1">person</span>
                    <strong>고객ID:</strong> {schedule.customerId}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <p className="font-medium text-gray-700">설명:</p>
                    <ul className="list-disc list-inside ml-1 space-y-1">
                      <li>{schedule.description}</li>
                    </ul>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="material-icons text-base mr-1">access_time</span>
                    <strong>등록일:</strong> {schedule.createdAt}
                  </div>
                </div>
              </div>
            </div>
            {/* schedule 객체에 상세 일정 데이터(예: 일차별 교통편, 식사, 활동 목록, 이미지 등)가 추가된다면, 이곳에 추가적인 타임라인 아이템들을 동적으로 렌더링할 수 있습니다. */}
          </div>
        </div>
        <div className="flex gap-3 mt-6 p-4">
          <Button onClick={() => navigate('/schedules')} buttonColor="light">목록</Button>
        </div>
      </div>
    </>
  );
};

export default ScheduleDetail; 