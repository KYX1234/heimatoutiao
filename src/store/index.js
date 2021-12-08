import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		usertoken: JSON.parse(localStorage.getItem('usertoken'))
	},
	mutations: {
		//token需要做持久化，存储到本地
		setToken(state, data) {
			state.usertoken = data
			localStorage.setItem('usertoken', JSON.stringify(state.usertoken))
		}
	},
	actions: {},
	modules: {}
})
