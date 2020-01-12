import React from 'react';
import { Layout, Menu, Icon } from 'antd';

import SearchBar from '../SearchBar/SearchBar';

import 'antd/dist/antd.css';
import './LayoutAntStyle.css';

// importing axios
const axios = require('axios');
// Ant design layouts
const { Header, Content, Footer, Sider } = Layout;

class LayoutAnt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
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
          <Menu mode="inline" theme="dark">
            <Menu.Item key="1">{isLoading ? <div /> : <SearchBar />}</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>TEST</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>MALTrends ©2020 Created by Daniel Liu</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutAnt;
