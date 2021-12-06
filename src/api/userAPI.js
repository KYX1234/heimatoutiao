//用户相关请求
import requst from '@/utils/requst.js'

// 登录/注册接口API
export const loginAPI = data => {
	return requst.post('/v1_0/authorizations', data)
}
//短信验证码
export const sendSmsAPI = mobile => {
	return requst.get('/v1_0/sms/codes/' + mobile)
}
//获取用户个人信息
export const getUserinfoAPI = () => {
	return requst.get('/v1_0/user', {
		// headers: {
		// 	Authorization: `Bearer ${store.state.usertoken.token}`
		// }
	})
}
