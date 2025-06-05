import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      label: '대시보드',
    },
    {
      key: '/customers',
      label: '고객 관리',
    },
    {
      key: '/schedules',
      label: '일정 관리',
    },
    {
      key: '/reservations',
      label: '예약 관리',
    },
  ];

  const onMenuItemClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <AntdHeader style={{ display: 'flex', alignItems: 'center', background: '#7E57C2', padding: '0 24px', height: 64 }}>
      <div className="text-white font-bold text-2xl mr-8" style={{ minWidth: '120px' }}>
        Travel CRM
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={onMenuItemClick}
        style={{ flex: 1, minWidth: 0, background: '#7E57C2', color: '#fff', borderBottom: 'none' }}
        className="ant-menu-custom-header"
      />
    </AntdHeader>
  );
};

export default Header;
