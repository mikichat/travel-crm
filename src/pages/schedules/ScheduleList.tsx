import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchedules } from '../../hooks/useSchedules';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Space } from 'antd';
// AG Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS for the grid - Removed as per AG Grid error #239
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; // Import ModuleRegistry and AllCommunityModule
import type { ColDef } from 'ag-grid-community';
import type { Schedule } from '../../types/schedule';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ AllCommunityModule ]);

const ScheduleList = () => {
  const { schedules } = useSchedules();
  const navigate = useNavigate();

  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<Schedule[]>([]);

  useEffect(() => {
    setRowData(schedules);
  }, [schedules]);

  const columnDefs: ColDef<Schedule>[] = [
    {
      headerName: '제목',
      field: 'title',
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => (
        <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/schedules/${params.data.id}`)}>{params.value}</span>
      ),
    },
    {
      headerName: '날짜',
      field: 'date',
      sortable: true,
      filter: true,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '고객ID',
      field: 'customerId',
      sortable: true,
      filter: true,
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
        </Space>
      ),
      minWidth: 100,
      maxWidth: 150,
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const onGridReady = (params: any) => {
    // console.log("Grid Ready", params);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="일정목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">일정 목록</h2>
          <Button onClick={() => navigate('/schedules/create')} buttonColor="primary">
            일정 등록
          </Button>
        </div>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true} // Enable pagination
            paginationPageSize={10} // Set page size
            paginationPageSizeSelector={[10, 20, 50]} // Allow page size selection
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ScheduleList; 