import React, { Component } from 'react'
import * as echarts from 'echarts/core'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
)

interface Props {
    devices: Device[]
}

export default class TypeBarOption extends Component<Props> {

    getTypeBarOption = () => {
        return {
            title: {
                text: "当前数据柱状图"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params: any) {
                    return params[0].name + "温度传感器"
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.props.devices.map(item => item.name.replace("温度传感器", "")),
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
                    data: this.props.devices.map(item => item.value)
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
