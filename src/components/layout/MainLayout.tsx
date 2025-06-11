import type { ReactNode } from 'react';
import Header from './Header';
import { Layout, Menu, Avatar, Badge, Dropdown, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  UserOutlined, 
  ScheduleOutlined, 
  CalendarOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Content, Sider } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
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

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '프로필',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '설정',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
    },
  ];

  const onMenuItemClick = (e: { key: string }) => {
    navigate(e.key);
  };

  const onUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // 로그아웃 로직
      console.log('로그아웃');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
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
          width={280}
          style={{ 
            background: 'linear-gradient(180deg, #374151 0%, #4b5563 100%)',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
          }}
          className="sidebar-gradient"
        >
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <HomeOutlined className="text-gray-600 text-xl" />
              </div>
              {!collapsed && (
                <div>
                  <div className="text-white font-bold text-lg">Travel CRM</div>
                  <div className="text-gray-300 text-xs">여행 예약 관리</div>
                </div>
              )}
            </div>
          </div>
          
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={onMenuItemClick}
            style={{ 
              height: '100%', 
              borderRight: 0,
              background: 'transparent',
              padding: '0 16px'
            }}
            className="custom-menu"
          />
          
          {!collapsed && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center">
                  <Avatar 
                    size={40} 
                    icon={<UserOutlined />} 
                    className="mr-3"
                    style={{ backgroundColor: '#fff', color: '#4b5563' }}
                  />
                  <div>
                    <div className="text-white font-medium">관리자</div>
                    <div className="text-gray-300 text-xs">admin@travelcrm.com</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Sider>
        
        <Layout style={{ padding: '0 24px 24px' }}>
          <div className="flex justify-between items-center py-4 px-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {menuItems.find(item => item.key === location.pathname)?.label || '대시보드'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge count={5} size="small">
                <BellOutlined className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer transition-colors" />
              </Badge>
              
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: onUserMenuClick,
                }}
                placement="bottomRight"
                arrow
              >
                <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                  <Avatar 
                    size={32} 
                    icon={<UserOutlined />} 
                    style={{ backgroundColor: '#4b5563' }}
                  />
                  <span className="text-gray-700 font-medium">관리자</span>
                </Space>
              </Dropdown>
            </div>
          </div>
          
          <Content
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
              background: 'transparent',
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
