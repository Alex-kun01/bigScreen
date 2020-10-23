// 出租房屋总数趋势图数据
export default {
    tooltip: {
        trigger: 'axis',
        transitionDuration:0 // 解决echarts鼠标事件屏幕晃动bug
    },
    grid: {
        left: '5%',
        right: '10%',
        bottom: '10%',
        top: '5%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        nameTextStyle:{
            padding: [0,0,-60,-10]
        },
        axisTick:{
            show:false//不显示坐标轴刻度线
        },
        axisLine: {
            show: false,//不显示坐标轴线
        },
        splitLine:{show: false}, //隐藏网格线
        boundaryGap: false,
        data: ['2020-03', '2020-04', '2020-05', '2020-06','2020-07','2020-08' ]
    },
    yAxis: {
        type: 'value',
        name: '人数',
        splitLine:{show: false}, //隐藏网格线
        axisTick:{
            show:false//不显示坐标轴刻度线
        },
        axisLine: {
            show: false,//不显示坐标轴线
        },
    },
    series: [
        {
            name: '出租总数',
            type: 'line',
            smooth:true, //圆角
            stack: '总量',
            data: [1, 8, 3, 26, 14, 5]
        }
    ]
}