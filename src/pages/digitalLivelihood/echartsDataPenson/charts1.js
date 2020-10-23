// 人口性别比例图
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
        data: ['男性','女性']
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
                {value: 650, name: '男性'},
                {value: 350, name: '女性'},
            ]
        }
    ]
}