<template>
<!-- 数字民生-人口信息 -->
    <div class="digPenson">
        <!-- 左边区域 -->
        <div class="leftCon">
            <div class="item-l">
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">人口性别比例</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart1" style="width:100%;height:100%;"></div>
                    </div>
                </div>
                <div class="oneItem">
                    <div class="title">
                        <img src="../../../assets/images/icon@2x.png" alt="">
                        <div class="info">户籍统计</div>
                    </div>
                    <div class="echartsBox">
                        <div id="echart2" style="width:100%;height:100%;"></div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">年龄图统计</div>
                </div>
                <div class="echartsBox">
                    <div id="echart3" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">婚姻状况</div>
                </div>
                <div class="echartsBox">
                    <div id="echart4" style="width:100%;height:100%;"></div>
                </div>
            </div>
        </div>
        <!-- 中间区域 -->
        <div class="centerCon">
            <div class="itemTop">
                <div class="lineBox">
                    <div class="box"
                    v-for="(item,index) in topBoxList"
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
                            <div class="floatItem" v-for="(item,index) in topBoxList" :key="index">{{item.text}}:{{item.number}}</div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
        <!-- 右边区域 -->
        <div class="rightCon">
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">民族类别分布</div>
                </div>
                <div class="echartsBox">
                    <div id="echart5" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">关怀人群分布</div>
                </div>
                <div class="echartsBox">
                    <div id="echart6" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">重点人群分布</div>
                </div>
                <div class="echartsBox">
                    <div id="echart7" style="width:100%;height:100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import customed from '../echartsColor/customed.js' // 柱状图默认主题
import piechart from '../echartsColor/piechart.js' // 饼图默认主题
import ring from '../echartsColor/ring.js' // 婚姻状况统计图主题
import charts1Data from '../echartsDataPenson/charts1.js' // 人口性别比例图数据
import charts3Data from '../echartsDataPenson/charts3.js' // 年龄统计图数据
import charts4Data from '../echartsDataPenson/charts4.js' // 婚姻状况图数据
import charts5Data from '../echartsDataPenson/charts5.js' // 民族类别统计图数据
import charts6Data from '../echartsDataPenson/charts6.js' // 关怀人群分布统计图数据
import charts7Data from '../echartsDataPenson/charts7.js' // 重点人群分布统计图数据
export default {
    data(){
        return{
            // 总览人口数据
            topBoxList: [
                {
                    text: '总人数',
                    number: 900454
                },
                {
                    text: '常住人员',
                    number: 548567
                },
                {
                    text: '流动人员',
                    number: 6875
                },
                {
                    text: '重点人员',
                    number: 134558
                },
                {
                    text: '党员',
                    number: 6857
                },
                {
                    text: '关怀人员',
                    number: 3245
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
                let echart1 = this.$echarts.init(document.getElementById('echart1'),'piechart')
                let echart3 = this.$echarts.init(document.getElementById('echart3'),'piechart')
                let echart4 = this.$echarts.init(document.getElementById('echart4'),'ring')
                let echart5 = this.$echarts.init(document.getElementById('echart5'),'customed')
                let echart6 = this.$echarts.init(document.getElementById('echart6'),'customed')
                let echart7 = this.$echarts.init(document.getElementById('echart7'),'customed')
                echart1.setOption(charts1Data,'piechart')
                echart3.setOption(charts3Data,'piechart')
                echart4.setOption(charts4Data,'ring')
                echart5.setOption(charts5Data,'customed')
                echart6.setOption(charts6Data,'customed')
                echart7.setOption(charts7Data,'customed')
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
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .text{
                        width: 100%;
                        font-size: 14px;
                        text-align: center;
                        font-family: MicrosoftYaHei;
                        color: #4599FF;
                        letter-spacing: 1px;
                        box-sizing: border-box;
                    }
                    .number{
                        width: 100%;
                        font-size: 20px;
                        text-align: center;
                        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                        font-weight: bold;
                        color: #53F9F2;
                        line-height: 26px;
                        letter-spacing: 1px;
                        box-sizing: border-box;
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
                    top: 29%;
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