<template>
<div>
	<Second :title="title"></Second>
	<div class="avat">
		<div v-if="login">
			<span class="mui-icon mui-icon-person"></span>
			 {{user}} <br>
			 <router-link :to="{name:'login'}"><mt-button class="btn">切换账号</mt-button></router-link>
			 <p class="title">
			 	<span class="mui-icon mui-icon-arrowright"></span>我的订单
			 </p>
			 <ul class="mui-table-view">
			    <li class="mui-table-view-cell " v-for="(item,index) in goodsList" :key="index">
		            <img class="mui-media-object mui-pull-left img" :src="item.img" onerror="this.src='../static/img/ptshop_default.jpg'">
		            <div class="mui-media-body">
		                <p class="goodsdesc">{{item.goodsname}}</p> 
		                <p class='mui-ellipsis num'>
		                  	x{{item.num}}
				        </p>
				        <button class="done" @click="orderdone(item.orderid,item.goodsid,index)">确认送达</button>
		            </div>
			    </li>
			</ul>
		</div>
		<div v-else>
			<span class="mui-icon mui-icon-contact"></span>
			<router-link :to="{name:'reg'}"><mt-button class="btn">注册</mt-button></router-link>&emsp;
			<router-link :to="{name:'login'}"><mt-button class="btn login">登录</mt-button></router-link>
		</div>
	</div>
</div>
</template>

<script>
export default {

  name: 'vip',

  data () {
    return {
    	title:'会员登录',
    	baseurl:'http://localhost:3000',
    	goodsList:[]
    }
  },
  methods:{
  	orderdone(orderid,goodsid,i){
  		this.$axios.post(this.baseurl+'/admindeleteorder',{user:this.$store.state.user,goodsid:goodsid,orderid:orderid})
          .then(res=>{
            if(res.data.msg == "ok"){
            	this.goodsList.splice(i,1)
            	this.$toast({  
		            message: '确认收货成功！', //提示内容
		            position: 'center', //提示框位置
		            duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
		        });

            }
          })
          .catch(err=>{
            console.log(err)
          })
  	}
  },
  computed:{
  	user(){
  		return this.$store.state.user
  	},
  	login(){
  		return this.$store.state.login
  	}
  },
  created(){
  	if(this.$store.state.login){
  		this.$axios.post(this.baseurl+'/userorderlist',{user:this.$store.state.user})
          .then(res=>{
            console.log(res.data.varList)
            this.goodsList = res.data.varList;
          })
          .catch(err=>{
            console.log(err)
          })
  	}
  }
}
</script>

<style lang="css" scoped>
.avat{
	padding-top: 50px;
}
.mui-icon.mui-icon-person{
	display: block;
	width: 100px;
	height: 100px;
	line-height: 60px;
	margin: 10px auto;
	text-align: center;
	font-size: 50px;
	border-radius: 50%;
	padding: 20px;
	/*border: 1px solid #1d9716;*/
	background-color: #eee;
	color: #1d9716;
}
.mui-icon.mui-icon-contact{
	display: block;
	font-size: 200px;
	border-radius: 50%;
	color: #77a;
}
.btn{
	width: 43%;
	margin: 20px 0;
	color: #333;
}
.login{
	background-color: #1d9716;
	color: #fff;
}
.title{
	text-align: left;
	font-size: 18px;
	color: #333;
	font-weight: bold;
	padding: 10px;
	/*border-bottom: 1px dashed #1d9716;*/
}
.title span{
	color: #1d9716;
	font-weight: bold;
}
.goodsdesc{
	overflow: hidden;
  	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}
.mui-table-view{
  margin-bottom:110px;
}
.mui-media-object.mui-pull-left.img{
	max-width: 90px;
	height: 90px;
}
.mui-media-body{
	line-height: 45px;
}
.mui-ellipsis.num {
	text-indent: 4em;
	text-align: left;
}
.done{
	position: absolute;
	bottom: 15px;
	right: 20px;
	background-color: #1d9716;
	color: #fff;
}
/**/
</style>