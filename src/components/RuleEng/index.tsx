import React, { Component, Fragment } from 'react'
import '../../assets/css/ruleEng.css'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import { 
    Button, Table, Drawer, Form, Switch,
    Input, FormInstance, message
} from 'antd'
import { ajax } from '../../api/ajax'

export default class RuleEng extends Component {

    drawerRef = React.createRef<FormInstance>()

    columns = [
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '字段', dataIndex: 'columns', key: 'columns' },
        { title: 'Topic', dataIndex: 'topic', key: 'topic' },
        { title: '条件', dataIndex: 'condition', key: 'condition' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        { title: '操作', key: 'ops', dataIndex: 'ops', render: () => <Switch defaultChecked onChange={this.onChange} /> }
    ]

    layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    };

    state = { data: [], visible: false }

    componentDidMount = () => {
        ajax('/rule/').then((resp: any) => {
            message.loading({ content: '正在获取规则列表...', key: 'getRules' })
            if (resp.status === 200) {
                message.success({ content: '已同步更新!!!', key: 'getRules', duration: 1 })
                console.log(resp.data)
                this.setState({ data: resp.data.data })
            }
        })
    }

    showRuleRegister = () => this.setState({ visible: true })

    onClose = () => this.setState({ visible: false })

    setRegister = () => this.drawerRef.current?.submit()

    submitRule = (fieldValue: any) => {
        ajax('/rule/', fieldValue, "POST").then((resp: any) => {
            message.loading({ content: '正在上传注册信息....', key: 'upload' })
            if (resp.status === 200) {
                message.success({ content: resp.data.msg, key: 'upload', duration: 1 })
                this.onClose()
                this.drawerRef.current?.resetFields()
            }
        })
    }

    onChange = () => {}

    render() {
        const { data } = this.state

        return (
            <Fragment>
                <div className="rule-title">
                    <Button onClick={this.showRuleRegister} type="primary" className="rule-register" icon={<PlusCircleOutlined />} shape="round">
                        创建规则
                    </Button>
                </div>
                <Table columns={ this.columns } dataSource={ data } rowKey={ (record: any) => record.id } />

                <Drawer
                    title="创建规则"
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
                            name="columns"
                            label="字段"
                            rules={[{ required: true, message: 'Please enter port' }]}
                            extra="经支持'*'、','、'.'、空格、字母和数字，不为空，最多不超过300个字符"
                        >
                            <Input.TextArea
                                style={{ width: '100%' }}
                                rows={3}
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
                            name="condition"
                            label="条件"
                            rules={[{ required: true, message: 'Please enter port' }]}
                            extra="不能有中文或中文字符，最多不超过300个字符"
                        >
                            <Input
                                style={{ width: '100%' }}
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
