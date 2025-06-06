import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SectionCard from '../../components/ui/SectionCard';
import { Form as AntdForm, Input as AntdInput } from 'antd';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

const ScheduleEdit = () => {
  const { id } = useParams();
  const { getScheduleById, updateSchedule } = useSchedules();
  const navigate = useNavigate();
  const schedule = getScheduleById(Number(id));

  const [form] = AntdForm.useForm();
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        title: schedule.title,
        date: schedule.date,
        customerId: schedule.customerId,
        description: schedule.description,
        // memo는 Editor.js로 처리되므로 AntdForm에서 직접 설정하지 않습니다.
      });

      // Editor.js 초기화
      if (!editorRef.current) {
        let editorData;
        try {
          editorData = schedule.memo ? JSON.parse(schedule.memo) : { blocks: [] };
        } catch (e) {
          console.error("Failed to parse schedule.memo in ScheduleEdit:", e);
          editorData = { blocks: [] };
        }

        editorRef.current = new EditorJS({
          holder: 'schedule-memo-editor', // 고유한 holder ID
          readOnly: false, // 편집 모드이므로 readOnly는 false
          tools: {
            header: Header,
            list: List,
            paragraph: Paragraph,
          },
          data: editorData,
        });
      }
    }

    // 컴포넌트 언마운트 시 Editor.js 인스턴스 정리
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [schedule, form]);

  const onFinish = async (values: any) => {
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
      memo: memoData, // Editor.js에서 가져온 memo 데이터 추가
    };
    updateSchedule(Number(id), updatedValues);
    navigate(`/schedules/${id}`);
  };

  if (!schedule) {
    return <div className="text-center text-dangerRed mt-10">일정 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정수정">
        <h2 className="text-2xl font-bold text-primary mb-6">일정 수정</h2>
        <AntdForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={form.getFieldsValue()} // 초기값은 useEffect에서 설정
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