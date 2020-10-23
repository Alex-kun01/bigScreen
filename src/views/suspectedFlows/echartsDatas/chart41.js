// 饼图二
export default {
    // title: {
    //     text: '疑似流动审核通过率',
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
        data: ['审核通过', '审核不通过']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            smooth:true,
            label: {
                normal:{
                    show:true,
                    position:'inner', //标签的位置
                    textStyle : {
                        fontWeight : 300 ,
                        fontSize : 16    //文字的字体大小
                    },
                    formatter:'{d}%'
                }
            },
            data: [
                {value: 3202, name: '审核通过'},
                {value: 1804, name: '审核不通过'}
            ],
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