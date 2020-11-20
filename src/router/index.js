import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			icon: 'ios-circle-outline',
			title: '第一个页面-路由懒加载webpack',
			meta: {requireAuth: true},
			component: resolve => {
				require(['@/views/home.vue'], resolve);
			}
		}
	]
})

