import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Account/Login.vue'
import Home from './components/Home.vue'
import apiList from './components/BaiduAPI/apiList.vue'
import apiRes from './components/BaiduAPI/apiRes.vue'
import faceMatch from './components/BaiduAPI/faceMatch.vue'
import Page404 from './components/Page404.vue'
// import GoodList from './components/Good/list.vue'
// import imgList from './components/Good/imgList.vue'
// import videoList from './components/Good/videoList.vue'
// import img from './components/Good/img.vue'
// import video from './components/Good/video.vue'

Vue.use(Router)

const routes = [
  {path: '/', name: 'Login', component: Login},
  {path: '/Hello', name: 'HelloWorld', component: HelloWorld},
  {
    path: '/Home', component: Home,
    children: [
      {path: 'apiList', component: apiList},
      {path: 'faceMatch', component: faceMatch},
      {path: 'apiRes/:type', component: apiRes}
    ]
  },
  // Good相关
  // {
  //   path: '/Good', component: GoodList,
  //   children: [
  //     {path: 'imgList', component: imgList},
  //     {path: 'videoList', component: videoList},
  //     {path: 'img/:id', component: img},
  //     {path: 'video/:id', component: video},
  //   ]
  // },
  // 未命中的路由跳至404
  {path: '*', component: Page404}
]

export default routes
