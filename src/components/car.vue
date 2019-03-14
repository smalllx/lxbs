<template>
	<div>
    <Second :title='title'>{{title}}</Second>
      <div class="address" v-if="carList.length>0">
        <div class="addinfo">
          <p><span>收件人：</span><span>{{address.name}}</span></p>
          <p><span>联系电话：</span><span>{{address.tel}}</span></p>
          <p><span>收件地址：</span><span>{{address.add}}</span></p>
        </div>
        <div class="toggle"><button @click="changeAdd()">选择</button></div>
      </div>
  		<ul class="mui-table-view">
		    <li class="mui-table-view-cell " v-for="(item,index) in carList" :key="index">
		        <!-- <router-link :to="{name:'shoppingDetail',query:{id:item.id}}" > -->
            
		        	<mt-switch v-model="item.isPicked" class="switch"></mt-switch>
		             <img class="mui-media-object mui-pull-left goods" :src="item.url" onerror="this.src='../static/img/ptshop_default.jpg'">
		            <div class="mui-media-body">
		                <p class="desc">{{item.introduct}}</p> 
		                <p class='mui-ellipsis'>
		                  <span class="comp" @click="subs(index)">-</span>
        							<span class="numb">{{item.num}}</span>
        							<span class="comp" @click="add(index,item.total)">+</span>
        							<span class="price">总价：￥{{item.num*item.price}} </span>
						        </p>
						        <button class="btn" @click="dlt(index,item.num)">删除</button>
		            </div>
		    </li>
		</ul>
		<div class="pay">
			<p class="total">已选中<span class="red">{{pay.num}}</span>  件商品,共计 <span class="red">￥{{pay.sum}}</span> 元</p><button class="btn" @click="buy()">去结算</button>			
		</div>
	</div>
</template>

<script>
import prodTools from '../crud/crud.js'
export default {

  name: 'car',

  data () {
    return {
    	title:'购物车',
    	carList:[],
      baseurl:'http://localhost:3000',
      address:{}
    }
  },
  methods:{
    warnMessage(){
      this.$toast({  
          message: '请登录', //提示内容分
            position: 'center', //提示框位置
            duration: 1500  //持续时间（毫秒），若为 -1 则不会自动关闭
      }); 
    },
  	add(index,total){
          console.log(this.carList[index].num,total)
  		if (this.$store.state.login) {
	  		if(this.carList[index].num<total){
	  			this.$axios.post(this.baseurl+'/addgoods',{user:this.$store.state.user,goodsid:this.carList[index].goodsid,num:1})  
          .then(res=>{
            console.log(res.data)
            if(res.data.msg == "ok"){
              this.carList[index].num++;
              this.$store.state.carNum++;
              console.log('success')
            }
          })
          .catch(err=>{
            console.log(err)
          })
        }else{
          this.$toast({  
            message: '库存不足', //提示内容分
            position: 'center', //提示框位置
            duration: 1500  //持续时间（毫秒），若为 -1 则不会自动关闭
          }); 
        }
      }else {
        this.warnMessage()
      }
  	},
  	subs(index){
  		if (this.$store.state.login) {
	  		if(this.carList[index].num>1){
          this.$axios.post(this.baseurl+'/addgoods',{user:this.$store.state.user,goodsid:this.carList[index].goodsid,num:-1})  
          .then(res=>{
            console.log(res.data)
            if(res.data.msg == "ok"){
              this.carList[index].num--;
              this.$store.state.carNum--;
              console.log('success')
            }
          })
          .catch(err=>{
            console.log(err)
          })
	  		}
  		}else {
  			this.warnMessage()
  		}
  	},
  	dlt(i,num){
      if (this.$store.state.login) {
        console.log(this.$store.state.user,this.carList[i].goodsid)
        this.$axios.post(this.baseurl+'/deletegoods',{user:this.$store.state.user,goodsid:this.carList[i].goodsid})  
          .then(res=>{
            console.log(res.data)
            if(res.data.msg == "ok"){
              this.$store.state.carNum -= num
              this.carList.splice(i,1)
              this.$toast({  
                  message: '删除成功！', //提示内容分
                    position: 'center', //提示框位置
                    duration: 1500  //持续时间（毫秒），若为 -1 则不会自动关闭
              }); 
            }
          })
          .catch(err=>{
            console.log(err)
          })
    	}
      else {
        this.warnMessage()
      }
    },
    buy(){
      var buygoods = [];
      var buynum = [];
      this.carList.forEach((item,index) =>{
        if (item.isPicked) {
          buygoods.push(item.goodsid)
          buynum.push(item.num)
          this.$store.state.carNum -= item.num;
          this.carList.splice(index,1)
        }
      })
      console.log(buygoods)
      this.$axios.post(this.baseurl+'/buygoods',{user:this.$store.state.user,buy:buygoods,nums:buynum})  
        .then(res=>{
          console.log(res.data)
          if(res.data.msg == "ok"){
            this.$toast({  
                message: '购买成功，你的包裹正向您飞来~', //提示内容分
                  position: 'center', //提示框位置
                  duration: 2000  //持续时间（毫秒），若为 -1 则不会自动关闭
            }); 
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    changeAdd(){
      this.$router.push({name:'addr'})
    }
  },
  created(){
    if(this.$store.state.login){
      this.$axios.post(this.baseurl+'/goodscar',{user:this.$store.state.user})  
        .then(res=>{
          console.log(res.data)
          if(res.data.msg == "ok"){
            var goodsList = res.data.goods;
            var goodsnum = res.data.goodsnum;
            goodsList.forEach((item,index) => {
              this.$set(item,'isPicked',true)
              this.$set(item,'num',goodsnum[index])
            })
          }
          this.carList = goodsList;
        })
        .catch(err=>{
          console.log(err)
        })
      //根据用户名获取选中的收货地址
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
  },
  computed:{
  	pay(){
  		let num = 0,sum = 0;
  		this.carList.forEach(item =>{
  			if (item.isPicked) {
  				num += item.num;
  				sum += item.num * item.price
  			}
  		})
  		return {num,sum}
  	}
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
.desc{
	overflow: hidden;
  text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}
.price{
	color: red;
	font-size: 16px;
  float: right;
}
.numb,.comp{
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
.switch{
  padding-bottom: 10px;
}
.btn{
	position: absolute;
	top: 10px;
	right: 20px;
	background-color: #b00;
	color: #fff;
}
.pay{
	width: 100%;
	height: 55px;
	line-height: 55px;
	background-color: #ccc;
	position: fixed;
	bottom: 50px;
	left: 0
}
.pay .total{
	text-align: left;	
  clear: both;
	padding-left: 15px;
	color: #666;
}
.red{
	color: red;
	font-size: 14px;
}
.mui-table-view{
  margin-bottom:110px;
}
.mui-media-object.mui-pull-left.goods{
	max-width: 90px;
	height: 90px;
}
.mui-media-body{
	line-height: 45px;
}
</style>