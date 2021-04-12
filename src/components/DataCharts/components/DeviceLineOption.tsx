import React, { Component } from 'react'
import * as echarts from 'echarts/core'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import {
    TitleComponent,
    TooltipComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
    [TitleComponent, TooltipComponent, LineChart, CanvasRenderer]
)

interface ChartState {
    data: any[],
    timer: any
}

interface Device {
    id: number,
    name: string,
    value: number,
    week_val: number[]
}

interface Props {
    device: Device
}

export default class DeviceLineOption extends Component<Props> {

    echartsReact: any

    now = +new Date() - 3600000
    value = 250

    state: ChartState = {
        data: [],
        timer: null
    }

    randomData = () => {
        this.now = +new Date(this.now + 1000)
        this.value = this.value + Math.cos(Math.random() * 360)
        const now = new Date(this.now)
        return {
            name: now.toString(),
            value: [
                now.getTime(),
                Math.round(this.value)
            ]
        };
    }

    UNSAFE_componentWillMount = () => {
        const data: any[] = []
        for (let i = 0; i < 3600; i++) {
            data.push(this.randomData())
        }
        this.setState({ data })
    }

    componentDidMount = () => {
        const _that = this
        const { data } = _that.state
        const timer = setInterval(function () {
            for (let i = 0; i < 5; i++) {
                data.shift();
                data.push(_that.randomData());
            }
            _that.setState({ data }, () => {
                _that.echartsReact.getEchartsInstance().setOption({
                    series: [{
                        data: data
                    }]
                })
            })
        }, 1000)
        this.setState({ timer })
    }

    componentWillUnmount = () => {
        const { timer } = this.state
        if (timer !== null) {
            clearInterval(timer!)
        }
    }

    initLineEcharts = () => {
        const { data } = this.state
        return {
            title: {
                text: this.props.device.name + "实时数据"
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params: any) {
                    params = params[0];
                    var date = new Date(params.name);
                    const _date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
                    const _time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                    return  _date + ' ' + _time + ' ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value: number) {
                        return value / 10
                    }
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
        }
    }

    render() {
        return (
            <>
              <ReactEchartsCore
                ref={ (e) => this.echartsReact = e }
                option={ this.initLineEcharts() }
                echarts={ echarts }
              />
            </>
        )
    }
}
