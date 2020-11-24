<template>
<!-- 消防页面 -->
  <div>
    <div class="top_box">
      <div class="topItem" v-for="item in houseType" :key="item.id +'v'" @click="changeTop(item)">
        <span v-text="item.name"></span>
        <span v-text="item.num"></span>
      </div>
    </div>
    <div class="left_box">
      <div class="box_back echarts_box">       
        <div class="new_title">人口情况</div>
        <div class="echartsBox" id="charts1"></div>         
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">房屋情况</div>
        <div class="twoBox">
            <div class="ec_left"><div class="echartsBox" id="charts2"></div></div>         
            <div class="ec_right">
                <div class="yuan">
                    <div>{{houseNums}}</div>
                    <div>房屋总数</div>
                </div>
            </div>
        </div>
      </div>
      <div class="box_back echarts_box">       
        <div class="new_title">车辆情况</div>
        <div class="echartsBox" id="charts3"></div>         
      </div>
      <div class="box_back echarts_box">
         <div class="new_title">事件情况</div>
         <div class="eventBox">
             <div class="item_event">
                 <div class="eventEc" id="charts4-1"></div>
                 <div class="text">未实人员发现</div>
             </div>
             <div class="item_event">
                 <div class="eventEc" id="charts4-2"></div>
                 <div class="text">未实车辆发现</div>
             </div>
             <div class="item_event">
                 <div class="eventEc" id="charts4-3"></div>
                 <div class="text">重点人群发现</div>
             </div>
             <div class="item_event">
                 <div class="eventEc" id="charts4-4"></div>
                 <div class="text">消防报警</div>
             </div>
         </div>        
      </div>
    </div>
    <!-- 右 -->
    <div class="right_box">
      <div class="box_back bomBox">
          <div class="new_title">工作成绩</div>
          <div class="bom_echartsBox" id="charts5"></div>
          <div class="sopt_box">
              <div class="wave">
                {{fen}}分
                <div class="wave1"></div>
                <div class="wave2"></div>
                <div class="wave3"></div>
            </div>
          </div>
      </div>
      <div class="box_back bomBox">
          <div class="new_title">事件</div>
          <div class="bom_echartsBox" id="charts6"></div>
      </div>
    </div>
    <template v-if="eventDetailShow">
        <EventDetails @closethis="eventDetailShow = false" />
    </template>
    <template v-if="personDetailShow">
        <PersonDetail :community="community" :personType="personType" @closew='closewClick' />
    </template>
    <template v-if="carDetailShow">
        <CarDetail :community="community == '香槟国际'?'2':'1'" :carType="1" @onclose="carDetailShow = false" @openViewDetail="openViewDetail" />
    </template>
    <template v-if="houseDetailShow">
        <HouseDetail :houseType="''" :community="community == '香槟国际'?2:1"  @onclose="houseDetailShow = false" @openHouse="openHouse" />
    </template>
    <template v-if="centerShow">
        <ViewDetails @closeDetail="centerShow = false" :personnelId="personnelId" :flag="flag" :type="'car'" />
    </template>
    <template v-if="wSHouseShow">
        <ViewDetailsHouse @closeDetail='wSHouseShow = false' :personnelId="personnelId" />
    </template>
    <template v-if="deviceDetailShow">
        <DeviceDetail :houseType="999" :community="community == '香槟国际'?'2':'1'" @onclose="deviceDetailShow = false" />
    </template>
    <!-- 处理弹框 -->
    <div class="management" v-if="managementShow">
        <div class="showKuang">
            <MementBox :personnelId="personnelId"  @closeMent="managementShow = false" />
        </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import FierDetail from '../components/FierDetail'
  import ViewDetailsHouse from '../components/ViewDetailsWsHouse'
  import CommandPlan from '../components/CommandPlan' // 楼层指挥平面图
  import vueSeamless from 'vue-seamless-scroll'
  import EventDetails from '../streeComp/EventDetails' // 处置事件详情
  import PersonDetail from '../components/StatisticalAnalysis' // 人口详情
  import CarDetail from '../components/CarDetailList' // 车辆详情
  import ViewDetails from '../components/ViewDetails'
  import HouseDetail from '../components/HouseDetail' // 房屋详情
  import DeviceDetail from './DeviceDetail' // 设备详情
  import MementBox from '../components/MementBox' // 重点人员处置
  import '../../assets/echartszt/customed'
  import VideoComp from './VideoComp'
  export default {
    components: {
      FierDetail,
      ViewDetailsHouse,
      CommandPlan,
      EventDetails,
      VideoComp,
      PersonDetail,
      CarDetail,
      HouseDetail,
      ViewDetails,
      DeviceDetail,
      MementBox
    },
    props: ['community'],
    data () {
      return {
          fen: 0,
        // 重点人员处置
        managementShow: false,
        // 设备详情
        deviceDetailShow: false,
        // 一房一档
        wSHouseShow: false,
        // 一车一档
        centerShow: false,
        flag: false,
        // 房屋详情
        houseDetailShow: false,
        // 车辆详情
        carDetailShow: false,
        // 人员详情
        personType: '1',// 人员类型
        personDetailShow: false,
        eventDetailShow: false,
        commandPlanShow: false,
        personnelId: '0', // 人员id
        wSHouseShow: false, 
        plot_id: '',
        charts1: null,
        charts2: null,
        charts3: null,
        charts41: null,
        charts42: null,
        charts43: null,
        charts44: null,
        houseType: [
          { id: 999, name: '小区', num: 0 },
          { id: 7, name: '实有人', num: 0 },
          { id: 8, name: '实有房', num: 0 },
          { id: 11, name: '实有车', num: 0 },
          { id: 10, name: '实有事件', num: 0 },
          { id: 12, name: '实有设备', num: 0 },
        ],
        dengerInfo: {
          new: 0,
          history: 0
        },
        page: 1,
        size: 20,
        total: 0,
        // 右侧底部按钮切换
        rightbomIndex: 0,// 选中
        // 人数
        personsInfo: {
            local: {
            number: 3433,
            text: "未实人数",
            percentage: "50%",
            color: '#F4C941'
            },
            ontlocal: {
            number: 3433,
            text: "核实人数",
            percentage: "50%",
            color: '#5B5FFF'
            },
        },
        // 房屋
        housesInfo: {
            local: {
            number: 3433,
            text: "空置房屋",
            percentage: "50%",
            color: '#FFA726'
            },
            ontlocal: {
            number: 3433,
            text: "排查空房",
            percentage: "50%",
            color: '#FF6D00'
            },
        },
        houseNums: 0, //房屋总数
        // 车辆
        carsInfo: {
            local: {
            number: 3433,
            text: "未实车辆",
            percentage: "50%",
            color: '#B388FF'
            },
            ontlocal: {
            number: 3433,
            text: "核实车辆",
            percentage: "50%",
            color: '#C5CAE9'
            },
        },
        // 事件
        eventInfo: {
            local: {
            number: 3433,
            text: "发现事件",
            percentage: "50%",
            color: '#40C4FF'
            },
            ontlocal: {
            number: 3433,
            text: "处置事件",
            percentage: "50%",
            color: '#64FFDA'
            },
        }
      }
    },
    mounted() {
      this.charts1 = this.$echarts.init(document.getElementById('charts1'));
      this.charts2 = this.$echarts.init(document.getElementById('charts2'));
      this.charts3 = this.$echarts.init(document.getElementById('charts3'));
      this.charts41 = this.$echarts.init(document.getElementById('charts4-1'));
      this.charts42 = this.$echarts.init(document.getElementById('charts4-2'));
      this.charts43 = this.$echarts.init(document.getElementById('charts4-3'));
      this.charts44 = this.$echarts.init(document.getElementById('charts4-4'));
      this.charts5 = this.$echarts.init(document.getElementById('charts5'));
      this.charts6 = this.$echarts.init(document.getElementById('charts6'));
      this.personInfo()
      this.houseInfo()
      this.carInfo()
      this.evInfo()
      this.workAchievent()
      this.eventS()
      this.getTopNavNums()
    },
    methods: {
        /**
         * 人口情况
         */
        personInfo(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-left-personnel`).then(res => {
                const datas = res.data
                const keys = Object.keys(datas)
                const vals = Object.values(datas)
                let nums = 0
                vals.forEach(item => {
                    nums = nums + +item
                })
                const targetData = keys.map((item,index) =>{
                    return {
                        name: keys[index],
                        value: vals[index]
                    }
                })
                this.charts1.setOption({
                    color: ['#7CD6CF','#F8CB7F','#63B2EE','#5D7092','#76DA91','#EDDD86','#7898E1'],
                    tooltip: {
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        top: 20,
                        icon: 'circle',
                        orient: 'vertical',
                        textStyle:{
                            color: '#fff'
                        },
                        left: 10,
                        data: keys
                    },
                    series: [
                        {
                            name: '总人数',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '40%'],
                            center: ['75%', '55%'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    color:'#4c4a4a',
                                    formatter: '{total|' + nums +'}'+ '\n\r' + '{active|总人数}',
                                    rich: {
                                        total:{
                                            fontSize: 15,
                                            fontFamily : "微软雅黑",
                                            color:'#000'
                                        },
                                        active: {
                                            fontFamily : "微软雅黑",
                                            fontSize: 15,
                                            color:'#000',
                                            lineHeight:30,
                                        },
                                    }
                                },
                                emphasis: {//中间文字显示
                                    show: true,
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1123, name: '总人数', selected: true}
                            ]
                        },
                        {
                            name: '人口情况',
                            type: 'pie',
                            radius: ['60%', '75%'],
                            center: ['75%', '60%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color:'#fff',
                                            fontSize: 14,
                                            fontWeight:'bolder'
                                        },
                                        formatter: function (p) {   //指示线对应文字
                                            var data = p.data;
                                            return data.value;
                                        }
                                    },
                                    labelLine : {
                                        lineStyle:{
                                            color:'#fff'
                                        }
                                    }
                                }
                            },
                            data: targetData
                        }
                    ]
                })
            })
        },
        /**
         * 房屋情况
         */
        houseInfo(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-left-house`).then(res =>{
                const datas = res.data
                const keys = Object.keys(datas)
                const vals = Object.values(datas)
                this.houseNums = datas['房屋总数']
                const targetData = keys.map((item,index) =>{
                    return {
                        name: keys[index],
                        value: vals[index]
                    }
                })
                this.charts2.setOption({
                    dataset: {
                        source: [
                            ['score', 'amount', 'product'],
                            ['数量', datas['转租房屋'], '转租房屋'],
                            ['数量', datas['出租房屋'], '出租房屋'],
                            ['数量', datas['空置房屋'], '空置房屋'],
                            ['数量', datas['自主房屋'], '自住房屋'],
                            ['数量', datas['群租房屋'], '群租房屋'],
                        ]
                    },
                    tooltip: {
                        left: 'center',
                        formatter: '{c}'
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
            })
        },
        /**
         * 车辆情况
         */
        carInfo(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-left-car`).then(res =>{
                const datas = res.data
                const keys = Object.keys(datas)
                const vals = Object.values(datas)
                const targetData = keys.map((item,index) =>{
                    return {
                        name: keys[index],
                        value: vals[index]
                    }
                })
                this.charts3.setOption({
                    color: ['#80D8FF','#40C4FF','#00B0FF','#00B0FF'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    legend: {
                        top: 10,
                        orient: 'vertical',
                        textStyle:{
                            color: '#fff'
                        },
                        left: 'left',
                        data: keys
                    },
                    series: [
                        {
                            name:'数量',
                            type:'funnel',
                            left: '26%',
                            top: 30,
                            bottom: 5,
                            width: '80%',
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            label: {
                                show: false,
                                position: 'inside'
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1
                            },
                            emphasis: {
                                label: {
                                    fontSize: 20
                                }
                            },
                            data: targetData
                        }
                    ]
                })
            })
            
        },
        /**
         * 事件情况
         */
        evInfo(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-left-event`).then(res =>{
                const datas = res.data
                const keys = Object.keys(datas)
                const vals = Object.values(datas)
                let nums = 0; // 总数
                vals.forEach(item =>{
                    nums+= item
                })
                // 未实人员
            this.charts41.setOption({
                series: [
                    {
                        name: '1',
                        type: 'gauge',
                        center: ['50%', '50%'], // 默认全局居中
                        radius: '100%',
                        min: 0,
                        max: 400,  
                        splitNumber: 10,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [datas['未实人员发现'] / nums, '#F8CB7F'],//根据实际数据动态改变
                                    [1, '#DCDDDD'],
                                
                                ],
                                width: 20, //半径
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 1
                            }
                        },
                        pointer: {
                        show:false
                        },
                        axisLabel: {
                            //show:false,
                            // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: 'transparent', //刻度数字颜色 隐藏
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'transparent', //坐标轴 小刻度线颜色
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: 'transparent', //分割线
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        title: {
                        
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail: { //show : true ,
                            borderColor: '#fff',
                            shadowColor: '#fff', //默认透明
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 14,
                                color: '#fff'
                            },
                            formatter: '{value}'
                        },
                        data: [
                            { value: datas['未实人员发现'], name: "" }
                        ]
                    }

                ]
            })

            // 未实车辆
            this.charts42.setOption({
                series: [
                    {
                        name: '1',
                        type: 'gauge',
                        center: ['50%', '50%'], // 默认全局居中
                        radius: '100%',
                        min: 0,
                        max: 400, 
                        splitNumber: 10,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [datas['未实车辆发现'] / nums, '#00B0FF'],//根据实际数据动态改变
                                    [1, '#DCDDDD'],
                                ],
                                width: 20, //半径
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 1
                            }
                        },
                        pointer: {
                        show:false
                        },
                        axisLabel: {
                            //show:false,
                            // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: 'transparent', //刻度数字颜色 隐藏
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'transparent', //坐标轴 小刻度线颜色
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: 'transparent', //分割线
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        title: {
                        
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail: { //show : true ,
                            borderColor: '#fff',
                            shadowColor: '#fff', //默认透明
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 14,
                                color: '#fff'
                            },
                            formatter: '{value}'
                        },
                        data: [
                            { value: datas['未实车辆发现'], name: "" }
                        ]
                    }

                ]
            })

            // 重点人群发现
            this.charts43.setOption({
                series: [
                    {
                        name: '1',
                        type: 'gauge',
                        center: ['50%', '50%'], // 默认全局居中
                        radius: '100%',
                        min: 0,
                        max: 400, 
                        splitNumber: 10,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [datas['重点人群发现'] / nums, '#FF6D00'],//根据实际数据动态改变
                                    [1, '#DCDDDD'],
                                ],
                                width: 20, //半径
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 1
                            }
                        },
                        pointer: {
                        show:false
                        },
                        axisLabel: {
                            //show:false,
                            // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: 'transparent', //刻度数字颜色 隐藏
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'transparent', //坐标轴 小刻度线颜色
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: 'transparent', //分割线
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        title: {
                        
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail: { //show : true ,
                            borderColor: '#fff',
                            shadowColor: '#fff', //默认透明
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 14,
                                color: '#fff'
                            },
                            formatter: '{value}'
                        },
                        data: [
                            { value: datas['重点人群发现'], name: "" }
                        ]
                    }

                ]
            })

            // 消防报警
            this.charts44.setOption({
                series: [
                    {
                        name: '1',
                        type: 'gauge',
                        center: ['50%', '50%'], // 默认全局居中
                        radius: '100%',
                        min: 0,
                        max: 400, 
                        splitNumber: 10,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [datas['消防报警'] / nums, '#FF5353'],//根据实际数据动态改变
                                    [1, '#DCDDDD'],
                                ],
                                width: 20, //半径
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 1
                            }
                        },
                        pointer: {
                        show:false
                        },
                        axisLabel: {
                            //show:false,
                            // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: 'transparent', //刻度数字颜色 隐藏
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'transparent', //坐标轴 小刻度线颜色
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: 'transparent', //分割线
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        title: {
                        
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail: { //show : true ,
                            borderColor: '#fff',
                            shadowColor: '#fff', //默认透明
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 14,
                                color: '#fff'
                            },
                            formatter: '{value}'
                        },
                        data: [
                            { value: datas['消防报警'], name: "" }
                        ]
                    }

                ]
            })
            })
        },
        /**
         * 工作成绩
         */
        workAchievent(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-district-rigth-score`).then(res =>{
                let datas = res.data
                const treenNames = []; // 街道名列表
                
                const targetData = datas.filter(item => item['街道名称'] == '晋原街道')
                const unTargetData = datas.filter(item => item['街道名称'] != '晋原街道').slice(0,9)
                datas = [...targetData, ...unTargetData]
                datas.forEach(item =>{
                    treenNames.push(item['街道名称'])
                })
                let nums = 0
                datas.forEach(item => {
                    nums = nums + item['未实人口核实'] + item['未实车辆核实'] + item['消防报警处置'] + item['空置房排查'] + item['重点人群监管']
                })
                this.fen = parseInt(nums / 10)
                 this.charts5.setOption({
                 color:['#4150D8','#57C07F','#FF9454','#FFB954','#F8CF48'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        left: 'left',
                        icon: 'circle',
                        textStyle:{
                            color: '#fff'
                        },
                        data: ['未实人口核实', '重点人员监管', '未实车辆核实', '空置房排查', '消防报警处置']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
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
                        data: treenNames,
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
                    series: [
                        {
                            name: '未实人口核实',
                            type: 'bar',
                            barWidth: '40%',
                            stack: '人数',

                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            
                            data: datas.map(item => item['未实人口核实'])
                        },
                        {
                            name: '重点人员监管',
                            type: 'bar',
                            stack: '人数',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: datas.map(item => item['重点人群监管'])
                        },
                        {
                            name: '未实车辆核实',
                            type: 'bar',
                            stack: '人数',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: datas.map(item => item['未实车辆核实'])
                        },
                        {
                            name: '空置房排查',
                            type: 'bar',
                            stack: '人数',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: datas.map(item => item['空置房排查'])
                        },
                        {
                            name: '消防报警处置',
                            type: 'bar',
                            stack: '人数',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            itemStyle:{
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[0, 20, 20, 0],
                                }
                            },
                            data: datas.map(item => item['消防报警处置'])
                        }
                    ]
                });
            })
            

        },
        /**
         * 事件
         */
        eventS(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-district-right-event`).then(res =>{
                const datas = res.data
                const Data1 = datas.filter(item =>{ // 等级1
                    if(item['事件等级'] == 'I级事件'){
                        return true
                    }
                })
                const Data2 = datas.filter(item =>{ // 等级2
                    if(item['事件等级'] == 'II级事件'){
                        return true
                    }
                })
                const Data3 = datas.filter(item =>{ // 等级3
                    if(item['事件等级'] == 'III级事件'){
                        return true
                    }
                })
                const Data4 = datas.filter(item =>{ // 等级4
                    if(item['事件等级'] == 'IV级事件'){
                        return true
                    }
                })
                const yDatas = [Data1[0]['未处理'],Data2[0]['未处理'],Data3[0]['未处理'],Data4[0]['未处理']]
                const wDatas = [Data1[0]['已处理'],Data2[0]['已处理'],Data3[0]['已处理'],Data4[0]['已处理']]
                this.charts6.setOption({
                    color: ['#80D8FF', '#00B0FF'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        left: 'right',
                        icon: 'circle',
                        textStyle:{
                            color: '#fff'
                        },
                        data: ['未处理', '已处理']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            color: '#fff',
                            fontSize: 11
                        },
                        splitLine:{show: false}, //隐藏网格线
                        axisTick:{
                            show:false//不显示坐标轴刻度线
                        },
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        axisLabel: {
                            color: '#fff',
                            fontSize: 11
                        },
                        splitLine:{show: false}, //隐藏网格线
                        axisTick:{
                            show:false//不显示坐标轴刻度线
                        },
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        data: ['I级', 'II级', 'III级', 'IV级']
                    },
                    series: [
                        {
                            name: '未处理',
                            type: 'bar',
                            barWidth: '25%',
                            itemStyle:{
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[0, 20, 20, 0],
                                }
                            },
                            data: yDatas
                        },
                        {
                            name: '已处理',
                            type: 'bar',
                            barWidth: '25%',
                            itemStyle:{
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[0, 20, 20, 0],
                                }
                            },
                            data: wDatas
                        }
                    ]
                })
            })
        },
        /**
         * 处置事件详情关闭事件
         */
        eventDetailClose(){
            this.eventDetailShow = false
        },
        /**
         * 获取顶部导航数量
         */
        getTopNavNums(){
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-top`).then(res =>{
                const keys = Object.keys(res.data)
                const vals = Object.values(res.data)
                const newData = keys.map((item,index) =>{
                    return {
                        name: keys[index],
                        num: vals[index],
                        id: index
                    }
                })
                this.houseType = newData
            })
        },
        /**
         * 顶部导航按钮
         */
        changeTop(item){
            console.log('item', item);
            if(item.name == '实有人数') this.personDetailShow = true; 
            if(item.name == '实有车') this.carDetailShow = true; 
            if(item.name == '实有房数') this.houseDetailShow = true; 
            if(item.name == '实有事件') this.eventDetailShow = true; 
            if(item.name == '实有设备') this.deviceDetailShow = true; 
        },
        openViewDetail(target){
            console.log('target',target)
            this.personnelId = target.personnel_id
            this.flag = target.flag
            if(!this.flag){
                this.centerShow = true
            }
      },
      openHouse(target){
        console.log('houseTarget', target)
        this.personnelId = target.personnel_id
        this.wSHouseShow = true
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
      openHouse(target){
        console.log('houseTarget', target)
        this.personnelId = target.personnel_id+''
        this.wSHouseShow = true
      },
      closeDetailsHouse(){
        this.wSHouseShow = false
      },
      changeRightBomIndex(item,index){
          console.log(item,index);
          this.rightbomIndex = index
      },
      closewClick(){
          this.personDetailShow = false
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
      z-index: 1000;
    }
  }
  .left_box {
    box-sizing: border-box;
    height: 100%;
    position: absolute;
    top: 0px;
    padding: 20px 0;
    width: 23%;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    overflow: hidden;
    row-gap: 10px;
    z-index: 1000;
  }
  .right_box{
    height: 100%;
    width: 23%;
    top: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px 0;
    z-index: 1000;
    .bomBox{
        width: 100%;
        height: 49.5%;
        box-sizing: border-box;
        padding: 10px;
        position: relative;
        .bom_echartsBox{
            width: 100%;
            height: calc(100% - 25px);
        }
        .new_title{
            color: #ffffff;
            width: 100%;
            height: 25px;
            line-height: 25px;
            font-size: 16px;
            background: url('../../assets/newver/icon.png') left center no-repeat;
            background-size: 11px 11px;
            padding-left: 26px;
            color: #38A2F7;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
        }
        .sopt_box{
            width: 64px;
            height: 64px;
            // background-color: pink;
            position: absolute;
            top: 10px;
            right: 10px;
            
            .wave{
                color: #fff;
                position: relative;
                border: 1px solid #F8CF48;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                line-height: 30px;
                margin: 0 auto;
                font-size: 14px;
                text-align: center;
                overflow: hidden;
                animation: water-wave linear infinite;
                box-shadow: 0 0 3px 3px #dbae18;
            }
            .wave1{
                position: absolute;
                top: 40%;
                left: -25%;
                background: #F8CF48;
                opacity: .5;
                width: 200%;
                height: 200%;
                border-radius: 40%;
                animation: inherit;
                animation-duration: 5s;
            }
            .wave2{
                position: absolute;
                top: 40%;
                left: -35%;
                background:#f7d565;
                opacity: .5;
                width: 200%;
                height: 200%;
                border-radius: 35%;
                animation: inherit;
                animation-duration: 7s;
            }
            .wave3{
                position: absolute;
                top: 50%;
                left: -35%;
                background: #ecc132;
                opacity: .3;
                width: 200%;
                height: 200%;
                border-radius: 33%;
                animation: inherit;
                animation-duration: 11s;
            }
            @keyframes  water-wave{
                0% {transform: rotate(0deg);}
                100% {transform: rotate(360deg);}
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
    .eventBox{
        width: 100%;
        height: calc(100% - 25px);
        display: flex;
        justify-content: space-between;
        align-items:center;

        .item_event{
            height: 100%;
            width: 24%;
            .eventEc{
                width: 100%;
                height: 70%;
                // background-color: chocolate;
            }
            .text{
                width: 100%;
                height: 30%;
                text-align: center;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 19px;
                letter-spacing: 1px;
            }
        }
    }

    .twoBox{
        width: 100%;
        height: calc(100% - 25px);
        display: flex;
        align-items: center;
        .ec_left{
            height: 100%;
            width: 70%;
        }
        .ec_right{
            height: 100%;
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
            .yuan{
                width: 100px;
                height: 100px;
                background: linear-gradient(180deg, #68ACFF 0%, #5CD9F9 100%);
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #000000;
                line-height: 16px;
                div{
                    margin: 4px 0;
                }
            }
        }
    }
    
    .new_title{
        color: #ffffff;
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 16px;
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
.management{
        width: 100%;
        height: 100%;
        background: rgba(3, 11, 34, 0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        .showKuang{
            width: 90%;
            height: 95%;
            box-sizing: border-box;
            background-color: #FFFFFF;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            z-index: 999;
        }
    } 
</style>