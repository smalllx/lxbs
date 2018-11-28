<template>
	<div class="second">
		<mt-header :title="title" fixed>
	  		<div slot="left">
	    		<mt-button icon="back" @click="back">返回</mt-button>
	 		</div>
		</mt-header>
	</div>
</template>

<script>
export default {

  name: 'second',
  props:['title'],
  data () {
    return {

    }
  },
  methods:{
    back(){
      return this.$router.go(-1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>