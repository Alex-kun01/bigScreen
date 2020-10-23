
import echarts from 'echarts'
// 民族类别分布
export default {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        transitionDuration:0 // 解决echarts鼠标事件屏幕晃动bug
    },
    grid: {
        left: '1%',
        right: '1%',
        top: '5%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            splitLine:{show: false}, //隐藏网格线
            data: ['小于80', '80-90', '90-100', '大于100'],
            splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '20%',
            data: [334, 690, 440, 800],
            itemStyle:{
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[10, 10, 10, 10],
                    // 柱子渐变色
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: "#6699FF"  // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: "#53F9F2"// 100% 处的颜色
                    }], false)
                }
            }
            
        }
    ]
}