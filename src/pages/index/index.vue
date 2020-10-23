<template>
    <div class="twoIndex">
        <div class="title">守望社区</div>
        <div class="searchBox">
            <input type="text" placeholder="请输入内容">
            <div class="btn">搜索</div>
        </div>
        <div class="conBox">
            <div class="item">
                <div class="img">34453</div>
                <div class="text">人口总数</div>
            </div>
            <div class="item">
                <div class="img">34453</div>
                <div class="text">房屋总数</div>
            </div>
            <div class="item">
                <div class="img">34453</div>
                <div class="text">车辆总数</div>
            </div>
        </div>
        <div class="bomBox">
            <div class="item" v-for="item in bomList" :key="item.id">
                <div class="box">{{item.number}}</div>
                <div class="text">{{item.name}}</div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            bomList: [
                {
                    id: 0,
                    name: '小区',
                    number: '45678'
                },
                {
                    id: 1,
                    name: '党组织',
                    number: '45678'
                },
                {
                    id: 2,
                    name: '党员',
                    number: '45678'
                },
                {
                    id: 3,
                    name: '重点人员',
                    number: '45678'
                },
                {
                    id: 4,
                    name: '关怀人员',
                    number: '45678'
                },
                {
                    id: 5,
                    name: '网格员',
                    number: '45678'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.twoIndex{
    width: 100%;
    height: 100%;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    align-items: center;
    padding: 5%;
    .title{
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 50px;
        line-height: 50px;
        // background-color: pink;
        font-family: PangMenZhengDao;
        color: #53F0F0;
        line-height: 57px;
        letter-spacing: 4px;
    }
    // 搜索框
    .searchBox{
        width: 1077px;
        height: 5   0px;
        background: #111940;
        border-radius: 10px;
        border: 2px solid #4396FB;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        overflow: hidden;
        input{
            width: 938px;
            height: calc(100% - 4px);
            background-color: #111940;
            border-radius: 10px 0 0 10px;
            outline-style: none;
            border: 0px;
            font-size: 20px;
            color: #FFFFFF;
            text-indent: 10px;
        }
        ::-webkit-input-placeholder {
            color: #FFFFFF;
        }
        input:focus{
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
        }
        .btn{
            width: 138px;
            height: 100%;
            background: #4396FB;
            // border-radius: 0px 9px 9px 0px;
            // border: 2px solid #4396FB;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 46px;
            text-align: center;
            letter-spacing: 1px;
            cursor: pointer;
        }
    }
    .conBox{
        width: 50%;
        height: 166px;
        // background-color: pink;
        display: flex;
        justify-content: space-around;
        // 
        .item{
            width: 165px;
            height: 100%;
            // border: 1px solid #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            .img{
                width: 140px;
                height: 146px;
                background-image: url('../../assets/twopage/sixpic.png');
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
                font-size: 20px;
                font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                font-weight: bold;
                color: #53F6F2;
                line-height: 146px;
                letter-spacing: 1px;
                text-align: center;
            }
            
            .text{
                text-align: center;
                color: #ffffff;
            }
        }
    }
    .bomBox{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-around;
        .item{
            width: 180px;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .box{
                width: 179px;
                height: 50px;
                background: rgba(17, 25, 64, 0.38);
                border-radius: 5px;
                text-align: center;
                font-size: 20px;
                font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                font-weight: bold;
                color: #53F6F2;
                line-height: 50px;
                letter-spacing: 1px;
                margin-bottom: 15px;
            }
            .box:hover{
                box-shadow: 0 0 5px 2px #4396FB;
            }
            .text{
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 21px;
                letter-spacing: 1px;
            }
        }
    }
}
</style>