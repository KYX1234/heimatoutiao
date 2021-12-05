//封装请求路径axios
import axios from 'axios';

const requst = axios.create({
	baseURL: 'http://www.liulongbin.top:8000'
});

export default requst;

// //请求拦截器
// axios.interceptors.request.use(
// 	config => {
// 		// 展示 loading 效果
// 		this.$toast.loading({
// 			message: '加载中...', // 文本内容
// 			duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
// 		});
// 		return config;
// 	},
// 	error => {
// 		return Promise.reject(error);
// 	}
// );
// // 响应拦截器
// axios.interceptors.response.use(
// 	response => {
// 		// 隐藏 loading 效果
// 		this.$toast.clear();
// 		return response;
// 	},
// 	error => {
// 		return Promise.reject(error);
// 	}
// );
