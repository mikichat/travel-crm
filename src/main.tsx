import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'; // Ant Design CSS 임포트
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
