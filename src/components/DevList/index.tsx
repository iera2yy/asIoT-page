import React, { Component, Fragment } from 'react'
import '../../assets/css/devList.css'
import {
    PlusCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons'
import { 
    Button, Table, Drawer, Form, Col, Row, 
    Input, Select, FormInstance, message 
} from 'antd'
import { ajax } from '../../api/ajax'

const { Option } = Select

export default class DevList extends Component {
    
    drawerRef = React.createRef<FormInstance>()

    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '设备名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '设备IP',
        dataIndex: 'address',
        key: 'address'
    }, {
        title: '设备端口',
        key: 'port',
        dataIndex: 'port'
    }, {
        title: 'Topic',
        key: 'topic'
    }]
      
    data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    }]

    state = { visible: false }

    showDevRegister = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    checkTopic = (_: any, value: any) => {
        return !value || /^[^\s]+(\/[^\s])*$/.test(value) ? Promise.resolve() : Promise.reject('输入不要有空格，参考格式xx/yy/zz！');
    }

    setRegister = () => {
        this.drawerRef.current?.submit()
    }

    submitDev = (fieldValue: any) => {
        ajax('/device/', fieldValue, "POST").then((resp: any) => {
            message.loading({ content: '正在上传注册信息....', key: 'upload' })
            if (resp.status === 200) {
                message.success({ content: resp.data, key: 'upload', duration: 2 })
                this.onClose()
                this.drawerRef.current?.resetFields()
            }
            
        });
    }

    render() {
        return (
            <Fragment>
                <div className="devtitle">
                    <Button onClick={this.showDevRegister} type="primary" className="devregister" icon={<PlusCircleOutlined />} shape="round">
                        设备注册
                    </Button>
                </div>
                <Table columns={ this.columns } dataSource={ this.data } />

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
                        <Button type="primary" onClick={this.setRegister}>
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
