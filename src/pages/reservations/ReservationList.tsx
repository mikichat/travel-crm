import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Space } from 'antd';
// AG Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS for the grid - Removed as per AG Grid error #239
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; // Import ModuleRegistry and AllCommunityModule
import type { ColDef } from 'ag-grid-community';
import type { Reservation } from '../../types/reservation';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ AllCommunityModule ]);

const ReservationList = () => {
  const { reservations, deleteReservation, updateReservation } = useReservations();
  const navigate = useNavigate();

  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<Reservation[]>([]);

  useEffect(() => {
    setRowData(reservations);
  }, [reservations]);

  const columnDefs: ColDef<Reservation>[] = [
    {
      headerName: '여행 제목',
      field: 'title',
      sortable: true,
      filter: true,
      editable: true, // Enable in-cell editing
      cellRenderer: (params: any) => {
        const handleCellClick = () => {
          if (!params.node.isEditing()) {
            navigate(`/reservations/${params.data.id}`);
          }
        };
        return (
          <span
            className="font-semibold text-primary cursor-pointer"
            onClick={handleCellClick}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      headerName: '여행 기간',
      field: 'duration',
      sortable: true,
      filter: true,
    },
    {
      headerName: '여행 지역',
      field: 'region',
      sortable: true,
      filter: true,
    },
    {
      headerName: '미팅 일자',
      field: 'meetingDate',
      sortable: true,
      filter: true,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '담당자',
      field: 'manager',
      sortable: true,
      filter: true,
    },
    {
      headerName: '동작',
      cellRenderer: (params: any) => (
        <Space size="middle">
          <Button buttonColor="info" onClick={() => navigate(`/reservations/${params.data.id}`)}>
            상세
          </Button>
          <Button buttonColor="secondary" onClick={() => navigate(`/reservations/${params.data.id}/edit`)}>
            수정
          </Button>
          <Button buttonColor="danger" onClick={() => {
            if(window.confirm('정말 삭제하시겠습니까?')) deleteReservation(params.data.id);
          }}>
            삭제
          </Button>
        </Space>
      ),
      minWidth: 200,
      maxWidth: 250,
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

  const onCellValueChanged = async (event: any) => {
    const { id } = event.data;
    const updatedField = event.colDef.field;
    const newValue = event.newValue;

    if (updatedField && newValue !== undefined) {
      await updateReservation(id, { [updatedField]: newValue });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">예약 목록</h2>
          <Button onClick={() => navigate('/reservations/create')} buttonColor="primary">
            예약 등록
          </Button>
        </div>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
            readOnlyEdit={true} // For simpler inline editing
            pagination={true} // Enable pagination
            paginationPageSize={10} // Set page size
            paginationPageSizeSelector={[10, 20, 50]} // Allow page size selection
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ReservationList; 