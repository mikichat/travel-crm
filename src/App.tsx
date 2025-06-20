import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerList, CustomerCreate, CustomerDetail } from './pages/customers';
import { ScheduleList, ScheduleCreate, ScheduleDetail, ScheduleEdit } from './pages/schedules';
import { Dashboard } from './pages/dashboard';
import { ReservationList, ReservationCreate, ReservationDetail, ReservationEdit } from './pages/reservations';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './components/layout/MainLayout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
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
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>
      <p className="read-the-docs">
      © 2025 Tour Booking System, Inc.
      </p>
    </BrowserRouter>
  )
}

export default App
