<template>
  <div id="app">
    <router-view v-on:addc="getcarValue"/>
    <!-- <Foot :carNum="carNum"></Foot> -->
    <Foot></Foot>
  </div>
</template>

<script>
import HelloWorld from './components/Header'
import Vip from './components/vip'
import Car from './components/car'
import Search from './components/search'
import Foot from './components/foot'
import News from './components/news.vue'
import Photo from './components/photo.vue'
import Shoping from './components/shopping.vue'

//import prodTools from './crud/crud.js'

export default {
  name: 'App',
  components:{
    HelloWorld,Vip,Car,Search,Foot,News,Photo,Shoping
  },
  data(){
    return{
      carNum:0
    }
  },
  methods:{
    getcarValue(v){
      this.carNum += v;
    }
  },
  created(){
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
