// 配置信息
// api请求前缀
let baseUrl = ''
const envObject = {
	test: {
		baseUrl: 'https://min.his.gzskt.net/bjrmWebApi',
	},
	pro: {
		baseUrl: 'https://min.his.gzskt.net/bjrmWebApi',
	} 
}

let ENV = ''
if(process.env.NODE_ENV === 'development') {
	// 开发环境、
  ENV='test'
} else {
  ENV='pro'
}
export default {
	ENV,
	baseUrl: envObject[ENV].baseUrl,
}