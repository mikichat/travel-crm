import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerList, CustomerCreate, CustomerDetail, CustomerEdit } from './pages/customers';
import { ScheduleList, ScheduleCreate, ScheduleDetail, ScheduleEdit } from './pages/schedules';
import { Dashboard } from './pages/dashboard';
import { ReservationList, ReservationCreate, ReservationDetail, ReservationEdit } from './pages/reservations';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/customers/:id/edit" element={<CustomerEdit />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/schedules/create" element={<ScheduleCreate />} />
          <Route path="/schedules/:id" element={<ScheduleDetail />} />
          <Route path="/schedules/:id/edit" element={<ScheduleEdit />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/reservations/create" element={<ReservationCreate />} />
          <Route path="/reservations/:id" element={<ReservationDetail />} />
          <Route path="/reservations/:id/edit" element={<ReservationEdit />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
