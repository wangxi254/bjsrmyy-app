<!--
 * @Author: seven
 * @Date: 2021-12-24 09:47:06
 * @LastEditTime: 2021-12-24 12:24:26
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\yx\Booking_instructions\index.vue
 * 博虹出品，抄袭必究😄
-->
<template>
	<view class="page">
		<uni-title class="title" type="h2" title="预约须知" align="center"></uni-title>
		<view>
			为方便您早日康复，请您认真阅读预约就诊须知；
		</view>
		<view v-html="contentHtml"></view>
		<view class="uni-padding-wrap" style="margin: 15rpx 0;">
			<button class="primary-btn btn" type="primary" @click="toNext">我已了解，继续预约</button>
		</view>
	</view>
</template>

<script>
	import uniTitle from "@/components/uni-title.vue";
	export default {
		components:{
			uniTitle
		},
		data() {
			return {
				contentHtml: ''
			}
		},
		onLoad() {
			this.getexpert()
		},
		methods: {
			toNext() {
				uni.navigateTo({
					url:'../Department/index'
				})
			},
			getexpert(){
				uni.showLoading({
					title: '加载中...'
				})
				this.$request({
					path:'/system/notice/10',
				}).then(res=>{
					uni.hideLoading()
					if(res.data.code == 200){
						this.contentHtml = res.data.data.noticeContent
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		// line-height: 50rpx;
		//font-family: fangsong;
		line-height: 2;
		::v-deep .uni-title__base{
			//font-family: fangsong;
		}
		// .btn{
		// 	font-size: $uni-font-size-lg;
		// 	font-family: none;
		// 	background: $uni-color-primary;
		// }
	}
</style>