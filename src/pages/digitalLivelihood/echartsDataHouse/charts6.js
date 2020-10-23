
// 人均使用面积数据
export default {
    series: [
        {
            name: '访问来源',
            type: 'pie',
            hoverAnimation:false, //鼠标悬浮是否有区域弹出动画
            radius: ['80%', '100%'],
            center: 'center',
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter:function (argument) {
                        var html;
                        html='34.12㎡';
                        return html;
                    },
                    textStyle:{
                       fontSize: 15,
                        color:'#FFFFFF'
                    }
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 150, name: '人均使用面积'},
                {value: 350, name: '默认'},
            ]
        }
    ]
}