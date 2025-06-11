import type { ReactNode } from 'react';
import Header from './Header';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ScheduleOutlined, CalendarOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Content, Sider } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: '대시보드',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: '고객 관리',
    },
    {
      key: '/schedules',
      icon: <ScheduleOutlined />,
      label: '일정 관리',
    },
    {
      key: '/reservations',
      icon: <CalendarOutlined />,
      label: '예약 관리',
    },
  ];

  const onMenuItemClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          width={200}
          style={{ background: '#fff' }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={onMenuItemClick}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
