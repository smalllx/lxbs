<template>
	<!-- 要加+-的事件 -->
	<div>
		<second :title="title">{{title}}</second>
		<div class="detail">
			<img :src="imgd.url" class="ad">
			<p class="intro">{{imgd.introduct}}</p>
			<p style="height: 20px">
				<span style="float: left;">销量：1000</span>
				<span style="float: right;">产地：福建 莆田</span>
			</p>
			<p class="price p">单价：￥{{imgd.price}}</p>
			<p class="p">购买数量：<span class="comp" @click="subs">-</span>
			<span class="numb">{{num}}</span>
			<span class="comp" @click="add">+</span></p>
			<p class="p">商品属性：<span class="attr" v-for="(item,index) in imgd.attr" @click="istrue=index" :class="{active:istrue==index}">{{item}}</span></p>
			<p class="price p">商品总价：￥{{num*imgd.price}}</p>
			<mt-button class="btn" @click="addcar">加入购物车</mt-button>&emsp;
			<mt-button  class="btn buy">购买</mt-button>
			<div class="pro">
				<p>商品信息</p>
				<p class="info">商品编号：{{imgd.idnum}}</p>
				<p class="info">商品库存：{{imgd.total}}</p>
				<p class="info">上架日期：{{imgd.addTime}}</p>
			</div>
			<div>
				<p class="fabiao">发表评论：</p>
				<textarea v-model="msg"></textarea>
				<mt-button size="large" type="primary" @click="submited">提交</mt-button>
				<p class="fabiao">用户评论：</p>
				<p class="comNum">共 {{len}} 条</p>
				<ul>
					<li v-for="comment in imgd.comments"  class="comment">
						<span class="user">{{comment.user}}: </span>
						<span>{{comment.say}}</span><br>
						<span class="date">{{comment.date}}</span>
						<hr>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import prodTools from '../crud/crud.js'
export default {

  name: 'shoppingDetail',

  data () {
    return {
    	title:'商品详情',
    	imgd:{},
    	len:0,
    	msg:'',
    	pid:'',
    	num:1,
    	istrue:0,
    	totalPrice:''
    }
  },
  methods:{
  	submited(){
  		let date = new Date().toLocaleDateString()
  	//	console.log(this.imgd.comments.length)
  		if (this.msg.trim()!=='') {
  			this.$axios.post('/myapi/detailll/',{"user":"匿名用户","say":this.msg,"date":date})
  			this.imgd.comments.unshift({"id":2,"user":"匿名用户","say":this.msg,"date":date})
  			this.len++
  			this.msg=''
  		}
  	},
  	add(){
  		if(this.num<this.imgd.total){
  			this.num++;
  		}
  		
  	},
  	subs(){
  		if(this.num>1){
  			this.num--;
  		}
  		
  	},
  	addcar(){	
  		//this.$emit('addc',this.num)
  		//this.$store.state.carNum += this.num
  		//test
  		if (this.$store.state.login) {
	  		prodTools.addOrUpdate({
	  			id:this.imgd.idnum,
	  			num:this.num
	  		}) 		
	  		this.$toast({  
				message: '添加成功！', //提示内容
	   			position: 'center', //提示框位置
	   			duration: 1500  //持续时间（毫秒），若为 -1 则不会自动关闭
			})
	  		this.$store.state.carNum = prodTools.getTotalCount();
  		}
  	//	console.log(prodTools.getProds())
  		else {
  			this.$toast({  
  				message: '请登录', //提示内容分
       			position: 'center', //提示框位置
       			duration: 1500  //持续时间（毫秒），若为 -1 则不会自动关闭
			}); 
  		}
  	}
  },
  computed:{

  	// len(){
  	// 	return this.imgd.comments.length
  	// }
  },
  created(){

  	this.pid = this.$route.params.id
  	this.$axios.get('myapi/'+this.pid)
  	.then(res=>{
  		//console.log(res.data)
  		this.imgd = res.data
  		//console.log(this.imgd)
  		this.len = this.imgd.comments.length
  	})
  	.catch(err=>{
  		console.log(err)
  	})
  	 this.$store.state.carNum = prodTools.getTotalCount();
  }
}
</script>

<style lang="css" scoped>
.detail{
	padding-top: 40px;
	padding-bottom: 50px;
}
.detail>.ad{
	width: 100%;
}
.intro{
	font-size: 18px;
	color: #333;
}
.detail .info{
	text-align: left;
	padding-left: 10px;
	font-size: 16px;
}
.price{
	color: red;
	font-size: 18px;
}
.p{
	text-align: left;
	padding-left: 10%;
}
.btn{
	width: 43%;
	background-color: orange;
	margin: 20px 0;
	color: #fff;
}
.buy{
	background-color: red;
}
.pro{
	border: 2px solid #ccc;
	border-radius: 5px;
	margin: 5px 10px;
}
.fabiao{
	text-align: left;
	font-size: 16px;
	margin-top: 10px;
		clear: both;
}
.comNum{
	color: #339;
}
textarea{
	height: 100px;
}
ul{
	padding-left: 0;
	text-align: left;
}
.comment{
	width: 100%;
	padding:0 10px 8px;
}
.comment span{
	margin-left: 0;
}
.comment .user{
	float: left;
	color: rgb(33,150,243);
}
.comment .date{
	float: right;
	color: #339;
}
.numb,.comp,.attr{
	display: inline-block;
	height: 25px;
	width: 25px;
	border: 1px solid #ccc;
	line-height: 25px;
	text-align: center
}
.numb{
	width: 40px;
}
.attr{
	width: 35px;
	margin-right: 5px;
}
.active{
	background-color: red;
	color: #fff;
}
</style>