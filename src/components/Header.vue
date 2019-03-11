<template>
<div class="head">
     <mt-header title="PTshop"></mt-header>
<mt-swipe :show-indicators="false" :auto="1000" style="width: 100%;height: 180px;">
  <mt-swipe-item><img src="../assets/logo.png"></mt-swipe-item>
  <mt-swipe-item><img src="../assets/logo.png"></mt-swipe-item>
  <mt-swipe-item><img src="../assets/logo.png"></mt-swipe-item>
</mt-swipe>
    <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9 grid">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/news">
                        <span class="mui-icon iconfont icon-xinwen"></span>
                        <div class="mui-media-body">新闻资讯</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photo">
                        <span class="mui-icon iconfont icon-zufang"></span>
                        <div class="mui-media-body">房屋出租</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/shopping">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">Lx商城</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">待</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">开</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">发</div></a></li>
            </ul> 
    </div>

</div>
</template>
<script>

export default {

  name: 'Header',

  data () {
    return {
      baseurl:'http://localhost:3000'
    }
  },
  created(){
    if (this.$store.state.login) {
      this.$axios.post(this.baseurl+'/goodstotal',{"user":this.$store.state.user})
      .then(res=>{
        console.log(res.data)
        if(res.data.msg == 'ok'){
          this.$store.state.carNum = res.data.total;
          console.log(this.$store.state.carNum)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }else {
      this.$store.state.carNum = 0;
    }
  }
}
</script>

<style lang="css" scoped>
  .grid{
    background-color: #fff;
  }
  .mui-table-view.mui-grid-view.mui-grid-9 li{
    border: 0;
  }

  .mui-icon{
    padding: 10px;
    border-radius: 50%;
    font-weight: bold;
    color: rgb(255,255,255);
  }
  .icon-xinwen{
    background-color: pink;
    color: #36e;
  }
  .icon-zufang{
    background-color: yellow;
    color: red;
  }
  .mui-icon-home{
    background-color: skyblue;
    color: purple
  }
  .mui-icon-location{
    background-color: yellowgreen
  }
  .mui-icon-search{
    background-color: orange
  }
  .mui-icon-phone{
    background-color: hotpink
  }

</style>