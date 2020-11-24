import echarts from 'echarts'
// 性别比例
export const sex = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        transitionDuration: 0 // 解决echarts鼠标事件屏幕晃动bug
    },
    legend: {
        orient: 'horizontal',
        x: 'left',
        color: '#000000',
        data: ['男性','女性']
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        center: ['50%','50%'],
        itemStyle:{
            normal:{ 
                label:{ 
                    show: true, 
                    formatter: '{b}:{d}%',
                    color: '#000000' 
                }, 
                labelLine :{show:true} 
            } 
        },
        labelLine: {
            normal: {
                length: 5, // 改变标示线的长度
                lineStyle: {
                    color: "#000000" // 改变标示线的颜色
                }
            },
        },
        label: {
            normal: {
                textStyle: {
                    color: '#000000' // 改变标示文字的颜色
                }
            }
        },
        lett: 'center',
        orient: 'horizontal',
        radius: ['35%', '50%'],
        avoidLabelOverlap: false,
        data: [{
                value: 65,
                name: '男性'
            },
            {
                value: 35,
                name: '女性'
            }
        ]
    }]
}
// 年龄统计
export const age = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        transitionDuration: 0 // 解决echarts鼠标事件屏幕晃动bug
    },
    // legend: {
    //     orient: 'horizontal',
    //     x: 'left',
    //     color: '#000000',
    //     data: ['6岁以下','6-18岁','19-40岁','41-65岁','66岁以上']
    // },
    series: [{
        name: '分类',
        type: 'pie',
        center: ['50%','50%'],
        itemStyle:{
            normal:{ 
                label:{ 
                    show: true, 
                    formatter: '{b}{d}%',
                    color: '#000000' 
                }, 
                labelLine :{show:true} 
            } 
        },
        labelLine: {
            normal: {
                length: 5, // 改变标示线的长度
                lineStyle: {
                    color: "#000000" // 改变标示线的颜色
                }
            },
        },
        label: {
            normal: {
                textStyle: {
                    color: '#000000' // 改变标示文字的颜色
                }
            }
        },
        lett: 'center',
        orient: 'horizontal',
        radius: ['35%', '60%'],
        avoidLabelOverlap: false,
        data: [{
                value: 13,
                name: '6岁以下',
            },
            {
                value: 20,
                name: '6-18岁',
            },
            {
                value: 20,
                name: '19-40岁',
            },
            {
                value: 22,
                name: '41-65岁',
            },
            {
                value: 25,
                name: '66岁以上',
            }
        ]
    }]
}
// 婚姻状况
export const marriage = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        transitionDuration: 0 // 解决echarts鼠标事件屏幕晃动bug
    },
    legend: {
        orient: 'horizontal',
        x: 'left',
        color: '#000000',
        data: ['未婚','已婚','离异','丧偶']
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        center: ['50%','60%'],
        itemStyle:{
            normal:{ 
                label:{ 
                    show: true, 
                    formatter: '{b}:{d}%',
                    color: '#000000' 
                }, 
                labelLine :{show:true} 
            } 
        },
        labelLine: {
            normal: {
                length: 5, // 改变标示线的长度
                lineStyle: {
                    color: "#000000" // 改变标示线的颜色
                }
            },
        },
        label: {
            normal: {
                textStyle: {
                    color: '#000000' // 改变标示文字的颜色
                }
            }
        },
        lett: 'center',
        orient: 'horizontal',
        radius: ['35%', '60%'],
        avoidLabelOverlap: false,
        data: [{
                value: 888,
                name: '未婚',
                itemStyle: {
                    color: '#FFBE00'
                }
            },
            {
                value: 385,
                name: '已婚',
                itemStyle: {
                    color: '#4EF9B5'
                }
            },
            {
                value: 349,
                name: '离异',
                itemStyle: {
                    color: '#A33DFF'
                }
            },
            {
                value: 468,
                name: '丧偶',
                itemStyle: {
                    color: '#5B8FF9'
                }
            }
        ]
    }]
}
// 文化程度
export const cculture = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        transitionDuration:0 // 解决echarts鼠标事件屏幕晃动bug
    },
    grid: {
        left: '3%',
        right: '4%',
        top: '5%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            splitLine:{show: false}, //隐藏网格线
            data: ['初中以下', '高中', '专科', '本科 ', '研究生','博士及以上'],
            splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '15%',
            data: [325, 774,732, 1188, 1152,750],
            itemStyle:{
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[10, 10, 10, 10],
                    // 柱子渐变色
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: "#6699FF"  // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: "#53F9F2"// 100% 处的颜色
                    }], false)
                }
            }
            
        }
    ]
}
// 户籍统计
export const register = {}
// 流动人口籍贯分布
export const floating = {
    tooltip: {},
    radar: {
        center: ['50%', '50%'],
        name: {
            textStyle: {
                color: 'black',
                backgroundColor:'yellow',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100},
            {name: '资阳', max: 100}
        ]
    },
    series: [{
        name: '籍贯',
        type: 'radar',
        areaStyle: {normal: {}},
        data: [
            {name: "人数", value: [80,90, 90, 94, 85, 88, 90, 94, 85, 88, 85, 88]}
        ]
    }]
};

// 未实人员变化数
export const wsChange = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'],
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    // legend: {
    //     orient: 'horizontal',
    //     left: 'right',
    //     color: '#ffffff',
    //     data: ['已核实','未核实']
    // },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    grid: {
        left: '1%',
        right: '10%',
        top: '10%',
        bottom: '5%',
        containLabel: true
    },
    series: [
    //     {
    //     name: '已核实',
    //     data: [2, 5, 3, 4, 11, 5],
    //     type: 'line',
    //     symbol: 'none', //取消折点圆圈
    //     smooth: true, // 折线圆角
    //     areaStyle: {},
    //     itemStyle: {
    //         normal: {
    //             lineStyle: {
    //                 color: "#2CF0DC" // 折线图-线条颜色
    //             },
    //             //柱形图圆角，初始化效果
    //             barBorderRadius: [20, 20, 20, 20],
    //             // 柱子渐变色
    //             color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
    //                 offset: 0,
    //                 color: "#2CF0DC" // 0% 处的颜色
    //             }, {
    //                 offset: 1,
    //                 color: "#F7C253" // 100% 处的颜色
    //             }], false)
    //         }
    //     }
    // },
    {
        name: '未核实',
        data: [5, 8, 18, 6, 13, 6],
        type: 'line',
        symbol: 'none', //取消折点圆圈
        smooth: true, // 折线圆角
        areaStyle: {},
        itemStyle: {
            normal: {
                lineStyle: {
                    color: "#F7C253" // 折线图-线条颜色
                },
                //柱形图圆角，初始化效果
                barBorderRadius: [20, 20, 20, 20],
                // 柱子渐变色
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#111940" // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "#F7C253" // 100% 处的颜色
                }], false)
            }
        }
    }
]
};

// 实有人口变化数
export const syChange = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        fontSize: 8,
        data: ['2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'],
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    grid: {
        left: '1%',
        right: '10%',
        top: '10%',
        bottom: '5%',
        containLabel: true
    },
    series: [
    {
        name: '人数',
        data: [5, 8, 18, 6, 13, 6],
        type: 'line',
        symbol: 'none', //取消折点圆圈
        smooth: true, // 折线圆角
        areaStyle: {},
        itemStyle: {
            normal: {
                lineStyle: {
                    color: "#F7C253" // 折线图-线条颜色
                },
                //柱形图圆角，初始化效果
                barBorderRadius: [20, 20, 20, 20],
                // 柱子渐变色
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#111940" // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "#F7C253" // 100% 处的颜色
                }], false)
            }
        }
    }
]
};

// 重点人员巡查次数
export const importantOne = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'],
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    grid: {
        left: '1%',
        right: '10%',
        top: '10%',
        bottom: '5%',
        containLabel: true
    },
    series: [
    {
        name: '人数',
        data: [5, 8, 18, 6, 13, 6],
        type: 'line',
        symbol: 'none', //取消折点圆圈
        smooth: true, // 折线圆角
        areaStyle: {},
        itemStyle: {
            normal: {
                lineStyle: {
                    color: "#FF6464" // 折线图-线条颜色
                },
                //柱形图圆角，初始化效果
                barBorderRadius: [20, 20, 20, 20],
                // 柱子渐变色
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#111940" // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "#FF6464" // 100% 处的颜色
                }], false)
            }
        }
    }
]
};

// 异常出入记录
export const abnormal = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'],
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        }, //隐藏网格线
        axisTick: {
            show: false //不显示坐标轴刻度线
        },
        axisLine: {
            show: false, //不显示坐标轴线
        },
    },
    grid: {
        left: '1%',
        right: '10%',
        top: '10%',
        bottom: '5%',
        containLabel: true
    },
    series: [
    {
        name: '人数',
        data: [5, 8, 18, 6, 13, 6],
        type: 'line',
        symbol: 'none', //取消折点圆圈
        smooth: true, // 折线圆角
        areaStyle: {},
        itemStyle: {
            normal: {
                lineStyle: {
                    color: "#2D99FF" // 折线图-线条颜色
                },
                //柱形图圆角，初始化效果
                barBorderRadius: [20, 20, 20, 20],
                // 柱子渐变色
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#111940" // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "#2D99FF" // 100% 处的颜色
                }], false)
            }
        }
    }
]
};








 