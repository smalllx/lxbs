<template>
	<div>
		<Second :title="title"></Second>
		<div v-html="con" class="second-c">
			
		</div>
	</div>
</template>

<script>
export default {

  name: 'detail',

  data () {
    return {
    	con:'',
    	title:'新闻详情'
    }
  },
  created(){
  	let id= this.$route.query.id;
  	 this.$axios.get('/api/2/news/'+ id)
  	 .then(res=>{
  	 	//console.log(res.data.body)
  	 	this.con = res.data.body
  	 })
  	 .catch(err=>{
  	 	console.log(err)
  	 })
  }
}
</script>

<style lang="css" scoped>

</style>