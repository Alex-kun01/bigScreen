// 婚姻状况
export default {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        transitionDuration:0 // 解决echarts鼠标事件屏幕晃动bug
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        orient: 'horizontal',
        data: ['已婚','未婚','离异','其他']
    },
    grid: {
        left: '3%',
        right: '4%',
        top: '5%',
        bottom: '5%',
        containLabel: true
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
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
                {value: 385, name: '已婚'},
                {value: 888, name: '未婚'},
                {value: 349, name: '离异'},
                {value: 468, name: '其他'},
            ]
        }
    ]
}