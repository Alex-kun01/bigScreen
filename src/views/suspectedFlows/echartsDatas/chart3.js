// 柱状图数据
export default {
    // title: {
    //     text: '网格员审核疑似流动平均时间',
    //     textStyle: {
    //         fontSize: 15,
    //         fontWeight: 200 
    //     }
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['刘月', '张天全'],
        left: 'right',
        textStyle: {
            fontSize: 10,
            fontWeight: 200
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine:{show: false}, //隐藏网格线
        axisTick:{
            show:false//不显示坐标轴刻度线
        },
        axisLine: {
            show: false,//不显示坐标轴线
        },
        data: ['香槟国际', '爱情公寓', '蓝润华景', '海滨西区','其他']
    },
    yAxis: {
        type: 'value',
        name: '时间/日',
        splitLine:{show: false},
        axisTick:{
            show:false//不显示坐标轴刻度线
        },
        axisLine: {
            show: false,//不显示坐标轴线
        },
    },
    series: [
        {
            name: '刘月',
            type: 'line',
            smooth:true,
            stack: '总量',
            data: [2, 5, 10, 15, 8, 21, 25]
        },
        {
            name: '张天全',
            type: 'line',
            smooth:true,
            stack: '总量',
            data: [15, 8, 18, 5, 27, 5, 2]
        }
    ]
}