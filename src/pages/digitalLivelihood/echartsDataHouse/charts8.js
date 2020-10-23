import echarts from 'echarts'
// 房屋空置数变化趋势图数据
export default {
    dataset: {
        source: [
            ['score', 'amount', 'product'],
            [100, 50, '一年以上'],
            [100, 400, '6-12个月'],
            [100, 500, '3-6个月'],
            [100, 300, '低于3个月']
        ]
    },
    grid: {
        left: '1%',
        right: '5%',
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
            // normal: {
            //     //柱形图圆角，初始化效果
            //     barBorderRadius:[20, 20, 20, 20],
            //     // 柱子渐变色
            //     color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            //         offset: 0,
            //         color: "#0054FF"  // 0% 处的颜色
            //     }, {
            //         offset: 1,
            //         color: "#35FFE5"// 100% 处的颜色
            //     }], false)
            // }
        }
    }]
};