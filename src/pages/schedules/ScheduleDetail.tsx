import { useParams, useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

const ScheduleDetail = () => {
  const { id } = useParams();
  const { getScheduleById } = useSchedules();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<any>(null);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getScheduleById(Number(id));
      setSchedule(data);
    })();
  }, [id]);

  useEffect(() => {
    if (schedule && !editorRef.current) {
      let editorData;
      try {
        editorData = schedule.memo ? JSON.parse(schedule.memo) : { blocks: [] };
      } catch (e) {
        editorData = { blocks: [] };
      }
      editorRef.current = new EditorJS({
        holder: 'editorjs-container',
        readOnly: true,
        tools: { header: Header, list: List, paragraph: Paragraph },
        data: editorData,
      });
    }
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [schedule]);

  if (!schedule) {
    return <div style={{ textAlign: 'center', marginTop: '40px', color: 'red' }}>일정 정보를 찾을 수 없습니다.</div>;
  }

  // 날짜 포맷팅 함수
  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', border: '1px solid #eee' }}>
      <div style={{ paddingBottom: '24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{schedule.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#555' }}>
            <span>날짜: {formatDate(schedule.date)}</span>
            <span>고객ID: {schedule.customerId}</span>
            <span>등록일: {formatDate(schedule.createdAt)}</span>
          </div>
        </div>
        <Button onClick={() => navigate('/schedules')} buttonColor="light">목록으로</Button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>설명</h2>
        <div style={{ backgroundColor: '#f9f9f9', padding: '16px', border: '1px solid #ddd', minHeight: '80px' }}>
          {schedule.description || <span style={{ color: '#aaa' }}>설명 없음</span>}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>메모</h2>
        <div id="editorjs-container" style={{ border: '1px solid #ddd', padding: '16px', backgroundColor: '#fff', minHeight: '80px' }} />
        {!schedule.memo && <div style={{ color: '#aaa', fontSize: '14px', marginTop: '8px', padding: '8px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>메모가 없습니다.</div>}
      </div>
    </div>
  );
};

export default ScheduleDetail; 