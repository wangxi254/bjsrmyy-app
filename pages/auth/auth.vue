<template>
	<view>
		<view class="navibarbg">
			<view class="header">
				<uni-icons @click="back" class="icon" type="back" size="26" />
				<view class="title">
					登录
				</view>
				<uni-icons class="icon" type="" size="20" />
			</view>
		</view>
		
		<view class="auth">
			<button class='bottom' type="primary" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" withCredentials="true">手机号授权登录</button>
		</view>
	</view>
</template>

<script>

import WXBizDataCrypt from "./WXBizDataCrypt.js";
export default {
	data() {
		return {
			choose:false,
			backindex:false
		};
	},
	/**
	* 初始
	*/
	
	onLoad(options) {
		console.log("options--->",JSON.stringify(options));
		if(options.backindex){
			this.backindex = options.backindex;
		}
		uni.login({
			success: (res) => {
				
			}
		})
	},
	onBackPress(options) {  
		console.log("onBackPress");
		console.log("options",JSON.stringify(options))
		console.log("backindex==》",this.backindex);
		
		if (options.from === 'navigateBack') {  
			return false;  
		}  
		if(this.backindex){
			uni.switchTab({
				url:"../index/index"
			})
		}else{
			uni.navigateBack();
		}
		return true; 
	},
	onUnload() {
		if(this.backindex){
			uni.switchTab({
				url:"../index/index"
			})
		}
	},
	methods: {
		back(){
			if(this.backindex){
				uni.switchTab({
					url:"../index/index"
				})
			}else{
				uni.navigateBack();
			}
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
					
					// that.getOpenIdSessionKey(code,e);
					let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +
						'&js_code=' +
						loginres.code + '&grant_type=authorization_code';
					// 用 code 换取 session 和 openId
					uni.request({
						url: url, // 请求路径
						success: res => { //成功res返回openid，session_key
							
							res.data.openid && uni.setStorageSync("openId",res.data.openid)
							console.log(JSON.stringify(res));	
							const openId = res.data.openid;
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
								withCredentials:true,
								success: (info) => {
									console.log("info===>",JSON.stringify(info));
									const name = info.userInfo.nickName
									that.requestAdd(openId,name,name,phone);
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
		
		postAuth(phone,openId){
			let that = this;
			this.$request({
				path:"/user/mobile/postAuth",
				method:"POST",
				query:{
					phone:phone,
					openId:openId,
				}
			}).then(res=>{
				if(res && res.data.code == 200){
					
					const encryptedData = e.detail.encryptedData;
					const iv = e.detail.iv;
					// const code = loginres.code;
					const openId = res.data.data.openId;
					const sessionKey = res.data.data.sessionKey;
					console.log("openId===>",JSON.stringify(res));
					that.requestByCode(sessionKey,openId,encryptedData,iv);
				}else{
					uni.showToast({
						icon:"none",
						title:err ? JSON.stringify(err) : JSON.stringify(res.data.msg)
					})
				}
			})
			
		},
		requestAdd(openId,name,nickName,phone){
			this.postAuth(phone,openId);
			this.$request({
				path:"/user/mobile/add",
				method:"POST",
				query:{
					name:name,
					nickName:nickName,
					phone:phone,
				}
			}).then(res=>{
				// 346829058917404672
				console.log("res:",JSON.stringify(res))
				if(res && res.data && res.data.code == 200){
					uni.showToast({
						icon:'none',
						title:"登录成功",
						success() {
							uni.setStorageSync("userId",res.data.data.id);
							uni.$emit('Login',{msg: "登录更新"})
							setTimeout(()=>{
								uni.navigateBack();
							},100)
						}
					})
					
				}else{
					uni.showToast({
						icon:'none',
						title:res.data.msg,
					})
				}
			})
			
		},

		async requestByCode(sessionKey,openId,encryptedData,iv){
			let req = {
					sessionKey:sessionKey,
					encryptedData:encryptedData,
					iv:iv,
					openId:openId,
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
	
	.bottom{
		background: #53B7C7;	
		color: #FFFFFF;
	}
	.header{
		
		height: 30px !important;
		display: flex;
		justify-content: space-between;
		padding-top: 65px;
	}
	
	.navibarbg{
		width: 100%;
		height: 95px;
		background: #FFFFFF;
	}
	
	.title{
		font-size: 17px !important;
		line-height: 60rpx !important;
		font-family: PingFang-SC-Semibold, PingFang-SC;
		font-weight: 400;
		color: #333333;
	}
	.icon{
		font-size: 30rpx !important;
		padding-left: 15px;
	}
	
</style>