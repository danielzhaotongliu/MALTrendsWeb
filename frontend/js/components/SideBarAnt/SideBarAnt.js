import React from 'react';
import { Layout, Menu, Icon, AutoComplete } from 'antd';

import 'antd/dist/antd.css';
import './SideBarAntStyle.css';

// importing axios
const axios = require('axios');
// Ant design layouts
const { Header, Content, Footer, Sider } = Layout;

class PermanentSiderLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
    }
  }

  async componentDidMount() {
    try {
      if (this.state.animes.length === 0) {
        const response = await axios.get('/search/animes');
        const animes = Object.values(response.data).map(anime => anime['title_english']);
        this.setState({ animes });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
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
            dataSource={this.state.animes}
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
          <Footer style={{ textAlign: 'center' }}>MALTrends ©2020 Created by Daniel Liu</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PermanentSiderLeft;
