<template>
<!-- 视频监控 -->
    <div class="monPage1">
        <!-- 第二层box -->
    <div class="contentBox">
      <div class="left">
        <div class="item"
        v-for="(item,index) in contentLeftData"
        :key="index"
        >
          <img :src="item.img" alt="">
          <!-- <img class="line" src="../../assets/images/line.png" alt=""> -->
          <div class="floatBox"
          v-if="item.showBox"
          >
            <img class="close" @click="item.showBox = false" src="../../assets/images/close.png" alt="">
            <div class="text">
              <div>{{item.name}}{{'('+ item.cnType + ')'}}</div>
              <div>
                <img style="display:inline-block;width:13px;height:13px;" v-for="el in item.start" :key="el" src="../../assets/twopage/waring2.png" alt="">
              </div>
            </div>
            <div class="btnBox" @click="goZhongdian(item)">
                处置
            </div>
          </div>
          <div class="kuang"
          @click="item.showBox = true"
          :style="{top: item.kuang.top,left: item.kuang.left}"
          ></div>
          <div class="bottomFloat">
            <div>地点：{{item.address}}</div>
            <div>时间：{{item.date}}</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="item">
          <img src="../../assets/images/tu3@2x.png" alt="">
          <img @click="goZhongdian()" class="baojing" src="../../assets/images/baojing@2x.png" alt="">
          <div class="conFloat" 
            :style="{top: '10%',left: '18%'}"
          v-if="conIndex1">
            <img class="avatar" src="../../assets/images/people/people3.png" alt="">
            <div class="info">
              <div>黄小琥（非法上访）</div>
              <div>
                <img style="display:inline-block;width:13px;height:13px;" v-for="el in 5" :key="el" src="../../assets/twopage/waring2.png" alt="">
              </div>
            </div>
            <div class="btn" @click="goZhongdian()">
              处置
            </div>
            <img @click="conIndex1 = false" class="close" src="../../assets/images/close2.png" alt="">
          </div>
          <div class="bottomFloat cont"
          style="justify-content: flex-start;"
          >
            <div style="margin: 0 50px 0 20px;">
              <span>涉恐人员黄小琥</span>
              <span><img style="display:inline-block;width:13px;height:13px;" v-for="el in 5" :key="el" src="../../assets/twopage/waring2.png" alt=""></span>
            </div>
            <div>
              <span>2020-10-10 12: 12: 00 进入达州市人民政府-东，等待处理</span>
            </div>
          </div>
          <div class="rightText">
             <div>地点：大邑县实验小学-东大门</div>
            <div>时间：2020-10-10 12:00:00</div>
          </div>
          <div class="kuang"
          @click="conIndex1 = true"
          :style="{top: '57%',left: '17%'}"
          ></div>
        </div>
      </div>
      <div class="right">
          <div class="item">
          <img src="../../assets/images/shipin/shipin9.png" alt="">
          <img @click="goZhongdian()" class="baojing" src="../../assets/images/baojing@2x.png" alt="">
          <div class="conFloat" 
          :style="{top: '5%',left: '40%'}"
          v-if="conIndex2">
            <img class="avatar" src="../../assets/images/people/people4.png" alt="">
            <div class="info">
              <div>张全明（涉毒人员）</div>
              <div><img style="display:inline-block;width:13px;height:13px;" v-for="el in 5" :key="el" src="../../assets/twopage/waring2.png" alt=""></div>
            </div>
            <div class="btn"  @click="goZhongdian()">
              处置
            </div>
            <img @click="conIndex2 = false" class="close" src="../../assets/images/close2.png" alt="">
          </div>
          <div class="bottomFloat cont"
          style="justify-content: flex-start;"
          >
            <div style="margin: 0 50px 0 20px;">
              <span>涉恐人员张全明</span>
              <span>
                <img style="display:inline-block;width:13px;height:13px;" v-for="el in 5" :key="el" src="../../assets/twopage/waring2.png" alt="">
              </span>
            </div>
            <div>
              <span>2020-10-10 12: 12: 00 进入达州市人民政府-东，等待处理</span>
            </div>
          </div>
          
          <div class="rightText">
             <div>地点：大邑县实验小学-东大门</div>
            <div>时间：2020-10-10 12:00:00</div>
          </div>
          <div class="kuang"
          @click="conIndex2 = true"
          :style="{top: '50%',left: '42%'}"
          ></div>
        </div>
      </div>
    </div>

    <!-- 第三层box -->
    <div class="bottomBox">
      <div class="left">

        <div class="item"
        v-for="(item,index) in bottomLeftData"
        :key="index"
        >
          <img :src="item.img" alt="">
          <div class="floatBox"
          v-if="item.showBox"
          >
            <img @click="item.showBox = false" class="close" src="../../assets/images/close.png" alt="">
            <div class="text">
              <div>{{item.name}}{{'('+ item.cnType + ')'}}</div>
              <div>
                <img style="display:inline-block;width:13px;height:13px;" v-for="el in item.start" :key="el" src="../../assets/twopage/waring2.png" alt="">
              </div>
            </div>
            <div class="btnBox" @click="goZhongdian(item)">
                处置
            </div>
          </div>
          <div class="kuang"
          @click="item.showBox = true"
          :style="{top: item.kuang.top,left: item.kuang.left}"
          ></div>
          <div class="bottomFloat">
            <div>地点：{{item.address}}</div>
            <div>时间：{{item.date}}</div>
          </div>
        </div>
        

      </div>
      <div class="right">
        <div class="item list">
          <div class="taItem"
            v-for="item in callPoliceData"
            :key="item.id"
            >
              <div class="info">{{item.text}}</div>
              <div class="btn" @click="goZhongdian(item)">处置</div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import bus from '../../assets/eventBus.js'
export default {
    data(){
        return {
          conIndex1: true,
          conIndex2: true,
          // 小框内弹出框显示，从上到下至右
          smart1Show:false,
          smart2Show:false,
            // 中间层左侧
          contentLeftData: [
            {
              name: '刘月明',
              cnType: '非法上访',
              start: 1,
              showBox: true,
              img: require('../../assets/images/shipin/shipin10.png'),
              kuang: {
                top: '38%',
                left: '23%'
              },
              address: '香槟国际-西大门',
              date: '2020-10-12 09:55:24'
            },
            {
              name: '张晓磊',
              cnType: '涉恐人员',
              start: 3,
              showBox: true,
              img: require('../../assets/images/shipin/shipin3.png'),
              kuang: {
                top: '1%',
                left: '17%'
              },
              address: '蓝润置地-东大门',
              date: '2020-10-15 15:30:59'
            }
          ],
          // 第三层左侧
          bottomLeftData: [
            {
              name: '黄小琥',
              cnType: '涉毒人员',
              img: require('../../assets/images/shipin/shipin4.png'),
              start: 3,
              showBox: true,
              kuang: {
                top: '8%',
                left: '5%'
              },
              address: '大邑县实验小学-东大门',
              date: '2020-10-10 13:00:01'
            },
            {
              name: '刘月明',
              cnType: '非法上访',
              img: require('../../assets/images/shipin/shipin8.png'),
              start: 1,
              showBox: true,
              kuang: {
                top: '46%',
                left: '22%'
              },
              address: '香槟国际-西大门',
              date: '2020-10-12 09:55:24'
            },
            {
              name: '张晓磊',
              cnType: '涉恐人员',
              img: require('../../assets/images/shipin/shipin9.png'),
              start: 3,
              showBox: true,
              kuang: {
                top: '46%',
                left: '41%'
              },
              address: '蓝润置地-东大门',
              date: '2020-10-15 15:30:59'
            }
          ],
          // 右下角列表数据
          callPoliceData: [
            {
          id:9,
          text: '张天全（非法上访人员）  于2020.10.20   22:40:25出国际香槟-东大门，已被设备捕捉，请及时处置！',
          name: '温泉',
          img: require('../../assets/images/people/people1.png'),
          cnType: '非法上访人员',
          date: '2020.10.10 12:00:00: 59'  
        },
        {
          id:10,
          text: '王龙详（非法上访人员）  于2020.10.16   23:25:59出国际香槟-东大门，已被设备捕捉，请及时处置！',
          name: '温泉',
          img: require('../../assets/images/people/people1.png'),
          cnType: '非法上访人员',
          date: '2020.10.10 12:00:00: 59'  
        },
        {
          id:11,
          text: '王龙详（非法上访人员）  于2020.10.16   23:25:59出国际香槟-东大门，已被设备捕捉，请及时处置！',
          name: '温泉',
          img: require('../../assets/images/people/people1.png'),
          cnType: '非法上访人员',
          date: '2020.10.10 12:00:00: 59'  
        },
        // {
        //   id:12,
        //   text: '张天全（非法上访人员）  于2020.10.20   22:40:25出国际香槟-东大门，已被设备捕捉，请及时处置！',
        //   name: '温泉',
        //   img: require('../../assets/images/people/people1.png'),
        //   cnType: '非法上访人员',
        //   date: '2020.10.10 12:00:00: 59'  
        // }
          ]
            }
    },
    methods:{
      goZhongdian(item){
        bus.$emit('changeHeaderIndex', 2)
        this.$router.push({name: 'allPage'})
      }
    }
}
</script>
<style lang="less" scoped>
.monPage1{
    width: 100%;
    height: 100%;
    // background-color: yellow;
    box-sizing: border-box;
    padding-bottom: 10px;
    .contentBox{
    width: 100%;
    height: 66%;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    display: flex;
    .left, .content, .right{
        height: 100%;
        box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
    }
    .left{
      width: 23%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item{
        height: 49%;
      }
    }
    .content{
      width: 46%;
      .item{
        height: 100%;
      }
    }
    .right{
      width: 31%;
      .item{
        height: 100%;
      }
    }
    .item{
      width: 100%;
      background-image: url('../../assets/images/jiao@2x.png');
      background-repeat:no-repeat;
      background-size:100% 100%;
      -moz-background-size:100% 100%;
      box-sizing: border-box;
      padding: 5px;
      position: relative;
      // .line{
      //   width: 200px;
      //   height: 200px;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      // }
      img{
        width: 100%;
        height: 100%;
      }
      .kuang{
          width: 40px;
          height: 40px;
          background: rgba(134, 185, 255, 0.44);
          border: 2px solid #4E86FF;
          position: absolute;
          cursor: pointer;
      }
      .baojing{
        width: 50px;
        height: 50px;
        position: absolute;
        top: 10px;
        left: 10px;
        cursor: pointer;
      }
      .baojing:hover{
        border-radius: 50%;
        box-shadow: 0 0 5px 2px#f40;
      }
      .conFloat{
        width: 162px;
        height: 220px;
        position: absolute;
        top: 10px;
        right: 10px;
        background-image: url('../../assets/images/backgroundKuang.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;        
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 23px;
        letter-spacing: 1px;
        z-index: 2;
        .close{
          width: 20px;
          height: 20px;
          position: absolute;
          left: calc(50% - 10px);
          bottom: -8%;
          cursor: pointer;
        }
        .info{
          margin: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .btn{
          width: 82px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #4599FF;
          letter-spacing: 1px;
          background-image: url('../../assets/images/anniubeijing@2x.png');
          background-repeat:no-repeat;
          background-size:100% 100%;
          -moz-background-size:100% 100%;
          cursor: pointer;
        }
        .avatar{
          width: 64px;
          height: 87px;
        }
      }
      .floatBox{
        // width: 270px;
        // height: 59px;
        background: rgba(17, 25, 64, 0.69);
        box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
        border-radius: 5px;
        border: 2px solid;
        border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
        position: absolute;
        top: 5%;
        right: 5%;
        box-sizing: border-box;
        padding: 5px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 23px;
        letter-spacing: 1px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        z-index: 2;
        .btnBox{
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          margin-right: 30px;
          background-image: url('../../assets/images/anniubeijing@2x.png');
          background-repeat:no-repeat;
          background-size:100% 100%;
          -moz-background-size:100% 100%;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #4599FF;
          letter-spacing: 1px;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }
        .close{
          width: 20px;
          height: 20px;
          position: absolute;
          right: 5px;
          top: 18px;
        }
      }
      .rightText{
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 17px;
        position: absolute;
        bottom: 60px;
        right: 10px;
      }
      .bottomFloat{
        width: 100%;
        height: 50px;
        background: rgba(3, 11, 34, 0.59);
        border-radius: 0px 0px 7px 7px;
        position: absolute;
        bottom: 0;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  .bottomBox{
    width: 100%;
    height: 34%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .left{
      width: 69%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px 0 20px;
      .item{
        width: 32%;
      }
    }
    .right{
      width: 30%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0 0 10px;
      .item{
        width: 100%;
      }
    }
    .item{
      height: 100%;
      background-image: url('../../assets/images/jiao@2x.png');
      background-repeat:no-repeat;
      background-size:100% 100%;
      -moz-background-size:100% 100%;
      box-sizing: border-box;
      padding: 5px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .kuang{
          width: 40px;
          height: 40px;
          background: rgba(134, 185, 255, 0.44);
          border: 2px solid #4E86FF;
          position: absolute;
          cursor: pointer;
      }
      .floatBox{
        // width: 270px;
        // height: 59px;
        background: rgba(17, 25, 64, 0.69);
        box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
        border-radius: 5px;
        border: 2px solid;
        border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
        position: absolute;
        top: 5%;
        right: 5%;
        box-sizing: border-box;
        padding: 5px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 23px;
        letter-spacing: 1px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btnBox{
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          margin-right: 30px;
          background-image: url('../../assets/images/anniubeijing@2x.png');
          background-repeat:no-repeat;
          background-size:100% 100%;
          -moz-background-size:100% 100%;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #4599FF;
          letter-spacing: 1px;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }
        .close{
          width: 20px;
          height: 20px;
          position: absolute;
          right: 5px;
          top: 18px;
        }
      }
      .bottomFloat{
        width: 100%;
        height: 50px;
        background: rgba(3, 11, 34, 0.59);
        border-radius: 0px 0px 7px 7px;
        position: absolute;
        bottom: 0;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
    .item.list{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      overflow: hidden;
      // 地勤民警
      .djItem{
        color: #ffffff;
        font-size: 0.7rem;
        font-weight: 100;
        display: flex;
        box-sizing: border-box;
        padding: 8px;
        margin-bottom: 10px;
        background-color: #0B1235;
        
        img{
          width: 50px;
          height: 100%;
          margin-right: 10px;
        }
      }
      // 报警信息
      .taItem{
        width: 100%;
        font-size: 0.7rem;
        font-weight: 100;
        color: #ffffff;
        box-sizing: border-box;
        height: 58px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        background-color: #0B1235;
        
        .info{
          width: 90%;
        }
        .btn{
          width: 60px;
          height: 25px;
          line-height: 25px;
          background: #FF3E4A;
          border-radius: 15px;
          text-align: center;
          margin-left: 5px;
          box-sizing: border-box;
          cursor: pointer;
        }
        .btn:hover{
          background-color: #cc1521;
        }
      }
    }
  }
}
</style>