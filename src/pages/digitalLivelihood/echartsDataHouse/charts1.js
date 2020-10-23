export default {
    ch1:{
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
                            html='456\r\n\r\n'+'自住';
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
                    {value: 220, name: '默认'},
                    {value: 600, name: '自住'},
                ]
            }
        ]
    },
    ch2:{
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
                            html='218\r\n\r\n'+'出租';
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
                    {value: 218, name: '出租'},
                    {value: 150, name: '默认'},
                ]
            }
        ]
    },
    ch3:{
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
                            html='10\r\n\r\n'+'空置';
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
                    {value: 10, name: '空置'},
                    {value: 350, name: '默认'},
                ]
            }
        ]
    },
    ch4:{
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
                            html='12\r\n\r\n'+'重点人群';
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
                    {value: 12, name: '重点人群'},
                    {value: 350, name: '默认'},
                ]
            }
        ]
    },
    ch5:{
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
                            html='45\r\n\r\n'+'特殊人群';
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
                    {value: 45, name: '特殊人群'},
                    {value: 350, name: '默认'},
                ]
            }
        ]
    },
    ch6:{
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
                            html='6\r\n\r\n'+'其他';
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
                    {value: 6, name: '其他'},
                    {value: 350, name: '默认'},
                ]
            }
        ]
    },
}