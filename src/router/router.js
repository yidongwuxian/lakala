import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import loginPage from '../components/login/login.vue';
import searchPage from '../components/search/search.vue';
import orderListPage from '../components/orderList/orderList.vue';
import flightListPage from '../components/flightList/flightList.vue';
import payPage from '../components/pay/pay.vue';
Vue.use(VueRouter)

const routes = [
	{ path: '/login', component: loginPage },
	{ path: '/', component: searchPage },
	{
		path: '/orderList',
		component: orderListPage,
		meta: {
			requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{ path: '/flightList', component: flightListPage },
	{ 
		path: '/pay',
		component: payPage,
		meta: {
			requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	routes, // （缩写）相当于 routes: routes
	linkActiveClass: 'active'
})
//未登录拦截功能
router.beforeEach((to, from, next) => {
	if(to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if(store.state.token) { // 通过vuex state获取当前的login是否存在
			next();
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})			
		}
	} else {
		next();
	}
})

export default router;