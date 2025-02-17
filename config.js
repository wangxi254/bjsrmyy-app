// 配置信息
// api请求前缀
let baseUrl = ''
const envObject = {
	test: {
		baseUrl: 'http://cmstz.vicp.io',
	},
	pro: {
		baseUrl: 'https://min.his.gzskt.net/bjrmWebApi',
	},
	build: {
		baseUrl: 'https://bjsyy.yuanbichang.top:9448/api'//'https://bjsyy.gzzxbd.com:9448/api',
	}
}

let ENV = ''
if (process.env.NODE_ENV === 'development') {
	// 开发环境、
	ENV = 'build'
} else if (process.env.NODE_ENV === 'production') {
	ENV = 'build'
	// ENV = 'pro'
} else {
	ENV = 'build'
}
export default {
	ENV,
	baseUrl: envObject[ENV].baseUrl,
}
