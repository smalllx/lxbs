<template>
	<div>
    <Second :title='title'>{{title}}</Second>
    <div class="con">
      <img src="../../static/img/logo.png" alt="" width="50%">
      <label>用户名：</label><input type="text" name="" v-model="user">
      <label>密&emsp;码：</label><input type="password" name="" v-model="pwd">
      <label>确认密码：</label><input type="password" name="" v-model="repwd">
     <!--  <button class="mui-btn mui-btn-primary" @click=$router.go(-1)>返回</button> -->
      <button class="log-btn" @click="reg">注&emsp;&emsp;册</button>
    </div>
	</div>
</template>

<script>
export default {

  name: 'reg',

  data () {
    return {
      title:'用户注册',
    	user:'',
    	pwd:'',
    	repwd:'',
      baseurl:'http://localhost:3000'
    }
  },
  methods:{
  	msg(msg){
  		this.$toast({  
			message: msg, //提示内容
   			position: 'center', //提示框位置
   			duration: 1500 , //持续时间（毫秒），若为 -1 则不会自动关闭
		})
  	},
  	reg(){
  		if(this.user.trim()!=='' && this.pwd.trim()!=='' && this.pwd==this.repwd){
          this.$axios.post(this.baseurl+'/reguser',{user:this.user,pwd:this.pwd})
          .then(res=>{
            if(res.data.msg == "ok"){
              this.msg('注册成功！')
              this.$router.push({name:'login'})
            }else if(res.data.msg == "fail"){
              this.msg('用户名已存在！')
              this.user = ''
              this.pwd = ''
              this.repwd = ''
            }else{
              this.msg('注册失败！')
            }
          })
          .catch(err=>{
            console.log(err)
          })
	  		}else{
          this.msg("用户名不能为空或两次密码不一致！")
        }
  }
},
  created(){
  	this.$axios.get('myapi/user')
  	.then(res=>{
  		this.sql = res.data
  	})
  	.catch(err=>{
  		console.log(err)
  	})
  }
}
</script>

<style lang="css" scoped>
.con{
  padding-top: 80px;
  background: linear-gradient(#999, #000); /* 标准的语法 */
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
label{
  width: 28%;
  display: inline-block;
  text-align: right;
  color: #fff;
}
input{
  width: 65%;
}
</style>