<template>
	<div class="temp">
		<mt-header :title="title" fixed>
        <div slot="left">
          <mt-button icon="back" @click="home">返回</mt-button>
      </div>
    </mt-header>
		<div class="intro">
			<router-link  v-for="item in list" :key="item.id" :to="{name:'photo',query:{id:item.id}}"><span @click="go(item.id)" :class="item.class">{{item.name}}&emsp;</span></router-link>
		</div>
		<div class="con">
			<router-link class="img" v-for="(item,index) in info" :key="index" :to="{name:'photoDetail',params:{id:item.id}} ">
        <div class="tuwen">
  				<img :src="item.url" class="house">
  				<p>{{item.title}}</p>
        </div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {

  name: 'photo',

  data () {
    return {
    	title:"莆田房源",
    	list:[],
    	info:[]
    }
  },
  methods:{
    home(){
      this.$router.push({name:"home"})
    },
  	go(id){
	  	this.$axios.get('/myapi/'+id)
	    .then(res=>{
	      this.info=res.data
	      //console.log(this.info)
	    })
	    .catch(err=>{
	      console.log(err)
	    })
  	}
  },

  created(){
  	this.$axios.get('/myapi/catalog')
    .then(res=>{
      this.list=res.data
      this.list.unshift({
    	id:0,
    	name:"全部",
    	class:"red"
    	})
    })
    .catch(err=>{
      console.log(err)
    })

    this.go(0)
  }

}
</script>

<style lang="css" scoped>
html{
  scroll-behavior: smooth;
}
.intro{
	position: fixed;
	padding-top: 50px;
	color: rgb(92,156,190);
	width: 100%;
	height: 85px;
	line-height: 30px;
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	background-color: #ddd;
	clear: both;
}
::-webkit-scrollbar {
    width: 0px;
}
.con{
	padding: 88px 12px 0;
}
.tuwen{
  margin-bottom: 20px;
  border: 3px solid rgb(92,156,190);
  border-radius: 15px;
  overflow: hidden;
}
.img>p{
	/*margin-top: -50px;*/
	font-size: 16px;
  color: #333;
}   
.red{
	color: #a00;
}
.house{
  width: 100%;
}
</style>