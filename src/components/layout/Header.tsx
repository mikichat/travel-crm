import { Link, useLocation } from 'react-router-dom';

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: '#222',
  padding: '0 32px',
  height: 56,
  color: '#fff',
  marginBottom: 32,
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: 24,
  fontWeight: 500,
  fontSize: 18,
  padding: '8px 0',
  borderBottom: '2px solid transparent',
};

const activeStyle: React.CSSProperties = {
  ...linkStyle,
  borderBottom: '2px solid #1890ff',
};

const Header = () => {
  const location = useLocation();
  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: 22, marginRight: 40 }}>
        Travel CRM
      </div>
      <Link to="/dashboard" style={location.pathname.startsWith('/dashboard') ? activeStyle : linkStyle}>
        대시보드
      </Link>
      <Link to="/customers" style={location.pathname.startsWith('/customers') ? activeStyle : linkStyle}>
        고객 관리
      </Link>
      <Link to="/schedules" style={location.pathname.startsWith('/schedules') ? activeStyle : linkStyle}>
        일정 관리
      </Link>
      <Link to="/reservations" style={location.pathname.startsWith('/reservations') ? activeStyle : linkStyle}>
        예약 관리
      </Link>
    </nav>
  );
};

export default Header;
