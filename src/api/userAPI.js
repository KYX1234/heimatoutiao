//用户相关请求
import requst from '@/utils/requst.js';

// 登录接口API
export const loginAPI = data => {
	return requst.post('/v1_0/authorizations', data);
};
//短信验证码
export const sendSmsAPI = mobile => {
	return requst.get('/v1_0/sms/codes/' + mobile);
};
