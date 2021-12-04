//封装请求路径axios
import axios from 'axios';

const requst = axios.create({
	baseURL: 'http://www.liulongbin.top:8000'
});

export default requst;

//请求拦截器

// 响应拦截器
