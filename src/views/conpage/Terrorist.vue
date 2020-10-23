<template>
<!-- 主题内容区域-涉恐人员 -->
  <div class="allpage">
    <!-- 图表左侧区 -->
       <div class="left-box">
          <div class="item-box">
              <div class="title">
                <img src="../../assets/images/icon@2x.png" alt="">
                涉恐人员
              </div>
              <!-- 表格一区域 -->
              <div class="tableBox">
                  <table class="mtable">
                    <thead>
                      <tr>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>地址</th>
                        <th>重点等级</th>
                        <th>监管期</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                      v-for="(item,index) in showTableData"
                      :key="index"
                      >
                        <td>{{item.name}}</td>
                        <td>{{item.sex}}</td>
                        <td>{{item.address}}</td>
                        <td>
                          <img style="display:inline-block;width:13px;height:13px;" v-for="el in item.leave" :key="el" src="../../assets/twopage/waring2.png" alt="">
                        </td>
                        <td>{{item.date}}</td>
                        <td style="color:#38A2F7;cursor:pointer;">出入记录</td>
                      </tr>
                    </tbody>  
                  </table>
              </div>
              <!-- 小圆点排列 -->
              <div class="yuanBox">
                <div
                v-for="yuan in 4"
                :key="yuan"
                :class="{itemY: 1, active: yuanIndex == yuan}"
                @click="changeYuan(yuan)"
                ></div>
              </div>
          </div>
          <div class="item-box">
            <div class="title">
                <img src="../../assets/images/icon@2x.png" alt="">
                重点人群小区分布图
              </div>
              <div id="echartshis" style="width:100%;height:95%;"></div>
          </div>
        </div>
        <!-- 中心图片区 -->
        <div class="con-box">
          <img :src="img" alt="">
          <div class="leftFloatBox">
            <div class="l-item top">香槟国际-2单元</div>
            <div class="l-item"><img src="../../assets/images/alarm2.png" alt=""><span>出入警报</span></div>
            <div class="l-item"><img src="../../assets/images/police.png" alt=""><span>地勤民警</span></div>
            <div class="l-item"><img src="../../assets/images/camera.png" alt=""><span>监控探头</span></div>
          </div>
          <!-- 标记列表框 -->
          <div class="item-icon"
          v-for="item in markList"
          :style="{left: item.left, top: item.top}"
          :key="item.id"
          @click="showFloat(item)"
          ><img :src="item.img" alt=""></div>
         
          <!-- 地图小弹窗-非法人员 -->
          <div class="floatContentBox"
          v-if="contentMapShow"
          >
            <img class="close" @click="contentMapShow = false" src="../../assets/images/close.png" alt="">
            <FloatBox @openShow="openShow" @changeMj='changeMj' :floatData="contentMapData" />
          </div>

          <!-- 地图小弹窗-地勤民警 -->
          <div class="floatContentBoxPolice"
          v-if="contentMapShowPolice"
          >
            <img class="close" @click="contentMapShowPolice = false" src="../../assets/images/close.png" alt="">
            <FloatBox :floatData="contentMapDataPolice" />
          </div>

        </div>
        <!-- 图表右侧区 -->
        <div class="right-box">
          <div class="item-box">
           <div class="title">
                <img src="../../assets/images/icon@2x.png" alt="">
                报警信息
              </div>
            <div class="tableBox">
              <div class="taItem"
              v-for="item in callPoliceData"
              :key="item.id"
              >
                <div class="info">
                  {{item.name+'【'}}
                  <img style="display:inline-block;width:13px;height:13px;" v-for="el in item.start" :key="el" src="../../assets/twopage/waring2.png" alt="">
                  {{'】'+item.text}}
                </div>
                <div @click="gotoTarget(item)" class="btn">处置</div>
              </div>
            </div>
            <!-- 小圆点排列 -->
              <div class="yuanBox">
                <div
                v-for="yuan in 4"
                :key="yuan"
                :class="{itemY: 1, active: yuanIndexJ == yuan}"
                @click="changeYuanJ(yuan)"
                ></div>
              </div>

          </div>
          <div class="item-box">
            <div class="title">
                <img src="../../assets/images/icon@2x.png" alt="">
                地勤民警
              </div>
            <div class="tableBox">
              <div class="djItem"
              v-for="item in djPoliceData"
              :key="item.number"
              >
                <img :src="item.img" alt="">
                <div class="djInfo">
                  <div class="djText">姓名：{{item.name}}</div>
                  <div class="djText">警号：{{item.number}}</div>
                  <div class="djText">电话：{{item.phone}}</div>
                  <div class="djText">机构：{{item.mechanism}}</div>
                  <div class="djText">现处位置：{{item.address}}</div>
                </div>
                <div class="call">拨打电话</div>
              </div>
            </div>
            <!-- 小圆点排列 -->
              <div class="yuanBox">
                <div
                v-for="yuan in 4"
                :key="yuan"
                :class="{itemY: 1, active: yuanIndexD == yuan}"
                @click="changeYuanD(yuan)"
                ></div>
              </div>

          </div>
        </div>
        <!-- 弹出层 -->
        <div class="popUpBox"
        v-show="popUp"
        @click="popUp = !popUp"
        >
          <PopBox :popData='popData' />
        </div>
  </div>
</template>
<script>
let conimg = require('../../assets/images/conimg.png')
import '../../assets/echartsData/westeros.js'
import histogamData from '../../assets/echartsData/histogramData4.js'
import getPageData from '../../publicFun/moniPagination.js'
import tableDatas from './staticDatas/tableDatas.js'
import callPoliceDatas from './staticDatas/callPoliceDatas.js' // 报警信息数据
import groundPoliceDatas from './staticDatas/GroundPoliceDatas.js' // 地勤民警数据
import PopBox from '../popUpBox/PopBox.vue'
let alarm = require('../../assets/images/alarm.png')
let camera = require('../../assets/images/camera.png')
let police = require('../../assets/images/police.png')
let popel3 = require('../../assets/images/people/people3.png')
import FloatBox from './floatBox/FloatBox.vue' // 中间地图小弹框组件
import maklist from './staticDatas/markList.js' // 地图标记列表
export default {
  data(){
    return{
      img: conimg,
      activeIndex: 0,// 标题选中索引
      yuanIndex: 1,// 小圆点索引表格
      yuanIndexJ: 1,// 小圆点索引报警信息
      yuanIndexD: 1,// 小圆点索引地勤民警
      // 表格一展示数据
      allTableData: tableDatas.terr,
      showTableData: [],
      echartsData: histogamData,
      // 报警信息列表
      allCallPoliceData: callPoliceDatas.terr,
      callPoliceData: [],
      // 地勤民警信息列表
      allDjPoliceData: groundPoliceDatas.terr,
      djPoliceData: [],
      // 控制弹出层
      popUp: false,
      popData: {
        name: '蒋治坤'
      },
      // 中间地图小弹窗是否展示
      contentMapShow: false,
      contentMapShowPolice: true,
      // 中间地图小弹窗信息
      contentMapData: {
        type: '出入报警',
        show: false,
        data: {

        }
      },
      // 地图小弹窗-地勤民警
      contentMapDataPolice:{
        type: '地勤民警',
        show: false,
        data: {

        }
      },
      // 地图标记列表
      markList: maklist.terr
    }
  },
  mounted(){
    this.drEchartsHis()
    this.changeYuan(1)
    this.changeYuanJ(1)
    this.changeYuanD(1)
    this.initFloatBox()
    this.changeMj()
  },
  components:{
    PopBox,
    FloatBox
  },
  methods:{
    // 初始化弹出框
    initFloatBox(){
      let obj = {
          url: require('../../assets/images/people/people2.png'),
          dxx: 2,
          type: '出入报警',
          show: false,
          data: {
            info: ['姓名：张三多','重点类型：涉恐人员','出香槟国际-东门','2020.10.10 13:00:01'],
            alone: ''
          }
      }
      this.contentMapData = obj
      this.contentMapShow = true
    },
    // 处置按钮
    gotoTarget(item){
      console.log('处置',item)
      let obj = {
        url: item.img,
        dxx: 2,
        type: '出入报警',
        data: {
          info: [],
          alone: ''
        }
      }
      obj.data.info.push('姓名：' + item.name)
      obj.data.info.push('重点类型：' + item.cnType)
      obj.data.info.push('出香槟国际-西门')
      obj.data.info.push(item.date)
      onj.show = false
      console.log(obj)
      
      this.contentMapData = obj
      this.contentMapShow = true

    }, 
    // 中间地图图标显示
    showFloat(item){
      if(item.type == '监控探头'){
        return
      }else if(item.type == '地勤民警'){
          this.contentMapShowPolice = true
          this.contentMapDataPolice.dxx = item.alone
          this.contentMapDataPolice.type = item.type
          this.contentMapDataPolice.url = item.url
          this.contentMapDataPolice.data = item.infoData  
      }else{
          this.contentMapShow = true
          this.contentMapData.dxx = item.alone
          this.contentMapData.type = item.type
          this.contentMapData.url = item.url
          this.contentMapData.data = item.infoData
      }
    },
    // 打开出入记录弹出框
    openShow(item){
      console.log('openShow')
      this.popData.name = item.data.info[0]
      this.popData.url = item.url
      this.popUp = true
    },
    // 切换民警弹框
    changeMj(){
      this.contentMapDataPolice = {
        type: '地勤民警',
        dxx: 2,
        url: require('../../assets/images/police/police5.png'),
        data: {
            info: ['姓名：刘文媛','警号：1564787','电话：1817987985','机构：锦江区公安局','距离事发地：2.5km'],
            alone: popel3
          }
      }
      this.contentMapShowPolice = true
    },
    // 创建echarts图表
    drEchartsHis(){
      this.$nextTick(()=>{
        let echartshis = this.$echarts.init(document.getElementById('echartshis'), 'roma')
        echartshis.setOption(this.echartsData,'roma')
      })
    },
    // 标题切换
    changeActiveIndex(item){
      this.activeIndex = item.id
    },
    // 小圆点切换-列表
    changeYuan(index){
      this.yuanIndex = index
      this.showTableData = getPageData(this.allTableData,index, 6)
    },
    // 小圆点切换-报警信息
    changeYuanJ(index){
      this.yuanIndexJ = index
      this.callPoliceData = getPageData(this.allCallPoliceData,index, 4)
    },
    // 小圆点切换-地勤民警
    changeYuanD(index){
      this.yuanIndexD = index
      this.djPoliceData = getPageData(this.allDjPoliceData,index, 2)
    }
  }
}
</script>
<style lang="less" scoped>
.allpage{
  width: 100%;
    height: 99%;
    position: relative;
    // 左右侧图表样式
    .left-box,.right-box{
      width: 30%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }
    .left-box{
      left: 0;
    }
    .right-box{
      right: 0;
    }
    // 中心图片区样式
    .con-box{
      width: 40%;
      height: 100%;
      position: absolute;
      left: 30%;
      box-sizing: border-box;
      .item-icon{
        width: 20px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 45%;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .floatContentBox, .floatContentBoxPolice{
        width: 40%;
        position: absolute;
        z-index: 2;
        right: 5%;
        .close{
          width: 20px;
          height: 20px;
          position: absolute;
          right: 8%;
          top: 8%;
        }
      }
      .floatContentBox{
        top: 5%;
      }
      .floatContentBoxPolice{
        bottom: 10%;
      }
      .leftFloatBox{
        // width: 120px;
        position: absolute;
        top: 25px;
        left: 25px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #333333;
        line-height: 19px;
        letter-spacing: 1px;
        display: fex;
        flex-direction: column;
        align-items: center;
        .l-item{
          width: 100%;
          height: 30px;
          box-sizing: border-box;
          padding: 0 5px;
          background: rgba(255, 255, 255, 0.78);
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 18px;
            height: 18px;
            margin-right: 10px;
          }
        }
        .l-item.top{
          margin-bottom: 10px;
          border-radius: 2px;
        }
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  // 两边的图表框
  .item-box{
    width: 96%;
    height: 49%;
    background-image: url('../../assets/images/jiao@2x.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    font-size: 0.8rem;
    overflow: hidden;
    
    .yuanBox{
        width: 100px;
        height: 30px;
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .itemY{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
          margin-right: 2px;
          cursor: pointer;
        }
        .itemY.active{
          background-color: rgb(12, 83, 189);
        }
      }
    .tableBox{
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      min-height: 70%;
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
        border: 1px solid #23307c;
        display: flex;
        align-items: center;
        position: relative;
        img{
          width: 50px;
          height: 100%;
          margin-right: 10px;
        }
        .call{
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: rgba(17, 25, 64, 0.88);
          box-shadow: 0px 0px 4px 1px #03A3FF;
          border-radius: 1px;
          position: absolute;
          top: calc(50% - 15px);
          right: 10px;
        }
      }
      // 报警信息
      .taItem{
        width: 100%;
        font-size: 0.7rem;
        font-weight: 100;
        color: #ffffff;
        border: 1px solid #23307c;
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
      }
    }
    .title{
      color: #ffffff;
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      img{
        width: 11px;
        height: 11px;
        margin-right: 13px;
      }
      .text{
        margin: 0 15px;
        cursor: pointer;
      }
      .text.active{
        font-weight: bold;
        color: #38A2F7;
        position: relative;
      }
      .text.active::after{
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        background-color: #38A2F7;
        position: absolute;
        bottom: 0;
      }
    }
    .tit{
      color: #38A2F7!important;
    }
  }
  .mtable{
    width: 100%;
    color: #ffffff;
    font-size: 0.6rem;
    border: 1px #111940 solid;
    border-spacing: 0px;//单元格间距为0px
    border-collapse: collapse;//=改为合并
    th{
      font-weight: 100;
      height: 33px;
      margin: 0;
      background-color: #0B1235;
      border: 1px #111940 solid;
      min-width: 20%;
    }
    td{
      font-weight: 100;
      height: 33px;
      border: 1px #111940 solid;
      min-width: 20%;
      text-align: center;
    }
  }
  // 弹出层
  .popUpBox{
    width: 70%;
    min-width: 1000px;
    position: fixed;
    z-index: 999;
    top: 5%;
    left: 15%;
    box-sizing: border-box;
    padding: 20px;
    color: #ffffff;
    background-color: #111940;
    background: #111940;
    box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
    border-radius: 5px;
    border: 2px solid;
    border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
    
  }
</style>