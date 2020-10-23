import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as Three from 'three'
Vue.prototype.$Three = Three
console.log('Vue.prototype.$Three ', Vue.prototype.$Three )
Vue.use(ElementUI)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 引入less
import Less from 'less'
Vue.use(Less)

Vue.config.productionTip = false

let el = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default el