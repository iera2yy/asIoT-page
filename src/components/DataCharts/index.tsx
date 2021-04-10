import React, { Component } from 'react'
import { Select, Divider } from 'antd'
import '../../assets/css/dataCharts.css'
import TypeBarOption from './components/TypeBarOption'
import TypeLineOption from './components/TypeLineOption'
import DeviceLineOption from './components/DeviceLineOption'

export default class DataCharts extends Component {

    state = { 
        curType: "", 
        curDevice: "",
        data: [],
        timer: null,
        types: [{
            type: 'temperature', 
            name: '温度传感器'
        }, {
            type: 'humidity',
            name: '湿度传感器'
        }], devices: [{
            id: 1,
            name: '东北角温度传感器'
        }]
    }

    handleTypeChange = (value: string|undefined) => this.setState({ curType: value })


    handleDeviceChange = (value: number|string|undefined) => this.setState({ curDevice: value })

    render() {
        const { types, devices } = this.state

        return (
            <>
                <div className="charts-select-flex">
                    <Select defaultValue={ types.length > 0 ? types[0].type : "请选择类型"} className="flex-item" onChange={ this.handleTypeChange }>
                        {
                            types.map(item => (
                                <Select.Option value={item.type} key={item.type}>{ item.name }</Select.Option>
                            ))
                        }
                    </Select>
                    <Select defaultValue={ devices.length > 0 ? devices[0].id : "请选择设备" } className="flex-item" onChange={ this.handleDeviceChange }>
                        {
                            devices.map(item => (
                                <Select.Option value={item.id} key={item.id}>{ item.name }</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div>
                    <TypeLineOption />
                    <Divider />
                    <TypeBarOption />
                    <Divider />
                    <DeviceLineOption />
                </div>
            </>
        )
    }
}
