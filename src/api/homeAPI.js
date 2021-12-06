//home相关请求
import requst from '@/utils/requst.js'

//获取用户频道tab信息
export const getUserchannels = () => {
	return requst.get('/v1_0/user/channels')
}
//获取对应频道的文章信息
export const getArticles = params => {
	return requst.get('/v1_0/articles', { params })
}
