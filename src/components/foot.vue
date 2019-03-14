<template>
	<div class="footer">
       <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" :to="{name:'home'}">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
      <router-link class="mui-tab-item" :to="{name:'vip'}">
        <span class="mui-icon iconfont icon-huiyuan"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'car'}">
        <span class="mui-icon iconfont icon-gouwuche"><span class="mui-badge">{{carNum}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'search'}">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">查找</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {

  name: 'foot',
  //props:['carNum'],
  data () {
    return {
     
    }
  },
  //methods:{
    // getcarValue(v){
    //   console.log('父接收了')
    //   this.carNum+=v
    // }
  //},
  computed:{
    carNum(){
      return this.$store.state.carNum
     // return prodTools.getTotalCount() 这样子要刷新之后数据才会更新，不能同步更新
     }
  }
}
</script>

<style lang="css" scoped>
.mui-bar-tab .mui-tab-item.mui-active {
    color: #1d9716;
}
</style>