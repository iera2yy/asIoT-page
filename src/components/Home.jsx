import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, PageHeader, Divider } from 'antd'
import {
    DesktopOutlined,
    BarChartOutlined,
    CodepenOutlined,
  } from '@ant-design/icons';
  import '../assets/css/Home.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
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

    

    onCollapse = collapsed => this.setState({ collapsed });

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
                            <Menu.Item key="3">设备注册</Menu.Item>
                            <Menu.Item key="4">设备连接</Menu.Item>
                            <Menu.Item key="5">设备列表</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="2" icon={<BarChartOutlined />}>
                            数据分析
                        </Menu.Item>
                        <Menu.Item key="9" icon={<CodepenOutlined />}>
                            规则引擎
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => null}
                        title="Title"
                        subTitle="This is a subtitle"
                        breadcrumb={{ routes }}
                    />
                    </Header>
                    <Content style={{ margin: '10px 16px' }}>
                        <Breadcrumb style={{ margin: '0 16px' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                        </div>
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