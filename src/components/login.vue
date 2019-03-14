<template>
	<div>
    <Second :title='title'>{{title}}</Second>
    <div class="con">
      <img src="../../static/img/logo.png" alt="" width="50%">
      <label>用户名：</label><input type="text" name="" v-model="user">
      <label>密码：</label><input type="password" name="" v-model="pwd">
     <!--  <button class="mui-btn mui-btn-primary" @click=$router.go(-1)>返回</button> -->
      <button class="log-btn" @click="login">登&emsp;&emsp;录</button>
      <span @click="forget" class="forget">忘记密码</span>
    </div>
	</div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {
      title:'用户登录',
    	user:'',
    	pwd:'',
    	sql:[],
      baseurl:'http://localhost:3000'
    }
  },
  methods:{
    msg(msg){
      this.$toast({  
              message: msg, //提示内容
              position: 'center', //提示框位置
              duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
          });
    },
  	login(){
      //console.log(this.sql)
      this.$axios.post(this.baseurl+'/user',{"user":this.user,"pwd":this.pwd})
      .then(res=>{
        console.log(res.data)

        //this.sql = res.data
        if(res.data.msg == "ok"){
          this.$store.state.login = true
          this.$store.state.user = this.user
          //console.log(this.$store.state.user)
          this.msg('登录成功！ ' + this.$store.state.user + '已登录')
          this.$router.push({name:'home'})
        }else{
          this.msg('账号或密码错误');
          this.user = '';
          this.pwd = '';
        }
      })
      .catch(err=>{
        console.log(err)
      })
  	},
  	forget(){
  		this.$router.push({name:'reg'})
  	}
  },
  created(){
  	// this.$axios.get('myapi/user')
  	// .then(res=>{
  	// 	this.sql = res.data
   //    console.log(sql)
  	// })
  	// .catch(err=>{
  	// 	console.log(err)
  	// })
  }
}
</script>

<style lang="css" scoped>
.con{
  padding-top: 80px;
  background: linear-gradient(#ccc, #1d9716); /* 标准的语法 */
  opacity: 0.8;
  height: 100vh;
}
.con img{
  display: block;
  width: 50%;
  margin:50px auto;
}
.log-btn{
  line-height: 25px;
  margin-top: 20px;
  font-size: 16px;
  width: 80%;
  border-radius: 20px;
  color: #000;
  background-color: #fff;
  /*opacity: 0.5;*/
  border:0;
}
.forget{
	color: #fff;
	display: block;
  margin-top: 15px;
	margin-right: 20px;
	font-size: 14px;
	text-align: right;
	text-decoration: underline;
}
label{
  width: 22%;
  display: inline-block;
  text-align: left;
  color: #fff;
}
input{
  width: 65%;
}
</style>