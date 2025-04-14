import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 针对小程序setData方法判断
// // 针对小程序setData方法判断
Vue.prototype.setData = Vue.prototype.setData || function (data = {}, callback) {
  for (let key in data) {
    this[key] = undefined
    this[key] = data[key]
  }
  callback && this.$nextTick(callback)
}



import './common.scss'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif