<template>
	<div>
		<Second :title='title'>{{title}}</Second>
		<ul>
			<li class="address" :class="{'bgc':item.select}" v-for="(item,index) in addArr" :key="index" @click="configadd(item.add)">
				<div class="addinfo">
		          <p><span>收件人：</span><span>{{item.name}}</span></p>
		          <p><span>联系电话：</span><span>{{item.tel}}</span></p>
		          <p><span>收件地址：</span><span>{{item.add}}</span></p>
		        </div>
		        <div class="default" @click.stop>
					<button class="btn" @click="adddlt(item._id,index)">删除</button>
				</div>
			</li>
		</ul>
		<button class="addadd" @click="addAdd()">新增收货地址</button>
	</div>
</template>

<script>
export default {

  name: 'addr',

  data () {
    return {
    	title:'选择收货地址',
    	addArr:[],
    	baseurl:'http://localhost:3000',
    }
  },
  methods:{
  	configadd(add){
  		this.$axios.post(this.baseurl+'/configadd',{user:this.$store.state.user,add:add})
        .then(res=>{
        	console.log(res.data)
        	if(res.data.msg=="ok"){
        		this.$router.push({name:'car'})
        	}
        })
        .catch(err=>{
          console.log(err)
        })
  	},
  	adddlt(id,index){
  		
  		console.log(id)
  		this.$axios.post(this.baseurl+'/adddlt',{user:this.$store.state.user,addid:id})
        .then(res=>{
        	console.log(res.data)

        	if(res.data.msg=="ok"){
        		this.addArr.splice(index,1)
        		this.$toast({  
		            message: '删除成功！', //提示内容
		            position: 'center', //提示框位置
		            duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
		        });
        	}
        })
        .catch(err=>{
          console.log(err)
        })
  	},
  	addAdd(){
  		this.$router.push({name:'newadd'})
  	}
  },
  created(){
  	if(this.$store.state.user){
  		this.$axios.post(this.baseurl+'/getadd',{user:this.$store.state.user})
        .then(res=>{
          console.log(res.data)
          this.addArr = res.data.varList;
        })
        .catch(err=>{
          console.log(err)
        })
  	}
  }
}
</script>

<style lang="css" scoped>
.bgc{
	background: #eee;
}
ul{
	padding-left: 0;
}
.address:first-child{
	margin-top: 50px;
}
.address{
  text-align: left;
  display: flex;
  margin:10px;
  padding: 5px 10px;
  border:1px solid #1d9716;
  border-radius: 20px;
}
.address .default{
	flex:1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.address .addinfo{
  flex: 5;
}
.address .addinfo p span:first-child{
  color:#000;
  display: inline-block;
  width:75px;
}
.addadd{
	outline: none;
	width: 95%;
	background-color: #1d9716;
	color: #fff;
	font-size: 16px;
	border-radius: 20px;
	line-height: 30px;
	margin-top: 50px;
}
.btn{
	background-color: #b00;
	color: #fff;
}
</style>