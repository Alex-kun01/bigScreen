<template>
<!-- 消防页面 -->
  <div>
    <div class="top_box">
      <div class="topItem" v-for="item in houseType" :key="item.id" @click="houseVisible = item.id">
        <span v-text="item.name"></span>
        <span v-text="item.num"></span>
      </div>
    </div>
    <div class="left_box">
      <div class="box_back echarts_box">       
        <div class="new_title">联网设备状态</div>
        <div class="echartsBox" id="charts1"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">设备告警统计</div>
        <div class="echartsBox" id="charts2"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">设备类型统计</div>
        <div class="echartsBox" id="charts3"></div>         
      </div>
      <div class="box_back echarts_box">
        <div class="ball_box">
          <div class="ball_item">
            <div class="ball_left ball">{{dengerInfo.new}}</div>
            <div class="text">今日警告</div>
          </div>
          <div class="ball_item">
            <div class="ball_right ball">{{dengerInfo.history}}</div>
            <div class="text">历史警告</div>
          </div>
          
          
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div class="right_box">
      <div class="box_back echarts_box listBox">       
        <div class="topbar">
          <div
          :class="{item:1,active: topBarIndex == index}"
          @click="changeTopBarIndex(index)"
          v-for="(item,index) in rightTopBar"
          :key="index+'x'"
          >{{item}}</div>
        </div>
        <!-- list -->
          <vue-seamless-scroll
              class="list"
              :data="listData"
              :class-option="optionSetting"
              limitMoveNum="4"
              >
              <div class="list_item" v-for="(item,index) in listData" :key="index+'u'">
                  <div class="info">
                    <div>{{item.updated_at}}</div>
                    <div>{{item.company_name + item.floor_name + item.device_address + item.device_name}}</div>
                  </div>
                  <div class="btn" @click="goPelopx(item)">待处理</div>
              </div>
          </vue-seamless-scroll>
      </div>
      <div class="box_back echarts_box" style="height:23%;">       
        <div class="new_title">警告趋势</div>
        <div class="echartsBox" id="charts4"></div>         
      </div>
    </div>
    <template v-if="houseVisible">
      <FierDetail :houseType="houseVisible" :community="plot_id"  @onclose="houseVisible = false" @openHouse="openHouse" />
    </template>
    <template v-if="wSHouseShow">
        <ViewDetailsHouse @closeDetail='closeDetailsHouse' :personnelId="personnelId" />
    </template>
    <!-- 楼层指挥平面图 -->
    <template v-if="commandPlanShow">
        <CommandPlan @closethis="CommandPlanClose" :commname="commName" :id="commId" :items="items" />
    </template>
        
  </div>
</template>
<script>
  import echarts from 'echarts';
  // import HouseDetail from '../components/HouseDetail';
  import FierDetail from '../components/FierDetail'
  import ViewDetailsHouse from '../components/ViewDetailsWsHouse'
  import CommandPlan from '../components/CommandPlan' // 楼层指挥平面图
  import vueSeamless from 'vue-seamless-scroll'
  import '../../assets/echartszt/customed'
  export default {
    components: {
      FierDetail,
      ViewDetailsHouse,
      CommandPlan
    },
    props: ['community'],
    computed: {
    optionSetting () {
            return {
                step: 0.2, // 数值越大速度滚动越快
            }
        }
    },
    data () {
      return {
        
        commandPlanShow: false,
        personnelId: '0', // 人员id
        wSHouseShow: false, 
        plot_id: '',
        charts1: null,
        charts2: null,
        charts3: null,
        charts4: null,
        houseType: [
          { id: 999, name: '总设备', num: 0 },
          { id: 7, name: '自动报警', num: 0 },
          { id: 8, name: '灭火救援', num: 0 },
          { id: 11, name: '物联网设备', num: 0 },
          { id: 10, name: '消防水源', num: 0 },
        ],
        topBarIndex: 0,
        rightTopBar:['待处理','正常警告','误报','维保测试'],
        dengerInfo: {
          new: 0,
          history: 0
        },
        page: 1,
        size: 20,
        total: 0,
        status: 0,
        listData:[],
        houseVisible: false,
        commName: '',
        commId: '',
        items: ''
      }
    },
    mounted() {
      // this.plot_id = this.community; // 获取小区id
      this.charts1 = this.$echarts.init(document.getElementById('charts1'),'customed');
      this.charts2 = this.$echarts.init(document.getElementById('charts2'));
      this.charts3 = this.$echarts.init(document.getElementById('charts3'));
      this.charts4 = this.$echarts.init(document.getElementById('charts4'));
      this.getDeviceTj();
      this.getDeviceDenger();
      this.getDeviceType();
      this.getDenger();
      this.getDengerList();
      this.getDengerQs();
      this.getTopNums();
    },
    methods: {
      // 获取顶部数量
      getTopNums(){
        const _this = this; 
        this.$http.post(`${process.env.VUE_APP_4_URL}/special/device-count`,{
          company_id: 4
        },{
          headers: {
            "shomes-type": "web",
            "shomes-user": 8
          }
        }).then(res =>{
          let data = res.data.data
          let allItem = {
            item: '总设备',
            count: 0
          }
          data.forEach(item => {
              allItem.count = allItem.count + item.count;
          });
          data.unshift(allItem)
          const newDatas = data.map(item => {
            let id = 0 
            if(item.item == '总设备') id = 999;
            if(item.item == '自动报警') id = 7;
            if(item.item == '灭火救援') id = 8;
            if(item.item == '物联网设备') id = 11;
            if(item.item == '消防水源') id = 10;
            return {
              id: id,
              name: item.item,
              num: item.count
            }
          })
          this.houseType = newDatas

        })
      },
      CommandPlanClose(){
        this.commandPlanShow = false
      },
      changepage(target){
        if(target == '上一页'){
          if(this.page == 1) return
          this.page--
        }
        if(target == '下一页'){
          if(Math.ceil(this.total / this.size) == this.page ) return
          this.page++
        }
        console.log('翻页',this.page)
        this.getDengerList()
      },
      changeTopBarIndex(index){
        console.log('index',index)
        this.topBarIndex = index
        this.status = index
        this.page = 1
        this.getDengerList()
      },
      getHouseData(){
        this.$http.get(`${process.env.VUE_APP_4_URL}/home-house-top`,{params:{
           plot_id: ''
         }}).then(res =>{
          //  console.log('房屋横向', res)
           
           if(res.status == 200){
              let names = res.data
              this.houseType.forEach(item => {
                if(item.name == '房屋总数') this.houseType[0].num = names.房屋总数;
                if(item.name == '空置房') this.houseType[2].num = names.空置房; 
                if(item.name == '出租房') this.houseType[3].num = names.出租房; 
                if(item.name == '自住') this.houseType[1].num = names.自住数; 
              })
              
           }
         })
      },
      openHouse(target){
        console.log('houseTarget', target)
        this.personnelId = target.personnel_id+''
        this.wSHouseShow = true
      },
      closeDetailsHouse(){
        this.wSHouseShow = false
      },
      getHttpRequest(url, datas, callback) {
        const _this = this;
        this.$http.get(`${process.env.VUE_APP_1_URL}${url}`, {
          params: datas
        }).then((res) => {
          callback(res.data)
        })
      },
      // 联网设备状态
      getDeviceTj(){
        const _this = this
        console.log('联网设备状态执行了')
        _this.charts1.setOption({
          color:['#5AD8A6','#5B8FF9'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
      left: 'right',
      textStyle: {
      fontSize: 11,
      color: '#fff'
      },
      data: ['在线', '离线']
    },
    grid: {
        left: '3%',
        right: '4%',
        top: '18%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            splitLine:{show: false}, //隐藏网格线
            splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLabel: {
                color: '#fff',
                fontSize: 11
            },
            data: ['自动报警', '灭火救援', '物联设备', '消防水源']
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine:{show: false}, //隐藏网格线
            splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLabel: {
                color: '#fff',
                fontSize: 11
            },
        }
    ],
    series: [
        {
            name: '在线',
            type: 'bar',
            barWidth: '20%',
            itemStyle:{
            normal: {
                //柱形图圆角，初始化效果
                barBorderRadius:[10, 10, 10, 10]
            }
        },
            data: [320, 332, 301, 334]
        },
        {
            name: '离线',
            type: 'bar',
            barWidth: '20%',
            stack: '广告',
            itemStyle:{
            normal: {
                //柱形图圆角，初始化效果
                barBorderRadius:[10, 10, 10, 10]
            }
        },
            data: [120, 132, 101, 134]
        }
    ]
},'customed')
      },
      // 设备告警统计
      getDeviceDenger(){
        const _this = this
        _this.charts2.setOption({
          color:['#53F7F1','#00f'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              top: '18%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  splitLine:{show: false}, //隐藏网格线
                  splitLine:{show: false}, //隐藏网格线
                  axisTick:{
                      show:false//不显示坐标轴刻度线
                  },
                  axisLabel: {
                      color: '#fff',
                      fontSize: 11
                  },
                  data: ['自动报警', '灭火救援', '物联设备', '消防水源']
              }
          ],
        yAxis: [
            {
                type: 'value',
                splitLine:{show: false}, //隐藏网格线
                splitLine:{show: false}, //隐藏网格线
                axisTick:{
                    show:false//不显示坐标轴刻度线
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 11
                },
            }
        ],
        series: [
            {
                name: '数量',
                type: 'bar',
                barWidth: '20%',
                itemStyle:{
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[10, 10, 10, 10]
                }
            },
                data: [371, 355, 152, 255]
            }
        ]
    },'customed')
      },
      // 设备类型统计
      getDeviceType(){
        const _this = this
        this.charts3.setOption({
    dataset: {
        source: [
            ['score', 'amount', 'product'],
            [5, 10, '自动报警'],
            [2, 21, '灭火救援'],
            [3, 18, '物联设备'],
            [3, 35, '消防水源']
        ]
    },
    grid: {
        left: '1%',
        right: '5%',
        top: '5%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: {
        // name: 'amount',
        splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
            axisLabel: {
                      color: '#fff',
                      fontSize: 11
                  },
    },
    yAxis: {
        type: 'category',
        splitLine:{show: false}, //隐藏网格线
            axisTick:{
                show:false//不显示坐标轴刻度线
            },
            axisLine: {
                show: false,//不显示坐标轴线
            },
            axisLabel: {
                      color: '#fff',
                      fontSize: 11
                  },
    },
    series: [{
        type: 'bar',
        barWidth: '30%',
        encode: {
            x: 'amount',
            y: 'product'
        },
        itemStyle:{
            normal: {
                //柱形图圆角，初始化效果
                barBorderRadius:[20, 20, 20, 20],
                // 柱子渐变色
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#91B5FF"  // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "#5B8FF9"// 100% 处的颜色
                }], false)
            }
        }
    }]
})
      },
      // 今日与历史警告
      getDenger(){
        const _this = this
        const curDate = new Date()
        // 歷史
        this.$http.post(`${process.env.VUE_APP_4_URL}/device-alarm/count-deal-status-pie-chart`,{
          program_id: 0,
          times:[new Date(curDate.getTime() - 24*60*60*1000*30),new Date(curDate.getTime() - 24*60*60*1000*1)]
        },{
          headers: {
            "shomes-type": "web",
            "shomes-user": 5
          }
        }).then(res =>{
          console.log('历史', res)
          _this.dengerInfo.history = res.data.data[0].value
        })

        // 今日
        this.$http.post(`${process.env.VUE_APP_4_URL}/device-alarm/count-deal-status-pie-chart`,{
          program_id: 0,
          times:[new Date(curDate.getTime() - 24*60*60*1000*1),new Date()]
        },{
          headers: {
            "shomes-type": "web",
            "shomes-user": 5
          }
        }).then(res =>{
          console.log('今日', res)
          _this.dengerInfo.new = res.data.data[0].value
        })
      },
      // 警告列表
      getDengerList(){
        const _this = this
        const curDate = new Date()
        this.$http.post(`${process.env.VUE_APP_4_URL}/device-alarm/list`,{
          times:[new Date(curDate.getTime() - 24*60*60*1000*500),new Date(curDate.getTime() - 24*60*60*1000)],
          limit: 100,
          page: _this.page,
          status: _this.status
        },{
          headers: {
            "shomes-type": "web",
            "shomes-user": 5
          }
        }).then(res =>{
          const newData = res.data.data.map(item =>{
            return{
              ...item,
              updated_at: new Date(item.updated_at*1000).toLocaleString(),
              company_name: item.company_name == '青岛海信'? '香槟国际':'锦屏佳苑'
            }
          })
          _this.listData = newData
          _this.total = res.data.page.total
        })
      },
      // 警告趋势
      getDengerQs(){
        const _this = this
        const curDate = new Date()
        this.$http.post(`${process.env.VUE_APP_4_URL}/device-alarm/count-deal-status-line-chart`,{
          program_id: 0,
          times:[new Date(curDate.getTime() - 24*60*60*1000*500),new Date(curDate.getTime() - 24*60*60*1000)]
        },{
          headers: {
            "shomes-type": "web",
            "shomes-user": 5
          }
        }).then(res =>{
          let xAxData = []
          let dates = []
          let yAxData = [[],[],[],[]]
          res.data.data.forEach((item,index) =>{
            xAxData.push(item.name)
            dates.push(item.value[index*20+1].label)
            yAxData[index].push(item.value[476].value)
            yAxData[index].push(item.value[477].value)
            yAxData[index].push(item.value[478].value)
            yAxData[index].push(item.value[479].value)
          })
          console.log('yAxData', yAxData)

          _this.charts4.setOption(
            {
              legend: {
                orient: 'horizontal',
                left: 'right',
                top: 0,
                textStyle: {
                    fontSize: 10,
                    fontWeight: 200,
                    color: "#fff"
                },
                data: xAxData
            },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: dates,
                  splitLine: {
                      show: false
                  }, //隐藏网格线
                  axisLabel: {
                      color: '#fff',
                      fontSize: 9
                  },
                  axisTick: {
                      show: false //不显示坐标轴刻度线
                  },
                  axisLine: {
                      show: false, //不显示坐标轴线
                  },
              },
              yAxis: {
                  type: 'value',
                  splitLine: {
                      show: false
                  }, //隐藏网格线
                  axisTick: {
                      show: false //不显示坐标轴刻度线
                  },
                  axisLabel: {
                            color: '#fff',
                            fontSize: 9
                        },
                  axisLine: {
                      show: false, //不显示坐标轴线
                  },
              },
              grid: {
                  left: '3%',
                  right: '5%',
                  top: '15%',
                  bottom: '5%',
                  containLabel: true
              },
              series: [{
                  data: yAxData[0],
                  type: 'line',
                  name: xAxData[0],
                  symbol: 'none', //取消折点圆圈
                  smooth: true, // 折线圆角
                  areaStyle: {},
                  itemStyle: {
                      normal: {
                          lineStyle: {
                              color: "#F7C253" // 折线图-线条颜色
                          },
                          //柱形图圆角，初始化效果
                          barBorderRadius: [20, 20, 20, 20],
                          // 柱子渐变色
                          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                              offset: 0,
                              color: "#111940" // 0% 处的颜色
                          }, {
                              offset: 1,
                              color: "#F7C253" // 100% 处的颜色
                          }], false)
                      }
                  }
              },
              {
                  data: yAxData[1],
                  type: 'line',
                  name: xAxData[1],
                  symbol: 'none', //取消折点圆圈
                  smooth: true, // 折线圆角
                  areaStyle: {},
                  itemStyle: {
                      normal: {
                          lineStyle: {
                              color: "#6FF9DF" // 折线图-线条颜色
                          },
                          //柱形图圆角，初始化效果
                          barBorderRadius: [20, 20, 20, 20],
                          // 柱子渐变色
                          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                              offset: 0,
                              color: "#111940" // 0% 处的颜色
                          }, {
                              offset: 1,
                              color: "#6FF9DF" // 100% 处的颜色
                          }], false)
                      }
                  }
              },
              {
                  data: yAxData[2],
                  type: 'line',
                  name: xAxData[2],
                  symbol: 'none', //取消折点圆圈
                  smooth: true, // 折线圆角
                  areaStyle: {},
                  itemStyle: {
                      normal: {
                          lineStyle: {
                              color: "#F76653" // 折线图-线条颜色
                          },
                          //柱形图圆角，初始化效果
                          barBorderRadius: [20, 20, 20, 20],
                          // 柱子渐变色
                          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                              offset: 0,
                              color: "#111940" // 0% 处的颜色
                          }, {
                              offset: 1,
                              color: "#F76653" // 100% 处的颜色
                          }], false)
                      }
                  }
              },
              {
                  data: yAxData[3],
                  type: 'line',
                  name: xAxData[3],
                  symbol: 'none', //取消折点圆圈
                  smooth: true, // 折线圆角
                  areaStyle: {},
                  itemStyle: {
                      normal: {
                          lineStyle: {
                              color: "#AB53F7" // 折线图-线条颜色
                          },
                          //柱形图圆角，初始化效果
                          barBorderRadius: [20, 20, 20, 20],
                          // 柱子渐变色
                          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                              offset: 0,
                              color: "#111940" // 0% 处的颜色
                          }, {
                              offset: 1,
                              color: "#AB53F7" // 100% 处的颜色
                          }], false)
                      }
                  }
              }
          ]
          }
          )
        })
      },
      goPelopx(item){
        console.log('item',item)
        let commName = item.company_name == '香槟国际'?'智慧社区-香槟国际':'智慧社区-锦屏佳苑'
        this.commName = commName
        this.commId = item.id
        this.items = JSON.stringify(item)
        this.commandPlanShow = true
      }
    }
  }
</script>
<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }
  
  .ball_box{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .ball_item{
      display: flex;
      flex-direction: column;
      align-items: center;
      .ball{
        width: 87px;
        height: 87px;
        line-height: 87px;
        text-align: center;
        border-radius: 50%;
        font-size: 28px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 2px;
      }
      .ball_left{
        background: #F65353;
      }
      .ball_right{
        background: #5397F6;
      }
      .text{
        font-size: 20px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 26px;
        letter-spacing: 1px;
        margin-top: 8px;
      }
    }
  }
  .box_back {
    background: rgba(3, 11, 34, 0.5);
    border-radius: 10px;
    backdrop-filter: blur(10px);
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
  .left_box {
    box-sizing: border-box;
    height: 100%;
    position: absolute;
    top: 20px;
    padding-bottom: 20px;
    width: 20%;
    box-sizing: border-box;
    // padding: 5px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    overflow: hidden;
    row-gap: 10px;
  }
  .right_box{
    height: 100%;
    width: 20%;
    top: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .listBox{
      margin-top: 20px;
      height: 72.5%;
      .topbar{
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 21px;
        letter-spacing: 1px;
        .item{
          margin-right: 20px;
          color: #fff;
          cursor: pointer;
        }
        .item.active{
          color: #38A2F7;
        }
      }
      .list{
        width: 100%;
        height: calc(100% - 40px);
        overflow: hidden;
        position: relative;
        .list_item{
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #FFFFFF;
          line-height: 19px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
          padding: 3px 0;
          .info{
            
          }
          .btn{
            min-width: 50px;
            color: #FF0000;
            cursor: pointer;
          }
        }
       
        
      }
      .list::-webkit-scrollbar {/*滚动条整体样式*/
          width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
      }
      .list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #535353;
      }
      .list::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background: #EDEDED;
      }
       .bomPage{
          width: 100%;
          height: 40px;
          // background: pink;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          box-sizing: border-box;
          padding-right: 20px;
          font-size: 12px;
          color: #BBBBBB;
          position: absolute;
          bottom: 10px;
          right: 0;
          span{
            margin-right: 20px;
          }
          .page{
            width: 57px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin: 0 2px;
            cursor: pointer;
          }
        }
    }
  }
  .left_box {
    left: 20px
  }
  .right_box {
    right: 20px;
  }
  .echarts_box{
    width: 100%;   
    border-radius: 10px;
    padding: 10px 20px;
    box-sizing: border-box;
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
        box-sizing: border-box;
    }
    .echartsBox{
        width: 100%;
        height: calc(100% - 25px);
        box-sizing: border-box;
        // background-color: pink;
    }
}
</style>