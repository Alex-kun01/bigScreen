// 图表二数据
export default {
    one: {
        // title: {
        //     text: '疑似流动小区分布统计图',
        //     left: 'left',
        //     textStyle: {
        //         fontSize: 15,
        //         fontWeight: 200 
        //     }
        // },
        legend: {
            data: ['审核忽略', '审核通过','陌生人'],
            left: 'right',
            textStyle: {
                fontSize: 10,
                fontWeight: 200
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                name: '小区',
                splitLine:{show: false},
                axisTick:{
                    show:false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
                data: ['香槟国际','爱情公寓','蓝润华景','海滨西区','其他']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人数',
                splitLine:{show: false},//隐藏网格线
                axisTick:{
                    show:false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
            }
        ],
        grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        series: [
            {
                name: '审核忽略',
                type: 'bar',
                smooth:true,
                data: [150,35,80,15,160,70,80,90],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                }
            },
            {
                name: '审核通过',
                type: 'bar',
                smooth:true,
                data: [115,8,105,122,52,50,70,180],
                markPoint: {
                    data: [
                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                    ]
                }
            },
            {
                name: '陌生人',
                type: 'bar',
                data: [101,80,85,62,12,50,70,80],
                markPoint: {
                    data: [
                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                    ]
                }
            }
        ]
    },
    two: {
        // title: {
        //     text: '疑似流动小区分布统计图',
        //     left: 'left',
        //     textStyle: {
        //         fontSize: 15,
        //         fontWeight: 200 
        //     }
        // },
        legend: {
            data: ['审核忽略', '审核通过','陌生人'],
            left: 'right',
            textStyle: {
                fontSize: 10,
                fontWeight: 200
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                name: '小区',
                splitLine:{show: false},
                axisTick:{
                    show:false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
                data: ['香槟国际','爱情公寓','蓝润华景','海滨西区','其他']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人数',
                splitLine:{show: false},//隐藏网格线
                axisTick:{
                    show:false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
            }
        ],
        grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        series: [
            {
                name: '审核忽略',
                type: 'bar',
                smooth:true,
                data: [50,15,60,5,160,50,30,10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                }
            },
            {
                name: '审核通过',
                type: 'bar',
                smooth:true,
                data: [140,150,130,50,50,130,150,180],
                markPoint: {
                    data: [
                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                    ]
                }
            },
            {
                name: '陌生人',
                type: 'bar',
                data: [5,60,150,180,150,150,60,5],
                markPoint: {
                    data: [
                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                    ]
                }
            }
        ]
    }
}