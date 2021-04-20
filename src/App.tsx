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
import { ReduxStateToPropsParam } from '../src/types/redux'
import Home from './components/Home'
import DevList from './components/DevList'
import DataCharts from './components/DataCharts'
import RuleEng from './components/RuleEng'
import { connect } from 'react-redux'
import { onPush, onBack } from '../src/redux/actions/title'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class AppUI extends Component<ReduxStateToPropsParam> {
    state = {
        collapsed: false,
        title: this.props.title[this.props.title.length - 1]
    }

    onCollapse = (collapsed: boolean) => this.setState({ collapsed });

    changeTitle = (e: any) => {
        switch(e.key) {
            case 'DeviceList':
                this.props.onPush([...this.props.title], '设备列表')
                this.setState({ title: '设备列表' })
                break
            case 'DataDetail':
                this.props.onPush([...this.props.title], '数据分析')
                this.setState({ title: '数据分析' })
                break
            case 'RuleList':
                this.props.onPush([...this.props.title], '规则列表')
                this.setState({ title: '规则列表' })
                break
            default:
                
        }   
    }

    onGoBack = () => {
        if (this.props.title.length > 1) {
            window.history.back()
            new Promise((resolve) => {
                this.props.onBack([...this.props.title])
                resolve('状态已更新!')
            }).then (() => {
                this.setState({ title: this.props.title[this.props.title.length - 1] })
            })
        }
    }

    render() {
        const { collapsed, title } = this.state;
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
                        title={title}
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

export default connect(
    (mapStateToProps: ReduxStateToPropsParam) => ({ title: mapStateToProps.title }),
    {
        onPush,
        onBack
    }
)(AppUI)