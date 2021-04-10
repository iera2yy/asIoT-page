import { Component } from 'react'
import { NavLink, Switch, Route, Redirect} from 'react-router-dom'
import './assets/css/app.css'
import { Layout, Menu, PageHeader } from 'antd'
import {
  DesktopOutlined,
  BarChartOutlined,
  CodepenOutlined
} from '@ant-design/icons'
import './assets/css/index.css'
import Home from './components/Home'
import DevList from './components/DevList'
import DataCharts from './components/DataCharts'
import RuleEng from './components/RuleEng'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends Component {
    state = {
        collapsed: false,
        title: ['主页'],
        titleIdx: 0
    }

    onCollapse = (collapsed: boolean) => this.setState({ collapsed });

    changeTitle = (e: any) => {
        switch(e.key) {
            case 'DeviceList':
                this.setState({ title: [...this.state.title, '设备列表'], titleIdx: this.state.titleIdx + 1 })
                break
            case 'DataDetail':
                this.setState({ title: [...this.state.title, '数据分析'], titleIdx: this.state.titleIdx + 1 })
                break
            case 'RuleList':
                this.setState({ title: [...this.state.title, '规则列表'], titleIdx: this.state.titleIdx + 1 })
                break
            default:
                
        }   
    }

    onGoBack = () => {
        if (this.state.titleIdx > 0) {
            window.history.back()
            const titleTmp = this.state.title
            titleTmp.pop()
            this.setState({ title: titleTmp, titleIdx: this.state.titleIdx - 1 })
        }
    }

    render() {
        const { collapsed, title, titleIdx } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    className="app-slider"
                    collapsible
                    collapsed={ collapsed }
                    onCollapse={ this.onCollapse }>
                    <div className="logo"></div>
                    <Menu theme="dark" mode="inline">
                        <SubMenu key="DeviceManage" icon={<DesktopOutlined />} title="设备管理">
                            <Menu.Item key="DeviceList" onClick={this.changeTitle}><NavLink to="/list">设备列表</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="DataAnalysis" icon={<BarChartOutlined />} title="数据分析">
                            <Menu.Item key="DataDetail" onClick={this.changeTitle}><NavLink to="/charts">数据分析</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="RuleEnginee" icon={<CodepenOutlined />} title="规则引擎">
                            <Menu.Item key="RuleList" onClick={this.changeTitle}><NavLink to="/ruleEng">规则列表</NavLink></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    <PageHeader
                        className="site-page-header"
                        onBack={this.onGoBack}
                        title={title[titleIdx]}
                    />
                    </Header>
                    <Content className="site-page-content">
                        <Switch>
                          <Route path="/home" component={ Home } />
                          <Route path="/list" component={ DevList } />
                          <Route path="/charts" component={ DataCharts } />
                          <Route path="/ruleEng" component={ RuleEng } />
                          <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ 
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#777',
                        backgroundColor: '#e5e5e5'
                    }}>Copyright@2021 Create by 南园11舍221研究室</Footer>
                </Layout>
            </Layout>
        )
    }
}