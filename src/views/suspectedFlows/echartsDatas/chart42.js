// 饼图一
export default {
    // title: {
    //     text: '疑似流动审核人数记录',
    //     left: 'center',
    //     textStyle: {
    //         fontSize: 15,
    //         fontWeight: 200 
    //     }
    // },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        textStyle: {
            fontSize: 10,
            fontWeight: 200
        },
        top: 30,
        data: ['审核人数', '未审核人数']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            smooth:true,
            radius: '70%',
            center: ['50%', '60%'],
            data: [
                {value: 3202, name: '审核人数'},
                {value: 1804, name: '未审核人数'}
            ],
            label: {
                normal:{
                    show:true,
                    position:'inner', //标签的位置
                    textStyle : {
                        fontWeight : 300 ,
                        fontSize : 16    //文字的字体大小
                    },
                    formatter:'{c}人'
                }
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}