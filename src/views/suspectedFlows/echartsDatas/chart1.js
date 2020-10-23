// 折线图数据
export default {
    one: {
        // title: {
        //     text: '疑似流动与陌生人统计图',
        //     textStyle: {
        //         fontSize: 15,
        //         fontWeight: 200 
        //     }
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['疑似流动人口', '陌生人'],
            left: 'right',
            textStyle: {
                fontSize: 10,
                fontWeight: 200
            }
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '13%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: '时间/日',
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
            data: ['10.1', '10.6', '10.12', '10.18','10.24','10.30' ]
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
                name: '疑似流动人口',
                type: 'line',
                smooth:true,
                stack: '总量',
                data: [5, 40, 80, 130, 150, 190, 240]
            },
            {
                name: '陌生人',
                type: 'line',
                smooth:true,
                stack: '总量',
                data: [240, 150, 80, 5, 80, 150, 250]
            }
        ]
    },
    two: {
        // title: {
        //     text: '疑似流动与陌生人统计图',
        //     textStyle: {
        //         fontSize: 15,
        //         fontWeight: 200 
        //     }
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['疑似流动人口', '陌生人'],
            left: 'right',
            textStyle: {
                fontSize: 10,
                fontWeight: 200
            }
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: '时间/日',
            splitLine:{show: false}, //隐藏网格线
            nameTextStyle:{
                padding: [0,0,-60,-10]
            },
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
            boundaryGap: false,
            data: ['10.1', '10.3', '10.6', '10.9','10.12','10.15' ]
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
                name: '疑似流动人口',
                type: 'line',
                smooth:true,
                stack: '总量',
                data: [120, 132, 50, 90, 180, 230, 50]
            },
            {
                name: '陌生人',
                type: 'line',
                smooth:true,
                stack: '总量',
                data: [50, 70, 100, 40, 80, 150, 250]
            }
        ]
    }
}