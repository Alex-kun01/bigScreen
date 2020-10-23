import echarts from 'echarts'
// 每户居住人数分布图数据
export default {
    dataset: {
        source: [
            ['score', 'amount', 'product'],
            [100, 50, '0人'],
            [100, 400, '1人'],
            [100, 500, '2人'],
            [100, 300, '3人'],
            [100, 80, '4人'],
            [100, 210, '更多']
        ]
    },
    grid: {
        left: '1%',
        right: '10%',
        top: '5%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: {
        // name: 'amount',
        splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
    },
    yAxis: {
        type: 'category',
        splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
    },
    series: [{
        type: 'bar',
        barWidth: '60%',
        encode: {
            x: 'amount',
            y: 'product'
        },
        itemStyle:{
            normal: {
                //柱形图圆角，初始化效果
                barBorderRadius:[20, 20, 20, 20],
                // 柱子渐变色
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#0054FF"  // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "#35FFE5"// 100% 处的颜色
                }], false)
            }
        }
    }]
};