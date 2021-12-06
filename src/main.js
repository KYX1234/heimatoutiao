import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
//阿里图标库
import '@/css/iconfont.css';
//全局样式
import '@/styles/index.less';
//注册vant组件
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
