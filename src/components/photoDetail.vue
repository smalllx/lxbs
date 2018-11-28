<template>
	<div>
		<second :title="title">{{title}}</second>
		<div class="detail">
			<img :src="imgd.url" style="width: 100%;">
			<p class="intro">{{imgd.introduct}}</p>
			<p class="info">
				<span class="mui-icon mui-icon-location"></span>
				详细地址：{{imgd.idnum}}
			</p>
			<p class="info">每月租金：{{imgd.total}}/月</p>
			<mt-button size="large">预约</mt-button>
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
export default {

  name: 'photoDetail',

  data () {
    return {
    	title:'商品详情',
    	imgd:{},
    	len:0,
    	msg:'',
    	pid:''
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
  	}
  },
  created(){
  	this.pid = this.$route.params.id
  	this.$axios.get('detail/')
  	.then(res=>{
  		this.imgd = res.data[this.pid]
  		//console.log(this.imgd)
  		this.len = this.imgd.comments.length
  	})
  	.catch(err=>{
  		console.log(err)
  	})
  }
}
</script>

<style lang="css" scoped>
.detail{
	padding-top: 40px;
	padding-bottom: 50px;
}
.intro{
	font-size: 18px;
	color: #333;
}
.detail .info{
	text-align: left;
	padding-left: 10px;
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
</style>