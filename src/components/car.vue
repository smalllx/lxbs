<template>
	<div>
    <Second :title='title'>{{title}}</Second>
  		<ul class="mui-table-view second-c">
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
			<p class="total">已选中<span class="red">{{pay.num}}</span>  件商品,共计 <span class="red">￥{{pay.sum}}</span> 元</p><button class="btn">去结算</button>			
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
      baseurl:'http://localhost:3000'
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
    }
  		// let prods = JSON.parse(localStorage.getItem('prods')||'{}')
  		// //console.log(Object.keys(obj))
  		// let arr = Object.keys(prods)
  		// for (var i = arr.length - 1; i >= 0; i--) {
  		// 	// this.goodsNum.push(obj[arr[i]])  单独存一个购物数量的数组，不好使，用set添加属性函数
  		// 	this.$axios.get('myapi/'+arr[i])	
  		// 	.then(res=>{
  		// 		var data = res.data;
  		// 		//下面是用 添加属性 的方法，不能操作他的值 要用set
  		// 		// data.num = prods[data.idnum]
  		// 		// data.isPicked = true
  		// 		this.$set(data,'num',prods[data.idnum])
  		// 		//console.log(this.data)
  		// 		this.$set(data,'isPicked',true)
  		// 		this.carList.push(data)
  		// 	})
  		// 	.catch(err=>{
  		// 		console.log(err)
  		// 	})
  		// }
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
  padding: 42px 0 0;
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