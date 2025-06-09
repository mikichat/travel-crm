import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput, Spin, Alert, message } from 'antd';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import type { Schedule } from '../../types/schedule';

const ScheduleEdit = () => {
  const { id } = useParams();
  const { getScheduleById, updateSchedule } = useSchedules();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  const [form] = AntdForm.useForm();
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getScheduleById(Number(id))
      .then(data => {
        setSchedule(data);
        setError(null);
        
        // 폼 데이터 설정
        form.setFieldsValue({
          title: data.title,
          date: data.date,
          customerId: data.customerId,
          description: data.description,
        });

        // Editor.js 초기화
        if (!editorRef.current) {
          let editorData;
          try {
            editorData = data.memo ? JSON.parse(data.memo) : { blocks: [] };
          } catch (e) {
            console.error("Failed to parse schedule.memo in ScheduleEdit:", e);
            editorData = { blocks: [] };
          }

          editorRef.current = new EditorJS({
            holder: 'schedule-memo-editor',
            readOnly: false,
            tools: {
              header: Header,
              list: List,
              paragraph: Paragraph,
            },
            data: editorData,
          });
        }
      })
      .catch(err => {
        setError('일정 정보를 찾을 수 없습니다.');
        setSchedule(null);
      })
      .finally(() => setLoading(false));

    // 컴포넌트 언마운트 시 Editor.js 인스턴스 정리
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      // Editor.js에서 memo 데이터 가져오기
      let memoData = null;
      if (editorRef.current) {
        try {
          const outputData = await editorRef.current.save();
          memoData = JSON.stringify(outputData);
        } catch (error) {
          console.error('Saving failed: ', error);
        }
      }

      const updatedValues = {
        ...values,
        memo: memoData,
      };
      
      await updateSchedule(Number(id), updatedValues);
      message.success('일정이 성공적으로 수정되었습니다!');
      navigate(`/schedules/${id}`);
    } catch (error) {
      console.error('일정 수정 오류:', error);
      message.error('일정 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !schedule) {
    return <Alert message={error || '일정 정보를 찾을 수 없습니다.'} type="error" showIcon className="mt-10" />;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정수정">
        <h2 className="text-2xl font-bold text-primary mb-6">일정 수정</h2>
        <AntdForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">제목</span>}
            name="title"
            rules={[{ required: true, message: '제목을 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">날짜</span>}
            name="date"
            rules={[{ required: true, message: '날짜를 입력하세요!' }]}
          >
            <Input type="date" />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">고객 ID</span>}
            name="customerId"
            rules={[{ required: true, message: '고객 ID를 입력하세요!' }]}
          >
            <Input />
          </AntdForm.Item>
          <AntdForm.Item
            label={<span className="block text-primary font-semibold">설명</span>}
            name="description"
          >
            <AntdInput.TextArea rows={3} />
          </AntdForm.Item>

          <SectionCard label="메모" className="mb-0">
            <div id="schedule-memo-editor" className="border border-gray-300 rounded-md p-4 bg-white editor-editable"></div>
          </SectionCard>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button type="primary" htmlType="submit" buttonColor="secondary">수정</Button>
            <Button type="default" htmlType="button" buttonColor="light" onClick={() => navigate(`/schedules/${id}`)}>취소</Button>
          </div>
        </AntdForm>
      </SectionCard>
    </div>
  );
};

export default ScheduleEdit; 