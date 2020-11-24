<template>
  <div>
    <div class="top_box">
      <div class="topItem" v-for="item in houseType" :key="item.id" @click="houseVisible = item.id">
        <span v-text="item.name"></span>
        <span v-text="item.num"></span>
      </div>
    </div>
    <div class="left_box">
      <div class="box_back echarts_box">       
        <div class="new_title">每户居住人数分布</div>
        <div class="echartsBox" id="charts1"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">房屋性质分析</div>
        <div class="echartsBox" id="charts2"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">房屋空置数变化趋势</div>
        <div class="echartsBox" id="charts3"></div>         
      </div>
    </div>
    <div class="right_box">
      <div class="box_back echarts_box">       
        <div class="new_title">出租房屋变化情况</div>
        <div class="echartsBox" id="charts4"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">承租人租住时间分析</div>
        <div class="echartsBox" id="charts5"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">出租房屋分类</div>
        <div class="echartsBox" id="charts6"></div>         
      </div>
    </div>
    <template v-if="houseVisible">
      <HouseDetail :houseType="houseVisible - 1" :community="plot_id"  @onclose="houseVisible = false" @openHouse="openHouse" />
    </template>
    <template v-if="wSHouseShow">
        <ViewDetailsHouse @closeDetail='closeDetailsHouse' :personnelId="personnelId" />
    </template>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import HouseDetail from '../components/HouseDetail';
  import ViewDetailsHouse from '../components/ViewDetailsWsHouse'

  export default {
    components: {
      HouseDetail,
      ViewDetailsHouse
    },
    props: ['community'],
    data () {
      return {
        personnelId: 0, // 人员id
        wSHouseShow: false, 
        plot_id: '',
        charts1: null,
        charts2: null,
        charts3: null,
        charts4: null,
        charts5: null,
        charts6: null,
        houseType: [
          { id: 1, name: '房屋总数', num: 0 },
          { id: 2, name: '自住', num: 0 },
          { id: 3, name: '空置房', num: 0 },
          { id: 4, name: '出租房', num: 0 },
          // { id: 5, name: '群租房', num: 1 },
        ],
        houseVisible: false,
      }
    },
    mounted() {
      this.plot_id = this.community; // 获取小区id
      this.charts1 = this.$echarts.init(document.getElementById('charts1'));
      this.charts2 = this.$echarts.init(document.getElementById('charts2'));
      this.charts3 = this.$echarts.init(document.getElementById('charts3'));
      this.charts4 = this.$echarts.init(document.getElementById('charts4'));
      this.charts5 = this.$echarts.init(document.getElementById('charts5'));
      this.charts6 = this.$echarts.init(document.getElementById('charts6'));
      this.getRoomNum();
      this.getHomeProperty();
      this.getHomeVacancy();
      this.getHomeRentalTrend();
      this.getHomeRentalRange();
      this.getHomeRentalType();
      this.getHouseData()
    },
    methods: {
      getHouseData(){
        this.$http.get(`${process.env.VUE_APP_1_URL}/home-house-top`,{params:{
           plot_id: ''
         }}).then(res =>{
          //  console.log('房屋横向', res)
           
           if(res.status == 200){
              let names = res.data
              this.houseType.forEach(item => {
                if(item.name == '房屋总数') this.houseType[0].num = names.房屋总数 
                if(item.name == '空置房') this.houseType[2].num = names.空置房 
                if(item.name == '出租房') this.houseType[3].num = names.出租房 
                if(item.name == '自住') this.houseType[1].num = names.自住数 
              })
           }
         })
      },
      openHouse(target){
        console.log('houseTarget', target)
        this.personnelId = target.personnel_id
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
      getRoomNum() {
        const that = this;
        this.getHttpRequest('/home-house-roomnum', { plot_id: this.plot_id }, (res) => {
          let a = [], b = [];
          res.forEach(({ 分类, 数量 }) => {
            a.push(分类);
            b.push(数量);
          })
          that.charts1.setOption({
            color: ['#5989E3'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: a,
                axisTick: {
                  alignWithLabel: true
                },
                // boundaryGap: false,            
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.14)'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                  fontSize: 12
                },
                splitLine: {
                  show: false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  show: false,                  
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                  fontSize: 12
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.14)'
                  }
                }
              }
            ],
            series: [
              {
                name: '居住人数分布',
                type: 'bar',
                barWidth: 10,
                data: b,
                itemStyle: {
                  opacity: 1,
                  barBorderRadius: 25
                }
            }
            ]
          })
        })
      },
      getHomeProperty() {
        const that = this;
        this.getHttpRequest('/home-house-property', { plot_id: that.plot_id }, (res) => {
          const data = [], a = [], b = {};
          res.forEach(({ 类型, 数量 }, i) => {
            data.push({ value: 数量, name: 类型 });
            b[类型] = 数量
            a.push({ name: 类型, icon: 'circle' });
          });

          that.charts2.setOption({
            color: ['#5B8FF9', '#4EF9B5', '#A33DFF', '#FFBE00'],
            grid: {
              left: 0,
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                data: a,
                formatter: function (name, l){                  
                  return '{a|' + name + '}{b|' + b[name] + '}'
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                  rich: {
                    a: {
                      fontSize: 12,
                      padding: [0, 10, 0, 0]
                    },
                    b: {
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      paddingLeft: 10
                    }
                  }
                }
            },
            series: [
              {
                name: '房屋性质',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                left: 0,
                label: {
                  show: false,
                  position: 'center'
                },
                // emphasis: {
                //   label: {
                //     show: true,
                //     fontSize: '30',
                //     fontWeight: 'bold'
                //   }
                // },
                labelLine: {
                  show: false
                },
                data: data
              }
            ]
          })
        })
      },
      getHomeVacancy() {
        const that = this;
        that.getHttpRequest('/home-house-vacancy', { plot_id: that.plot_id }, (res) => {
          const a = [], b = [];
          res.forEach(({ 类型, 数量 }, i) => {
            a.push(类型);
            b.push(数量)
          });
          that.getLineChart(that.charts3, a, b, '#4EF9B5');
        })
      },
      getHomeRentalTrend() {
        const that = this;
        that.getHttpRequest('home-house-rental-trend', { plot_id: that.plot_id }, (res) => {
          let a = [], b = [];
          res.forEach(({ 月份, 数据 }) => {
            a.push(月份);
            b.push(数据);
          });
          that.charts4.setOption({
            color: ['#F7C253'],
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
                  color: {
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
                }
            }]
          });
        })
      },
      getHomeRentalRange() {
        const that = this;
        that.getHttpRequest('/home-house-rental-range', { plot_id: that.plot_id }, (res) => {
          let a = [], b = [];
          res.forEach(({ 类型, 数量 }, i) => {
            a.push(类型);
            b.push(数量)
          });
          that.getLineChart(that.charts5, a, b, '#53F6F2')
        });
      },
      getHomeRentalType() {
        const that = this;
        that.getHttpRequest('/home-house-rental-type', { plot_id: that.plot_id }, (res) => {
          const data = [], a = [];
          res.forEach(({ 类型, 数量 }) => {
            data.push({ name: 类型, value: 数量 });
            a.push(类型);
          });
          that.charts6.setOption({
            color: ['#4346D3', '#53F7F1', '#2D99FF'],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              show: false,
              orient: 'vertical',
              left: 10,
              data: a
            },
            series: [
              {
                name: '出租房分类',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  color: '#fff'                    
                },               
                labelLine: {
                  show: false
                },
                data: data
              }
            ]
          })
        })
      },
      getLineChart(myChart, a, b, color) {
        myChart.setOption({
          color: [color],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['房屋空置'],
            show: false
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show: false,                  
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: a,
            axisTick: {
              alignWithLabel: true
            },
            // boundaryGap: false,            
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.14)'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.14)'
              }
            }
          },
          series: [
            {
              name: '房屋空置',
              type: 'bar',
              stack: '总量',
              barWidth: 10,
              label: {
                show: false,
                position: 'outside'
              },
              data: b,
              itemStyle: {
                opacity: 1,
                barBorderRadius: 25
              }
            },            
          ]
        })        
      }
    }
  }
</script>
<style scoped lang='less'>
  * {
    box-sizing: border-box;
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
  .left_box,
  .right_box {
    height: 100%;
    position: absolute;
    top: 20px;
    width: 20%;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    overflow: hidden;
    row-gap: 10px;
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
    }
}
</style>