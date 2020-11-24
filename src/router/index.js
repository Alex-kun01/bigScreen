import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../components/LogIn.vue'
import CesiumCom from '../components/CesiumCom.vue' // cesium香槟国际3D模型-地图组件
import CesiumComj from '../components/CesiumComj.vue' // cesium锦屏佳苑3D模型-地图组件
import PelopePageS from '../newVersion/communityEnd/PelopePageS.vue' // new 人员页面-社区端
import PelopePageX from '../newVersion/residential/PelopePageX.vue' // new 人员页面-小区端
import HeaderTop from '../newVersion/components/HeaderTop.vue' // new 头部
import StatisAnaly from '../newVersion/components/StatisticalAnalysis.vue' // new 统计分析-组件
import ViewDetails from '../newVersion/components/ViewDetails.vue' // new 查看详情-一人一档
import MenentBox from '../newVersion/components/MementBox.vue' // 处置组件
import ViewDetailsWsHouse from '../newVersion/components/ViewDetailsWsHouse.vue' // 房屋详情
import UnViewDetails from '../newVersion/components/UnViewDetails.vue' // 未实人员-详情
import VidioComp from '../newVersion/components/VidioComp.vue' // 视频播放组件
import StreePageJ from '../newVersion/streetPage/StreePageJ' // 街道端
import DistrictCounty from '../newVersion/streetPage/DistrictCounty' // 区县端

Vue.use(VueRouter)

const routes = [{ // 登录
        path: '/',
        name: 'login',
        component: LogIn
    },
    { // 新人员页面-社区端
        path: '/pelopePageS',
        name: 'pelopePageS',
        component: PelopePageS
    },
    { // 新人员页面-小区端
        path: '/pelopePageX',
        name: 'pelopePageX',
        component: PelopePageX
    },
    { // 新街道页面 - 街道端
        path: '/streePageJ',
        name: 'streePageJ',
        component: StreePageJ
    },
    { // 新区县页面 - 区县端
        path: '/districtCounty',
        name: 'districtCounty',
        component: DistrictCounty
    },
    {
        path: '/headerTop',
        name: 'headerTop',
        component: HeaderTop
    },
    { // Cesium香槟国际3D模型地图组件
        path: '/cesiumCom',
        name: 'cesiumCom',
        component: CesiumCom
    },
    { // Cesium锦屏佳苑3D模型地图组件
        path: '/cesiumComj',
        name: 'cesiumComj',
        component: CesiumComj
    },
    { // new 统计分析-组件
        path: '/statisAnaly',
        name: 'statisAnaly',
        component: StatisAnaly
    },
    { // new 查看详情-一人一档-组件
        path: '/viewDetails',
        name: 'viewDetails',
        component: ViewDetails
    },
    { // new 查看详情-未实人员
        path: '/unViewDetails',
        name: 'unViewDetails',
        component: UnViewDetails
    },
    {
        path: '/menentBox', // 处置-组件
        name: 'menentBox',
        component: MenentBox
    },
    {
        path: '/viewDetailsWsHouse', // 未实车辆组件
        name: 'viewDetailsWsHouse',
        component: ViewDetailsWsHouse
    },
    {
        path: '/vidioComp', // 视频组件
        name: 'vidioComp',
        component: VidioComp
    }
]

const router = new VueRouter({
    routes
})

export default router