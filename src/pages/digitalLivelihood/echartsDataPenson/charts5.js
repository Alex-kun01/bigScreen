
import echarts from 'echarts'
// 民族类别分布
export default {
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
            data: ['汉族', '回族', '壮族', '彝族', '水族', '土家族', '布依族','东乡族','苗族','朝鲜族','傣族','佤族','女娲族'],
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
            barWidth: '40%',
            data: [10, 52, 200, 334, 390, 330, 220,52, 200, 334, 390, 330, 220],
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