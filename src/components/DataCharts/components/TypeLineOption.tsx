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

export default class TypeLineOption extends Component {

    getTypeLineOption = () => {
        return {
            title: {
                text: "LineChart"
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['东北角温度传感器', '西南角温度传感器', '东南角温度传感器', '平均']
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
                min: 18,
                max: 26
            },
            series: [
                {
                    name: '东北角温度传感器',
                    type: 'line',
                    smooth: true,
                    data: [23, 22, 24, 23, 25, 23, 22]
                },
                {
                    name: '西南角温度传感器',
                    type: 'line',
                    smooth: true,
                    data: [24, 21, 23, 23, 24, 23, 25]
                },
                {
                    name: '东南角温度传感器',
                    type: 'line',
                    smooth: true,
                    data: [19, 21, 23, 24, 25, 23, 22]
                },
                {
                    name: '平均',
                    type: 'line',
                    smooth: true,
                    data: [23.12, 22.85, 24.63, 23.46, 25.20, 23.44, 22.76]
                }
            ]
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
