import React, { Component } from 'react'
import * as echarts from 'echarts/core'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import {
    TitleComponent,
    GridComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
    [TitleComponent, GridComponent, BarChart, CanvasRenderer]
)

export default class TypeBarOption extends Component {

    getTypeBarOption = () => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['东北角温度传感器', '西南角温度传感器', '东南角温度传感器', '平均'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '温度',
                    type: 'bar',
                    barWidth: '60%',
                    data: [23.12, 22.85, 24.63, 23.46]
                }
            ]
        }
    }

    render() {
        return (
            <>
                <ReactEchartsCore
                    echarts={echarts}
                    option={this.getTypeBarOption() as any}
                />  
            </>
        )
    }
}
