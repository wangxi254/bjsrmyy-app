<template>
<cover-view v-if="authFlag" class="authmodal">
  <cover-view class="modal-box">
    <cover-view class="head-title">当前功能需要获取用户信息</cover-view>
	<cover-view class="head-desc">请稍后的提示框中点击允许</cover-view>
	<cover-view style="margin-top: 25px;background: #E4E4E4;height: 2rpx;width: 100%;"></cover-view>
	<cover-view class="footerauth">
		<button class="bottodef" type='default' @tap="handleCloseModal">取消</button>
		<button class="bottodef btncolor" type='primary' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" withCredentials="true">授权登录</button>
	</cover-view>
  </cover-view> 
</cover-view>
</template>

<script>
import WXBizDataCrypt from "../../pages/auth/WXBizDataCrypt.js";
const appid = "wxbd1c9abbabdd7333" //需替换
const secret = "3dda78ba34520358aade662ae735e1d1"  //需替换
export default {
	props:{
		authFlag:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			codeLength: 4,
			authSecondFlag: false,
			code: "",
		};
	},
	/**
	* 初始
	*/
	beforeMount() {
		this.authFlag = true;
	},
	async mounted() {
		uni.login({
			success: (res) => {
				
			}
		})
	},
	methods: {
		onGetPhoneNumber(e) {
			let that = this;
			console.log("e===>",JSON.stringify(e))
			//调用 wx.login 接口,获取code
			uni.login({
				provider: 'weixin',
				success: loginres => {
					console.log("loginres>>",JSON.stringify(loginres));
					that.reqopenId(e,loginres);
				}
			})
		},
		reqopenId(e,loginres){
			let that = this;
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
			let that = this;
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
								that.handleCloseModal()
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
		//关闭弹窗
		handleCloseModal() {
			this.authFlag = false;
			this.$emit('closemodal', {
				detail: {
					authFlag: false
				}
			});
		}

	}
};
</script>
<style scoped>

.authmodal {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  left: 0;
  top: 0;
  z-index: 99999999999;
}

.modal-box {
  width: 280px;
  height: 180px;
  background: #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 6rpx 10rpx 0px rgba(221, 243, 255, 0.05);
  border-radius: 16rpx;
  /* padding-top: 100rpx; */
  margin: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.modal-box .box-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 80rpx;
  justify-content: center;
}

.modal-box .head-title {
  text-align: center;
  color: #333;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #3B3D47;
  margin-bottom: 19px;
  line-height: 45px;
  height: 45px;
}

.modal-box .box-head .close-modal {
  width: 42rpx;
  height: 42rpx;
  position: absolute;
  right: 38rpx;
  top: 40rpx;
}
.input::placeholder{color: #8E8E90;}

.modal-box .box-head .close-modal .closeIcon{
  width: 42rpx;
  height: 42rpx;
}


.modal-box .box-head .back {
  width: 42rpx;
  height: 42rpx;
  position: absolute;
  right: 30rpx;
  left: 38rpx;
}

 .backicon {
  width: 42rpx;
  height: 42rpx;
}

.modal-box .wx-type {
  width: 400rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: linear-gradient(10deg, #0A9A42, #47B233);
  color: #fff;
  font-size: 32rpx;
  border-radius: 40rpx;
  margin: 60rpx auto 0;
}

.modal-box .tel-type {
  width: 399rpx;
  height: 80rpx;
  margin: 30rpx auto 0;
  line-height: 80rpx;
  border-radius: 40rpx;
  text-align: center;
  color: #0A9A42;
  font-size: 32rpx;
  background: #fff;
  border: 1rpx solid #0A9A42;
}

.modal-box .tel-input {
  width: 480rpx;
  margin: 80rpx auto 0;
  border-bottom: 1rpx solid #ccc;
  color: #333;
  font-size: 24rpx;
  padding-bottom: 10rpx;
}

.modal-box .next {
  width: 400rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: linear-gradient(10deg, #0A9A42, #47B233);
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  margin: 40rpx auto 0;
  border-radius: 40rpx;
}

.modal-box .con {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-box .tel-num {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28rpx;
  color: #999;
  margin-top: 50rpx;
}
.modal-box  .real-code{
  width:0;
  height: 0
}
.modal-box .tel-num .count {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 34rpx;
  padding: 6rpx 24rpx;
  font-size: 24rpx;
  border-radius: 42rpx;
  border: 1rpx solid #ccc;
}
.modal-box .tel-num .num{font-size: 30rpx;}
.modal-box .tel-num .count-no {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20rpx;
  padding: 12rpx 24rpx;
  font-size: 24rpx;
  color: #8E8E90;
  text-align: center;
  border-radius: 28rpx;
  border: 1rpx solid #ccc;
}

.modal-box .vercode {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 60rpx;
}

.modal-box .vercode .code-num {
  width: 80rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #333;
  font-weight: 500;
  border: 1rpx solid #ccc;
  margin: 0 6rpx;
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center
}


.head-desc{
	text-align: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #8F8F8F;
	text-align: center;
	height: 60px;
	padding: 0px 30px;
}
.rows{
	display: flex;
	flex-direction: row;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	/* background-color: #009545; */
	height: 60rpx;
	padding-top: 20rpx;
	margin-top: 43rpx;
}

.row-flex{
	display: flex;
	flex-direction: row;
}

.geencolor{
	color: #14C759;
	height: 60rpx;
}

.choose{
	width: 26rpx;
	height: 26rpx;
	margin-left: 46rpx;
	padding-top: 63rpx;
}

.choosebg{
	margin-left: 20rpx;
	height: 26rpx;
	width: 80rpx;
	height: 120rpx;
}

.margintop{
	margin-top: 63rpx;
}

.bottom{
	width: 280rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #14C759;
	margin-top: 25rpx;
	
}
/* button[type=default] {
    color: #FFFFFF;
    background-color: #14C759;
} */

.btncolor{
	color: #FFFFFF;
	background-color: #53B7C7;
	border: none;
}

.bottodef{
	width: 150rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: bold;
	margin-top: 25rpx;
}

.footerauth{
	width: 100%;
	display: flex;
	height: 80px;
	padding: auto;
}
</style>