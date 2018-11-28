<template>
<div>
	<Second :title="title"></Second>
	<div class="avat">
		<span class="mui-icon mui-icon-contact"></span>
		<div v-if="login">
		 用户 {{user}} 已登录 <br>
		 <router-link :to="{name:'login'}"><mt-button class="btn">切换账号</mt-button></router-link>
		</div>
		<div v-else>
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
    	title:'会员登录'
    }
  },
  computed:{
  	user(){
  		return this.$store.state.user
  	},
  	login(){
  		return this.$store.state.login
  	}
  }


}
</script>

<style lang="css" scoped>
.avat{
	padding-top: 100px;
}
.mui-icon.mui-icon-contact{
	display: block;
	font-size: 200px;
	border-radius: 50%;
	color: #77a;
}
.btn{
	width: 43%;
	margin: 100px 0;
	color: #333;
}
.login{
	background-color: #26a2ff;
	color: #fff;
}
</style>