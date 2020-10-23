<template>
<!-- 疑似流动人口管理-内容区域 -->
  <div class="allpage">
    <!-- 左侧图表区域 -->
       <div class="left-box">
         <!-- 图表一 -->
          <div class="item-box">
            <div class="title">
              <img src="../../assets/images/icon@2x.png" alt="">
              <span>疑似流动与陌生人统计图</span>
            </div>
              <div id="echart1" style="width:100%;height:95%;"></div>
               <div class="changeBox">
                  <div 
                  v-for="(item,index) in dataDay"
                  :key="index"
                  :class="{item: 1, active: chartIndex1 == index}"
                  @click="changeChartIndex('图表一',index)"
                  >{{item}}</div>
              </div>
          </div>
          <!-- 图表二 -->
          <div class="item-box">
              <div class="title">
                <img src="../../assets/images/icon@2x.png" alt="">
                <span>疑似流动小区分布统计图</span>
              </div>
              <div id="echart2" style="width:100%;height:95%;"></div>
              <div id="echart22" style="width:100%;height:95%;"></div>
              <div class="changeBox">
                <div 
                v-for="(item,index) in dataDay"
                :key="index"
                :class="{item: 1, active: chartIndex2 == index}"
                @click="changeChartIndex('图表二',index)"
                >{{item}}</div>
              </div>
          </div>
        </div>
        <!-- 中心图片区 -->
        <div class="con-box">
          <img :src="img" alt="">
          <div class="l-item"
            v-for="item in contentBj"
            :key="item.id"
            :style="{top: item.top, left: item.left}"
          >
            <img @click="openFhClilck(item)" src="../../assets/images/address.png" alt="">
            <div class="textContent">
              <div class="title">{{item.communty}}</div>
              <div>疑似流动人口：{{item.fPop}}</div>
              <div>陌生人：{{item.stranger}}</div>
            </div>
          </div>
        </div>
        <!-- 右侧图表区域 -->
        <div class="right-box">
          <!-- 图表三 -->
          <div class="item-box">
              <div class="title">
                <img src="../../assets/images/icon@2x.png" alt="">
                <span>网格员审核疑似流动平均时间统计图</span>
              </div>
            <div id="echart3" style="width:100%;height:100%;"></div>
          </div>
          <!-- 图表四 -->
          <div class="item-box">
            <div class="title2">
              <div>
                <img src="../../assets/images/icon@2x.png" alt="">
                <span>疑似流动审核通过率</span>
              </div>
              <div>
                <img src="../../assets/images/icon@2x.png" alt="">
                <span>疑似流动审核人数记录</span>
              </div>
            </div>
            <div class="chart-box">
              <div class="chart-box-item"><div id="echart41" style="width:100%;height:100%;"></div></div>
              <div class="chart-box-item"><div id="echart42" style="width:100%;height:100%;"></div></div>
            </div>
          </div>
        </div>
      <!-- 彈框 -->
      <div class="floatListBox"
      v-show="listFloatShow"
      >
      <!-- 關閉按鈕 -->
        <img @click="listFloatShow = false" src="../../assets/images/close.png" alt="" class="close">
        <div class="header">
          <div class="title">{{communtyName}}</div>
          <div class="btn"
          v-for="item in floatHeaderBtnList"
          :key="item.id"
          :class="{btn:1,active: fhIndex == item.id}"
          @click="changefhIndex(item.id)"
          >{{item.name}}</div>
        </div>
        <!--列表 -->
        <div class="litBox">
          <table class="mtable">
              <thead>
                <tr>
                  <th>抓取图</th>
                  <th>初次发现</th>
                  <th>近日发现</th>
                  <th>30日累计发现次数</th>
                  <th>类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                v-for="(item,index) in showTableData"
                :key="index"
                >
                  <td>
                    <img style="width:35px;height:50px" :src="item.img" alt="">
                  </td>
                  <td>{{item.fDate}}</td>
                  <td>{{item.jinDate}}</td>
                  <td>
                    {{item.frequency}}
                  </td>
                  <td>{{item.cnType}}</td>
                  <td style="color:#38A2F7;cursor:pointer;">出入记录</td>
                </tr>
              </tbody>  
            </table>                                  
        </div>
        <!-- 切换按钮 -->
        <div class="changeBtn">
          <div :class="{item:1,active: fhYuanIndex == item}" v-for="item in 3" :key="item" @click="changeFhYuanIndex(item)" ></div>
        </div>

      </div>
  </div>
</template>
<script>
let conimg = require('../../assets/images/conimg.png')
import '../../assets/echartsData/westeros.js' 
import '../../assets/echartszt/customed.js'
import '../../assets/echartszt/custo.js'
import '../../assets/echartszt/linechart2.js'
import tableData from '../conpage/staticDatas/fhTable.js'
import getPageData from '../../publicFun/moniPagination.js' // 模拟分页
import chart1 from './echartsDatas/chart1.js'
import chart2 from './echartsDatas/chart2.js'
import chart3 from './echartsDatas/chart3.js'
import chart41 from './echartsDatas/chart41.js'
import chart42 from './echartsDatas/chart42.js' 

export default {
  data(){
    return{
      // 头部小区名称
      communtyName: '',
      listFloatShow: false, // 彈框顯示
      // 弹框头部按钮
      fhIndex: 0,
      // 弹框小圆点索引
      fhYuanIndex: 1,
      // 表格全部数据
      allTableData: tableData,
      // 表格显示数据
      showTableData: [],
      floatHeaderBtnList: [
        {
          id: 0,
          name: '疑似流动人员'
        },{
          id: 1,
          name: '陌生人'
        }
      ],
      img: conimg,
      // 图标索引
      chartIndex1: 0,
      chartIndex2: 0,
      chartIndex3: 0,
      chartIndex4: 0,
      dataDay: ['30日','15日'],
      chart1Obj: chart1, //图表一数据对象 one two
      chart1Show: {}, //图表一渲染目标对象
      chart2Obj: chart2, // 图表二数据对象 one two
      chart2Show: {}, // 图表二渲染目标对象
      // 中间地图标记列表
      contentBj: [
        {
          id: 0,
          top: '50%',
          left: '50%',
          communty: '爱情公寓',
          fPop: '24人',
          stranger: '235人'
        },
        {
          id: 1,
          top: '70%',
          left: '15%',
          communty: '香槟国际',
          fPop: '18人',
          stranger: '232人'
        },
        {
          id: 2,
          top: '20%',
          left: '70%',
          communty: '蓝润华景',
          fPop: '55人',
          stranger: '421人'
        }
      ]
    }
  },
  mounted(){
    this.drChart()
    this.changeFhYuanIndex(1)
  },
  methods:{
    // 
    openFhClilck(item){
      this.communtyName = item.communty
      this.listFloatShow = true
    },
    // 切换弹框头部按钮
    changefhIndex(index){
      this.fhIndex = index
    },
    // 切换弹框小圆点
    changeFhYuanIndex(index){
      console.log(index)
      this.fhYuanIndex = index
      this.showTableData = getPageData(this.allTableData,index, 10)
    },  
    // 创建echarts图表
    drChart(){
      if(this.chartIndex1 == 0) this.chart1Show = this.chart1Obj.one
      if(this.chartIndex1 == 1) this.chart1Show = this.chart1Obj.two
      if(this.chartIndex2 == 0) this.chart2Show = this.chart2Obj.one
      if(this.chartIndex2 == 1) this.chart2Show = this.chart2Obj.two
      this.$nextTick(()=>{
        let echart1 = this.$echarts.init(document.getElementById('echart1'), 'roma')
        let echart2 = this.$echarts.init(document.getElementById('echart2'), 'roma')
        let echart3 = this.$echarts.init(document.getElementById('echart3'), 'linechart2')
        let echart41 = this.$echarts.init(document.getElementById('echart41'), 'customed')
        let echart42 = this.$echarts.init(document.getElementById('echart42'), 'custo')
        // 图表一
        echart1.setOption(this.chart1Show,'roma')
        // 图表二
        echart2.setOption(this.chart2Show,'roma')
        // 图表三
        echart3.setOption(chart3,'linechart2')
        // 图表四-1
        echart41.setOption(chart41,'customed')
        // 图表四-2
        echart42.setOption(chart42,'custo')
      })
    },
    // 切换图表
    changeChartIndex(type,index){
      switch(type){
        case '图表一': 
        this.chartIndex1 = index
        break;
        case '图表二': 
        this.chartIndex2 = index
        break;
        case '图表三': 
        this.chartIndex3 = index
        break;
        case '图表四': 
        this.chartIndex4 = index
        break;
      }
      this.drChart()
    }
  }
}
</script>
<style lang="less" scoped>
.allpage{
  width: 100%;
    height: 99%;
    position: relative;
    // 彈框
    .floatListBox{
      width: 1148px;
      height: 805px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: #111940;
      box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
      border-radius: 5px;
      border: 2px solid;
      border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
      box-sizing: border-box;
      padding: 10px;
      .header{
        width: 100%;
        height: 40px;
        // background-color: pink;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #4599FF;
        line-height: 21px;
        letter-spacing: 1px;
        .title{
          margin-right: 20px; 
        }
        .btn{
          width: 125px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background: #1B275E;
          border-radius: 28px;
          margin-right: 20px;
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #4599FF;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .btn.active{
          background-image: url('../../assets/images/xuanzhonganniu@2x.png');
          background-repeat:no-repeat;
          background-size:100% 100%;
          -moz-background-size:100% 100%;
        }
      }
      .litBox{
        width: 100%;
        height: calc(100% - 110px);
        // background-color: pink;
        .mtable{
        width: 100%;
        color: #ffffff;
        font-size: 0.6rem;
        border: 1px #111940 solid;
        border-spacing: 0px;//单元格间距为0px
        border-collapse: collapse;//=改为合并
        th{
          font-weight: 100;
          height: 40px;
          margin: 0;
          background-color: #0B1235;
          border: 1px #0B1235 solid;
          min-width: 20%;
          margin: 5px 0;
        }
        td{
          font-weight: 100;
          height: 40px;
          border: 1px #0B1235 solid;
          min-width: 20%;
          text-align: center;
        }
      }
      }
      .changeBtn{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: aquamarine;
        .item{
          width: 10px;
          height: 10px;
          margin-right: 5px;
          border-radius: 50%;
          background-color: #2E365B;
          cursor: pointer;
        }
        .item.active{
          background-color: #38A2F7;
        }
      }
      .close{
        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
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
      img{
        width: 100%;
        height: 100%;
      }
      .l-item{
            background: rgba(17, 25, 64, 0.69);
            box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
            border-radius: 5px;
            border: 2px solid;
            border-image: linear-gradient(138deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
            cursor: pointer;
            position: absolute;
            // top: 20%;
            // left: 70%;
            box-sizing: border-box;
            padding: 10px;
            .textContent{
              color: #FFFFFF;
              font-size: 14px;
              font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
              font-weight: bold;
              line-height: 19px;
              letter-spacing: 1px;
              .title{
                color: #38A2F7;
              }
            }
          img{
            width: 20px;
            height: 20px;
            position: absolute;
            bottom: -27px;
            left: 50%;

          }
      }
      .floatB{
        width: 181px;
        height: 97px;
        position: absolute;
        top: 50%;
        left: 50%;
        background: rgba(17, 25, 64, 0.69);
        box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
        border-radius: 5px;
        border: 2px solid;
        border-image: linear-gradient(138deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
      }
    }
  }
  // 两边的图表框
  .item-box{
    width: 96%;
    height: 49%;
    // border: 2px solid #23307c;
    background-image: url('../../assets/images/jiao@2x.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    font-size: 0.8rem;
    overflow: hidden;
    .title,.title2{
      // height: 25px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #38A2F7;
      line-height: 21px;
      letter-spacing: 1px;
      img{
        width: 12px;
        height: 12px;
        margin-right: 10px;
      }
    }
    .title2{
      justify-content: space-around;
    }
    .chart-box{
      width: 100%;
      height: 100%;
      display: flex;
      .chart-box-item{
        width: 50%;
        height: 100%;
      }
    }
    .changeBox{
      // width: 90px;
      height: 20px;
      display: flex;
      justify-content: center;
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #FFFFFF;
      line-height: 16px;
      letter-spacing: 1px;
      .item{
        width: 45px;
        height: 20px;
        border:1px solid #0050FF;
        cursor: pointer;
        text-align: center;
        line-height: 20px;
        // padding: 0 2px;
      }
      .item:nth-of-type(1){
        border-radius: 13px 0px 0px 13px;
      }
      .item:nth-of-type(2){
        border-radius:  0px 13px 13px 0px;
      }
      .item.active{
        background-color: #0050FF;
      }
    }
   
  }
</style>