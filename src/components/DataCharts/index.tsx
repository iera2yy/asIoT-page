import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Select, Divider, Empty, message } from 'antd'
import '../../assets/css/dataCharts.css'
import TypeBarOption from './components/TypeBarOption'
import TypeLineOption from './components/TypeLineOption'
import DeviceLineOption from './components/DeviceLineOption'
import { ajax } from '../../api/ajax'
import { AxiosResponse } from 'axios'
import { SelectValue, RefSelectProps } from 'antd/lib/select'

interface DeviceType {
    chooseDevice: boolean,
    deviceId: number|string|undefined,
    curDevice?: Device,
    types: {
        type: string,
        name: string
    }[],
    devices: Device[]
}

export default class DataCharts extends Component {

    deviceRef = React.createRef<RefSelectProps>()
    
    state: DeviceType = {
        chooseDevice: false,
        deviceId: undefined,
        types: [{
            type: 'temperature', 
            name: '温度传感器'
        }, {
            type: 'humidity',
            name: '湿度传感器'
        }], devices: []
    }

    handleTypeChange = (value: SelectValue) => {
        ajax('/api/status/realtime?device_type=' + value, "POST").then((resp: AxiosResponse) => {
            message.loading({ content: '正在加载数据...', key: 'onloading' })
            if (resp.status === 200) {
                message.success({ content: '加载成功^_^', key: 'onloading', duration: 1 })
                this.setState({ devices: resp.data, chooseDevice: false, deviceId: undefined })
            }
        })
    }

    handleDeviceChange = (value: SelectValue) => {
        const { devices } = this.state
        let device = undefined;
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].id === value) {
                device = devices[i]
                break
            }
        }
        this.setState({ chooseDevice: true, deviceId: value, curDevice: device })
    }

    render() {
        const { chooseDevice, deviceId, curDevice, types, devices } = this.state

        return (
            <>
                <div className="charts-select-flex">
                    <Select placeholder="请选择类型" className="flex-item" onChange={ this.handleTypeChange }>
                        {
                            types.map(item => (
                                <Select.Option value={item.type} key={item.type}>{ item.name }</Select.Option>
                            ))
                        }
                    </Select>
                    <Select ref={this.deviceRef} placeholder="请选择设备" value={deviceId} className="flex-item" onChange={ this.handleDeviceChange }>
                        {
                            devices.map(item => (
                                <Select.Option value={item.id} key={item.id}>{ item.name }</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div>
                    {
                        devices.length === 0 ?
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            imageStyle={{
                                height: 150,
                            }}
                            description={
                                <div>
                                    <span style={{ color: '#777' }}>
                                        请选择设备
                                    </span><br/>
                                    <span style={{ color: '#bea' }} >或</span><br/>
                                    <span>
                                        前往<NavLink to="/list">注册设备</NavLink>
                                    </span>
                                </div>
                            }
                        /> :
                        <>
                            <TypeLineOption devices={devices as Device[]} />
                            <Divider />
                            <TypeBarOption devices={devices as Device[]} />
                            {
                                chooseDevice ?
                                <>
                                    <Divider />
                                    <DeviceLineOption device={curDevice as Device} />
                                </> :
                                <>
                                </>
                            }
                            
                        </>
                    }
                </div>
            </>
        )
    }
}
