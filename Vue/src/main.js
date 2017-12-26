// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router' // 路由功能
import routes from './index' // 路由的详细配置
import store from './vuex/store' // 引入自己的store.js
import ElementUI from 'element-ui' // 样式库
import 'element-ui/lib/theme-chalk/index.css' // 样式库的样式
import axios from 'axios' // 发送http请求
import _ from 'lodash' // 工具库
import Lockr from 'lockr' // 用于localStorage的API
import Cookies from 'js-cookie' // 处理cookie的JS API
import moment from 'moment' // 时间插件
import NProgress from 'nprogress' // 加载进度条

// 配置axios信息
axios.defaults.baseURL = Window.HOST
axios.defaults.timeout = 1000 * 15
axios.defaults.headers.authKey = Lockr.get('authKey')
axios.defaults.headers.sessionId = Lockr.get('sessionId')
axios.defaults.headers['Content-Type'] = 'application/json'

// 配置路由
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
