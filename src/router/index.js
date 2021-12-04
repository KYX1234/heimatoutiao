import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 路由表
const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue')
	},
	{
		path: '/',
		component: () => import('@/views/layout/Layout.vue'),
		children: [
			{
				path: '', //默认子路由
				name: 'home',
				component: () => import('@/views/home/Home.vue')
			},
			{
				path: 'qa', //默认子路由
				name: 'qa',
				component: () => import('@/views/qa/Qa.vue')
			},
			{
				path: 'video', //默认子路由
				name: 'video',
				component: () => import('@/views/video/Video.vue')
			},
			{
				path: 'my', //默认子路由
				name: 'my',
				component: () => import('@/views/my/My.vue')
			}
		]
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
