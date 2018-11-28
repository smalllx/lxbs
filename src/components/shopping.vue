<template>
	<div>
		<Second :title='title'>{{title}}</Second>
		<div class="list">
			<div class="goods" v-for="item in list">
				<router-link class="img" :key="item.id" :to="{name:'goodsDetail',params:{id:item.id}}" tag="div">
					<img :src="item.url">				
					<p class="desc">{{item.introduct}}</p>
					<p class="price">￥{{item.price}}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'shopping',
  data () {
    return {
    	title:"Lx商城",
    	list:{},
    }
  },
  created(){
  	if(this.$store.state.goods.length !== 0){
  		this.list = this.$store.state.goods
  	}else{
  		this.$axios.get('/myapi/goodslist')
		  	.then(res=>{
		  		//console.log(res.data)
		  		this.list = res.data
		  	})
		  	.catch(err=>{
		  		console.log(err)
		  	})
	  	}
  }
}
</script>

<style lang="css" scoped>
	.list{
		padding-top: 45px;
		padding-bottom: 50px;
	}
	.goods{
		border: 1px solid #ccc;
		display: inline-block;
		width: 46%;
		height: 220px;
		margin: 1%;
		background-color: #fbf0e2;
	}
	.goods img{
		width: 90%;
	}
	.desc{
		width: 100%;
		color: #555;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.price{
		color: red;
		font-size: 16px;
	}
</style>