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
					console.log('---------调用地址---------')
					console.log(requrl)
					console.log('--------------------')
					console.log('---------传入参数---------')
					console.log(data)
					console.log('--------------------')
					if(res.data){
						if(hastoast){
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration:3000
							});
						}
						if (res.data.code== 200) {
							resolve(res);
						}else if(res.data.code== 401){
							uni.setStorageSync("token", null);
							resolve(res);
						}
						else {
							console.log('----------------------------')
							console.log(res.data.msg)
							console.log('----------------------------')
							uni.showToast({
								title: JSON.stringify(res),
								icon: 'none',
								duration:3000
							});
							resolve(res);
						}
					}else{
						if(hastoast){
							uni.showToast({
							  title:res.data.msg,
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
	arequest(params){
		let token = uni.getStorageSync('token') || '';
		let data = params.query || {};
		let requrl = config.baseUrl + params.path;// 审核临时用一下接口uat版本控制接口
		let hastoast = params.hastoast || false;
		return uni.request({
			url: requrl,
			method: params.method || 'GET',
			data: data,
			header: {
				'Content-Type': 'application/json',
				'x-auth-token':token,
			},
		})
	},
	// 错误处理
	errorCheck(err, res, errfun = false, resfun = false) {
		console.log("请求结果=======", res,err)
		if (err) {
			typeof errfun === 'function' && errfun();
			uni.showToast({
				title: '加载失败',
				icon: "none"
			});
			return false;
		}
		if (res.statusCode === 200 && res.data.code === 1 && res.data.msg != '') {
			typeof errfun === 'function' && resfun();
			if (!toast) {
				uni.showToast({
					title: res.data.msg,
					icon: "none"
				});
				return false;
			}
			
			uni.navigateTo({
				url:"/components/authModel/authModel.vue"
			})
		}
		if (res.statusCode === 500 && res.data.code === 1) {
			typeof errfun === 'function' && resfun();
			uni.showToast({
				title: "服务器错误",
				icon: "none"
			});
			return false;
		}
	
		if (res.statusCode === 401 && res.data.code === 401) {
			// 清除缓存
			uni.showToast({
				title: "请重新登录",
				icon: "none"
			});
			
			uni.navigateTo({
				url:"/components/authModel/authModel.vue"
			})
			
			throw new Error('未登录')
			return false
		}
		if (res.statusCode !== 200) {
			typeof errfun === 'function' && resfun();
			uni.showToast({
				title: res.data.error || res.data.msg,
				icon: "none"
			});
			return false;
		}
		return true;
	},

	// 业务常用接口处理
	//获取用户病例信息
	getUserCard(PaientInfo) {
		return new Promise((resolve,reject)=>{
			this.$request({
				path:`/tpatientCard/mobile/getPatientCardByPatientInfo?condition=${PaientInfo.credentialNo}&conditionType=${PaientInfo.credentialType}`,
			}).then(res=>{
				if(res.data.code == 200) resolve(res.data.data)
				else reject()
			}).catch(err=> reject())
		})
	},
	//获取用户就诊人列表
	getPatientList() {
		return new Promise((resolve,reject)=>{
			const userId = this.$getUserId();
			if(userId){
				this.$request({
					path:`/patient/mobile/getPatientByUserId?userId=${userId}`,
				}).then(res=>{
					if(res.data.code == 200) {
						resolve(res.data.data || [])
					}else{
						resolve([])
					}
				}).catch(err=>resolve([]))
			}else{
				resolve([])
			}
			
		})
	}
}