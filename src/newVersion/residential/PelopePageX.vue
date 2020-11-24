<template>
    <div class="xiaoqu">
        <!-- new人员页面-小区端 -->
        <!-- 头部header -->
        <div class="header_box_new">
            <HeaderTop @changeCummuity="changeCummuity" :title="communityStr" />
        </div>
        <div class="mapBox">           
            <!-- 底部悬浮new -->
            <div class="new_bottom_float" v-show="isBomShow">
                <div class="float_b_item" 
                :class="{float_b_item:1,active: isShowPageIndex == item.id}" 
                v-for="(item,index) in newBottomFloatInfo" :key="index+'b'"
                @click="changePage(item.id)"
                
                >
                    <div>{{item.name}}</div>
                    <div>{{item.number}}</div>
                </div>
            </div>
            <!-- seium地图组件 -->
            <seium-com :cesiumData="cesiumData" @houseClick='houseClick' @cameraCLick="cameraCLick" @openCommandplan="openCommandplan" />
            <!-- 人 -->
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
            <!-- 车 -->
            <template v-if="isShowPageIndex === 2">
                <CarPageX :community="community" />                
            </template>
            <!-- 房 -->
            <template v-if="isShowPageIndex === 3">
                <HousePageX :community="community" />                
            </template>
            <!-- 楼栋 -->
            <template v-if="isShowPageIndex === 4">
                <Building :buildingId="buildingId" />
            </template>
            <template v-if="isShowPageIndex === 6">
                <FireControlX :community="community" />
            </template>
        </div>
        
        <!-- 中间弹窗 -->
        <template v-if="centerShow">
            <StatisAnalys :community="community" :personType="personType" @closew='closewClick' />
        </template>
        <!-- 处理弹框 -->
        <div class="management" v-if="managementShow">
            <div class="showKuang">
                <MenentBox :personnelId="personnelId"  @closeMent="closeMent" />
            </div>
        </div>
        <template v-if="isVidisShow">
            <VidiosComp @closeVidio="closeVidio" :voUrl="voUrl" />
        </template>
        <template v-if="confrimShow">
            <ConfirmComp @isConfrim='isConfrim' @closethis='closethis' />
        </template>
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
            <CommandPlan @closethis="CommandPlanClose" :commname="commName" :id="commId" :items="items" />
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
import seiumCom from '../../components/CesiumCom.vue'
import vueSeamless from 'vue-seamless-scroll'
import bus from '../../api/bus.js'
import HeaderTop from '../components/HeaderTop'
import StatisAnalys from '../components/StatisticalAnalysis' // 统计分析
import MenentBox from '../components/MementBox' // 处置组件
import CarPageX from './CarPageX'; // 小区 - 车
import HousePageX from './HousePageX'; // 小区 - 房
import Building from './Building'; // 楼栋
import ConfirmComp from '../components/ConfirmComp' //确认弹框
import FierDetail from '../components/FierDetail' // 消防详情弹框
import FierError from '../components/FierError' // 火警误报
import FierConfirm from '../components/FierConfirm' // 火警确认
import FireControlX from './FireControlX'
import CommandPlan from '../components/CommandPlan' // 楼层指挥平面图
import JournalComp from '../components/JournalComp' // 日志
import DeviceDetails from '../components/DeviceDetails' // 设备详情
import {wsChange, syChange,importantOne,abnormal} from '../echartsData/statisAnaly.js'
import VidiosComp from '../components/VidioComp'
export default {
    components:{
        seiumCom,
        vueSeamless,
        HeaderTop,
        StatisAnalys,
        MenentBox,
        CarPageX,
        HousePageX,
        Building,
        VidiosComp,
        ConfirmComp,
        ConfirmComp,
        FireControlX,
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
                seiumData: ''
            }
        },
        // 小区中文信息
        communityStr(){
            if(this.community == 2) return '香槟国际'
            if(this.community == 1) return '锦屏佳苑'
        }
    },
    data(){
        return{
            items: '',
            commName: '智慧社区-香槟国际',
            commId: '',
            deviceDetailsShow: false, // 设备详情
            journalCompShow: false, // 日志
            commandPlanShow: false, // 楼层指挥
            fierConfirm: false, // 火警确认
            fierErrorShow: false, // 火警误报
            fierDetailShow: false,  // 消防详情
            confrimShow: false, // 确认弹框
            confrimShow: false,
            communityId: '', 
            voUrl: '', //视频url
            isVidisShow: false,
            isBomShow: true, // 隐藏底部按钮
            buildingId: 0, // 楼栋id
            // 小区id 香槟国际：2 锦屏佳苑：1

            // 控制人、车、房 三个页面
            isShowPageIndex: 1, // 1人、2车、3房 4 - 楼栋
            // 中间弹框显示
            centerShow: true,
            // 处置弹框
            managementShow: false,
            centerShow: false,
            // 列表请求类型
            personType: '',
            // 选中小区
            community: '2',
            personnelId: '1', //人员id
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
            // 向cesium传值
            cesiumData: {
                num: 1
            },
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
            // 左侧普通人员列表
            leftGroupList:[],
            // 右侧重点人员列表
            rightGroupList: [],
            // 全部随机获取重点人员数据
            allpushlist:[],
            //  webscoket  ////////////////////////////////////////////////////////////////////////////////////////////
            socket:null, // scoket实例
            userId: 'test02', // 链接对象id
            toUserId:'2',
            content:'3',
            // 设备数量
            eduNum: 0,
            // 设备列表
            eduList:[],
            routeInfo: {}, // 路由信息
        }
    },
    mounted(){
        this.routeInfo = this.$route.params
        this.openSocket()
        this.isBomShow = true
        this.community = localStorage.getItem('communityId')
        console.log('this.community',this.community)
        this.getPerBomData()
        this.getPersonTopData()
        this.getGroupListData()
        
        if(this.isShowPageIndex == 1){
            this.getEchartsData()
        }
        this.getVidData()

    },
    methods:{
        openCommandplan(id){
            console.log('消防点位id',id)
            let ids = 18086
            let items1 = {
                    building_name: "A座1",
                    company_name: "香槟国际",
                    deal_status: 0,
                    device_address: "2",
                    device_code: "13c49a56-721e-45cc-bee3-1fcd2761ca36",
                    device_id: 3,
                    device_name: "消防栓水压-开关二",
                    floor_name: "A座1一层",
                    id: 18093,
                    floor_id: 1,
                    program_name: "青岛海信数据中心",
                    updated_at: 1605428924,
                 }
                 let items2 = {
                    building_name: "A座1",
                    company_name: "香槟国际",
                    deal_status: 0,
                    device_address: "2",
                    device_code: "13c49a56-721e-45cc-bee3-1fcd2761ca36",
                    device_id: 3,
                    device_name: "消防栓水压-开关二",
                    floor_name: "A座1一层",
                    id: 18089,
                    floor_id: 1,
                    program_name: "青岛海信数据中心",
                    updated_at: 1605427122,
                 }
                 let items3 = {
                    building_name: "A座1",
                    company_name: "香槟国际",
                    deal_status: 0,
                    device_address: "3",
                    device_code: "5d56ad1e-ba45-4159-8e32-7c93c57eadbb",
                    device_id: 4,
                    device_name: "消防栓水压-模拟一",
                    floor_name: "A座1一层",
                    id: 18090,
                    floor_id: 1,
                    program_name: "青岛海信数据中心",
                    updated_at: 1605427122,
                 }

            if(id == 1){
                ids = items1.id
                this.items = JSON.stringify(items1)
            }
            if(id == 2){
                ids = items1.id
                this.items = JSON.stringify(items2)
            }
            if(id == 3){
                ids = items1.id
                this.items = JSON.stringify(items3)
            }
            this.commId = ids
            this.commandPlanShow = true
        },
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
        // 关闭确认弹窗
        closethis(){
            this.confrimShow = false
        },
        // 是否已经确认
        isConfrim(res){
            console.log('是否已经确认', res)
        },
        // 根据id获取视频数据
        getDviInfo(id){
            this.$http.get(`${process.env.VUE_APP_3_URL}/api/v1/stream/start.php`,{params:{serial: id}}).then(res =>{
                console.log('视频详情数据', res)
                if(res.status == 200){
                    this.voUrl = res.data.HLS
                    console.log('视频URLxxxxxx',this.voUrl)
                    this.isVidisShow = true
                }
            })
        },
        // 获取设备列表数据
        getVidData(){
            this.$http.get(`${process.env.VUE_APP_3_URL}/api/v1/device/list.php`).then(res =>{
                console.log('设备列表数据', res)
                if(res.status == 200){
                    this.eduList = res.data.DeviceList
                    this.eduNum = res.data.DeviceCount
                }
            })
        },
        // 监听摄像头被点击
        cameraCLick(carId){
            console.log('carId',carId)
            let data;
            if(this.eduNum == 0) return
            switch(carId){
                case 1:
                data = this.eduList[carId-1];
                break;
                case 2:
                data = this.eduList[carId-1];
                break;
                case 3:
                data = this.eduList[carId-1];
                break;
                case 4:
                data = this.eduList[carId-1];
                break;
                case 5:
                data = this.eduList[carId-1];
                break;
                case 6:
                data = this.eduList[carId-1];
                break;
                case 7:
                data = this.eduList[carId-1];
                break;
                case 8:
                data = this.eduList[carId-1];
                break;
                case 9:
                data = this.eduList[carId-1];
                break;
                case 10:
                data = this.eduList[carId-1];
                break;
                case 11:
                data = this.eduList[carId-1];
                break;
                case 12:
                data = this.eduList[carId-1];
                break;

            }
            console.log('查看选中的设备id', data)
            if(!data) return this.$message('该设备暂无视频数据！')
            this.getDviInfo(data.ID)
        },
        // 监听摄像头被点击
        closeVidio(){
            this.isVidisShow = false
        },
        // 监听地图组件房屋被点击事件
        houseClick(houseId){
            console.log('houseId', houseId)
            this.buildingId = houseId
            this.isShowPageIndex = 4
            this.isBomShow = false
            bus.$emit('houseIdChange', houseId)
        },
        getPersonTopData(){
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-top`,{params:{
                plot_id: this.community
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
        // 底部按钮数据
        getPerBomData(){
            console.log('底部按钮参数', this.community)
            this.$http.get(`${process.env.VUE_APP_1_URL}/home-person-bottom`,{params:{
                plot_id: this.community
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
                params:{plotId: this.community}
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
                params:{plotId: this.community}
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
                params:{plotId: this.community}
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
                params:{plotId: this.community}
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
                console.log('右侧滚动列表数据', res)
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
                            img: item.人像 || '',
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
        // 切换小区
        changeCummuity(com){
            this.community = com;
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
                    console.log(socketUrl,'66666');
                if (this.socket != null) {
                    this.socket.close();
                    this.socket = null;
                }
                // this.socket = new WebSocket(socketUrl);
                //     //打开事件
                this.socket = new WebSocket(socketUrl);
                    //打开事件
                this.socket.onopen = function() {
                    console.log("websocket已打开");
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                };
                //接收消息事件
                this.socket.onmessage = function(msg) {
                    console.log('来自服务器的消息com', msg);
                    if(msg.data == '连接成功'){
                        return
                    }
                    let data = JSON.parse( msg.data )
                    console.log('来自服务器的消息data', data);
                    if(!(data instanceof Array)) {
                        console.log('错误！socket消息只接收Array数据')
                        return 
                    }
                    // personnelType 0普通人员
                    // leftGroupList 普通人员列表
                    // leftList 重点人员列表
                    let newList = []
                    let imgList = []
                    let ids = null
                    data.forEach(item =>{
                        // console.log('ididid', item.monitorDeviceid)
                        // 触发子组件cesium的人员显示事件 qwe1
                        ids = item.monitorDeviceid
                        // 普通人员列表数据处理
                        if(item.personnelType == 0){ //new Date(1604054748531).toLocaleString()
                            let date = new Date(item.distinguishTime).toLocaleString()
                            item.date = date
                            item.color = 'border: 2px solid #FF7500'
                            _this.leftGroupList.push(item)
                            if(imgList.length < 4){
                                imgList.push(item.pFaceUri)
                            }
                        }else if(item.personnelType == 1){
                            let date = new Date(item.distinguishTime).toLocaleString()
                            item.date = date
                            item.name = '未知'
                            item.color = 'border: 2px solid #FFFFFF'
                            item.address = ''
                            _this.leftGroupList.push(item)
                            if(imgList.length < 4){
                                imgList.push(item.pFaceUri)
                            }
                        }
                        // 发现重点人员逻辑
                        let newObj = _this.allpushlist[parseInt(Math.random()*10)] // 随机获取一个内置重点人员
                        let num = Math.random()*10 // 获取一个1-10之间的开区间数
                        if(num > 9.5){ // 10%
                            newObj.img = item.pFaceUri // 改变人员的头像
                            if(item.personnelType == 0) {
                                newObj.name = item.name // 有姓名则改变姓名
                            }
                            _this.rightGroupList.unshift(newObj) // 将新的重点人员添加到右侧列表第一项中
                            // 触发一次 cesium 机器人变化事件
                            bus.$emit('robotRun')
                        }
                    })
                    let newImgList = imgList.map(item =>{
                        return item.replace('http://img-dev.wx.hmyccd.com', 'http://ws-dev.obs.cn-southwest-2.myhuaweicloud.com') // 替换华为云obs域名
                    })
                    let ces = {
                        id: ids, // 摄像头id qwe
                        imgList: newImgList // 人脸抓拍照片列表
                    }
                    

                    // return
                    console.log('摄像头点位4图片oooooooooooooooooooooooooces', ces)
                    // socket服务器消息图片跨域了 。。。。。 等待解决
                    bus.$emit('testSend', ces)
                };
                //关闭事件
                this.socket.onclose = function() {
                    console.log("websocket已关闭");
                };
                //发生了错误事件
                this.socket.onerror = function() {
                    console.log("websocket发生了错误");
                };
            }
        },
    // 出入记录按钮
        churuLlist(){
            // 改变index
            bus.$emit('pCindex')
            this.$router.push({name: 'gridFlow',params: {isShow: true}})
        },
        // 处置按钮跳转
        navatar(item){
            this.personnelId = item.personnel_id
            console.log('this.personnelId',item)
            // return
            this.managementShow = true
        },
        // 改变左右两侧页面
        changePage(id) {
            this.isShowPageIndex = id;
            if(id == 1){
                this.getEchartsData()
                this.drChart()
            }
        }
    }
}
</script>
<style scoped lang='less'>
.xiaoqu{
    width: 100%;
    height: 100%;
    .header_box_new{
        width: 100%;
        height: 70px;
    }
    .mapBox{
        width: 100%;
        height: calc(100% - 90px);
        box-sizing: border-box;
        position: relative; 
        .new_top_float,.new_bottom_float{
            width: 55%;
            height: 70px;
            // background-color: aquamarine;
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
            top: 20px;
            // left: 20px;
            width: 22%;
            box-sizing: border-box;
            // padding: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 20px transparent;
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
                    font-family: MicrosoftYaHei;
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
                font-family: MicrosoftYaHei;
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
            right: 20px!important;
            .rightShow{
                width: 100%;
                height: 100%;
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