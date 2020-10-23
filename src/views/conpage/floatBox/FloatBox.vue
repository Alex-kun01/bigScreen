<template>
<!-- 中间小弹窗 -->
    <div class="floatbox">
        <div class="title">{{floatData.type}}</div>
        <!-- 基本信息 -->
        <div class="info">
            <img class="avatar" :src="floatData.url || staPic" alt="">
            <div class="textBox">
                <div class="t-item"
                 v-for="(item,index) in floatData.data.info"
                :key="index"
                >{{item}}</div>
            </div>
        </div>
        <!-- 同行人员 -->
        <div class="alone"
            v-if="floatData.show && floatData.dxx == 1"
        >
            <div class="titles">同行人员：3人</div>
            <div class="aloneinfo"
            style="font-size:0.7rem;"
            >
                <div class="imgBox">
                    <img :src="floatData.data.alone || staticPeople" alt="">
                    <div class="txt">
                        <span>(涉毒人员)</span>
                        <span>
                            z4
                        </span>
                    </div>
                </div>
                <div class="imgBox">
                    <img src="../../../assets/images/people/people6.png" alt="">
                    <div class="txt">
                        <span>(涉毒人员)</span>
                        <span>
                            z3
                        </span>
                    </div>
                </div>
                <div class="imgBox">
                    <img src="../../../assets/images/people/people7.png" alt="">
                    <div class="txt">
                        <span>(未知人员)</span>
                    </div>
                </div>
                

            </div>
        </div>
        <!-- 按钮区域 -->
        <div class="btnBox">
            <div class="btn" @click="goClick(floatData)" v-if="floatData.type != '地勤民警'">出入记录</div>
            <div class="btn" @click="changemj" v-if="floatData.type != '地勤民警'">附近地勤</div>
            <div class="btn" v-if="floatData.type == '地勤民警'">拨打电话</div>
        </div>
    </div>
</template>
<script>
let staticpic = require('../../../assets/images/people/people1.png')
export default {
    data(){
        return{
            staPic: staticpic, // 默认头像
            staticPeople: require('../../../assets/images/people/people1.png')
        }
    },
    props:{
        floatData: Object
    },
    mounted(){
        console.log('pup',this.floatData)
    },
    methods:{
        goClick(item){
            this.$emit('openShow',item)
        },
        changemj(){
            this.$emit('changeMj')
        }
    }
}
</script>
<style lang="less" scoped>
.floatbox{
    width: 100%;
    box-sizing: border-box;
    padding: 5px 30px 20px 30px;
    color: #ffffff;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    background-image: url('../../../assets/images/backgroundKuang.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    .title{
        text-align: center;
        margin-bottom: 10px;
        font-size: 15px;
    }
    .info{
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        letter-spacing: 1px;
        border-bottom: 1px solid #04123A;
        box-sizing: border-box;
        padding-bottom: 10px;
    .textBox{
        .t-item{
            margin: 3px 0;
        }
    }
        .avatar{
            width: 45px;
            height: 60px;
            margin-right: 10px;
        }
    }
    .alone{
        padding-top: 5px;
        .titles{
            margin-bottom: 10px;
            font-size: 14px;
        }
        .aloneinfo{
            display: flex;
            .imgBox{
                width: 60px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 5px;
                .txt{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 12px;
                    
                }
                img{
                    width: 45px;
                    height: 60px;
                    margin-right: 10px;
                    margin-bottom: 2px;
                }
            }
            
        }
    }
    .btnBox{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
        .btn{
            width: 80px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background: #111940;
            box-shadow: 0px 0px 4px 1px #497DFF;
            border-radius: 5px;
            border: 1px solid;
            border-image: linear-gradient(128deg, rgba(97, 190, 255, 1), rgba(34, 101, 255, 1), rgba(77, 162, 255, 1)) 1 1;
            margin-right: 20px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #4599FF;
            letter-spacing: 1px;
            cursor: pointer;
            overflow: hidden;
        }
    }
}
</style>