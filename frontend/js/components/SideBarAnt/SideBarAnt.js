import React from 'react';
import { Layout, Menu, Icon, AutoComplete } from 'antd';

import 'antd/dist/antd.css';
import './SideBarAntStyle.css';

const { Header, Content, Footer, Sider } = Layout;

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

export default function PermanentSiderLeft() {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <AutoComplete
          dataSource={dataSource}
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().includes(inputValue.toUpperCase())
          }
          placeholder="Search..."
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>TEST</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
