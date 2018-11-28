import Vue from 'vue'
import Router from 'vue-router'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
//UI框架的引入
 import '../assets/mui/dist/css/mui.css'
 import '../assets/mui/dist/css/iconfont.css'
 import '../assets/css/global.css'
//组件的引入
import HelloWorld from '@/components/Header'
import Vip from '@/components/vip'
import Car from '@/components/car'
import Search from '@/components/search'
import Foot from '@/components/foot'
import News from '@/components/news'
import Detail from '@/components/detail'
import Photo from '@/components/photo'
import photoDetail from '@/components/photoDetail'
import Shopping from '@/components/shopping'
import shoppingDetail from '@/components/shoppingDetail'
import login from '@/components/login'
import reg from '@/components/reg'

// Vue.prototype.$mui = mui
Vue.use(Mint)

Vue.use(Router)

export default new Router({
	linkActiveClass:'mui-active',
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      name:'detail',
      path:'/news/detail',
      component:Detail
     },
    {
      name:'photo',
      path:'/photo',
      component:Photo
    },
    {
      name:'photoDetail',
      path:'/photoDetail/:id',
      component:photoDetail
    },
    {
      name:'shopping',
      path:'/shopping',
      component:Shopping
    },
    {
      name:'goodsDetail',
      path:'/goodsDetail/:id',
      component:shoppingDetail
    },
    {
      name:'login',
      path:'/login',
      component:login
    },
    {
      name:'reg',
      path:'/reg',
      component:reg
    }

  ]
})
