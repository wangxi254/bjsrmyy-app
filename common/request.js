
import config from '../config.js';

export default {
	apprequst(params) {
		let token = uni.getStorageSync('token') || '';
		let data = params.query || {};
		let requrl = config.baseUrl + params.path;// 审核临时用一下接口uat版本控制接口
		let hastoast = params.hastoast || false;
		return new Promise((resolve, reject) => {
			uni.request({
				url: requrl,
				method: params.method || 'GET',
				data: data,
				header: {
					'Content-Type': 'application/json',
					'x-auth-token':token,
				},
				success: res => {
					uni.hideLoading();
					if(res.data){
						if(hastoast){
							uni.showToast({
								title: res.data.retMsg,
								icon: 'none',
								duration:3000
							});
						}
						if (res.data.retCode== 0) {
							resolve(res.data);
						}else if(res.data.retCode== 401){
							uni.setStorageSync("token", null);
							resolve(res.data);
						}
						else {
							resolve(res.data);
						}
					}else{
						if(hastoast){
							uni.showToast({
							  title: JSON.stringify(res),
							  icon: 'none',
							  duration:3000
							});
						}
					}
				 
				},
				fail: err => {
					uni.hideLoading();
				  
					if(hastoast){
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none',
							duration:3000
						});
					}
					resolve(err.data);
				}
			});
		});
	},
	
}