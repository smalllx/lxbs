<template>
	<div>
		<second :title="title">{{title}}</second>
		<div class="address">
	        <div class="addinfo">
	          <p><span>收件人：</span><span>{{address.name}}</span></p>
	          <p><span>联系电话：</span><span>{{address.tel}}</span></p>
	          <p><span>收件地址：</span><span>{{address.add}}</span></p>
	        </div>
	        <div class="toggle">
	        	<button @click="changeAdd()">选择</button>
	        </div>
	    </div>

	    <ul class="mui-table-view">
		    <li class="mui-table-view-cell">
	            <img class="mui-media-object mui-pull-left img" :src="msg.url" onerror="this.src='../static/img/ptshop_default.jpg'">
	            <div class="mui-media-body">
	                <p class="goodsdesc">{{msg.introduct}}</p> 
	                <p class='mui-ellipsis num'>
	                  	x{{num}}
	                  	<span class="price">总价：￥{{num*msg.price}} </span>
			        </p>
			        <!-- <button class="done" @click="orderdone(msg.orderid,msg.goodsid,index)">确认送达</button> -->
	            </div>
		    </li>
		</ul>
		<button class="surebuy" @click="surebuy()">确认购买</button>
	</div>
</template>

<script>
export default {

  name: 'buygoods',

  data () {
    return {
    	title:"订单购买",
    	msg:{},
    	address:{},
    	num:0,
    	baseurl:'http://localhost:3000',
    	ajax2:''
    }
  },
  methods:{
  	changeAdd(){
      this.$router.push({name:'addr'})
    },
    surebuy(){
        //生成订单列表
        if(this.address){
        	var buygoods = [];
        	var buynum = [];
        	var goodsname =[];
        	var imgs = [];

        	buygoods.push(this.msg.goodsid)
        	buynum.push(this.num)
        	goodsname.push(this.msg.introduct)
        	imgs.push(this.msg.url)
        	this.$axios.post(this.baseurl+'/buygoods',{user:this.$store.state.user,buy:buygoods,nums:buynum})
	        .then(res=>{
	          console.log(res.data)
	          if(res.data.msg == "ok" && this.ajax2 == 'ok'){
	            this.$toast({  
	                message: '购买成功，订单处理中', //提示内容分
	                  position: 'center', //提示框位置
	                  duration: 2000  //持续时间（毫秒），若为 -1 则不会自动关闭
	            });
	            this.$router.go(-1)
	          }
	        })
	        .catch(err=>{
	          console.log(err)
	        })
          var orderid = new Date().getTime();
          this.$axios.post(this.baseurl+'/order',{user:this.$store.state.user,buy:buygoods,nums:buynum,address:this.address,orderid:orderid,goodsname:goodsname,imgs:imgs})
          .then(res=>{
            this.ajax2 = res.data.msg;
          })
          .catch(err=>{
            console.log(err)
          })
        }
    }
  },
  created(){
  	this.msg = this.$route.params.msg;
  	this.num = this.$route.params.num;
  	console.log(this.msg)
	this.$axios.post(this.baseurl+'/getadd',{user:this.$store.state.user})  
	    .then(res=>{
	      console.log(res.data)
	      var data = res.data.varList;
	      data.forEach( item => {
	        if(item.select){
	          this.address = item;
	          return;
	        }
	      })
	    })
	    .catch(err=>{
	      console.log(err)
	    })
  	}
}
</script>

<style lang="css" scoped>
.address{
  text-align: left;
  display: flex;
  margin-top:40px;
  padding: 5px 10px;
  background: #e8e5e5;
}
.address .addinfo{
  flex: 5;
}
.address .addinfo p span:first-child{
  color:#000;
  display: inline-block;
  width:75px;
}
.address .toggle{
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
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
	text-indent: 2em;
	text-align: left;
}
.price{
	color: red;
	display: inline-block;
	font-size: 18px;
	float: right;
}
.surebuy{
	width: 95%;
	border-radius: 20px;
	line-height: 30px;
	color: #fff;
	background-color: #1d9716;
}
</style>