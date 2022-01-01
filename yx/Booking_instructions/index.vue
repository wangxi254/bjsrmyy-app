<template>
	<view class="page">
		<uni-title class="title" type="h2" :title="pageType==1?'当日挂号须知':'预约须知'" align="center"></uni-title>
		<view>
			为方便您早日康复，请您认真阅读预约就诊须知；
		</view>
		<view v-if='pageType==2' v-html="contentHtml"></view>
		<view v-else class="notice-title">
			<view><text class="title-txt">第一条</text> 当日挂号仅支持当日可用号源</view>
			<view><text class="title-txt">第二条</text> 当日挂号不支持在线退号，如需退号请至窗口办理</view>
			<view><text class="title-txt">第三条</text> 挂号成功后请按挂号时间及时就诊，如不能及时取号就诊，请及时办理退号，否则将按爽约处理</view>
			<view><text class="title-txt">第四条</text> 同一天同一个科室每人只能预约一次</view>
			<view><text class="title-txt">第五条</text> 同一天同一个医生每人只能预约一次</view>
			<view><text class="title-txt">第六条</text> 同一天同一时间段每人只能预约一次</view>
		</view>
		<view class="uni-padding-wrap" style="margin: 15rpx 0;">
			<button class="primary-btn btn" type="primary" @click="toNext">我已了解，{{pageType==1?'前往挂号':'继续预约'}}</button>
		</view>
	</view>
</template>

<script>
	import uniTitle from "@/components/uni-title.vue";
	export default {
		components: {
			uniTitle
		},
		data() {
			return {
				contentHtml: '',
				pageType: 1
			}
		},
		onLoad(options) {
			options.type && (this.pageType = options.type)
			uni.setNavigationBarTitle({
				title: this.pageType==1?'当日挂号须知':'预约须知'
			})
			this.getexpert()
		},
		methods: {
			toNext() {
				this.$getPatientList().then(res => {
					if (res && res.length > 0) {
						uni.navigateTo({
							url: '../Department/index?type=' + this.pageType
						})
					}
				})
			},
			getexpert() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$request({
					path: '/system/notice/10',
				}).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
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

		::v-deep .uni-title__base {
			//font-family: fangsong;
		}

		// .btn{
		// 	font-size: $uni-font-size-lg;
		// 	font-family: none;
		// 	background: $uni-color-primary;
		// }
	}

	.notice-title {
		font-size: 28rpx;
		color: #000000;
		margin: 40rpx 0 140rpx 0;
	}

	.title-txt {
		font-size: 28rpx;
		font-weight: bold;
		margin-right: 30rpx;
	}
</style>
