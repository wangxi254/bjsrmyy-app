<template>
<cover-view v-if="authFlag" class="authmodal">
  <cover-view class="modal-box">
    <cover-view class="head-title">
		<view>姓名：</view>
		<view>
			<picker :value="credentialTypeIndex" :range="patientList" @change="credentialTypeChange" range-key="name">
				<view class="flex-row picker-view height40">
				  <view>
						{{patientList[credentialTypeIndex].name||'选择联系人类型'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
		</view>
	</cover-view>
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

export default {
	props:{
		Lsit:{
			type:Array,
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
	
	methods: {
		
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
  z-index: 999;
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
	display: flex;
	flex-direction: row;
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


.checklayer {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 99;
		// overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		-webkit-align-items: center; /* Safari 7.0+ */
		vertical-align: middle;
		display: flex;
	}

	.parkbox{
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-sizing: border-box;
		position: relative;
		padding: 0 15rpx;
		width: 80%;
	}
	
	.tcode{
		height: 50px;
		margin-top: 10px;
	}
	
	.scode{
		padding: 0px 45px;
		height: 180px;
		width: 180px;
		margin-bottom: 10px;
	}
	
	.center{
		align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
		padding-left: 15px;
		padding-right: 15px;
	}
	
	.height40{
		line-height: 40px;
		height: 40px;
	}
	
	.right{
		height: 10px;
		width: 10px;
	}
	
	.picker-view{
		min-width: 80px;
		padding: 0 10px;
		
		align-items: center;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}
	
	.height40{
		height: 30px;
		line-height: 30px;
		margin: 0px 5px;
		border-radius: 5px;
	}
</style>