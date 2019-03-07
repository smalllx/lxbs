<template>
	<div class="wrap"> 
    <input type="text" v-model="value" placeholder="搜索">
    <button @click="btnsearch()">search</button>
    <ul>
      <li v-for="(item,index) in temp" :key="index">
        <router-link :key="item.goodsid" :to="{name:'goodsDetail',params:{goodsid:item.goodsid}}" tag="div">
          {{item.introduct}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'search',

  data () {
    return {
    	value:'',
      list:[],
      temp:[],
      baseurl:'http://localhost:3000'
    }
  },
  methods:{
    btnsearch(){
      this.$axios.post(this.baseurl+'/searchgoods',{key:this.value})
      .then(res=>{
        console.log(res.data)
        if(res.data.msg == "ok"){
           this.temp = res.data.goodslist;
        }
        //this.list = res.data;
        // this.list = Array.from(this.list)
        console.log(this.list)
      })
      .catch(err=>{
        console.log(err)
      })
      //this.$store.state.goods = this.temp;
      //this.$router.push({name:"shopping"})
    }

  }
}
</script>

<style lang="css" scoped>
.wrap{
  padding: 8px;
}
.wrap input{
  padding-right: 70px;
}
.wrap button{
  position: absolute;
  right: 8px;
  top: 8px;
  line-height: 21px;
  height: 40px;
  background-color: red;
  color: #fff;
}
ul{
  text-align: left;
  margin-left: 10px;
  padding: 0;
  font-size: 14px;
}
li{
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 12px;
}
</style>