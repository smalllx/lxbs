import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import jquery from 'jquery'
import 'mint-ui/lib/style.css'
//UI框架的引入
 import '../assets/mui/dist/css/mui.css'
 import '../assets/mui/dist/css/iconfont.css'
 import '../assets/css/global.css'
 // import '../assets/mui/dist/css/city-picker.css'

// import citydata from '../assets/mui/dist/js/city-picker.data.js'
// import citypick from '../assets/mui/dist/js/city-picker.js'
// import mui from '../assets/mui/dist/js/mui.min.js'
// import pick from '../assets/mui/dist/js/mui.picker.min.js'
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
import Addr from '@/components/addr'
import newadd from '@/components/newadd'
// Vue.prototype.$mui = mui
// Vue.prototype.$citydata = citydata
// Vue.prototype.$citypick = citypick
// Vue.prototype.$pick = pick
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
      component: HelloWorld,
      meta:{
        showFoot:true
      }
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip,
      meta:{
        showFoot:true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta:{
        showFoot:true
      }
    },
    {
      path: '/car',
      name: 'car',
      component: Car,
      meta:{
        showFoot:true
      }
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
      path:'/goodsDetail/:goodsid',
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
    },
    {
      name:'addr',
      path:'/address',
      component:Addr
    },
    {
      name:'newadd',
      path:'/newadd',
      component:newadd
    }
  ]
})
