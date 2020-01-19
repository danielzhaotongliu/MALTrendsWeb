import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedAnime } from '../../reducers/anime/actions';
import SearchBar from '../SearchBar/SearchBar';
import TimeSeries from '../charts/TimeSeries';
import HomePage from '../HomePage/HomePage';

import 'antd/dist/antd.css';
import './LayoutAntStyle.css';

// Ant design layouts
const { Header, Content, Footer, Sider } = Layout;

class LayoutAnt extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomePage = this.handleHomePage.bind(this);
  }

  handleHomePage() {
    const { setSelectedAnime } = this.props;
    setSelectedAnime(null, null, null);
  }

  render() {
    const { selectedTitle, selectedUrl } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div
            className="logo"
            role="button"
            tabIndex={-1}
            onClick={this.handleHomePage}
            onKeyDown={this.handleHomePage}
          >
            MALTrends
          </div>
          <Menu mode="inline" theme="dark">
            <Menu.Item key="1">
              <SearchBar />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className="header">
            {selectedTitle ? (
              <h1>
                <a href={selectedUrl} rel="noopener noreferrer" target="_blank">
                  {selectedTitle}
                </a>
              </h1>
            ) : null}
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              style={{
                padding: 24,
                background: '#fff',
                textAlign: 'center',
                height: '80vh',
              }}
            >
              {selectedTitle ? <TimeSeries /> : <HomePage />}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Created by <a href="https://github.com/danielzhaotongliu">Daniel Liu</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTitle: state.anime.selectedTitle,
    selectedUrl: state.anime.selectedUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setSelectedAnime }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutAnt);
