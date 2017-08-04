import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state = {
	token:false,//登录
	tripType:""//行程类型
}

export default new Vuex.Store({
	state,
	mutations:{
		login(state){
			state.token = true;
		},
		logOUT(state){
			state.token = false;
		},
		tripType(state,type){
			state.tripType = type;
		}
	}
})