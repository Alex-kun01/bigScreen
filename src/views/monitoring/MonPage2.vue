<template>
<!-- 全景监控 -->
    <div class="monPage2">
        <!-- 中间地图区域 -->
        <div class="mapBox">
            <img class="map" src="../../assets/images/tupian@2x.png" alt="">
            <div class="badge"
            v-for="(item,index) in badgeList"
            :key="index"
            :style="{top: item.top,left: item.left}"
            >
            <div class="address" @click="goZhongdian">
                 <img class="" src="../../assets/images/address.png" alt="">
                 <span>{{item.area}}</span>
            </div>
              
               <div class="textBox">
                   <div class="title">{{item.area}}</div>
                   <div class="text">
                       <div class="eli" v-for="(eli,elx) in item.textList" :key="elx">{{eli}}</div>
                   </div>
                   <div class="peopleBox">
                       <div class="title">5星重点人员：{{item.cnType.length}}人</div>
                       <div class="box">
                           <div class="item" v-for="(el,elx) in item.cnType" :key="elx">
                               <img :src="el.img" alt="">
                               <div class="info">
                                   <span>{{el.type}}</span>
                                   <span>
                                       {{el.start}}
                                   </span>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
            <!-- 右侧滚动列表 -->
            <div class="rollList">
                <div class="staticBox" ref="staticBox"
                style="top:0px;"
                >
                    <div 
                        v-for="(item,index) in rollListData"
                        :key="index"
                        :class="{item: 1, active: index == 4}"
                        >
                            <div class="l-text">
                                <span>{{item.name}}</span>
                                <span class="blod">【{{item.cnType}}{{item.start}}】</span>
                                <span>{{item.date}}</span>
                                <span>{{item.address}}</span>
                            </div>
                            <div class="btn" @click="goZhongdian()">处置</div>
                        </div>
                </div>
                
            </div>
        </div>
        <!-- 底部列表 -->
        <div class="bomList">
            <div class="item"
            v-for="(item,index) in listData"
            :key="index"
            >
                <img class="map" :src="item.img" alt="">
                <div class="kuang"
                :style="{top: item.top,left: item.left}"
                ></div>
                <div class="float">
                    <div>
                        地点：{{item.address}}              
                    </div>
                    <div>
                        时间：{{item.date}}
                    </div>
                </div>

                <div class="floatBox">
                    <div class="left">
                        <div>
                            <span>{{item.name}}</span>
                            <span>{{item.cnType}}</span>
                        </div>
                        <div>
                            {{item.start}}
                        </div>
                    </div>
                    <div class="btnBox">
                        <div class="btn"  @click="goZhongdian">处置</div>
                        <img src="../../assets/images/close.png" alt="">
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import rolldata from './datas/rollData.js'
import bus from '../../assets/eventBus.js'
export default {
    data(){
        return {
            index: 0,
            timers: [],
            itemObj:{
                name: '张晓晓',
                cnType: '涉恐人员',
                start: 4,
                datea: '2020-10-10 12:00:05',
                address: '进入香槟国际-东大门等候处置'
            },
            // 右侧滚动列表
            rollListData: rolldata,
            allListData: [
                {
                    name: '张晓晓',
                    cnType: '涉恐人员',
                    start: 4,
                    datea: '2020-10-10 12:00:05',
                    address: '进入香槟国际-东大门等候处置'
                },
                {
                    name: '黄小琥',
                    cnType: '涉毒人员',
                    start: 5,
                    datea: '2020-10-10 12:00:05',
                    address: '进入香槟国际-东大门等候处置'
                },
                {
                    name: '张晓晓',
                    cnType: '涉恐人员',
                    start: 4,
                    datea: '2020-10-10 12:00:05',
                    address: '进入香槟国际-东大门等候处置'
                },
                {
                    name: '黄小琥',
                    cnType: '涉毒人员',
                    start: 5,
                    datea: '2020-10-10 12:00:05',
                    address: '进入香槟国际-东大门等候处置'
                },
                {
                    name: '黄小琥',
                    cnType: '涉毒人员',
                    start: 5,
                    datea: '2020-10-10 12:00:05',
                    address: '进入香槟国际-东大门等候处置'
                }
            ],
            // 桌标标记列表
            badgeList: [
                {
                    top: '10%',
                    left: '2%',
                    textList: ['3例5星重点人员报警','3例4星重点人员报警'],
                    area: '青羊区',
                    name: '黄小琥',
                    cnType: [
                        {
                            img: require('../../assets/images/people/people1.png'),
                            type: '涉毒人员',
                            start: 5
                        },
                        {
                            img: require('../../assets/images/people/people2.png'),
                            type: '涉毒人员',
                            start: 5
                        },
                        {
                            img: require('../../assets/images/people/people3.png'),
                            type: '涉毒人员',
                            start: 5
                        },
                        {
                            img: require('../../assets/images/people/people4.png'),
                            type: '涉毒人员',
                            start: 5
                        }
                    ]
                },
                {
                    top: '30%',
                    left: '40%',
                    textList: ['3例5星重点人员报警','3例4星重点人员报警'],
                    area: '高新区',
                    name: '张全明',
                    cnType: [
                        {
                            img: require('../../assets/images/people/people5.png'),
                            type: '涉毒人员',
                            start: 5
                        },
                        {
                            img: require('../../assets/images/people/people6.png'),
                            type: '涉毒人员',
                            start: 5
                        },
                        {
                            img: require('../../assets/images/people/people7.png'),
                            type: '涉毒人员',
                            start: 5
                        }
                    ]
                }
            ],
            // 视频列表
            listData: [
                {
                    img: require("../../assets/images/tu2@2x.png"),
                    address: '大邑县桦树林路-2段',
                    date: '2020-10-11 13:33:11',
                    name: '黄小琥',
                    cnType: '涉毒人员',
                    start: 3,
                    top: '40%',
                    left: '50%'
                },
                {
                    img: require("../../assets/images/shipin/shipin5.png"),
                    address: '大邑县实验小学-东大门',
                    date: '2020-10-11 13:33:11',
                    name: '张全明',
                    cnType: '涉毒人员',
                    start: 2,
                    top: '40%',
                    left: '90%'
                },
                {
                    img: require("../../assets/images/shipin/shipin6.png"),
                    address: '大邑县实验小学-西大门',
                    date: '2020-10-11 13:33:11',
                    name: '吴静',
                    cnType: '涉毒人员',
                    start: 3,
                    top: '38%',
                    left: '55%'
                },
                {
                    img: require("../../assets/images/shipin/shipin7.png"),
                    address: '大邑县实验小学-南大门',
                    date: '2020-10-11 13:33:11',
                    name: '田亚东',
                    cnType: '涉毒人员',
                    start: 2,
                    top: '42%',
                    left: '76%'
                },
                {
                    img: require("../../assets/images/shipin/shipin9.png"),
                    address: '大邑县实验小学-正门',
                    date: '2020-10-11 13:33:11',
                    name: '左亚辉',
                    cnType: '涉毒人员',
                    start: 3,
                    top: '48%',
                    left: '43%'
                }
            ]
        }
    },
    mounted(){
        this.initRoll()
    },
    destroyed(){
        for(var i = 0; i < this.timers.length; i++){
            clearInterval(this.timers[i])
        }
        this.timers = null
    },
    methods:{
        // 处置按钮跳转
        goZhongdian(item){
            bus.$emit('changeHeaderIndex', 2)
            this.$router.push({name: 'allPage'})
        },
        // 滚动列表
        initRoll(){
            let i = 0; 
            this.$nextTick(()=>{
                var item = setInterval(()=>{
                    let box = this.$refs.staticBox
                    i = i - 1
                    box.style.top = i + 'px'    
                },150)
                this.timers.push(item)
            })
            
            
        }
    }
}
</script>
<style lang="less" scoped>
.monPage2{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 10px 0 10px;
    .mapBox{
        width: 100%;
        height: 75%;
        background-image: url('../../assets/images/beijing@2x.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        box-sizing: border-box;
        padding: 5px;
        position: relative;
         @keyframes moves {
            0%{
                transform: translateY(30vh);
            }
            100%{
                transform: translateY(-200%);
            }
        }
        // 滚动框
        .rollList{
            width: 500px;
            height: 300px;
            // border: 2px solid black;
            box-sizing: border-box;
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 10px;
            overflow: hidden;
            .staticBox{
                width: 100%;
                height: 300px;
                position: absolute;
                top: 0px;
            }
            .item{
                width: 480px;
                background: rgba(255, 255, 255, .4);
                border-radius: 5px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #333333;
                letter-spacing: 1px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 0 10px;
                margin-bottom: 5px;
                .l-text{
                    box-sizing: border-box;
                    padding: 5px;
                    .blod{
                        color: #38A2F7;
                    }
                }
                .btn{
                    width: 60px;
                    height: 25px;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    color: #FFFFFF;
                    line-height: 25px;
                    text-align: center;
                    letter-spacing: 1px;
                    background: #FF3E4A;
                    border-radius: 15px;
                    cursor: pointer;
                }
                .btn:hover{
                     background: #b61520;
                }
            }
        }
        // 标记
        .badge{
            width: 300px;
            height: 300px;
            // background-color: pink;
            position: absolute;
            .address{
                width: 100px;
                height: 25px;
                position: absolute;
                left: calc(50% - 50px);
                bottom: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                img{
                    width: 20px;
                    height: 25px;
                }
                span{
                    color: #0543FF;
                    font-weight: bold;
                }
            }
            .textBox{
                width: 300px;
                height: 270px;
                position: absolute;
                left: calc(50% - 150px);
                bottom: 30px;
                background-image: url('../../assets/images/background2.png');
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
                .title{
                    color: #03A3FF;
                    text-align: center;
                    margin-top: 2px;
                }
                .text{
                    width: 100%;
                    min-height: 60px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    div{
                        margin: 2px 0;
                    }
                }
                .peopleBox{
                    width: 100%;
                    // background-color: pink;
                    .title{
                        text-align: left;
                        padding-left: 10%;
                        margin-bottom: 10px;
                        color: #ffffff;
                    }
                    .box{
                        display: flex;
                        box-sizing: border-box;
                        padding: 0 20px;
                        .item{
                            // background-color: green;
                            margin: 0 1px;
                            img{
                                width: 64px;
                                height: 87px;
                            }
                            .info{
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
    .map{
        width: 100%;
        height: 100%;
    }
    .bomList{
        width: 100%;
        height: 25%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 10px 0;
        .item{
            width: 19%;
            height: 100%;
            background-image: url('../../assets/images/jiao@2x.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
            box-sizing: border-box;
            padding: 5px;
            position: relative;
            .kuang{
                width: 20px;
                height: 20px;
                background: rgba(134, 185, 255, 0.44);
                border: 2px solid #4E86FF;
                position: absolute;
                top: 50%;
                left: 50%;
            }
            .floatBox{
                width: 250px;
                height: 40px;
                background: rgba(17, 25, 64, 0.69);
                box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
                border-radius: 5px;
                border: 2px solid;
                border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
                position: absolute;
                top: 10px;
                right: 10px;
                display: flex;
                justify-content: space-between;

                .left{
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                }
                .btnBox{
                    display: flex;
                    align-items: center;
                    
                    .btn{
                        width: 60px;
                        height: 25px;
                        font-size: 14px;
                        line-height: 25px;
                        text-align: center;
                        background: #111940;
                        box-shadow: 0px 0px 4px 1px #497DFF;
                        border-radius: 5px;
                        border: 1px solid;
                        border-image: linear-gradient(128deg, rgba(97, 190, 255, 1), rgba(34, 101, 255, 1), rgba(77, 162, 255, 1)) 1 1;
                        cursor: pointer;
                    }
                    img{
                        width: 20px;
                        height: 20px;
                        margin-left: 10px;
                        
                    }
                }
            }
            .float{
                width: 100%;
                height: 50px;
                font-size: 12px;
                box-sizing: border-box;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                background: rgba(3, 11, 34, 0.59);
                border-radius: 0px 0px 7px 7px;
                position: absolute;
                bottom: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 10px;
            }
        }
    }
}
</style>