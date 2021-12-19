<template>
	<view class="page">
		<uni-title class="title" type="h2" title="预约须知" align="center"></uni-title>
		<view>
			为方便您早日康复，请您认真阅读预约就诊须知；
		</view>
		<view v-for="item in content" :key="item.id">
			<uni-title type="h3" :title="item.title" align="left"></uni-title>
			<view v-for="item1 in item.con" :key="item1.id">
				{{item1.con}}
			</view>
		</view>
		<view class="uni-padding-wrap" style="margin: 15rpx 0;">
			<button class="btn" type="primary" @click="toNext">我已了解，继续预约</button>
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
				content: [
					{
						id: 11,
						title: '一.预约须知',
						con: [
							{
								id: 1,
								con: '1.为方便您早日康复，请您认真阅读预约就诊须知；'
							},
							{
								id: 2,
								con: '2.为方便您早日康复，请您认真阅读预约就诊须知；'
							},
							{
								id: 3,
								con: '3.为方便您早日康复，请您认真阅读预约就诊须知；'
							}
						]
					},
					{
						id: 12,
						title: '一.预约须知',
						con: [
							{
								id: 1,
								con: '1.为方便您早日康复，请您认真阅读预约就诊须知；'
							},
							{
								id: 2,
								con: '2.为方便您早日康复，请您认真阅读预约就诊须知；'
							},
							{
								id: 3,
								con: '3.为方便您早日康复，请您认真阅读预约就诊须知3.为方便您早日康复，请您认真阅读预约就诊须知3.为方便您早日康复，请您认真阅读预约就诊须知3.为方便您早日康复，请您认真阅读预约就诊须知3.为方便您早日康复，请您认真阅读预约就诊须知；'
							}
						]
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			toNext() {
				uni.navigateTo({
					url:'/pages/yx/Department/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		// line-height: 50rpx;
		font-family: fangsong;
		line-height: 2;
		::v-deep .uni-title__base{
			font-family: fangsong;
		}
		.btn{
			font-size: $uni-font-size-lg;
			font-family: none;
			background: $uni-color-primary;
		}
	}
</style>