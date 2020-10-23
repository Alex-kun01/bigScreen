// 柱状图数据
export default {
    legend: {
        data: ['非法上访', '涉毒人员','涉恐人员'],
        left: 'left',
        textStyle: {
            fontSize: 8,
            fontWeight: 200
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            name: '小区',
            splitLine:{show: false}, //隐藏网格线
            data: ['香槟国际','爱情公寓','蓝润华景','海滨西区','其他']
        }
    ],
    grid: {
        left: '3%',
        right: '10%',
        bottom: '8%',
        containLabel: true
    },
    yAxis: [
        {
            type: 'value',
            splitLine:{show: false}, //隐藏网格线
            name: '人数'
        }
    ],
    series: [
        {
            name: '非法上访',
            type: 'bar',
            data: [15,151,180,155,160,170,180,190],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        },
        {
            name: '涉毒人员',
            type: 'bar',
            data: [100,18,180,12,152,20,170,10],
            markPoint: {
                data: [
                    {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                    {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                ]
            }
        },
        {
            name: '涉恐人员',
            type: 'bar',
            data: [12,40,185,62,102,70,20,180],
            markPoint: {
                data: [
                    {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                    {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                ]
            }
        }
    ]
}