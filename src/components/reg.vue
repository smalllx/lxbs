<template>
	<div>
		<label>用户名：</label><input type="text" name="" v-model="user">
		<label>密码：</label><input type="password" name="" v-model="pwd">
		确认密码：<input type="password" name="" v-model="repwd">
		<mt-button @click=$router.go(-1)>返回</mt-button>
		<mt-button @click="reg">注册</mt-button>
	</div>
</template>

<script>
export default {

  name: 'reg',

  data () {
    return {
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
</style>