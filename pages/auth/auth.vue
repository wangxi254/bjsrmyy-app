<template>
	<view>
		<view class="navibarbg">
			<view class="header">
				<uni-icons @click="back" class="icon" type="back" size="26" />
				<!-- <view class="title">登录</view> -->
				<uni-icons class="icon" type="" size="20" />
			</view>
		</view>

		<view class="auth">
			<view class="info">
				<view class="ttitle">浙江省人民医院毕节医院</view>
				<view class="note">
					<view class="point"></view>
					<view>获取您的手机号用于预约挂号等</view>
				</view>
			</view>
			<button class='bottom' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" :loading="loading"
				withCredentials="true">手机号授权登录</button>
		</view>
		<view class="canclebtn bg-color-8F8F8F border-radius5" @click="back">暂不登录</view>
	</view>
</template>

<script>
	import WXBizDataCrypt from "./WXBizDataCrypt.js";
	export default {
		data() {
			return {
				choose: false,
				backindex: '',
				loading: false,
			};
		},
		/**
		 * 初始
		 */

		onLoad(options) {
			console.log("options--->", JSON.stringify(options));
			if (options.backindex) {
				this.backindex = options.backindex;
			}
			uni.login({
				success: (res) => {}
			})
		},
		methods: {
			back() {
				if (this.backindex == 'eleguide') {
					uni.switchTab({
						url: "../index/index"
					})
				} else {
					uni.navigateBack();
				}
			},
			onGetPhoneNumber(e) {

				let that = this;
				console.log("e===>", JSON.stringify(e))
				let appid = "wxbd1c9abbabdd7333" //需替换
				let secret = "3dda78ba34520358aade662ae735e1d1" //需替换
				//调用 wx.login 接口,获取code
				this.loading = true;
				uni.login({
					provider: 'weixin',
					success: loginres => {
						console.log("loginres>>", JSON.stringify(loginres));

						const encryptedData = e.detail.encryptedData;
						const iv = e.detail.iv;
						const code = loginres.code;
						that.reqopenId(e, loginres);

						// that.requestByCode(code,encryptedData,iv);

						// that.getOpenIdSessionKey(code,e);
						// let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +
						// 	'&js_code=' +
						// 	loginres.code + '&grant_type=authorization_code';
						// 用 code 换取 session 和 openId
						// uni.request({
						// 	url: "https://apiv3.chemi.ren/ucas/user/app/getSKAndOpenid", // 请求路径
						// 	data:{
						// 		code: code,
						// 		type:2
						// 	},
						// 	header: {
						// 		'Content-Type': 'application/json',
						// 		'x-auth-token':'',
						// 	},
						// 	success: res => { //成功res返回openid，session_key
						// 		that.loading = false;
						// 		res.data.openid && uni.setStorageSync("openId",res.data.openid)
						// 		console.log(JSON.stringify(res));	
						// 		const openId = res.data.openid;
						// 		console.log("res.data.session_key===>",res.data.session_key);
						// 		console.log("appid===>",appid);
						// 		console.log("e.detail.encryptedData===>",e.detail.encryptedData);
						// 		console.log("e.detail.iv===>",e.detail.iv);
						// 		//解密用户信息
						// 		let pc = new WXBizDataCrypt(appid,res.data.session_key);           //wxXXXXXXX为你的小程序APPID  
						// 		let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);  


						// 		// //data就是最终解密的用户信息 
						// 		// countryCode: "86"  区号
						// 		// phoneNumber: "15634123456"  用户绑定的手机号（国外手机号会有区号）
						// 		// purePhoneNumber: "15634123456"  没有区号的手机号
						// 		// watermark:
						// 		//         appid: "wxce185cd1da123456"
						// 		//         timestamp: 1607906868

						// 		console.log(JSON.stringify(data))
						// 		const phone = data.phoneNumber;
						// 		uni.getUserInfo({    
						// 			withCredentials:true,
						// 			success: (info) => {
						// 				console.log("info===>",JSON.stringify(info));
						// 				const name = info.userInfo.nickName
						// 				const avatarUrl = info.userInfo.avatarUrl
						// 				uni.setStorageSync("userInfo",info.userInfo);
						// 				uni.setStorageSync("phone",phone);
						// 				that.requestAdd(openId,name,name,phone);
						// 			},
						// 			fail: (err) => {
						// 				console.log(err)
						// 			}
						// 		})
						// 	},
						// 	fail: err => {
						// 		that.loading = false;
						// 		console.log(err)
						// 	}
						// })
					}
				})
			},
			reqopenId(e, loginres) {
				let that = this;
				const encryptedData = e.detail.encryptedData;
				const iv = e.detail.iv;
				const code = loginres.code;
				// that.requestByCode(code,encryptedData,iv);

				// that.getOpenIdSessionKey(code,e);
				// let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +
				// 	'&js_code=' +
				// 	loginres.code + '&grant_type=authorization_code';
				// 用 code 换取 session 和 openId

				this.$request({
					path: "/user/mobile/getOpenIdByCode",
					query: {
						code: code,
						iv: iv,
						encryptedData: encryptedData
					}
				}).then(res => {
					if (res && res.data && res.data.code == 200) {
						res.data.data.openid && uni.setStorageSync("openId", res.data.data.openid)
						console.log(JSON.stringify(res));
						const openId = res.data.data.openid;
						const session_key = res.data.data.session_key;
						console.log("res.data.session_key===>", session_key);
						console.log("e.detail.encryptedData===>", e.detail.encryptedData);
						console.log("e.detail.iv===>", e.detail.iv);
						console.log("zzzopenId===>", openId);
						that.postAuth(openId, iv, encryptedData, session_key);
						//解密用户信息
						// let pc = new WXBizDataCrypt(openId,session_key);           //wxXXXXXXX为你的小程序APPID  
						// let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);  
						// // //data就是最终解密的用户信息 
						// // countryCode: "86"  区号
						// // phoneNumber: "15634123456"  用户绑定的手机号（国外手机号会有区号）
						// // purePhoneNumber: "15634123456"  没有区号的手机号
						// // watermark:
						// //         appid: "wxce185cd1da123456"
						// //         timestamp: 1607906868
						// console.log(JSON.stringify(data))
						// const phone = data.phoneNumber;

						// uni.getUserInfo({    
						// 	withCredentials:true,
						// 	success: (info) => {
						// 		console.log("info===>",JSON.stringify(info));
						// 		const name = info.userInfo.nickName
						// 		uni.setStorageSync("userInfo",info.userInfo);
						// 		uni.setStorageSync("phone",phone);
						// 		that.requestAdd(openId,name,name,phone);
						// 	},
						// 	fail: (err) => {
						// 		console.log(err)
						// 	}
						// })
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})

			},
			postAuth(openId, iv, encryptedData, session_key) {
				let that = this;
				this.$request({
					path: "/user/mobile/postAuth",
					method: "POST",
					query: {
						encryptedData: encryptedData,
						openId: openId,
						iv: iv,
						sessionKey: session_key,
					}
				}).then(res => {
					if (res && res.data && res.data.code == 200) {
						let phone = res.data.data;
						that.requestAdd(openId, "微信用户", "微信用户", phone);
					} else {
						uni.showToast({
							icon: "none",
							title: JSON.stringify(res.data.msg)
						})
					}
				})

			},
			requestAdd(openId, name, nickName, phone) {
				uni.setStorageSync("phone", phone);
				let that = this;
				that.loading = true;
				this.$request({
					path: "/user/mobile/add",
					method: "POST",
					query: {
						name: name,
						nickName: nickName,
						phone: phone,
						openId: openId,
					},
					hastoast: true,
				}).then(res => {
					that.loading = false;
					// 346829058917404672
					console.log("res:", JSON.stringify(res))
					console.log("back click4444");
					if (res && res.data && res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: "登录成功",
							success() {

								console.log("back click3333");
								uni.setStorageSync("userId", res.data.data.id);
								uni.$emit('Login', {
									msg: "登录更新"
								})
								setTimeout(() => {
									uni.navigateBack();
								}, 100)
							}
						})

					} else {
						if (res.data && res.data.msg) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
							})
						} else {
							// uni.showToast({
							// 	icon:'none',
							// 	title:"服务器端出错",
							// })
						}
					}
				})

			},

			async requestByCode(sessionKey, openId, encryptedData, iv) {
				let req = {
					sessionKey: sessionKey,
					encryptedData: encryptedData,
					iv: iv,
					openId: openId,
				};
				console.log("res===>", JSON.stringify(req))
				const [err, res] = await this.$arequest({
					path: "/user/mobile/postAuth",
					method: "POST",
					query: req
				})

				// 346829058917404672
				console.log("err:", JSON.stringify(err))
				console.log("res:", JSON.stringify(res))
			}

		}
	};
</script>
<style lang="scss" scoped>
	.auth {
		padding: 50rpx 30rpx 0 30rpx;
	}

	.bottom {
		width: 85%;
		background: #53B7C7;
		color: #FFFFFF;
	}

	.header {
		height: 30px !important;
		display: flex;
		justify-content: space-between;
		padding-top: 65px;
	}

	.navibarbg {
		width: 100%;
		height: 95px;
		background: #FFFFFF;
	}

	.title {
		font-size: 17px !important;
		line-height: 60rpx !important;
		font-family: PingFang-SC-Semibold, PingFang-SC;
		font-weight: 400;
		color: #333333;
	}

	.icon {
		font-size: 30rpx !important;
		padding-left: 15px;
	}

	.canclebtn {
		width: 300rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		color: #53B7C7;
		text-align: center;
		margin-top: 80rpx;
		margin: 50rpx auto 40rpx auto;
		background-color: transparent !important;
		text-decoration: underline;
	}

	.info {
		margin-bottom: 130rpx;

		.ttitle {
			font-size: 40rpx;
			color: #333;
			font-weight: bold;
			margin: 30rpx auto;
			text-align: center;
		}

		.note {
			display: flex;
			flex-flow: wrap;
			align-items: center;
			padding-left: 50rpx;
			margin-top: 40rpx;

			.point {
				width: 10rpx;
				height: 10rpx;
				background: #000;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>