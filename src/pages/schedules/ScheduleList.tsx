import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Space, message, Checkbox } from 'antd';
// AG Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS for the grid - Removed to use Theming API
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; // Import ModuleRegistry and AllCommunityModule
import type { ColDef } from 'ag-grid-community';
import type { Schedule } from '../../types/schedule';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ AllCommunityModule ]);

const ScheduleList = () => {
  const { schedules, deleteSchedule, updateSchedule } = useSchedules();
  const navigate = useNavigate();

  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<Schedule[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRowData(schedules);
  }, [schedules]);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteSchedule(id);
        message.success('일정이 성공적으로 삭제되었습니다!');
      } catch (error) {
        console.error('일정 삭제 오류:', error);
        message.error('일정 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const columnDefs: ColDef<Schedule>[] = [
    {
      headerName: '제목',
      field: 'title',
      sortable: true,
      filter: true,
      editable: isEditing,
      cellRenderer: (params: any) => (
        <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/schedules/${params.data.id}`)}>{params.value}</span>
      ),
    },
    {
      headerName: '날짜',
      field: 'date',
      sortable: true,
      filter: true,
      editable: isEditing,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '고객ID',
      field: 'customerId',
      sortable: true,
      filter: true,
      editable: isEditing,
    },
    {
      headerName: '등록일',
      field: 'createdAt',
      sortable: true,
      filter: true,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '동작',
      cellRenderer: (params: any) => (
        <Space size="middle">
          <Button buttonColor="info" onClick={() => navigate(`/schedules/${params.data.id}`)}>
            상세
          </Button>
          <Button buttonColor="secondary" onClick={() => navigate(`/schedules/${params.data.id}/edit`)}>
            수정
          </Button>
          <Button buttonColor="danger" onClick={() => handleDelete(params.data.id)}>
            삭제
          </Button>
        </Space>
      ),
      minWidth: 150,
      maxWidth: 200,
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    singleClickEdit: true,
  };

  const onGridReady = (params: any) => {
    // console.log("Grid Ready", params);
  };

  const onCellValueChanged = async (event: any) => {
    const { data, colDef, newValue } = event;
    if (isEditing && colDef.field) {
      try {
        const updatedSchedule = { ...data, [colDef.field]: newValue };
        await updateSchedule(updatedSchedule.id, updatedSchedule);
        message.success('일정 정보가 성공적으로 업데이트되었습니다!');
      } catch (error) {
        console.error('일정 정보 업데이트 오류:', error);
        message.error('일정 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">일정 목록</h2>
          <div className="flex items-center space-x-4">
            <Checkbox checked={isEditing} onChange={(e) => setIsEditing(e.target.checked)}>
              수정 모드
            </Checkbox>
            <Button onClick={() => navigate('/schedules/create')} buttonColor="primary">
              일정 등록
            </Button>
          </div>
        </div>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ScheduleList; 