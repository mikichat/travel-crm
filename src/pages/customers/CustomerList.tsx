import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../hooks/useCustomers';
import Button from '../../components/ui/Button';
import SectionCard from '../../components/ui/SectionCard';
import { Space, message, Checkbox } from 'antd';
// AG Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS for the grid - Removed to use Theming API
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; // Import ModuleRegistry and AllCommunityModule
import type { ColDef } from 'ag-grid-community';
import type { Customer } from '../../types/customer';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ AllCommunityModule ]);

const CustomerList = () => {
  const { customers, deleteCustomer, updateCustomer } = useCustomers();
  const navigate = useNavigate();

  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<Customer[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRowData(customers);
  }, [customers]);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteCustomer(id);
        message.success('고객이 성공적으로 삭제되었습니다!');
      } catch (error) {
        console.error('고객 삭제 오류:', error);
        message.error('고객 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const columnDefs: ColDef<Customer>[] = [
    {
      headerName: '이름',
      field: 'name',
      sortable: true,
      filter: true,
      editable: isEditing,
      cellRenderer: (params: any) => (
        <span className="font-semibold text-primary cursor-pointer" onClick={() => navigate(`/customers/${params.data.id}`)}>{params.value}</span>
      ),
    },
    {
      headerName: '연락처',
      field: 'phone',
      sortable: true,
      filter: true,
      editable: isEditing,
    },
    {
      headerName: '이메일',
      field: 'email',
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
          <Button buttonColor="info" onClick={() => navigate(`/customers/${params.data.id}`)}>
            상세
          </Button>
          <Button buttonColor="secondary" onClick={() => navigate(`/customers/${params.data.id}/edit`)}>
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
        const updatedCustomer = { ...data, [colDef.field]: newValue };
        await updateCustomer(updatedCustomer.id, updatedCustomer);
        message.success('고객 정보가 성공적으로 업데이트되었습니다!');
      } catch (error) {
        console.error('고객 정보 업데이트 오류:', error);
        message.error('고객 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-lightViolet min-h-screen">
      <SectionCard label="고객목록">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 sm:mb-0">고객 목록</h2>
          <div className="flex items-center space-x-4">
            <Checkbox checked={isEditing} onChange={(e) => setIsEditing(e.target.checked)}>
              수정 모드
            </Checkbox>
            <Button onClick={() => navigate('/customers/create')} buttonColor="primary">
              고객 등록
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

export default CustomerList;
