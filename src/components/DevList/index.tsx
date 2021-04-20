import React, { Component, Fragment } from 'react'
import '../../assets/css/devList.css'
import {
    PlusCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons'
import { 
    Button, Table, Drawer, Form, Col, Row, Tag,
    Input, Select, FormInstance, message 
} from 'antd'
import { ajax } from '../../api/ajax'
import { AxiosResponse } from 'axios'

const { Option } = Select

export default class DevList extends Component {
    
    drawerRef = React.createRef<FormInstance>()

    columns = [
        { title: '设备名', dataIndex: 'name', key: 'name' }, 
        { title: '设备编号', dataIndex: 'dcode', key: 'dcode' },
        { title: '设备权限', dataIndex: 'secret', key: 'secret' },
        { title: '设备类型', dataIndex: 'type', key: 'type' },
        { title: '设备IP', dataIndex: 'ip', key: 'ip' },
        { title: '设备端口', key: 'port', dataIndex: 'port'},
        { title: '设备状态', key: 'status', dataIndex: 'status', render: (text: string, record: any) => {
            const color = text === '已连接' ? 'green' : (text === '已断开' ? 'magenta' : '#a7a7a7')
            return (<Tag color={ color } key={ record.id }>{ text }</Tag>)
        } }
    ]

    state = { data: [], visible: false, loading: false, pagination: { current: 1, pageSize: 10 }  }

    componentDidMount = () => this.getDevList()

    getDevList = () => {
        ajax('/api/device/').then((resp: AxiosResponse) => {
            message.loading({ content: '正在获取设备列表...', key: 'fresh' })
            if (resp.status === 200) {
                message.success({ content: '已同步更新!!!', key: 'fresh', duration: 1 })
                this.setState({ data: resp.data })
            }
        })
    }

    showDevRegister = () => this.setState({ visible: true })

    onClose = () => this.setState({ visible: false })

    checkTopic = (_: any, value: any) => !value || /^[^\s]+(\/[^\s])*$/.test(value) ? Promise.resolve() : Promise.reject('输入不要有空格，参考格式xx/yy/zz！')

    setRegister = () => {
        this.drawerRef.current?.validateFields().then(() =>{
            this.setState({ loading: true })
            this.drawerRef.current?.submit()
        }).catch(() => {
            message.warning('请正确填写表单!')
        })
    }

    submitDev = (fieldValue: any) => {
        ajax('/api/device/', fieldValue, "POST").then((resp: AxiosResponse) => {
            message.loading({ content: '正在上传注册信息....', key: 'upload' })
            if (resp.status === 200) {
                message.success({ content: resp.data.msg, key: 'upload', duration: 1 })
                this.getDevList()
                this.onClose()
                this.drawerRef.current?.resetFields()
                this.setState({ loading: false })
            }
        })
    }

    handleTableChange = (pagination: any) => this.setState({ pagination })

    render() {
        const { data, loading, pagination } = this.state;

        return (
            <Fragment>
                <div className="dev-title">
                    <Button onClick={this.showDevRegister} type="primary" className="dev-register" icon={<PlusCircleOutlined />} shape="round">
                        设备注册
                    </Button>
                </div>
                <Table 
                    columns={ this.columns } 
                    dataSource={ data } 
                    rowKey={ (record: any) => record.id } 
                    pagination={pagination}
                    onChange={this.handleTableChange}
                />

                <Drawer
                    title="设备注册"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{ textAlign: 'right' }}
                        >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button type="primary" onClick={this.setRegister} loading={loading}>
                            注册
                        </Button>
                        </div>
                    }
                >
                    <Form ref={this.drawerRef} layout="vertical" hideRequiredMark onFinish={this.submitDev}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="设备名称"
                                    rules={[{ required: true, message: 'Please enter device name' }]}
                                >
                                    <Input placeholder="请输入设备名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dcode"
                                    label="设备编号"
                                    rules={[{ required: true, message: 'Please enter device code' }]}
                                >
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="请输入设备编号"
                                />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="secret"
                                    label="设备密级"
                                    rules={[{ required: true, message: 'Please select the type' }]}
                                >
                                    <Select placeholder="请选择设备密级">
                                        <Option value="public">公开</Option>
                                        <Option value="private">私密</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type"
                                    label="设备类型"
                                    rules={[{ required: true, message: 'Please choose the type' }]}
                                >
                                    <Select placeholder="请选择设备类型">
                                        <Option value="temperature">温度传感器</Option>
                                        <Option value="humidity">湿度传感器</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="ip"
                                    label="设备IP"
                                    rules={[{ required: true, message: 'Please enter device ip' }]}
                                >
                                    <Input placeholder="请输入设备IP" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="port"
                                    label="连接端口"
                                    rules={[{ required: true, message: 'Please enter port' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="请输入连接端口"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="topic"
                                    label="主题订阅"
                                    tooltip={{ title: '参考格式(xx/yy/zz)', icon: <InfoCircleOutlined /> }}
                                    extra="不要填入空格，主题之间使用英文分号隔开"
                                    hasFeedback
                                    rules={[{ 
                                        required: true, 
                                        message: 'Please enter device topic'
                                    }, {
                                        validator: this.checkTopic
                                    }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="请输入设备能够订阅的主题"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="设备描述"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter description',
                                        }
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入设备描述" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </Fragment>
        )
    }
}
