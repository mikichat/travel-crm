import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReservations } from '../../hooks/useReservations';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Space, Input, Checkbox } from 'antd';
// AG Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS for the grid - Removed to use Theming API
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; // Import ModuleRegistry and AllCommunityModule
import type { ColDef } from 'ag-grid-community';
import type { Reservation } from '../../types/reservation';
import { message } from 'antd';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ AllCommunityModule ]);

const ReservationList = () => {
  const { reservations, deleteReservation, updateReservation } = useReservations();
  const navigate = useNavigate();
  const location = useLocation();

  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<Reservation[]>([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let filtered = reservations;
    if (search) {
      filtered = filtered.filter(r =>
        r.reservationMaker.toLowerCase().includes(search.toLowerCase()) ||
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setRowData(filtered);
  }, [reservations, search]);

  const columnDefs: ColDef<Reservation>[] = [
    {
      headerName: '여행 제목',
      field: 'title',
      sortable: true,
      filter: true,
      editable: isEditing,
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
      editable: isEditing,
    },
    {
      headerName: '여행 지역',
      field: 'region',
      sortable: true,
      filter: true,
      editable: isEditing,
    },
    {
      headerName: '미팅 일자',
      field: 'meetingDate',
      sortable: true,
      filter: true,
      editable: isEditing,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '출발일',
      field: 'departureDate',
      sortable: true,
      filter: true,
      editable: isEditing,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '도착일',
      field: 'arrivalDate',
      sortable: true,
      filter: true,
      editable: isEditing,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      headerName: '담당자',
      field: 'manager',
      sortable: true,
      filter: true,
      editable: isEditing,
    },
    {
      headerName: '예약자',
      field: 'reservationMaker',
      sortable: true,
      filter: true,
      editable: isEditing,
    },
    {
      headerName: '예약자연락처',
      field: 'reservationMakerContact',
      sortable: true,
      filter: true,
      editable: isEditing,
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
    singleClickEdit: true,
  };

  const onGridReady = (params: any) => {
    // console.log("Grid Ready", params);
  };

  const onCellValueChanged = async (event: any) => {
    const { id } = event.data;
    const updatedField = event.colDef.field;
    let newValue = event.newValue; // Use newValue directly from event
    let processedValue = newValue; // Initialize processedValue with newValue

    if (isEditing && updatedField && newValue !== undefined) {
      try {
        if (['meetingDate', 'departureDate', 'arrivalDate'].includes(updatedField)) {
          if (newValue === '' || newValue === null) {
            message.error(`${updatedField} 필드는 비워둘 수 없습니다. YYYY-MM-DD 형식으로 날짜를 입력해주세요.`);
            return; // Empty value not allowed due to NOT NULL constraint
          }

          const date = new Date(newValue);
          if (isNaN(date.getTime())) {
            message.error(`유효하지 않은 날짜 형식입니다. ${updatedField} 필드에 YYYY-MM-DD 형식으로 날짜를 입력해주세요.`);
            return; // Invalid date, stop update
          }
          // Format to YYYY-MM-DD
          processedValue = date.getFullYear() + '-' +
                           String(date.getMonth() + 1).padStart(2, '0') + '-' +
                           String(date.getDate()).padStart(2, '0');
        }

        await updateReservation(id, { [updatedField]: processedValue });
        message.success('예약 정보가 성공적으로 업데이트되었습니다!');
      } catch (error) {
        console.error('예약 정보 업데이트 오류:', error);
        message.error('예약 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="예약목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">예약 목록</h2>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
            <div style={{ padding: '16px', borderBottom: '1px solid rgb(240, 240, 240)' }}>
              <Input.Search
                placeholder="예약자 검색 (예약 관리)"
                allowClear
                enterButton
                value={search}
                onChange={e => setSearch(e.target.value)}
                onSearch={value => setSearch(value)}
                style={{ width: '100%' }}
              />
            </div>
            <Checkbox checked={isEditing} onChange={(e) => setIsEditing(e.target.checked)} className="ml-2">
              수정 모드
            </Checkbox>
            <Button onClick={() => navigate('/reservations/create')} buttonColor="primary" className="ml-1">
              예약 등록
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
            readOnlyEdit={!isEditing}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ReservationList; 