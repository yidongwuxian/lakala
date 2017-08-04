// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store/store.js'
import MuseUI from 'muse-ui';
import router from './router/router.js';
import axios from './http.js';
import App from './App';
import lodash from 'lodash';
import VueResource from 'vue-resource';
import '../static/css/animate.css';
import './assets/sass/fontColor.scss';
import 'muse-ui/dist/muse-ui.css';
import './filter/filter.js';
Vue.use(VueResource);
Vue.use(MuseUI);


Vue.prototype.$axios = axios;
Vue.prototype.$lodash = lodash;
const app = new Vue({
	el: '#app',
	store,	
	router,
	render: h => h(App)
});

//PC:iView、Element、Keen UI、RUBIK UI
//mobile:muse-ui、mint、vux、Vue-Carbon