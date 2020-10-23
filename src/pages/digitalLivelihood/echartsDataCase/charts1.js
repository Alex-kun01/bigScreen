
// 关怀人群比例数据

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
            radius: [0, 80],
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
                {value: 10, name: '其他'},
                {value: 10, name: '失业人员'},
                {value: 20, name: '残疾人员'},
                {value: 35, name: '低保人员'},
                {value: 40, name: '高龄人员'}
            ]
        }
    ]
}