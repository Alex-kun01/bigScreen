<template>
<!-- new人员页面-社区端 -->
    <div class="digPenson">
        <!-- 头部header -->
        <div class="header_box_new">
            <HeaderTop @changeCummuity="changeCummuity" title="斜江社区" />
        </div>
        <!-- 内容-地图区 -->
        <div class="mapBox">
            <div class="flyBox" v-if="flyBoxShow">
                <img style="width:40px;height:40px;" :src="flyImg" alt="">
            </div>            
            <!-- 底部悬浮new -->
            <div class="new_bottom_float"> 
                <div :class="{float_b_item:1,active: isShowPageIndex == item.id}" 
                v-for="(item,index) in newBottomFloatInfo"
                :key="index+'b'"
                @click="changeIShowIndex(item.id)"
                >
                    <div>{{item.name}}</div>
                    <div>{{item.number}}</div>
                </div>
            </div>
            <template v-if="isShowPageIndex === 1">
                <!-- 顶部悬浮new -->
                <div class="new_top_float">
                    <div class="float_t_item"
                    v-for="(item,index) in newTopFloatInfo"
                    :key="index+'t'"
                    @click="openDetails(item)"
                    >
                        <div>{{item.name}}</div>
                        <div>{{item.number}}</div>
                    </div>
                </div>
                <!-- 左侧悬浮new -->
                <div class="new_left_float">
                    <!-- 看板-左 -->
                    <div class="new_topbar">
                        <div class="leftShow">
                            <div class="showItem">
                                <span style="font-weight:bold;">本月陌生人</span>
                                <span>{{leftTong.month}}</span>
                            </div>
                            <div class="showItem">
                                <span style="font-weight:bold;">今日陌生人</span>
                                <span>{{leftTong.day}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 滚动-左 -->
                    <div class="new_group_box">
                        <vue-seamless-scroll
                            class="seamless"
                            :data="leftGroupList"
                            :class-option="optionSetting"
                            limitMoveNum="6"
                            >
                            <div class="left_item"
                                v-for="(item,index) in leftGroupList"
                                :key="index"
                                :style="item.color"
                            >
                                <img :src="item.pFaceUri" alt="">
                                <div class="textB">
                                    <div>{{item.name}}</div>
                                    <div>{{item.address}}</div>
                                    <div>{{item.date}}</div>
                                </div>
                            </div>
                        </vue-seamless-scroll>
                    </div>
                    <!-- 图表-左 -->
                    <div class="new_tubiao">
                        <div class="echarts_box">
                            <div class="new_title">未核实人员变化数</div>
                            <div class="echartsBox">
                                <div id="echarts1" style="width:100%;height:100%;"></div>
                            </div>
                        </div>
                        <div class="echarts_box">
                            <div class="new_title">实有人口变化数</div>
                            <div class="echartsBox">
                                <div id="echarts2" style="width:100%;height:100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右侧悬浮new -->
                <div class="new_right_float">
                    <!-- 看板-右 -->
                    <div class="new_topbar">
                        <div class="rightShow">
                            <div class="rightItem"
                            v-for="(day,dayx) in rightTong"
                            :key="dayx"
                            >
                                <div class="title">{{day.title}}</div>
                                <div class="day">{{day.day}}</div>
                                <div class="month">{{day.month}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 滚动-右 -->
                    <div class="new_group_box">
                        <vue-seamless-scroll
                            class="seamless"
                            :data="rightGroupList"
                            :class-option="optionSetting"
                            limitMoveNum="4"
                            >
                            <div class="right_item"
                                v-for="(item,index) in rightGroupList"
                                :key="index"
                                :style="item.color"
                            >
                                <div class="left_box" >
                                    <img :src="item.img" alt="">
                                    <div class="textB">
                                        <div>
                                            <span>{{item.name}}</span>
                                            <span >【{{item.cnType}}】</span>
                                                <img class="start" src="../../assets/twopage/danger.png" alt="" v-for="item in item.start" :key="item+'d'">
                                        </div>
                                        <div>{{item.address}}</div>
                                        <div>{{item.date}}</div>
                                    </div>
                                </div>
                                <div class="btnBox">
                                    <div class="btn1">{{item.status}}</div>
                                    <div class="btn2" @click="navatar(item)">查看</div>
                                </div>
                            </div>
                        </vue-seamless-scroll>
                    </div>
                    <!-- 图表-右 -->
                    <div class="new_tubiao">
                        <div class="echarts_box">
                            <div class="new_title">重点人员巡查次数</div>
                            <div class="echartsBox">
                                 <div id="echarts3" style="width:100%;height:100%;"></div>
                            </div>
                        </div>
                        <div class="echarts_box">
                            <div class="new_title">异常出入记录</div>
                            <div class="echartsBox">
                                 <div id="echarts4" style="width:100%;height:100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="isShowPageIndex === 2">
                <CarPageS :community="community" />
            </template>
            <template v-if="isShowPageIndex === 3">
                <HousePageS :community="community" />
            </template>
            <template v-if="isShowPageIndex === 6">
                <FireControlS :community="community" />
            </template>

            <!-- 机器 人 :ref="{robot1: item.id == 'r1', robot2: item.id == 'r2'}" -->
            <template v-if="robotImgShow"> 
                <div
                    v-for="item in centerZsFloat"
                    :key="item.id"
                    :ref="item.id"
                    :style="{top: item.top,left: item.left,animation: 'all 2s'}"
                    :class="'robot'+item.id"
                    @click="$router.push({name: item.url})"
                    >
                        <img class="address" src="../../assets/twopage/robot.png" alt="">
                        <div class="yunpao"
                        v-if="robotIndex == item.id && showFloatrobot"
                        >
                            <div>在线时长：{{item.date}}</div>
                            <div>发现重点人群：{{item.person}}</div>
                        </div>
                    </div>
            </template>
            <!-- 消防机器人 -->
            <template v-else> 
                <div
                    v-for="item in fireRobotList"
                    :key="item.id"
                    :ref="item.id+'fire'"
                    :style="{top: item.top,left: item.left,animation: 'all 2s'}"
                    :class="'robot'+item.id"
                    @click="$router.push({name: item.url})"
                    >
                        <img class="address" style="width:27px;height:38px;" src="../../assets/newver/fileRobot_blue.png" alt="">
                        <!-- <div class="yunpao"
                        v-if="robotIndex == item.id && showFloatrobot"
                        >
                            <div>在线时长：{{item.date}}</div>
                            <div>发现重点人群：{{item.person}}</div>
                        </div> -->
                    </div>
            </template>

            <!-- 弹弹泡 shanIndex 等于item.id的时候它出现闪烁 v-show="shanIndex == item.id" -->
            <div class="paoBox"
            v-for="item in shanList"
            :ref="item.id"
            :key="item.id"
            :style="{top: item.top,left: item.left}"
            v-show="tanIndex == item.id"
            >
                <div class="imgBox">
                    <img v-for="(img,imgx) in item.imgList" :key="imgx" :src="img" alt="">
                </div>
            </div>

        </div>
        <!-- 中间弹窗-框架 -->
        <template v-if="centerShow">
            <StatisAnalys :community="community" :personType="personType" @closew='closewClick' />
        </template>
        <!-- 处理弹框 -->
        <div class="management" v-if="managementShow">
            <div class="showKuang">
                <MenentBox :personnelId="personnelId"  @closeMent="closeMent" />
            </div>
        </div>
        <!-- 密码确认 -->
        <template v-if="confrimShow">
            <ConfirmComp @isConfrim='isConfrim' @closethis='closethis' />
        </template>
        <!-- 消防详情 -->
        <template v-if="fierDetailShow">
            <FierDetail @onclose="fierClose" />
        </template>
        <!-- 火警误报 -->
        <template v-if="fierErrorShow">
            <FierError @closethis="fierErrorClose" />
        </template>
        <!-- 火警确认 -->
        <template v-if="fierConfirm">
            <FierConfirm @closethis="fierConfirClose" />
        </template>
        <!-- 楼层指挥平面图 -->
        <template v-if="commandPlanShow">
            <CommandPlan @closethis="CommandPlanClose" />
        </template>
        <!-- 日志 -->
        <template v-if="journalCompShow">
            <JournalComp @closethis="journalCompClose" />
        </template>
        <!-- 设备详情 -->
        <template v-if="deviceDetailsShow">
            <DeviceDetails @closethis="deviceDetailsClose" device="点型光电23343" />
        </template>
    </div>
</template>
<script>    
import vueSeamless from 'vue-seamless-scroll'
import bus from '../../api/bus.js'
import HeaderTop from '../components/HeaderTop'
import StatisAnalys from '../components/StatisticalAnalysis' // 统计分析
import MenentBox from '../components/MementBox' // 处置组件
import CarPageS from './CarPageS';
import HousePageS from './HousePageS';
import '../../assets/echartsData/customed.js'
import ConfirmComp from '../components/ConfirmComp' //确认弹框
import FierDetail from '../components/FierDetail' // 消防详情弹框
import FierError from '../components/FierError' // 火警误报
import FierConfirm from '../components/FierConfirm' // 火警确认
import FireControlS from './FireControlS' // 消防详情
import CommandPlan from '../components/CommandPlan' // 楼层指挥平面图
import JournalComp from '../components/JournalComp' // 日志
import DeviceDetails from '../components/DeviceDetails' // 设备详情
import {wsChange, syChange,importantOne,abnormal} from '../echartsData/statisAnaly.js'


export default {
    components:{
        vueSeamless,
        HeaderTop,
        StatisAnalys,
        MenentBox,
        CarPageS,
        HousePageS,
        ConfirmComp,
        FireControlS,
        FierDetail,
        FierError,
        FierConfirm,
        CommandPlan,
        JournalComp,
        DeviceDetails
    },
    computed: {
    optionSetting () {
            return {
                step: 0.2, // 数值越大速度滚动越快
            }
        }
    },
    data(){
        return{
            deviceDetailsShow: false, // 设备详情
            journalCompShow: false, // 日志
            commandPlanShow: false, // 楼层指挥平面图
            fierConfirm: false, // 火警确认
            fierErrorShow: false, // 火警误报
            fierDetailShow: false,  // 消防详情
            confrimShow: false, // 确认弹框
            robotImgShow: true, //机器人是否展示
            // 顶部悬浮框数据
            newTopFloatInfo:[
                {
                    id: '',
                    name: '总人数',
                    number: 0
                },
                {
                    id: '1',
                    name: '实有人数',
                    number: 0
                },
                {
                    id: '2',
                    name: '未实人数',
                    number: 0
                },
                {
                    id: '3',
                    name: '流动人口',
                    number: 0
                },
                {
                    id: '4',
                    name: '重点人群',
                    number: 0
                },
                {
                    id: '5',
                    name: '关怀人群',
                    number: 0
                },
                {
                    id: '6',
                    name: '租住人群',
                    number: 0
                },
                {
                    id: '7',
                    name: '涉疆涉藏',
                    number: 0
                }
            ],
            isShowPageIndex: 1, // 1 - 人  2 - 车  3 - 房
            // 底部悬浮框数据
            newBottomFloatInfo:[
                {
                    id: 1,
                    name: '人',
                    number: 0
                },
                {
                    id: 2,
                    name: '车',
                    number: 0
                },
                {
                    id: 3,
                    name: '房',
                    number: 0
                },
                {
                    id: 5,
                    name: '监控探头',
                    number: 105
                },
                {
                    id: 6,
                    name: '消防',
                    number: 456
                }
            ],
            // 左侧统计数据
            leftTong:{
                month: 157,
                day: 8
            },
            // 右侧统计数据
            rightTong: [
                {
                    title: '类型',
                    day: '今日',
                    month: '本月'
                },
                {
                    title: '非法上访',
                    day: 1,
                    month: 4
                },
                {
                    title: '涉恐人员',
                    day: 0,
                    month: 2
                },
                {
                    title: '涉毒人员',
                    day: 0,
                    month: 4
                },
                {
                    title: '社区矫正',
                    day: 3,
                    month: 5
                },
                {
                    title: '刑释解教',
                    day: 1,
                    month: 4
                }
            ],
            // 左侧-普通人员-滚动列表
            leftGroupList:[],
            // 右侧-重点人员-滚动列表
            rightGroupList: [],
            
            // 全部随机获取重点人员数据
            allpushlist:[],
            // 机器人列表
            showFloatrobot: false, //控制机器人头部框
            centerZsFloat: [
                {
                    id: 'r1',
                    top: '32%',
                    left: '52%',
                    date: '382小时',
                    person: '56人次', 
                    url: 'pelopePageX', // 小区端
                },
                {
                    id: 'r2',
                    top: '82%',
                    left: '65%',
                    date: '523小时',
                    person: '71人次',
                    url: 'pelopePageX', // 小区端
                }
            ],
            // 消防机器人
            fireRobotList:[
                {
                    id: 'r1',
                    top: '32%',
                    left: '52%',
                    date: '382小时',
                    person: '56人', 
                    url: 'pelopePageX', // 小区端
                },
                {
                    id: 'r2',
                    top: '82%',
                    left: '65%',
                    date: '523小时',
                    person: '71人',
                    url: 'pelopePageX', // 小区端
                }
            ],
            // 闪烁索引
            shanIndex: 1,
            // 中间飞动头像
            flyImg: require('../../assets/twopage/pao.png'), 
             // 闪烁头像列表
            shanList:[
                {
                    id: 'qwe1',
                    top: '45%',
                    left: '30%',
                    imgList: [
                        require('../../assets/twopage/pao.png'),
                    ],
                },
                {
                    id: 'qwe2',
                    top: '40%',
                    left: '37%',
                    imgList: [
                        require('../../assets/twopage/pao.png'),
                    ],
                },
                {
                    id: 'qwe3',
                    top: '38%',
                    left: '45%',
                    imgList: [
                        require('../../assets/twopage/pao.png'),
                    ],
                },
                {
                    id: 'qwe4',
                    top: '55%',
                    left: '48%',
                    imgList: [
                    ],
                },
                {
                    id: 'qwe5',
                    top: '45%',
                    left: '53%',
                    imgList: [
                    ],
                },
                {
                    id: 'qwe6',
                    top: '67%',
                    left: '58%',
                    imgList: [
                    ],
                }
            ],
            shanTimes: null,
            // 机器人弹跳索引
            robotIndex: '',
            // 弹弹泡索引
            tanIndex: '',
            robotKuang: false, //控制机器人头上框的显示
            robotTimes: null, // 机器人定时器times
            flyBoxShow: false, // 控制机器人飞
            //  webscoket  ////////////////////////////////////////////////////////////////////////////////////////////
            socket:null, // scoket实例
            userId: 'test01', // 链接对象id
            toUserId:'2',
            content:'3',
            // 中间弹窗是否显示
            centerShow: true,
            // 处置弹框
            managementShow: false,
            // 处置组件数据
            popData:{
                url: '', // 头像
                name: ''
            },
            // 列表请求类型
            personType: '',
            // 选中小区
            community: 2,
            personnelId: 1, //人员id
            centerShow: false,
            // 列表请求类型
            personType: '',
            timer: null, // 机器人跳动计时器
        }
    },
    mounted(){
        this.getPersonTopData()
        this.openSocket()
        console.log('scoket', this.socket)
        
        setInterval(()=>{
            if(Math.random()*10 > 6.5){
                this.leftTong.day++
                this.leftTong.month++
            }
        },5000)
        this.getGroupListData()
        this.getPerBomData()
        if(this.isShowPageIndex == 1){
            // this.drChart()
            this.getEchartsData()
        }

        


    },
    beforeDestroy(){
        console.log('SSSS我退出了')
        if(this.socket){
            this.socket.close();
        }
        this.socket = null;
    },
    methods:{
        deviceDetailsClose(){
            this.deviceDetailsShow = false
        },
        journalCompClose(){
            this.journalCompShow = false
        },
        CommandPlanClose(){
            this.commandPlanShow = false
        },
        // 关闭确认弹窗
        closethis(){
            this.confrimShow = false
        },
        fierClose(){
            this.fierDetailShow = false
        },
        fierErrorClose(){
            this.fierErrorShow = false
        },
        fierConfirClose(){
            this.fierConfirm = false
        },
        // 是否已经确认
        isConfrim(res){
            console.log('是否已经确认', res)
        },
        getPerBomData(){
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-bottom`,{params:{
                plot_id: ''
                }}).then(res =>{
                // console.log('人员底部', res)
                if(res.status == 200){
                    let names = res.data
                    this.newBottomFloatInfo.forEach(item => {
                        if(item.name == '人') this.newBottomFloatInfo[0].number = names.总人数 
                        if(item.name == '车') this.newBottomFloatInfo[1].number = names.车辆数
                        if(item.name == '房') this.newBottomFloatInfo[2].number = names.房屋数 
                    })
                }
            })
        },
        getPersonTopData(){
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-top`,{params:{
                plot_id: ''
                }}).then(res =>{
                // console.log('人员横向', res)
                if(res.status == 200){
                    let names = res.data
                    this.newTopFloatInfo.forEach(item => {
                        if(item.name == '总人数') this.newTopFloatInfo[0].number = names.总人数 
                        if(item.name == '实有人数') this.newTopFloatInfo[1].number = names.实有人数 
                        if(item.name == '未实人数') this.newTopFloatInfo[2].number = names.未实人数 
                        if(item.name == '流动人口') this.newTopFloatInfo[3].number = names.流动人口 
                        if(item.name == '重点人群') this.newTopFloatInfo[4].number = names.重点人群 
                        if(item.name == '关怀人群') this.newTopFloatInfo[5].number = names.关怀人群 
                        if(item.name == '租住人群') this.newTopFloatInfo[6].number = names.租住人群 
                        if(item.name == '涉疆涉藏') this.newTopFloatInfo[7].number = names.涉疆涉藏 
                    })
                }
            })
        },
        changeIShowIndex(id){
             this.robotImgShow = false
            clearInterval(this.timer)
            this.timer = null
            console.log(id)
            this.isShowPageIndex = id
            if(id == 1){ //人-首页 
                this.openSocket()
                this.robotImgShow = true 
                this.getEchartsData()
                this.drChart()

            }else if(id == 6){
                this.timer = setInterval(()=>{

                    this.fireRobotJump('fire1')
                },5000)
                this.robotImgShow = false
                // 关闭socket
                if(this.socket){
                    this.socket.close();
                    this.socket = null;
                }
            }
            else{//  非人页面
                // 关闭socket
                if(this.socket){
                    this.socket.close();
                    this.socket = null;
                }
                this.robotImgShow = true
            }
        },
        drChart(){
            this.$nextTick(()=>{
                    
                let echarts1 = this.$echarts.init(document.getElementById("echarts1"),"customed");
                echarts1.setOption(wsChange, "customed");
                let echarts2 = this.$echarts.init(document.getElementById("echarts2"),"customed");
                echarts2.setOption(syChange, "customed");
                let echarts3 = this.$echarts.init(document.getElementById("echarts3"),"customed");
                echarts3.setOption(importantOne, "customed");
                let echarts4 = this.$echarts.init(document.getElementById("echarts4"),"customed");
                echarts4.setOption(abnormal, "customed");
            })
        },
        // 获取图表数据
        getEchartsData(){
            // 未实人员变化
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-unusual-io`,{
                params: {plotId: ''}
            }).then(res =>{
                // console.log('未实人员变化数',res)
                if(res.status == 200){
                    let xAxData = []
                    let yAxData = []
                    res.data.forEach(item =>{
                        xAxData.push(item.时间)
                        yAxData.push(item.数据)
                    }) 
                    wsChange.xAxis.data = xAxData
                    wsChange.series[0].data = yAxData
                    console.log('[[[',wsChange.xAxis.data ,wsChange.series[0].data)
                    this.drChart()
                }
            })

            // 实有人口变化
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-checkd-trend`,{
                params: {plotId: ''}
            }).then(res =>{
                // console.log('实有人口变化',res)
                if(res.status == 200){
                    let xAxData = []
                    let yAxData = []
                    res.data.forEach(item =>{
                        xAxData.push(item.月份)
                        yAxData.push(item.数据)
                    }) 
                    syChange.xAxis.data = xAxData
                    syChange.series[0].data = yAxData
                    this.drChart()
                }
            })

            // 重点人员巡查次数
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-emphasis-personnel-inspection-trend`,{
                params: {plotId: ''}
            }).then(res =>{
                // console.log('重点人员巡查次数',res)
                if(res.status == 200){
                    let xAxData = []
                    let yAxData = []
                    res.data.forEach(item =>{
                        xAxData.push(item.时间)
                        yAxData.push(item.数据)
                    }) 
                    importantOne.xAxis.data = xAxData
                    importantOne.series[0].data = yAxData
                    this.drChart()
                }
            })

            // 异常出入记录
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-unusual-io`,{
                params: {plotId: ''}
            }).then(res =>{
                // console.log('异常出入记录',res)
                if(res.status == 200){
                    let xAxData = []
                    let yAxData = []
                    res.data.forEach(item =>{
                        xAxData.push(item.时间)
                        yAxData.push(item.数据)
                    }) 
                    abnormal.xAxis.data = xAxData
                    abnormal.series[0].data = yAxData
                    this.drChart()
                }
            })

        },
        // 获取右侧滚动列表数据
        getGroupListData(){
            this.$http.get(`${process.env.VUE_APP_1_URL}/other-weapp-personnel_disposal`).then(res =>{
                // console.log('右侧滚动列表数据', res)
                if(res.status == 200){
                    let resData = res.data.records
                    let newData = resData.map(item =>{
                        let colors = ''
                        let status = ''
                        if(item.category_name == '非法上访') colors = 'border: 2px solid #43FBB9'
                        if(item.category_name == '涉恐人员') colors = 'border: 2px solid #FBF143'
                        if(item.category_name == '刑释解教') colors = 'border: 2px solid #FF40E8'
                        if(item.category_name == '社区矫正') colors = 'border: 2px solid #FB4F43'
                        if(item.category_name == '涉毒人员') colors = 'border: 2px solid #43FBB9'
                        if(item.状态 == '1') status = '未处置'
                        if(item.状态 == '2') status = '已处置'
                        if(item.状态 == '0') status = '已通知'
                        return {
                            personnel_id: item.personnel_id, //人员id
                            img: item.人像,
                            name: item.姓名,
                            color: colors,
                            cnType: item.类型,
                            start: 5,
                            status: status,
                            address: item.通道,
                            date: item.时间,
                            }
                    })
                    this.rightGroupList = newData
                }
            })
        },
        // 关闭处置弹框
        closeMent(){
            this.managementShow = false
        },
        // 切换小区
        changeCummuity(com){
            this.community = com
        },
        // 打开一人一档  人员详情
        openDetails(item){
            console.log('item', item)
            this.personType = item.id
            this.centerShow = true
        },
        // 关闭中间弹窗
        closewClick(){
            this.centerShow = false
        },
        // 弹弹泡弹跳
        tanIndexJump(tid){
            const tan1 = this.$refs[tid][0]

            tan1.style.transform = 'scale(0.99)'
            tan1.style.opacity = 1
            setTimeout(()=>{
                tan1.style.transform = 'scale(1.2)'
            },500)
            setTimeout(()=>{
                tan1.style.transform = 'scale(.99)'
            },1000)
            setTimeout(()=>{
                tan1.style.transform = 'scale(1.2)'
            },1500)
            setTimeout(()=>{
                tan1.style.transform = 'scale(.99)'
                tan1.style.opacity = 0
            },2000)
            setTimeout(()=>{
                tan1.style.opacity = 0
            },2200)

        },
        // 消防机器人跳动 传入机器人id fire1 / fire2
        fireRobotJump(rid){
            const robot1x = this.$refs.r1fire[0]
            const robot2x = this.$refs.r2fire[0]
            const imgBlue = require('../../assets/newver/fileRobot_blue.png')
            const imgRed = require('../../assets/newver/fileRobot-red.png')
            if(rid == 'fire1'){
                console.log('机器人1', robot1x.children[0].src)
                this.showFloatrobot = true
                robot1x.style.top = (parseInt(robot1x.style.top) - 5) + '%';
                robot1x.children[0].src = imgRed
                setTimeout(()=>{
                    if(this.isShowPageIndex != 6) return
                    robot1x.style.top = (parseInt(robot1x.style.top) + 5) + '%';
                },500)
                setTimeout(()=>{
                    if(this.isShowPageIndex != 6) return
                    robot1x.style.top = (parseInt(robot1x.style.top) - 5) + '%';
                },1000)
                setTimeout(()=>{
                    if(this.isShowPageIndex != 6) return
                    robot1x.style.top = (parseInt(robot1x.style.top) + 5) + '%';
                    robot1x.children[0].src = imgBlue
                    this.showFloatrobot = false
                },1500)
            }else if(rid == 'fire2'){
                this.showFloatrobot = true
                robot2x.style.top = (parseInt(robot2x.style.top) - 5) + '%';
                robot2x.children[0].src = imgRed
                setTimeout(()=>{
                    if(this.isShowPageIndex != 6) return
                    robot2x.style.top = (parseInt(robot2x.style.top) + 5) + '%';
                },500)
                setTimeout(()=>{
                    if(this.isShowPageIndex != 6) return
                    robot2x.style.top = (parseInt(robot2x.style.top) - 5) + '%';
                },1000)
                setTimeout(()=>{
                    if(this.isShowPageIndex != 6) return
                    robot2x.style.top = (parseInt(robot2x.style.top) + 5) + '%';
                    robot2x.children[0].src = imgBlue
                    this.showFloatrobot = false
                },1500)
            }
        },
        // 机器人弹跳
        robotJump(rid){
            const robot1 = this.$refs.r1[0]
            const robot2 = this.$refs.r2[0]
            // return
            if(rid == 'r1'){
                // console.log('r1')
                this.showFloatrobot = true
                robot1.style.top = (parseInt(robot1.style.top) - 5) + '%';
                setTimeout(()=>{
                    robot1.style.top = (parseInt(robot1.style.top) + 5) + '%';
                },500)
                setTimeout(()=>{
                    robot1.style.top = (parseInt(robot1.style.top) - 5) + '%';
                },1000)
                setTimeout(()=>{
                    robot1.style.top = (parseInt(robot1.style.top) + 5) + '%';
                    this.showFloatrobot = false
                },1500)
            }else if(rid == 'r2'){
                // console.log('r2')
                this.showFloatrobot = true
                robot2.style.top = (parseInt(robot2.style.top) - 5) + '%';
                setTimeout(()=>{
                    robot2.style.top = (parseInt(robot2.style.top) + 5) + '%';
                },500)
                setTimeout(()=>{
                    robot2.style.top = (parseInt(robot2.style.top) - 5) + '%';
                },1000)
                setTimeout(()=>{
                    robot2.style.top = (parseInt(robot2.style.top) + 5) + '%';
                    this.showFloatrobot = false
                },1500)
            }
        },
        // websocket 链接
        openSocket() {
            let _this = this
            if (typeof WebSocket == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
                //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
                var socketUrl = "http://124.71.140.59:8080/imserver/" + this.userId; http:
                socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
                    console.log(socketUrl);
                if (this.socket != null) {
                    this.socket.close();
                    this.socket = null;
                }
                this.socket = new WebSocket(socketUrl);
                    //打开事件
                this.socket.onopen = function() {
                    console.log("websocket已打开");
                };
                //接收消息事件
                this.socket.onmessage = function(msg) {
                    // console.log('来自服务器的消息2', msg);
                    if(msg.data == '连接成功'){
                        return
                    }
                    let data = JSON.parse( msg.data )
                    if(!(data instanceof Array)) {
                        console.log('错误！socket消息只接收Array数据')
                        return 
                    }
                    let newList = []
                    data.forEach(item =>{
                        // console.log('ididid', item.monitorDeviceid)
                        // 普通人员列表数据处理
                        if(item.personnelType == 0){ //new Date(1604054748531).toLocaleString()
                            let date = new Date(item.distinguishTime).toLocaleString()
                            item.date = date
                            item.color = 'border: 2px solid #FF7500'
                            _this.leftGroupList.push(item)
                        }else if(item.personnelType == 1){
                            let date = new Date(item.distinguishTime).toLocaleString()
                            item.date = date
                            item.name = '未知'
                            item.color = 'border: 2px solid #FFFFFF'
                            item.address = ''
                            // console.log('itemitemitem',item)
                            _this.leftGroupList.push(item)
                        }
                        // 弹弹泡逻辑
                        _this.shanList.forEach((option,index) =>{
                            // id相同 向相同id数据下push头像
                            if(item.monitorDeviceid && item.monitorDeviceid == option.id){
                                _this.tanIndex = item.monitorDeviceid
                                newList.push(item.pFaceUri)
                               let obj = {
                                   id: option.id,
                                   top: option.top,
                                   left: option.left,
                                   imgList: newList
                               }
                                _this.shanList.splice(index, 1, obj)
                                _this.tanIndexJump(item.monitorDeviceid)
                                let num = Math.random()*10
                                console.log('oooooooooooooo', num)
                                if(num > 9.5){
                                    _this.flyImg = item.pFaceUri
                                    _this.flyBoxShow = true
                                    let newObj = _this.allpushlist[parseInt(Math.random()*10)]
                                    newObj.img = item.pFaceUri
                                    setTimeout(()=>{
                                        // 添加
                                        _this.rightGroupList.unshift(newObj)
                                        _this.rightTong[Math.floor(Math.random() * (1 - 5 + 1) + 5)].day++
                                        _this.rightTong[Math.floor(Math.random() * (1 - 5 + 1) + 5)].month++
                                        _this.flyBoxShow = false
                                    },2000)
                                }
                            }
                        })
                        // 机器人弹跳逻辑
                        _this.centerZsFloat.forEach((robot,robotx) =>{
                            if(item.robotid && item.robotid == robot.id){   
                                _this.robotIndex = item.robotid
                               _this.robotJump(item.robotid)
                            }
                        })
                    })
                };
                //关闭事件
                this.socket.onclose = function() {
                    console.log("websocket链接已关闭");
                };
                //发生了错误事件
                this.socket.onerror = function() {
                    console.log("websocket发生了错误", this.socket.readyState);
                };
            }
    },
    sendMessage() {
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket")
      } else {
        console.log("您的浏览器支持WebSocket")
        console.log('{"toUserId":"' +this.toUserId + '","contentText":"' +this.content +'"}')
        this.socket.send('{"toUserId":"' + this.toUserId + '","contentText":"' + this.content + '"}' )
      }
    
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 定时器，让机器人跳动
        robotSetTime(){
            clearInterval(this.robotTimes)
            this.shanTimes = null
            this.robotTimes = setInterval(()=>{
                if(this.robotIndex == 1){
                    this.robotIndex = 2
                }else if(this.robotIndex == 2){
                    this.robotIndex = 1
                }
            },5000)
        },
        // 定时器，让按钮循环闪烁
        shanSetTime(){
            clearInterval(this.shanTimes)
            this.shanTimes = null
            let length = this.shanList.length
            let index = 1
            this.shanTimes = setInterval(()=>{
                if(this.shanIndex == length){
                    this.shanIndex = 1
                }else{
                    if(this.shanIndex == 3){
                        this.flyBoxShow = true
                        setTimeout(()=>{
                            this.flyBoxShow = false
                            this.rightGroupList.unshift(this.rightGroupList[parseInt(Math.random()*10)])
                        },2000)
                    }
                    this.shanIndex++
                }
            },1000)
        },
        // 出入记录按钮
        churuLlist(){
            
        },
        // 处置按钮跳转
        navatar(item){
            this.personnelId = item.personnel_id
            console.log('this.personnelId',this.personnelId)
            this.managementShow = true
        },
        
    }
   
}
</script>
<style lang="less" scoped>
.digPenson{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: MicrosoftYaHei;
    .header_box_new{
        width: 100%;
        height: 70px;
    }
    .mapBox{
        width: 100%;
        height: calc(100% - 90px);
        box-sizing: border-box;
        background-image: url('../../assets/twopage/interCenterMap.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        position: relative;
        .new_top_float,.new_bottom_float{
            width: 55%;
            height: 70px;
            position: absolute;
            left: 22%;
            display: flex;
            align-items: center;
            .float_t_item,.float_b_item{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .float_t_item{
                width: 80px;
                height: 80px;
                background-image: url('../../assets/newver/sixb.png');
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #53F6F2;
                line-height: 19px;
                letter-spacing: 1px;
            }
            .float_b_item{
                width: 98px;
                height: 63px;
                border-radius: 50%;
                background: rgba(17, 25, 64, 0.5);
                border-radius: 5px;
                border: 1px solid #53F6F2;
                margin: 0 10px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 19px;
                letter-spacing: 1px;
                backdrop-filter: blur(10px);
            }
            .float_b_item.active{
                background: rgba(83, 246, 242, 0.5);
                color: #333333;
            }
        }
        // 顶部悬浮框
        .new_top_float{
            width: 50%;
            left: 25%;
            top: 1%;
            justify-content: space-between;
        }
        // 底部悬浮框
        .new_bottom_float{
            bottom: 1%;
            justify-content: center;
            z-index: 1999;
        }
        // 左侧/右侧悬浮框
        .new_left_float,.new_right_float{
            height: 100%;
            position: absolute;
            top: 0;
            width: 22%;
            box-sizing: border-box;
            padding: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .seamless{
                height: 100%;
                overflow: hidden;
            }
            // 顶部看板
            .new_topbar{
                width: 100%;
                height: 10%;
            }
            // 中间滚动框
            .new_group_box{
                width: 100%;
                height: 40%;
            }
            // 底部图表
            .new_tubiao{
                width: 100%;
                height: 49%;
                
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 5px    ;
                .echarts_box{
                    width: 100%;
                    height: 49%;
                    background: rgba(3, 11, 34, 0.5);
                    backdrop-filter: blur(10px);
                    border-radius: 10px;
                    box-sizing: border-box;
                    padding: 10px;
                    .new_title{
                        color: #ffffff;
                        width: 100%;
                        height: 25px;
                        line-height: 25px;
                        font-size: 14px;
                    }
                    .echartsBox{
                        width: 100%;
                        height: calc(100% - 25px);
                        
                        // background-color: pink;
                    }
                }
            }
        }
        // new 左侧悬浮
        .new_left_float{
            left: 0;
            .leftShow{
                width: 100%;
                height: 100%;
                background-color: rgba(3, 11, 34, 0.5);
                backdrop-filter: blur(10px);
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
                    color: #ffffff;
                    line-height: 19px;
                }
            }
            .left_item{
                width: 100%;
                height: 75px;
                background-color: rgba(3, 11, 34, 0.5);
                backdrop-filter: blur(10px);
                border-radius: 5px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 10px;
                padding-left: 20px;
                margin-bottom: 10px;
                font-size: 12px;
                color: #ffffff;
                line-height: 16px;
                img{
                    width: 42px;
                    height: 56px;
                    margin-right: 10px;
                }
            }
        }
        // new 右侧悬浮
        .new_right_float{
            right: 0;
            .rightShow{
                width: 100%;
                height: 100%;
                // background-color: rgba(3, 11, 34, 0.5);
                background-color: rgba(3, 11, 34, 0.5);
                backdrop-filter: blur(10px);
                border-radius: 5px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .rightItem{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    font-size: 14px;
                    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                    color: #ffffff;
                    line-height: 21px;
                    letter-spacing: 1px;
                    .title{
                        font-weight: bold;
                    }
                }
            }
            .right_item{
                width: 100%;
                height: 88px;
                background-color: rgba(3, 11, 34, 0.5);
                backdrop-filter: blur(10px);
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 10px;
                margin-bottom: 10px;
                
                .left_box{
                    display: flex;
                }
            
                .btnBox{
                    width: 10%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    box-sizing: border-box;
                    padding-right: 10px;
                    .btn1{
                        width: 71px;
                        height: 25px;
                        border-radius: 15px;
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 25px;
                        letter-spacing: 1px;
                        cursor: pointer;
                    }
                    .btn2{
                        width: 60px;
                        height: 25px;
                        background: #4396FB;
                        border-radius: 15px;
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 25px;
                        letter-spacing: 1px;
                        cursor: pointer;
                    }
                }
                .textB{
                    width: 90%;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    color: #ffffff;
                    line-height: 21px;
                    letter-spacing: 1px;
                    .start{
                        width: 12px;
                        height: 12px;
                        margin: 0;
                    }
                    div{
                        margin-bottom: 5px;
                    }
                }
                img{
                    width: 52px;
                    height: 66px;
                    margin-right: 10px;
                }
            }
        }

        @keyframes flybox {
            0%{
                left: 45%;
                top: 38%;
                opacity: 0.2;
            }
            50%{
                transform: scale(2);
                opacity: 1;
            }
            100%{
                top: 25%;
                left: 74%;
                opacity: 0.8;
            }
        }
        // 飞pao
        .flyBox{
            width: 40px;
            height: 40px;
            position: absolute;
            background: #ffffff;
            border-radius: 50%;
            top: 25%;
            left: 74%;
            opacity: 0;
            animation: flybox 2s ease-in;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        // 泡
        @keyframes shans {
            0%{
                transform: scale(.99);
                opacity: 1;
            }
            50%{
                transform: scale(1.2);
                opacity: 1;
            }
            100%{
                transform: scale(.99);
                opacity: 1;
            }
        }
        .paoBox{
            width: 40px;
            height: 40px;
            position: absolute;
            top: 50%;
            left: 20%;
            // animation: shans 2s;
            margin: 0;
            // opacity: 0.1;
            .imgBox{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                img{
                    width: 40px;
                    height: 40px;
                    margin: 0;
                    border-radius: 50%;

                }
            }
            
        }
        @keyframes test{
            0%{
                transform: translateY(-100%);
                    opacity: 1;
            }
            25%{
                transform: translateY(0%);
            }
            50%{
                transform: translateY(-100%);
                opacity: 0.8;
            }
            75%{
                transform: translateY(0%);
            }
            100%{
                transform: translateY(0%);
                opacity: 1;
            }
        }
        @keyframes showOptions {
            0%{
                opacity: 1;
            }
            100%{
                opacity: 1;
            }
        }
        .robotr1,.robotr2{
            width: 30px;
            height: 30px;
            // background-color: thistle;
            position: absolute;
            cursor: pointer;
            animation: all 2s ease;
            .yunpao{
                width: 190px;
                height: 60px;
                background-image: url("../../assets/twopage/yunpao.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                -moz-background-size: 100% 100%;
                display: block;
                position: absolute;
                top: -220%;
                right: -380%;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 19px;
                letter-spacing: 1px;
                box-sizing: border-box;
                padding: 10px;
                opacity: 0;
                animation: showOptions 2s;
            }
        }
        
        .mapFloatBox{
            width: 178px;
            height: 88px;
            box-sizing: border-box;
            padding: 10px;
            background-color: rgba(3, 11, 34, 0.5);
            backdrop-filter: blur(10px);
            box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
            border-radius: 5px;
            border: 2px solid;
            border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
            position: absolute;
            top: 50%;
            left: 20%;
            .title{
                font-size: 14px;
                font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                font-weight: bold;
                color: #38A2F7;
                line-height: 19px;
                letter-spacing: 1px;
                margin-bottom: 5px;
            }
            .text{
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 19px;
                letter-spacing: 1px;
            }
            .address{
                width: 30px;
                height: 30px;
                position: absolute;
                left: 45%;
                bottom: -40%;
            }
        }
        
    }
    // 中间弹窗框
    .centerkuang{
        width: 100%;
        height: 100%;
        background: rgba(3, 11, 34, 0.7);
        position: fixed;
        top: 0;
        left: 0;
        .showKuang{
            width: 80%;
            height: 90%;
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
}
</style>