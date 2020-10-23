<template>
<!-- 数字民生-房屋信息 -->
    <div class="digPenson">
        <!-- 左边区域 -->
        <div class="leftCon">
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">房屋统计</div>
                </div>
                <div class="echartsBox test">
                    <div class="echartsItemBox">
                        <div class="head">
                            <div>房屋总数:670</div>
                            <div>楼栋总数:12</div>
                        </div>
                        <div class="tuBox">
                            <div class="echItem">
                                <div id="echart11" style="width:100%;height:100%;"></div>
                            </div>
                            <div class="echItem">
                                <div id="echart12" style="width:100%;height:100%;"></div>
                            </div>
                            <div class="echItem">
                                <div id="echart13" style="width:100%;height:100%;"></div>
                            </div>
                            <div class="echItem">
                                <div id="echart14" style="width:100%;height:100%;"></div>
                            </div>
                            <div class="echItem">
                                <div id="echart15" style="width:100%;height:100%;"></div>
                            </div>
                            <div class="echItem">
                                <div id="echart16" style="width:100%;height:100%;"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">房屋用途分析</div>
                </div>
                <div class="echartsBox">
                    <div id="echart2" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item-l">
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">房屋状况分析</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart3" style="width:100%;height:100%;"></div>
                    </div>
                </div>
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">房屋面积分析</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart4" style="width:100%;height:100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中间区域 -->
        <div class="centerCon">
            <div class="itemTop">
                <div class="lineBox">
                    <div class="box"
                    v-for="(item,index) in houseData"
                    :key="index"
                    >
                        <div class="text">{{item.text}}</div>
                        <div class="number">{{item.number}}</div>
                    </div>
                </div>
            </div>
            <div class="itemBom">
                <div class="centerBox">
                   <div class="floatBox">
                        <div class="textBox">
                            <div class="yuan"></div>
                            <div class="address">斜江社区</div>
                        </div>
                        <div class="rightBox">
                            <div class="floatItem" v-for="(item,index) in houseData" :key="index">{{item.text}}:{{item.number}}</div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
        <!-- 右边区域 -->
        <div class="rightCon">
            <div class="item-l">
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">每户居住人数分布</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart5" style="width:100%;height:100%;"></div>
                    </div>
                </div>
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">人均使用面积</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart6" style="width:100%;height:100%;"></div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">出租房屋总数趋势</div>
                </div>
                <div class="echartsBox">
                    <div id="echart7" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item-l">
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">房屋空置数变化趋势</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart8" style="width:100%;height:100%;"></div>
                    </div>
                </div>
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">房屋空置数变化趋势</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart9" style="width:100%;height:100%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import customed from '../echartsColor/customed.js' // 柱状图默认主题
import ring3 from '../echartsColor/ring3.js' // 饼图3主题
import round1 from '../echartsColor/round1.js' // 模拟圆环1主题
import round2 from '../echartsColor/round2.js' // 模拟圆环2主题
import round3 from '../echartsColor/round3.js' // 模拟圆环3主题
import round4 from '../echartsColor/round4.js' // 模拟圆环4主题
import round5 from '../echartsColor/round5.js' // 模拟圆环5主题
import round6 from '../echartsColor/round6.js' // 模拟圆环6主题
import charts1Data from '../echartsDataHouse/charts1.js' // 房屋统计图数据
import charts2Data from '../echartsDataHouse/charts2.js' // 房屋用途分析统计图数据
import charts3Data from '../echartsDataHouse/charts3.js' // 房屋状态分析统计图数据
import charts4Data from '../echartsDataHouse/charts4.js' // 房屋面积分析统计图数据
import charts5Data from '../echartsDataHouse/charts5.js' // 每户居住人数统计图数据
import charts6Data from '../echartsDataHouse/charts6.js' // 人均使用面积数据
import charts7Data from '../echartsDataHouse/charts7.js' // 房屋出租总数趋势统计图数据
import charts8Data from '../echartsDataHouse/charts8.js' // 房屋空置数变化统计图数据
import charts9Data from '../echartsDataHouse/charts9.js' // 房屋空置数变化统计图数据

export default {
    data(){
        return{
            // 中间区域的数据
            houseData: [
                {
                    text:'小区数量',
                    number: 1
                },
                {
                    text: '房屋数量',
                    number: 670
                },
                {
                    text: '空置房数量',
                    number: 12
                }
            ]
        }
    },
    mounted(){
        this.drChart()
    },
    methods:{
        // 生成图表
        drChart(){
             this.$nextTick(()=>{
                let echart2 = this.$echarts.init(document.getElementById('echart2'),'customed')
                let echart3 = this.$echarts.init(document.getElementById('echart3'),'ring3')
                let echart4 = this.$echarts.init(document.getElementById('echart4'),'customed')
                let echart5 = this.$echarts.init(document.getElementById('echart5'),'customed')
                let echart6 = this.$echarts.init(document.getElementById('echart6'),'round1')
                let echart7 = this.$echarts.init(document.getElementById('echart7'),'customed')
                let echart8 = this.$echarts.init(document.getElementById('echart8'),'customed')
                let echart9 = this.$echarts.init(document.getElementById('echart9'),'customed')
                let echart11 = this.$echarts.init(document.getElementById('echart11'),'round1')
                let echart12 = this.$echarts.init(document.getElementById('echart12'),'round2')
                let echart13 = this.$echarts.init(document.getElementById('echart13'),'round3')
                let echart14 = this.$echarts.init(document.getElementById('echart14'),'round4')
                let echart15 = this.$echarts.init(document.getElementById('echart15'),'round5')
                let echart16 = this.$echarts.init(document.getElementById('echart16'),'round6')
                echart2.setOption(charts2Data,'customed')
                echart3.setOption(charts3Data,'ring3')
                echart4.setOption(charts4Data,'customed')
                echart5.setOption(charts5Data,'customed')
                echart6.setOption(charts6Data,'round1')
                echart7.setOption(charts7Data,'customed')
                echart8.setOption(charts8Data,'customed')
                echart9.setOption(charts9Data,'customed')
                echart11.setOption(charts1Data.ch1,'round1')
                echart12.setOption(charts1Data.ch2,'round2')
                echart13.setOption(charts1Data.ch3,'round3')
                echart14.setOption(charts1Data.ch4,'round4')
                echart15.setOption(charts1Data.ch5,'round5')
                echart16.setOption(charts1Data.ch6,'round6')

             })
        }
    }
}
</script>
<style lang="less" scoped>
.digPenson{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-bottom: 1%;
    .leftCon, .centerCon, .rightCon{
        width: 32%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        .item, .oneItem{
            box-sizing: border-box;
            padding: 10px;
            .echartsBox{
                box-sizing: border-box;
                height: calc(100% - 40px);
                width: 100%;
                .echartsItemBox{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .head{
                        width: 100%;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        padding-left: 3%;
                        div{
                            margin-right: 5%;
                            font-size: 14px;
                            font-family: MicrosoftYaHei;
                            color: #FFFFFF;
                            line-height: 19px;
                        }
                    }
                    .tuBox{
                        width: 100%;
                        height: calc(100% - 40px);
                        // background-color: greenyellow;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        .echItem{
                            width: 16%;
                            height: 65%;;
                        }
                    }
                }
            }
        }
        .title{
            height: 30px;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: #38A2F7;
            line-height: 21px;
            letter-spacing: 1px;
            padding-bottom: 10px;
            img{
                width: 11px;
                height: 11px;
                margin-right: 10px;
            }
        }
    }
    // 左边区域样式
    .leftCon{
        .item-l{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .item-l,.item{
            width: 100%;
            height: 32%;
            
            .oneItem{
                width: 49%;
                height: 100%;
                background-image: url('../../../assets/images/jiao@2x.png');
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
            }
        }
        .item{
            background-image: url('../../../assets/images/kuang@long.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
        }
    }
    // 中间区域样式
    .centerCon{
        margin: 0 1%;
        .itemTop{
            width: 100%;
            height: 16%;
            box-sizing: border-box;
            background-image: url('../../../assets/images/beijing@2x.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
            .lineBox{
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-content: space-around;
                color: #ffffff;
                .box{
                    width: 30%;
                    height: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .text{
                        width: 100%;
                        font-size: 14px;
                        text-align: left;
                        font-family: MicrosoftYaHei;
                        color: #4599FF;
                        letter-spacing: 1px;
                        box-sizing: border-box;
                        padding-left: 30%;
                    }
                    .number{
                        width: 100%;
                        font-size: 20px;
                        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                        font-weight: bold;
                        color: #53F9F2;
                        line-height: 26px;
                        letter-spacing: 1px;
                        box-sizing: border-box;
                        text-align: center;
                    }
                }
            }
        }
        .itemBom{
            width: 100%;
            height: 82%;
            background-image: url('../../../assets/images/jiao@2x.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
            box-sizing: border-box;
            padding: 10px;
            .centerBox{
                width: 100%;
                height: 100%;
                background-image: url('../../../assets/twopage/centerbeijing.png');
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
                position: relative;
                .floatBox{
                    width: 300px;
                    display: flex;
                    align-items: center;
                    position: absolute;
                    top: 35%;
                    left: 36%;
                    .textBox{
                        width: 90px;
                        display: flex;
                        align-items: center;
                        .address{
                            font-size: 12px;
                            font-family: MicrosoftYaHei;
                            color: #FFFFFF;
                            line-height: 16px;
                            letter-spacing: 1px;
                        }
                        .yuan{
                            width: 8px;
                            height: 8px;
                            background: #53F9F2;
                            box-shadow: 0px 0px 4px 0px rgba(83, 249, 242, 0.74);
                            margin-right: 4px;
                            border-radius: 50%;
                        }
                    }
                    .rightBox{
                        // width: 132px;
                        // height: 100px;
                        background: rgba(17, 25, 64, 0.69);
                        box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
                        border-radius: 5px;
                        border: 2px solid;
                        border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
                        font-size: 12px;
                        font-family: MicrosoftYaHei;
                        color: #FFFFFF;
                        letter-spacing: 1px;
                        box-sizing: border-box;
                        padding: 2% 5%;
                        .floatItem{
                            margin-bottom: 2px;
                        }
                    }
                }
            }
        }
    }
    //右边区域样式
    .rightCon{
        .item-l{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .item-l,.item{
            width: 100%;
            height: 32%;
            
            .oneItem{
                width: 49%;
                height: 100%;
                background-image: url('../../../assets/images/jiao@2x.png');
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
            }
        }
        .item{
            width: 100%;
            height: 32%;
            background-image: url('../../../assets/images/kuang@long.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
        }
    }
}
</style>