// 兰丁格尔图
export default {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        transitionDuration:0 // 解决echarts鼠标事件屏幕晃动bug
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: [0, 100],
            roseType: 'area',
            labelLine:{
                normal:{
                    length: 1,
                    lineStyle:{
                        color: "#ffffff"  // 改变标示线的颜色
                    }
                }
            },
            label:{
                normal:{
                    textStyle:{
                        color: '#ffffff'  // 改变标示文字的颜色
                    } 
                }
            },
            data: [
                {value: 10, name: '6岁以下'},
                {value: 5, name: '6-18岁'},
                {value: 15, name: '19-40岁'},
                {value: 25, name: '41-65岁'},
                {value: 20, name: '66岁'}
            ]
        }
    ]
}