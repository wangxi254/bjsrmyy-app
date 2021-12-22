<template>
<cover-view class="auth">
  	<button class='bottom' type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" withCredentials="true">手机号授权登录</button>
  </cover-view>
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
	beforeMount() {
		this.setData({
		  authFlag: true,
		});
	},
	onLoad() {
			
	},
	async mounted() {
		console.log("getAuthOpenId 先获取code");
		await this.getAuthOpenId();
	},
	methods: {
		//关闭弹窗
		handleCloseModal() {
		  this.setData({
			authFlag: true
		  });
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
		getPhoneNumber(PhoneNumber) {
			let appid = "wxce185cd1da123456" //需替换
			let secret = "25d0fe7478355910fc143ce6b1234567"  //需替换
			//调用 wx.login 接口,获取code
			uni.login({
				provider: 'weixin',
				success: res => {
					let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +
						'&js_code=' +
						res.code + '&grant_type=authorization_code';
					//用 code 换取 session 和 openId
					uni.request({
						url: url, // 请求路径
						success: res => { //成功res返回openid，session_key
							// console.log(res)
							//解密用户信息
							let pc = new WXBizDataCrypt(appid, res.data.session_key);
							let data = pc.decryptData(PhoneNumber.detail.encryptedData, PhoneNumber.detail.iv);
							// //data就是最终解密的用户信息 
							// countryCode: "86"  区号
							// phoneNumber: "15634123456"  用户绑定的手机号（国外手机号会有区号）
							// purePhoneNumber: "15634123456"  没有区号的手机号
							// watermark:
							//         appid: "wxce185cd1da123456"
							//         timestamp: 1607906868
							console.log(data)
						},
						fail: err => {
							console.log(err)
						}
					})
				}
			})
		}

	}
};
</script>
<style scoped>
	.auth{
		padding: 350rpx 30rpx 0 30rpx;
	}
</style>