<template>
	<div class="news">
    <Second :title='title'>{{title}}</Second>
  		<ul class="mui-table-view second-c">
		    <li class="mui-table-view-cell " v-for="item in list">
		        <router-link :to="{name:'detail',query:{id:item.id}}" >
		             <img class="mui-media-object mui-pull-left" :src="item.thumbnail">
		            <div class="mui-media-body">
		                {{item.title}}
		                <p class='mui-ellipsis date'>{{date}}</p>
		            </div>
		        </router-link>
		    </li>
		</ul>
	</div>
</template>

<script>

export default {


  name: 'news',

  data () {
    return {
    	list:[],
    	date:'',
      title:'今日头条'
    }
  },
  created(){
    this.$axios.get('/api/2/news/latest')
    .then(res=>{
      this.list=res.data.news
      //console.log(this.list)
      this.date = res.data.display_date.split(' ',1).toString()
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style lang="css" scoped>

.mui-table-view-cell:last-child{
  margin-bottom: 50px;
}
.mui-table-view li{
	height: 50px;
}
.date{
  display: block;
	position: absolute;
  bottom: 12px;
  right: 10px;
	color: #13a
}
</style>