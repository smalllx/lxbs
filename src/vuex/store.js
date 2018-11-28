import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		user:'',
		login:false,
		carNum: 0,
		goods:{}
	}
})
export default store