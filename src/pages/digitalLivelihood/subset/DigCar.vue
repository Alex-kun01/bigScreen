<template>
<!-- 数字民生-车辆信息 -->
    <div class="digPenson">
        <!-- 左边区域 -->
        <div class="leftCon">
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">车辆数</div>
                </div>
                <div class="echartsBox">
                        <div id="echart1" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">车辆进出次数</div>
                </div>
                <div class="echartsBox">
                    <div id="echart2" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">车辆异常进出次数</div>
                </div>
                <div class="echartsBox">
                    <div id="echart3" style="width:100%;height:100%;"></div>
                </div>
            </div>
        </div>
        <!-- 中间区域 -->
        <div class="centerCon">
            <div class="itemTop">
                <div class="lineBox">
                    <div class="box"
                    v-for="(item,index) in carData"
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
                            <div class="floatItem" v-for="(item,index) in carData" :key="index">{{item.text}}:{{item.number}}</div>
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
                    <div class="info">重点人群车辆</div>
                </div>
                <div class="echartsBox">
                    <div id="echart4" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">重点人群车辆进出次数</div>
                </div>
                <div class="echartsBox">
                    <div id="echart5" style="width:100%;height:100%;"></div>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <img src="../../../assets/images/icon@2x.png" alt="">
                    <div class="info">重点人群车辆异常进出次数</div>
                </div>
                <div class="echartsBox">
                    <div id="echart6" style="width:100%;height:100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import customed from '../echartsColor/customed.js' // 柱状图默认主题
import charts1Data from '../echartsDataCar/charts1.js' // 车辆数统计图数据
import charts2Data from '../echartsDataCar/charts2.js' // 车辆进出次数统计图数据
import charts3Data from '../echartsDataCar/charts3.js' // 车辆异常进出次数统计图数据
import charts4Data from '../echartsDataCar/charts4.js' // 重点人群车辆统计图数据
import charts5Data from '../echartsDataCar/charts5.js' // 重点人群车辆进出次数统计图数据
import charts6Data from '../echartsDataCar/charts6.js' // 重点人群车辆异常进出次数统计图数据
export default {
    data(){
        return{
            // 总览人口数据
            carData: [
                {
                    text: '在册车辆',
                    number: 4244
                },
                {
                    text: '重点人群车辆',
                    number: 281
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
                let echart1 = this.$echarts.init(document.getElementById('echart1'),'customed')
                let echart2 = this.$echarts.init(document.getElementById('echart2'),'customed')
                let echart3 = this.$echarts.init(document.getElementById('echart3'),'customed')
                let echart4 = this.$echarts.init(document.getElementById('echart4'),'customed')
                let echart5 = this.$echarts.init(document.getElementById('echart5'),'customed')
                let echart6 = this.$echarts.init(document.getElementById('echart6'),'customed')
                echart1.setOption(charts1Data,'customed')
                echart2.setOption(charts2Data,'customed')
                echart3.setOption(charts3Data,'customed')
                echart4.setOption(charts4Data,'customed')
                echart5.setOption(charts5Data,'customed')
                echart6.setOption(charts6Data,'customed')
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
                justify-content: space-around;
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
                        padding-left: 30%;
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
                // display: flex;
                // justify-content: center;
                position: relative;
                .floatBox{
                    width: 300px;
                    // background-color: pink;
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