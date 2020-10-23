import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import HeaderBox from '../views/HeaderBox.vue'
import NavigationBox from '../views/NavigationBox.vue'
import ContentShow from '../views/ContentShow.vue'
import AllPage from '../views/conpage/AllPage.vue'
import SuspectedFlow from '../views/SuspectedFlow.vue'
import MonitoringManagement from '../views/MonitoringManagement.vue'
import DrugRelated from '../views/conpage/DrugRelated.vue'
import Illegalpetition from '../views/conpage/Illegalpetition.vue'
import Terrorist from '../views/conpage/Terrorist.vue'
import SuspectedfTu from '../views/suspectedFlows/SuspectedfTu.vue'
import SuspectedHeader from '../views/suspectedFlows/SuspectedHeader.vue'
import ItemBox from '../views/ItemBox.vue'
import PopBox from '../views/popUpBox/PopBox.vue'
import FloatBox from '../views/conpage/floatBox/FloatBox.vue'
import MonPage1 from '../views/monitoring/MonPage1.vue'
import MonPage2 from '../views/monitoring/MonPage2.vue'
import Datalivelihood from '../views/staticPic/Datalivelihood.vue'
import DemographicInformation from '../views/staticPic/DemographicInformation.vue'
import HousingInformation from '../views/staticPic/HousingInformation.vue'
import PartyBuilding from '../views/staticPic/PartyBuilding.vue'
import TestIfarm from '../views/staticPic/TestIfarm.vue'
import BackstageManagement from '../views/staticPic/BackstageManagement.vue'
import MapCom from '../views/webGL/MapCom.vue'
import TwoIndex from '../pages/index/index.vue'
import DigitaLivelihod from '../pages/digitalLivelihood/DigitaLivelihod.vue'
import DigHeader from '../pages/digitalLivelihood/subset/DigHeader.vue'
import DigPenson from '../pages/digitalLivelihood/subset/DigPenson.vue'
import DigHouse from '../pages/digitalLivelihood/subset/DigHouse.vue'
import DigCase from '../pages/digitalLivelihood/subset/DigCare.vue'
import DigCar from '../pages/digitalLivelihood/subset/DigCar.vue'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/twoIndex',
    children: [
      {
        path: 'twoIndex', // 展示首页-搜索
        name: 'twoIndex',
        component: TwoIndex
      },
      {
        path: 'digitaLivelihod', // 数字民生
        name: 'digitaLivelihod',
        component: DigitaLivelihod,
        children: [
          { 
            path: 'digPenson', // 数字民生-人口信息
            name: 'digPenson',
            component: DigPenson
          },
          { 
            path: 'digHouse', // 数字民生-房屋信息
            name: 'digHouse',
            component: DigHouse
          },
          { 
            path: 'digCase', // 数字民生-关怀人群
            name: 'digCase',
            component: DigCase
          },
          { 
            path: 'digCar', // 数字民生-车辆信息
            name: 'digCar',
            component: DigCar
          }
        ]
      },
      {
        path: 'contentShow',
        name: 'contentShow',
        component: ContentShow,
        children: [
          { // 全部
            path: 'allPage',
            name: 'allPage',
            component: AllPage
          },
          { // 非法上访
            path: 'illegalpetition',
            name: 'illegalpetition',
            component: Illegalpetition
          },
          { // 涉恐人员
            path: 'terrorist',
            name: 'terrorist',
            component: Terrorist
          },
          { // 涉毒人员
            path: 'drugRelated',
            name: 'drugRelated',
            component: DrugRelated
          }
        ]
      },
      { // 
        path: 'suspectedFlow',
        name: 'suspectedFlow',
        component: SuspectedFlow
      },
      { // 监控管理
        path: 'monitoringManagement',
        name: 'monitoringManagement',
        component: MonitoringManagement
      },
      {
        path: 'suspectedFlows', // 疑似流动人口管理
        name: 'suspectedFlows',
        component: () => import('../views/suspectedFlows/SuspectedFlows.vue')
      }
    ]
  },
  { // 数字民生头部导航
    path: '/digHeader',
    name: 'digHeader',
    component: DigHeader
  },
  {
    path: '/headerBox',
    name: 'headerBox',
    component: HeaderBox
  },
  {
    path: '/navigationBox',
    name: 'navigationBox',
    component: NavigationBox 
  },
  {
    path: '/drugRelated', 
    name: 'drugRelated',
    component: DrugRelated 
  },
  {
    path: '/suspectedfTu', // 疑似流动人口管理-内容区
    name: 'suspectedfTu',
    component: SuspectedfTu 
  },
  {
    path: '/suspectedHeader', // 疑似流动人口-header
    name: 'suspectedHeader',
    component: SuspectedHeader
  }, 
  {
    path: '/itemBox', // 框-组件
    name: 'itemBox',
    component: ItemBox
  },
  {
    path: '/popBox', // 弹窗内容-组件
    name: 'popBox',
    component: PopBox
  },
  {
    path: '/floatBox', // 中间地图小弹窗-组件
    name: 'floatBox',
    component: FloatBox
  },
  {
    path: '/monPage1', // 疑似流动人口内容区-1
    name: 'monPage1',
    component: MonPage1
  },
  {
    path: '/monPage2', // 疑似流动人口内容区-2
    name: 'monPage2',
    component: MonPage2
  },
  { // 智能消防平台
    path: '/testIfarm',
    name: 'testIfarm',
    component: TestIfarm
  },
  { // 后台管理
    path: '/backstageManagement',
    name: 'backstageManagement',
    component: BackstageManagement
  },
  { // 数据民生
    path: '/datalivelihood',
    name: 'datalivelihood',
    component: Datalivelihood
  },
  { // 人口信息
    path: '/demographicInformation',
    name: 'demographicInformation',
    component: DemographicInformation
  },
  { // 房屋信息
    path: '/housingInformation',
    name: 'housingInformation',
    component: HousingInformation
  },
  { // 智慧党建
    path: '/partyBuilding',
    name: 'partyBuilding',
    component: PartyBuilding
  },
  { // 地图组件
    path: '/mapCom',
    name: 'mapCom',
    component: MapCom
  },
]

const router = new VueRouter({
  routes
})

export default router
