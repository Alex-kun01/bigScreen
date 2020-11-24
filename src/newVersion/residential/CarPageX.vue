<template>
  <div>
    <div class="top_box">
      <div class="topItem" v-for="item in carTypes" :key="item.id" @click="car_type = item.id">
        <span v-text="item.name"></span>
        <span v-text="item.num"></span>
      </div>
    </div>
    <div class="left_float">
      <div class="box_back topbar">
          <div class="leftShow">
              <div class="showItem">
                  <span style="font-weight:bold;">本月陌生车辆</span>
                  <span>{{leftTong.month}}</span>
              </div>
              <div class="showItem">
                  <span style="font-weight:bold;">今日陌生车辆</span>
                  <span>{{leftTong.day}}</span>
              </div>
          </div>
      </div>
      <!-- 滚动-左 -->
      <div class="group_box">
          <vue-seamless-scroll
            class="seamless"
            :data="leftGroupList"
            :class-option="optionSetting"
            limitMoveNum="6"
          >
            <div class="box_back left_item"
              v-for="(item,index) in leftGroupList"
              :key="index"
              :style="item.color"
            >
              <img :src="item['照片']" alt="">
              <div class="textB">
                <div>
                  <span style="margin-right: 5px">{{item['车主']}}</span>
                  <span>{{item['车牌号']}}</span>  
                </div>
                <div class="textOverflow" :title="item['所属小区'] + item['门牌号']">{{item['所属小区']}}{{item['门牌号']}}</div>
                <div>{{item['登记时间']}}</div>
              </div>
          </div>
        </vue-seamless-scroll>
      </div>
      <!-- 图表-左 -->
      <div class="tubiao">
          <div class="echarts_box">
              <div class="new_title">车辆总数变化情况</div>
              <div class="echartsBox" id="carTotal"></div>
          </div>
          <div class="echarts_box">
              <div class="new_title">
                <span>出入记录情况</span>
                <span style="cursor: pointer" @click="carVisible = true">详情</span>
              </div>
              <div class="echartsBox" id="carInOut"></div>
          </div>
      </div>
    </div>
    <div class="right_float">
      <div class="box_back topbar">
          <div class="leftShow">
              <div class="showItem">
                  <span style="font-weight:bold;">未实车辆</span>
                  <span>{{uncheckNum}}</span>
              </div>             
          </div>
      </div>
      <!-- 滚动-左 -->
      <div class="group_box">
          <vue-seamless-scroll
            class="seamless"
            :data="rightGroupList"
            :class-option="optionSetting"
            limitMoveNum="6"
          >
            <div class="box_back left_item"
              v-for="(item,index) in rightGroupList"
              :key="index"
              :style="item.color"
            >
              <img :src="item['照片']" alt="">
              <div class="textB">
                <div>
                  <span style="margin-right: 5px">未知</span>
                  <span>{{item['车牌号']}}</span>  
                </div>
                <div>连续15天进出{{item['连续15天进出次数']}}次</div>
                <div>{{item['时间']}}</div>
              </div>
          </div>
        </vue-seamless-scroll>
      </div>
      <!-- 图表-左 -->
      <div class="tubiao">
          <div class="echarts_box">
              <div class="new_title">未核实车辆变化数</div>
              <div class="echartsBox" id="unCheck"></div>
          </div>
          <div class="echarts_box">
              <div class="new_title">
                <span>车辆异常进出情况</span>
                <span style="cursor: pointer" @click="usualVisible = true">详情</span>
              </div>
              <div class="echartsBox" id="unUsual"></div>
          </div>
      </div>     
    </div>
    <template v-if="car_type">
      <CarDetailList :community="plot_id" :carType="car_type - 1" @closew="car_type = false" @openViewDetail="openViewDetail"  />
    </template>
    <template v-if="carVisible || usualVisible">
      <CarPassRecordList :community="plot_id" :usualFlag="usualVisible" @closew='onClose' />
    </template>
    <template v-if="wSCarShow">
        <ViewDetails @closeDetail='closeDetails' :personnelId="personnelId" :flag="flag" :type="'car'" />
    </template>
  </div> 
</template>

<script>
  import echarts from 'echarts';
  import CarDetailList from '../components/CarDetailList';
  import CarPassRecordList from '../components/CarPassRecordList';
    // 一人一档
  import ViewDetails from '../components/ViewDetails'

  const colors = [
    {
      color: ['#F7C253'],
      trends: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(247, 194, 83, 1)' // 0% 处的颜色
        }, {
            offset: 1, color: 'rgba(247, 194, 83, 0)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    },
    {
      color: ['#53F6F2'],
      trends: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(83, 246, 242, 1)' // 0% 处的颜色
        }, {
            offset: 1, color: 'rgba(83, 246, 242, 0)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    },
    {
      color: ['#2D99FF'],
      trends: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(45, 153, 255, 1)' // 0% 处的颜色
        }, {
            offset: 1, color: 'rgba(45, 153, 255, 0)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    }
  ] 
  export default {
    components: {
      CarDetailList,
      CarPassRecordList,
      ViewDetails
    },
    props: ['community'],
    computed: {
        optionSetting () {
            return {
                step: 0.1, // 数值越大速度滚动越快
                seiumData: ''
            }
        }
    },
    data() {
      return {
        communityId: '', //小区id
        personnelId: 0, // 人员id
        flag: false,
        wSCarShow: false,
        page: 1,
        size: 10,
        plot_id: 0,
        // 左侧统计数据
        leftTong:{
            month: 157,
            day: 8
        },               
        // 左侧普通人员列表
        leftGroupList: [],
        // 右侧未实车辆列表
        rightGroupList: [],
        uncheckNum: 0,
        carVisible: false,
        usualVisible: false,
        car_type: false,
        carTypes: [
          { id: 1, num: 0, name: '车辆数' },
          { id: 2, num: 0, name: '实有车辆' },
          { id: 3, num: 0, name: '未实车辆' },
          { id: 4, num: 0, name: '疆藏车辆' },
        ],
        // echarts
        carTotal: null,
        carInOut: null,
        unCheck: null,
        unUsual: null,
      }
    },
    mounted() {
      this.communityId = localStorage.getItem('communityId')
      this.plot_id = this.community; // 获取小区id
      this.carTotal = this.$echarts.init(document.getElementById('carTotal'));
      this.carInOut = this.$echarts.init(document.getElementById('carInOut'));
      this.unCheck = this.$echarts.init(document.getElementById('unCheck'));
      this.unUsual = this.$echarts.init(document.getElementById('unUsual'));
      this.getCarTotal();
      this.getCarList();
      this.getLeftCarTrend();
      this.getLeftCarInOut();
      this.getUncheckList();
      this.getUncheckNum();
      this.getRightUnCheck();
      this.getRightUnUsual();   
      this.getCarNumData()  
    },
    methods: {
      // 车辆数
      getCarNumData(){
         this.$http.get(`${process.env.VUE_APP_1_URL}/home-car-top`,{params:{
           plot_id: this.plot_id, 
         }}).then(res =>{
           console.log('车辆横向', res)
           
           if(res.status == 200){
              let names = res.data[0]
              this.carTypes.forEach(item => {
                if(item.name == '车辆数') this.carTypes[0].num = names.车辆数 
                if(item.name == '实有车辆') this.carTypes[1].num = names.实有车辆 
                if(item.name == '未实车辆') this.carTypes[2].num = names.未实车辆 
              })
           }
         })
      },
      openViewDetail(target){
        console.log('target22',target)
        this.personnelId = target.personnel_id
        this.flag = target.flag
        if(!this.flag){
          // 
          this.wSCarShow = true
        }
        
      },
      closeDetails(){
        this.wSCarShow = false
      },
      getHttpRequest(url, datas, callback) {
        const _this = this;
        this.$http.get(`${process.env.VUE_APP_1_URL}${url}`, {
          params: datas
        }).then((res) => {
          callback(res.data)
        })
      },
      getCarTotal() {
        const that = this;
        const datas = {
          plot_id: that.plot_id, 
        };
        this.getHttpRequest('home-car-strange-total', datas, (res) => {
          this.leftTong = {
            month: res['本月'],
            day: res['今日']
          }
        });
      },
      // 车辆总数变化情况
      getLeftCarTrend(url) {
        const that = this;
        const datas = {
          plot_id: that.plot_id, 
        };
        this.getHttpRequest('/home-car-total-trend', datas, (res) => {
          const data = res.map(({ 月份, 数据 }) => ({ value: 数据, label: 月份 }))
          that.drawAreaLine(that.carTotal, data, colors[0])
        });
      },
      /** 车辆进出 */
      getLeftCarInOut() {
        const that = this;
        const datas = {
          plot_id: that.plot_id, 
        };
        this.getHttpRequest('/home-car-io-trend', datas, (res) => {
          const data = res.map(({ 月份, 数据 }) => ({ value: 数据, label: 月份 }))
          that.drawAreaLine(that.carInOut, data, colors[1])
        });
      },
      // 右侧未核实车辆变化数
      getRightUnCheck() {
        const that = this;
        const datas = {
          plot_id: that.plot_id, 
        };
        this.getHttpRequest('/home-car-uncheckd-trend', datas, (res) => {
          const data = res.map(({ 月份, 已核实, 未核实 }) => ({ check: 已核实, uncheck: 未核实, label: 月份 }));
          // const data = [
          //   { label: '2020-04', check: 1, uncheck: 21 },
          //   { label: '2020-05', check: 32, uncheck: 324 },
          //   { label: '2020-06', check: 46, uncheck: 232 },
          // ]
          that.drawAreaLines(that.unCheck, data)
        });
      }, 
      // 右侧车辆异常进出情况    
      getRightUnUsual() {
        const that = this;
        const datas = {
          plot_id: that.plot_id, 
        };
        this.getHttpRequest('/home-car-unusual-io', datas, (res) => {
          const data = res.map(({ 时间, 数据 }) => ({ value: 数据, label: 时间 }))
          that.drawAreaLine(that.unUsual, data, colors[2])
        });
      },      
      drawAreaLine(myChart, data, colors) {       
        if(!myChart) return;
        // 绘制图表
        let a = [], b = [];
        data.forEach(({ value, label }) => {
          a.push(label);
          b.push(value);
        });
        myChart.setOption({
          color: colors.color,
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: 20,
            left: 40,
            right: 40,
            bottom: 20
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: a,
            axisLine: {
              show: false,
            },
            axisTick: {
              lineStyle: {
                color: '#BDC8D3'
              }
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          },
          series: [{
              data: b,
              type: 'line',
              areaStyle: {
                color: colors.trends
              }
          }]
        });
      },
      drawAreaLines(myChart, data) {
        if(!myChart) return;
        // 绘制图表
        let a = [], b = [], c = [];
        data.forEach(({ check, uncheck, label }) => {
          a.push(label);
          b.push(check);
          c.push(uncheck);
        });
        myChart.setOption({
          color: [colors[1].color, colors[2].color],
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          grid: {
            top: 20,
            left: 40,
            right: 40,
            bottom: 20
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: a,
            axisLine: {
              show: false,
            },
            axisTick: {
              lineStyle: {
                color: '#BDC8D3'
              }
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          },
          series: [
            {
              data: b,
              type: 'line',
              areaStyle: {
                color: colors[1].trends
              }
            },
            {
              data: c,
              type: 'line',
              areaStyle: {
                color: colors[2].trends
              }
            }
          ]
        });
      },
      getCarList() {
        const that = this;
        const datas = {
          plot_id: that.plot_id,
          current: this.page,
          size: this.size,
          user_name: '',
          no: '',
          type: '',
        }
        that.getHttpRequest('/car-list', datas, (res) => {
          that.leftGroupList = res.records;
        })
      },
      getUncheckNum() {
        const that = this;
        const datas = {
          plot_id: that.plot_id, 
        };
        this.getHttpRequest('/home-car-uncheck-total', datas, (res) => {
          that.uncheckNum = res.数量;
        });       
      },
      // 获取未实车辆列表数据
      getUncheckList() {
          const _this = this
          let datas = {
              plot_id: _this.plot_id,               
              current: this.page,
              size: this.size,
              start_time: '',
              end_time: '',
          }
          this.getHttpRequest('/home-car-uncheck-list', datas, (res) => {
            _this.rightGroupList = res;
            // that.uncheckNum = res.数量;
          });            
      },
      onClose() {
        this.carVisible = false;
        this.usualVisible = false
      }
    }
  }
</script>

<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }
  // 左侧/右侧悬浮框
  .box_back {   
    height: 75px;
    background: rgba(3, 11, 34, 0.5);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    // backdrop-filter: blue(20px);
  }
  .top_box {
    position: absolute;
    top: 20px;
    margin: auto;
    left: 0;
    right: 0;
    width: 500px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
    .topItem{
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background-image: url('../../assets/newver/sixb.png');
      background-repeat:no-repeat;
      background-size:100% 100%;
      -moz-background-size:100% 100%;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #53F6F2;
      line-height: 19px;
      letter-spacing: 1px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .left_float,.right_float{
      height: 100%;
      position: absolute;
      top: 20px;     
      width: 20%;
      box-sizing: border-box;
      // padding: 5px;
      display: grid;
      grid-template-rows: 75px minmax(0, 1fr) 460px;
      overflow: hidden;
      row-gap: 10px;
      .seamless{
          height: 100%;
          overflow: hidden;
      }
      // 顶部看板
      .topbar{
          width: 100%;
          height: 100%;
      }
      // 中间滚动框
      .group_box{
          width: 100%;
          height: 100%;
      }
      // 底部图表
      .tubiao{
          width: 100%;
          height: 93%;
          // background-color: #111940;
          display: grid;
          row-gap: 10px;
          box-sizing: border-box;
          grid-template-rows: repeat(2, 1fr);
          .echarts_box{
              width: 100%;
              background: rgba(3, 11, 34, 0.5);
              border-radius: 10px;
              padding: 10px 20px;
              .new_title{
                  color: #ffffff;
                  width: 100%;
                  height: 25px;
                  line-height: 25px;
                  font-size: 14px;
                  background: url('../../assets/newver/icon.png') left center no-repeat;
                  background-size: 11px 11px;
                  padding-left: 26px;
                  color: #38A2F7;
                  display: flex;
                  justify-content: space-between;
              }
              .echartsBox{
                  width: 100%;
                  height: calc(100% - 25px);
                  // background-color: pink;
              }
          }
      }
  }
  .left_float {
    left: 20px;
  }
  // new 左侧悬浮  
  .leftShow{
      width: 100%;
      height: 100%;
      // background: rgba(17, 25, 64, 0.69);
      border-radius: 5px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .showItem{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #ffffff;
          line-height: 19px;
      }
  }
  .left_item{
      width: 100%;
      height: 75px;
      // background: rgba(17, 25, 64, 0.69);
      border-radius: 5px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #ffffff;
      line-height: 16px;
      img{
          width: 42px;
          height: 56px;
          margin-right: 10px;
      }
      .textOverflow {
        max-width: 300px;
        // width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
  }  
  .right_float {
    right: 20px;
    
  }
</style>