import React, { Component, Fragment } from 'react'
import '../../assets/css/ruleEng.css'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import { 
    Button, Table, Drawer, Form, Switch, Select,
    Input, FormInstance, message
} from 'antd'
import { ajax } from '../../api/ajax'
import { AxiosResponse } from 'axios'

const { Option } = Select

export default class RuleEng extends Component {

    drawerRef = React.createRef<FormInstance>()

    columns = [
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '字段', dataIndex: 'columns', key: 'columns' },
        { title: 'Topic', dataIndex: 'topic', key: 'topic' },
        { title: '转发路径', dataIndex: 'path', key: 'path' },
        { title: '条件', dataIndex: 'condition', key: 'condition' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        { title: '操作', key: 'ops', dataIndex: 'ops', render: (_: any, record: any) => <Switch defaultChecked={record.status === 1} onChange={this.handleChange(record)} /> }
    ]

    layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    };

    state = { data: [], visible: false, loading: false, devices: [], pagination: { current: 1, pageSize: 10 } }

    componentDidMount = () => this.getRuleEng()

    getRuleEng = () => {
        ajax('/api/rule/').then((resp: AxiosResponse) => {
            message.loading({ content: '正在获取规则列表...', key: 'getRules' })
            if (resp.status === 200) {
                message.success({ content: '已同步更新!!!', key: 'getRules', duration: 1 })
                this.setState({ data: resp.data, pagination: this.state.pagination })
            }
        })
    }

    showRuleRegister = () => {
        ajax('/api/device/').then((resp: AxiosResponse) => {
            if (resp.status === 200) {
                this.setState({ devices: resp.data, visible: true })
            }
        })
    }

    onClose = () => this.setState({ visible: false })

    setRegister = () => {
        this.drawerRef.current?.validateFields().then(() =>{
            this.setState({ loading: true })
            this.drawerRef.current?.submit()
        }).catch(() => {
            message.warning('请正确填写表单!')
        })
    }

    submitRule = (fieldValue: any) => {
        ajax('/api/rule/', fieldValue, "POST").then((resp: AxiosResponse) => {
            message.loading({ content: '正在上传注册信息....', key: 'upload' })
            if (resp.status === 200) {
                message.success({ content: resp.data.msg, key: 'upload', duration: 1 })
                this.getRuleEng()
                this.onClose()
                this.drawerRef.current?.resetFields()
                this.setState({ loading: false })
            }
        })
    }

    handleChange = (record: any) => () => {
        ajax('/api/rule/switch/' + record.id, {}, "POST").then((resp: AxiosResponse) => {
            message.loading({ content: '正在切换规则状态....', key: 'switching' })
            if (resp.status === 200) {
                message.success({ content: resp.data.msg, key: 'switching', duration: 1 })
            }
        })
    }

    handleTableChange = (pagination: any) => this.setState({ pagination })

    render() {
        const { data, loading, devices, pagination } = this.state

        return (
            <Fragment>
                <div className="rule-title">
                    <Button onClick={this.showRuleRegister} type="primary" className="rule-register" icon={<PlusCircleOutlined />} shape="round">
                        创建规则
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
                    title="创建规则"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button type="primary" onClick={this.setRegister} loading={loading}>
                                创建
                            </Button>
                        </div>
                    }
                >
                    <Form 
                        {...this.layout} 
                        ref={this.drawerRef} 
                        layout="horizontal" 
                        hideRequiredMark 
                        onFinish={this.submitRule}
                    >
                        <Form.Item
                            name="name"
                            label="规则名称"
                            rules={[{ required: true, message: 'Please enter port' }]}
                            extra="支持英文、数字、下划线的组合，最多不超过32个字符"
                        >
                            <Input
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="deviceId"
                            label="触发源"
                            rules={[{ required: true, message: 'Please select device' }]}
                        >
                            <Select>
                                {
                                    devices.map((item: any) => {
                                        return (<Option key={item.id} value={item.id}>{ item.name }</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="columns"
                            label="字段"
                            rules={[{ required: true, message: 'Please enter port' }]}
                            extra="经支持'*'、','、'.'、空格、字母和数字，不为空，最多不超过300个字符"
                        >
                            <Input
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="topic"
                            label="Topic"
                            rules={[{ required: true, message: 'Please enter port' }]}
                            extra="不能有中文，中文字符，空格，长度1-128位"
                        >
                            <Input
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="path"
                            label="转发路径"
                            rules={[{ required: true, message: 'Please enter path' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="condition"
                            label="条件"
                            rules={[{ required: true, message: 'Please enter port' }]}
                            extra="不能有中文或中文字符，最多不超过300个字符"
                        >
                            <Input.TextArea
                                style={{ width: '100%' }}
                                rows={3}
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="规则描述"
                        >
                            <Input.TextArea
                                style={{ width: '100%' }}
                                placeholder="选填"
                                rows={4}
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
            </Fragment>
        )
    }
}
