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
					console.log('res===>',JSON.stringify(res))
					if(res.data){
						if (res.data.code== 200) {
							resolve(res);
						}else if(res.data.code== 401){
							uni.setStorageSync("token", null);
							resolve(res);
						}else{
							
							console.log('----------------------------')
							console.log(res.data.msg)
							console.log('----------------------------')
							if(res.data.msg){
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration:3000
								});
							}else{
								if(res.statusCode == 502){
									uni.showToast({
										title: "服务器端报错",
										icon: 'none',
										duration:3000
									});
								}else{
									uni.showToast({
										title: "未知错误",
										icon: 'none',
										duration:3000
									});
								}
								
							}
							resolve(res);
						}
					}else{
						if(hastoast){
							if(res.data.msg){
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration:3000
								});
							}else{
								if(res.statusCode == 502){
									uni.showToast({
										title: "服务器端报错",
										icon: 'none',
										duration:3000
									});
								}else{
									uni.showToast({
										title: "未知错误",
										icon: 'none',
										duration:3000
									});
								}
								
							}
						}
					}
				 
				},
				fail: err => {
					console.log("err===>",JSON.stringify(err))
					uni.hideLoading();
					if(hastoast){
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none',
							mask:true,
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
			uni.showLoading({
				text: "加载中..."
			})
			this.$request({
				path:`/tpatientCard/mobile/getPatientCardByPatientInfo?condition=${PaientInfo.credentialNo}&conditionType=${PaientInfo.credentialType}`,
			}).then(res=>{
				uni.hideLoading();
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
				uni.showLoading({
					text: "加载中..."
				})
				this.$request({
					path:`/patient/mobile/getPatientByUserId?userId=${userId}`,
				}).then(res=>{
					uni.hideLoading();
					if(res.data.code == 200) {
						const data = res.data.data || []
						if(JSON.stringify(data) !== uni.getStorageSync('PatientList')) uni.setStorageSync('PatientList',JSON.stringify(data))
						if(!res.data || data.length == 0){
							uni.showModal({
								title: '提示',
								content: '暂无就诊用户，是否立即添加',
								success: function (res) {
									if (res.confirm) {
										uni.navigateTo({url:'/mine/diagnose/diagnoseLsit'})
									}
								}
							});
							reject(null)
						}else{
							resolve(data)
						}
						
					}else{
						reject(null)
					}
				}).catch(err=>reject(null))
			}else{
				reject(null)
			}
			
		})
	},
	//获取用户信息和就诊信息
	async getUserInfo() {
		let PatientListStore = uni.getStorageSync('PatientList');
		let PatientCardStore = uni.getStorageSync('PatientCard');
		if(PatientListStore && PatientCardStore && JSON.parse(PatientListStore).length>0){
			return {
				PatientList: JSON.parse(PatientListStore),
				PatientCard: JSON.parse(PatientCardStore)
			}
		}else{
			uni.showLoading({
				text: "加载中..."
			})
			let PatientList = await this.$getPatientList();
			let PatientCard = await this.$getUserCard(PatientList[0]);
			uni.setStorageSync('PatientList',JSON.stringify(PatientList))
			uni.setStorageSync('PatientCard',JSON.stringify(PatientCard))
			uni.hideLoading();
			return {
				PatientList,
				PatientCard
			}
		}
	},
	//初始化操作
	userInit() {
		this.$getPatientList().then(res=>{
			getApp().globalData.PatientList = res.length>0?res: [{}];
			if(res.length>0) return this.$getUserCard(res[0]);
			else return {};
		}).then(info=>{
			getApp().globalData.PatientCard = info;
			console.log('----------------------初始化完成----------------------')
		})
	}
}