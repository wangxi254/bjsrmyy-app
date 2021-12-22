<template>
	<view>
		<view class="head">
			<view class="flex-row">
				<view @click="clickTab(0)" class="flex1 head-view" :class="currentindex === 0 ? 'active' : 'unactive'">
					医院概况
				</view>
				<view @click="clickTab(1)" class="flex1 head-view" :class="currentindex === 1 ? 'active' : 'unactive'">
					乘车指南
				</view>
				<view @click="clickTab(2)" class="flex1 head-view" :class="currentindex === 2 ? 'active' : 'unactive' ">
					联系我们
				</view>
			</view>
			<view class="head-line"></view>
		</view>
		
		<view v-if="currentindex === 0" class="content1">
			<view class="hs1-title">贵阳市第一人民医院</view>
			<image class="hs1-img" src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"></image>
			<view class="flex-row item">
				<view class="hs1-text" @click="totel">咨询电话：<text>{{hospitalInto.contact}}</text></view>
				<image class="hs1-icon" mode="aspectFill" src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"></image>
			</view>
			<view class="flex-row item" @click="navito">
				<view class="hs1-text">贵阳市第一人民医院</view>
				<image class="hs1-icon" mode="aspectFill" src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"></image>
			</view>
			<view class="hs1-detail">
				吾问无为谓我问问我若若日珥我的烦恼我问问呜呜呜呜嗡嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的烦恼我问问呜呜呜呜嗡嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的烦恼我问问呜呜呜呜嗡嗡窝囊废件基金进阶军
			</view>
		</view>
		
		<view v-if="currentindex === 1">
			<view class="traffic">
				公交13路，109路，10路
			</view>
		</view>
		
		<view v-if="currentindex === 2">
			<view class="contact">咨询热线：</view>
			<view class="number" @click="totel">{{hospitalInto.contact}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentindex:0,
			}
		},
		onLoad(options) {
			this.requestHospitalInto();
		},
		methods: {
			clickTab(index){
				this.currentindex = index;
			},
			async requestHospitalInto(){
				const [error,result] = await this.$arequest({
					path:"/hospital/mobile/getHospital",
				});
				console.log("getHospital==>",JSON.stringify(result));
				console.log("getHospital==>",JSON.stringify(result.data.code));
				if(result.data.code == 200){
					this.hospitalInto = result.data.data;
				}
			},
			totel(){
				if(this.hospitalInto.contact){
					uni.makePhoneCall({
					  phoneNumber: this.hospitalInto.contact //
					});
				}
			},
			navito(){
				uni.openLocation({
				  latitude: this.hospitalInto.latitude,
				  longitude: this.hospitalInto.longitude,
				  name: this.hospitalInto.name
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.head{
		.head-view{
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: $uni-font-normal-title;
		}
		.active{
			color: $uni-color-primary;
			border-bottom: 1px solid $uni-color-primary;
		}
		.unactive{
			color: $uni-text-color;
		}
		.head-line{
			background: #C8C7CC;
			height: 1px;
			width: 100%;
		}
	}
	
	.content1{
		.hs1-title{
			color: $uni-color-primary;
			font-size: $uni-font-big-title;
			height: 40px;
			line-height: 40px;
			margin-left: 15px;
			font-weight: bold;
		}
		.hs1-img{
			width: 100%;
			height: 100px;
			margin-top: 5px;
		}
		
		.item{
			display: flex;
			flex-direction: row;
			height: 40px;
			line-height: 40px;
			justify-content: space-between;
			padding: 0px 15px;
			border-bottom: 0.5px solid $uni-border-color;
			.hs1-text{
				color: $uni-text-color;
				font-size: $uni-font-detail-title;
				text{
					color: $uni-color-primary;
				}
			}
			.hs1-icon{
				width: 20px;
				height: 20px;
				margin-top: 10px;	
			}
		}
		
		.hs1-detail{
			padding: 10px;
			color: $uni-text-color;
			font-size: $uni-font-detail-title;
		}
	}
	
	.traffic{
		margin: 10px;;
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
	}
	
	.contact{
		margin-top: 10px;
		margin-left: 10px;
		color: $uni-text-color;
		font-size: $uni-font-detail-title;
	}
	
	.number{
		margin-left: 10px;
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
	}
</style>