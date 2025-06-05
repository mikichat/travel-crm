import type { ReactNode } from 'react';
import Header from './Header';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px 24px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', background: '#D1C4E9', color: '#722ED1' }}>
        Travel CRM ©2024 Created by Your Company
      </Footer>
    </Layout>
  );
};

export default MainLayout;
