import { useParams, useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { message } from 'antd';
import type { Reservation } from '../../types/reservation';

const ReservationDetail = () => {
  const { id } = useParams();
  const { getReservationById, deleteReservation } = useReservations();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getReservationById(Number(id));
        setReservation(data);
        setError(null);
      } catch (error) {
        console.error('예약 정보 불러오기 오류:', error);
        setError('예약 정보를 찾을 수 없습니다.');
        setReservation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    if (confirm('정말 이 예약을 삭제하시겠습니까?')) {
      try {
        await deleteReservation(Number(id));
        message.success('예약이 성공적으로 삭제되었습니다.');
        navigate('/reservations');
      } catch (error) {
        console.error('예약 삭제 오류:', error);
        message.error('예약 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="예약상세">
          <div className="text-center py-10 text-primary">예약 정보를 불러오는 중...</div>
        </SectionCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="예약상세">
          <div className="text-center py-10 text-dangerRed">오류: {error}</div>
        </SectionCard>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
        <SectionCard label="예약상세">
          <div className="text-center py-10 text-dangerRed">예약 정보를 찾을 수 없습니다.</div>
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
      <SectionCard label="예약상세">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-primary">{reservation.title}</h1>
          <Button onClick={() => navigate('/reservations')} buttonColor="light">
            목록으로
          </Button>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <span className="block text-gray-500 mb-1 font-medium">여행 제목</span>
            <span className="text-lg font-semibold">{reservation.title}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">여행 기간</span>
            <span>{reservation.duration}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">여행 지역</span>
            <span>{reservation.region}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">미팅 일자</span>
            <span>{formatDate(reservation.meetingDate)}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">출발 일자</span>
            <span>{formatDate(reservation.departureDate)}</span>
          </div>

          <div>
            <span className="block text-gray-500 mb-1 font-medium">도착 일자</span>
            <span>{formatDate(reservation.arrivalDate)}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">미팅 시간</span>
            <span>{reservation.meetingTime}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">미팅 장소</span>
            <span>{reservation.meetingPlace}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">담당자</span>
            <span>{reservation.manager}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">예약자</span>
            <span>{reservation.reservationMaker || '-'}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 mb-1 font-medium">예약자 연락처</span>
            <span>{reservation.reservationMakerContact || '-'}</span>
          </div>
          
          {reservation.importantDocs && (
            <div>
              <span className="block text-gray-500 mb-1 font-medium">필수 서류</span>
              <span>{reservation.importantDocs}</span>
            </div>
          )}
          
          {reservation.currencyInfo && (
            <div>
              <span className="block text-gray-500 mb-1 font-medium">환전 및 결제</span>
              <span>{reservation.currencyInfo}</span>
            </div>
          )}
          
          {reservation.otherItems && (
            <div>
              <span className="block text-gray-500 mb-1 font-medium">개인 준비물</span>
              <span>{reservation.otherItems}</span>
            </div>
          )}
          
          {reservation.memo && (
            <div>
              <span className="block text-gray-500 mb-1 font-medium">메모/참고사항</span>
              <span>{reservation.memo}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={() => navigate(`/reservations/${id}/edit`)} 
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

export default ReservationDetail; 