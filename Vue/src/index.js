import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Account/Login.vue'
import Home from './components/Home.vue'
import apiList from './components/BaiduAPI/apiList.vue'
import apiRes from './components/BaiduAPI/apiRes.vue'
import faceMatch from './components/BaiduAPI/faceMatch.vue'

Vue.use(Router)

/**
 * meta参数解析
 * hideLeft: 是否隐藏左侧菜单，单页菜单为true
 * module: 菜单所属模块
 * menu: 所属菜单，用于判断三级菜单是否显示高亮，如菜单列表、添加菜单、编辑菜单都是'menu'，用户列表、添加用户、编辑用户都是'user'，如此类推
 */
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/Home',
    component: Home,
    children: [
      {path: 'apiList', component: apiList},
      {path: 'faceMatch', component: faceMatch},
      {path: 'apiRes/:type', component: apiRes}
    ]
  }
]

export default routes
