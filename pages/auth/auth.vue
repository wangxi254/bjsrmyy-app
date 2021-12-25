<template>
<view class="auth">
  	<button class='bottom' type="primary" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" >手机号授权登录</button>
  </view>
</template>

<script>

import WXBizDataCrypt from "./WXBizDataCrypt.js";
export default {
	data() {
		return {
			choose:false,
		};
	},
	/**
	* 初始
	*/
	onLoad() {
		uni.login({
			provider: 'weixin',
			success: loginres => {
			},
		})
	},
	methods: {
		//关闭弹窗
		handleCloseModal() {
		  this.$emit('closemodal', {
			detail: {
			  flag: false
			}
		  });
		},
		tapchoose(){
			this.choose = !this.choose;
		},
		handleuser(){
			uni.showLoading({
				title:"加载中..."
			})
			uni.downloadFile({
			  url: 'https://cmcp3-prod-i.oss-cn-hangzhou.aliyuncs.com/base/userAgreement/userAgreement.pdf',
			  success: function (res) {
				uni.hideLoading();
				var filePath = res.tempFilePath;
				uni.openDocument({
				  filePath: filePath,
				  success: function (res) {
					console.log('打开文档成功'+JSON.stringify(res));
				  },
				  fail(err){
					  console.log('打开文档失败'+JSON.stringify(err));
				  }
				  
				});
				
			  },
			  fail(err) {
				uni.hideLoading();
			  },
			  complete(rr) {
				uni.hideLoading();
			  }
			});
		},
		handleprotocol(){
			uni.showLoading({
				title:"加载中..."
			})
			uni.downloadFile({
			  url: 'https://cmcp3-prod-i.oss-cn-hangzhou.aliyuncs.com/base/userAgreement/privacyAgreement.pdf',
			  success: function (res) {
				 uni.hideLoading();
				var filePath = res.tempFilePath;
				uni.openDocument({
				  filePath: filePath,
				  success: function (res) {
					console.log('打开文档成功');
				  }
				});
				
			  },
			  fail(err) {
				uni.hideLoading();
			  },
			  complete(rr) {
				uni.hideLoading();
			  }
			});
		},
		//点击微信授权
		async handleWxAuth(e) {
			uni.showLoading({
				title: '加载中'
			});
		},
		onGetPhoneNumber(e) {
			let that = this;
			console.log("e===>",JSON.stringify(e))
			let appid = "wxbd1c9abbabdd7333" //需替换
			let secret = "3dda78ba34520358aade662ae735e1d1"  //需替换
			//调用 wx.login 接口,获取code
			uni.login({
				provider: 'weixin',
				success: loginres => {
					console.log("loginres>>",JSON.stringify(loginres));
					
					const encryptedData = e.detail.encryptedData;
					const iv = e.detail.iv;
					const code = loginres.code;
					// that.requestByCode(code,encryptedData,iv);
					
					
					let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +
						'&js_code=' +
						loginres.code + '&grant_type=authorization_code';
					// 用 code 换取 session 和 openId
					uni.request({
						url: url, // 请求路径
						success: res => { //成功res返回openid，session_key
							res.data.openid && uni.setStorageSync("openId",res.data.openid)
							console.log(JSON.stringify(res));	
							
							console.log("res.data.session_key===>",res.data.session_key);
							console.log("appid===>",appid);
							console.log("e.detail.encryptedData===>",e.detail.encryptedData);
							console.log("e.detail.iv===>",e.detail.iv);
							//解密用户信息
							let pc = new WXBizDataCrypt(appid,res.data.session_key);           //wxXXXXXXX为你的小程序APPID  
							let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);  
							
							
							// //data就是最终解密的用户信息 
							// countryCode: "86"  区号
							// phoneNumber: "15634123456"  用户绑定的手机号（国外手机号会有区号）
							// purePhoneNumber: "15634123456"  没有区号的手机号
							// watermark:
							//         appid: "wxce185cd1da123456"
							//         timestamp: 1607906868
							console.log(JSON.stringify(data))
							const phone = data.phoneNumber;

							uni.getUserInfo({    
                        		withCredentials:false,
								success: (info) => {
									console.log("info===>",JSON.stringify(info));
									const name = info.userInfo.nickName
									that.requestAdd(name,name,phone);
								},
								fail: (err) => {
									console.log(err)
								}
							})
						},
						fail: err => {
							console.log(err)
						}
					})
				}
			})
		},
		async requestAdd(name,nickName,phone){
			const [err,res] = await this.$arequest({
				path:"/user/mobile/add",
				method:"POST",
				query:{
					name:name,
					nickName:nickName,
					phone:phone,
				}
			})
			// 346829058917404672
			console.log("err:",JSON.stringify(err))
			console.log("res:",JSON.stringify(res))
			if(res && res.data && res.data.code == 200){
				uni.showToast({
					icon:'none',
					title:"登录成功",
					success() {
						debugger
						uni.setStorageSync("userId",res.data.data.id);
						uni.$emit('Login',{msg: "登录更新"})
						setTimeout(()=>{
							uni.navigateBack();
						},500)
					}
				})
				
			}else{
				if(err){
					uni.showToast({
						icon:'none',
						title:JSON.stringify(err),
					})
				}else{
					uni.showToast({
						icon:'none',
						title:res.data.msg,
					})
				}
			}
		},
		async requestByCode(code,encryptedData,iv){
			let req = {
					code:code,
					encryptedData:encryptedData,
					iv:iv,
				};
			console.log("res===>",JSON.stringify(req))
			const [err,res] = await this.$arequest({
				path:"/user/mobile/postAuth",
				method:"POST",
				query:req
			})
			// 346829058917404672
			console.log("err:",JSON.stringify(err))
			console.log("res:",JSON.stringify(res))
		}

	}
};
</script>
<style scoped>
	.auth{
		padding: 350rpx 30rpx 0 30rpx;
	}
</style>