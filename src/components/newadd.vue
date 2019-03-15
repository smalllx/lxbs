<template>
	<div>
		<Second :title='title'>{{title}}</Second>
		<div class="mui-input-group">
		    <div class="mui-input-row">
		        <label>收货人：</label>
		    	<input type="text" id="userName" class="mui-input-clear" placeholder="请输入收货人姓名" v-model="name"/>
		    </div>
		    <div class="mui-input-row">
		        <label>联系电话：</label>
		    	<input pattern="[0-9]*" maxlength="11" type="text" id="tel" class="mui-input-clear" placeholder="请输入收货人手机号码" v-model="tel"/>
		    </div>
		    <div class="mui-input-row" style="height:auto">
		        <label>收货地址：</label>
		    	<input type="text" placeholder="区域（中区、南区、北区、仙游校区）" v-model="area"/></input>
		    </div>
		    <div class="mui-input-row" style="height:80px">
		        <label>详细地址：</label>
		    	<textarea style="text-align:left;height:60px" type="text" id="detailAddr" class="mui-input-clear" placeholder="请输入详细地址，如楼栋号、宿舍号等" v-model="add"></textarea>
		    </div>
		    <button class="addadd" @click="newAdd()">确认添加</button>
		</div>
	</div>
</template>

<script>
export default {

  name: 'newadd',

  data () {
    return {
    	title:'新增收货人地址',
    	baseurl:'http://localhost:3000',
    	name:'',
    	tel:'',
    	area:'',//省市区
    	add:''
    }
  },
  methods:{
  	newAdd(){
  		console.log(this.name,this.tel,this.add,this.area)
  		if(this.name != "" && this.tel != "" && this.add != "" && this.area != ""){
  			this.$axios.post(this.baseurl+'/newadd',{user:this.$store.state.user,name:this.name,tel:this.tel,add:this.area+this.add})
	        .then(res=>{
	          console.log(res.data)
	          if(res.data.msg == "ok"){
	          	this.$toast({  
		            message: '添加成功！', //提示内容
		            position: 'center', //提示框位置
		            duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
		        });
		        this.$router.push({name:'addr'})
	          }
	        })
	        .catch(err=>{
	          console.log(err)
	        })
  		}else{
  			this.$toast({  
	            message: '请填写完整信息', //提示内容
	            position: 'center', //提示框位置
	            duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
	        });
  		}
  	}
  }
}
</script>

<style lang="css" scoped>
.mui-input-group{
	margin-top: 50px;
}
.addadd{
	outline: none;
	width: 95%;
	background-color: #1d9716;
	color: #fff;
	font-size: 16px;
	border-radius: 20px;
	line-height: 30px;
}
</style>