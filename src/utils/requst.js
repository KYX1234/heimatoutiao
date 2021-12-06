//封装请求路径axios
import axios from 'axios'
//非组件模块中获取store需要单独加载
import store from '../store'
const requst = axios.create({
	baseURL: 'http://www.liulongbin.top:8000'
})

export default requst

//请求拦截器
requst.interceptors.request.use(
	config => {
		const { usertoken } = store.state
		if (usertoken) {
			config.headers.Authorization = `Bearer ${usertoken.token}`
		}
		//处理完要返回config，不然请求发布出去
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
