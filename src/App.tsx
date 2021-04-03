import { Component } from 'react'
import { NavLink, Switch, Route, Redirect} from 'react-router-dom'
import { Layout, Menu, PageHeader } from 'antd'
import {
  DesktopOutlined,
  BarChartOutlined,
  CodepenOutlined,
} from '@ant-design/icons'
import './assets/css/index.css'
import Home from './components/Home'
import DevList from './components/DevList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends Component {
    state = {
        collapsed: false,
        routes: [
            {
              path: 'index',
              breadcrumbName: 'First-level Menu',
            },
            {
              path: 'first',
              breadcrumbName: 'Second-level Menu',
            },
            {
              path: 'second',
              breadcrumbName: 'Third-level Menu',
            },
        ]
    }

    onCollapse = (collapsed: boolean) => this.setState({ collapsed });

    render() {
        const { collapsed, routes } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={ collapsed }
                    onCollapse={ this.onCollapse }>
                    <div className="logo"></div>
                    <Menu theme="dark" mode="inline">
                        <SubMenu key="sub1" icon={<DesktopOutlined />} title="设备管理">
                            <Menu.Item key="1"><NavLink to="/list">设备列表</NavLink></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="2" icon={<BarChartOutlined />}>
                            数据分析
                        </Menu.Item>
                        <Menu.Item key="3" icon={<CodepenOutlined />}>
                            规则引擎
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => window.history.back()}
                        title="Title"
                        subTitle="This is a subtitle"
                        breadcrumb={{ routes }}
                    />
                    </Header>
                    <Content style={{ margin: '10px 16px', padding: '30px 0px' }}>
                        <Switch>
                          <Route path="/home" component={ Home } />
                          <Route path="/list" component={ DevList } />
                          <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ 
                        textAlign: 'center',
                        backgroundColor: '#f7f7f7'
                    }}>saIoT@2021 Create by 南园11舍221研究室</Footer>
                </Layout>
            </Layout>
        )
    }
}