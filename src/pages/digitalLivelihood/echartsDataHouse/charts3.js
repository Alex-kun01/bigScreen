// 房屋状况分析
export default {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        transitionDuration:0 // 解决echarts鼠标事件屏幕晃动bug
    },
    legend: {
        orient: 'vertical',
        left: 'center',
        orient: 'horizontal',
        data: ['自住','出租','空置']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '70%'],
            center: 'center',
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 437, name: '自住'},
                {value: 190, name: '出租'},
                {value: 23, name: '空置'},
            ]
        }
    ]
}