import React, { Component } from 'react'
import * as echarts from 'echarts/core'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, GridComponent, BarChart, CanvasRenderer]
)

interface Props {
    devices: Device[]
}

export default class TypeLineOption extends Component<Props> {

    getTypeLineOption = () => {
        let max = Number.MIN_SAFE_INTEGER, min = Number.MAX_SAFE_INTEGER
        for (const item of this.props.devices) {
            max = Math.max(max, ...item.week_val)
            min = Math.min(min, ...item.week_val)
        }
        return {
            title: {
                text: "上周数据折线图"
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.props.devices.map(item => item.name)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                min: Math.floor(min),
                max: Math.ceil(max)
            },
            series: this.props.devices.map(item => ({
                name: item.name,
                type: 'line',
                smooth: true,
                data: item.week_val
            }))
        }
    }

    render() {
        return (
            <>
                <ReactEchartsCore
                    echarts={echarts}
                    option={this.getTypeLineOption() as any} 
                />   
            </>
        )
    }
}
