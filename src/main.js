import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './api/request'
import * as Three from 'three'
import scroll from 'vue-seamless-scroll' // 无缝滚动插件
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import echarts from 'echarts'
import Less from 'less'
import './code/use.js'
const hls = require('videojs-contrib-hls')

import VueCesium from 'vue-cesium'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
Vue.use(VueCesium)
Vue.use(VueVideoPlayer)
Vue.use(hls)
Vue.use(scroll)
Vue.prototype.$Three = Three
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.use(Less)
localStorage.setItem('communityId', 2)
Vue.config.productionTip = false
let el = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default el