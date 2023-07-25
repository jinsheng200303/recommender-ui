import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from "moment";
// import './assets/main.css'
import './assets/common.css'
import * as echarts from 'echarts';
import request from "@/utils/request";
import store from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.config.productionTip = false

Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
