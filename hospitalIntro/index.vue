<template>
	<view>
		<view class="head">
			<view class="space-between align-items-center">
				<view @click="clickTab(0)" class="flex1 head-view-size font-size-16-w500"
					:class="currentindex === 0 ? 'active' : 'unactive'">
					医院概况
				</view>
				<!-- <view @click="clickTab(1)" class="flex1 head-view" :class="currentindex === 1 ? 'active' : 'unactive'">
					乘车指南
				</view> -->
				<view class="m-line"></view>
				<view @click="clickTab(2)" class="flex1 head-view-size font-size-16-w500"
					:class="currentindex === 2 ? 'active' : 'unactive' ">
					联系我们
				</view>
			</view>
			<!-- <view class="head-line"></view> -->
		</view>

		<view v-if="currentindex === 0" class="content1">
			<image class="hs1-img" mode="" :src="joinUrl(hospitalInto.picture)"></image>
			<view class="hs1-title font-size-16-w500">{{hospitalInto.name}}</view>
			<!-- <view class="flex-row item">
				<view class="hs1-text" @click="totel">咨询电话：<text>{{hospitalInto.contact}}</text></view>
				<image class="hs1-icon" mode="" src="../static/common/right.png"></image>
			</view> -->
			<view class="flex-row item" @click="navito">
				<view class="hs1-text font-size-14-w400">{{hospitalInto.name}}</view>
				<image class="hs1-icon" mode="" src="../static/common/right.png"></image>
			</view>
			<view class="hs1-detail paading15 font-size-14-w400">
				{{hospitalInto.synopsis}}
			</view>
		</view>

		<!-- <view v-if="currentindex === 1">
			<view class="traffic">
				公交{{hospitalInto.busRoute}}
			</view>
		</view> -->

		<view class="content2">
			<view style="height: 15px;"></view>
			<view class="contact-item marginlr15" v-if="currentindex === 2">
				<view class="contact font-size-m14-w500">咨询热线：</view>
				<view class="number" @click="totel">{{hospitalInto.contact}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import config from '../config.js';
	export default {
		data() {
			return {
				currentindex: 0,
				hospitalInto: {},

			}
		},
		onLoad(options) {
			if (options.item) {
				this.hospitalInto = JSON.parse(options.item);
			} else {
				this.requestHospitalInto();
			}
		},
		methods: {
			clickTab(index) {
				this.currentindex = index;
			},
			async requestHospitalInto() {
				const [error, result] = await this.$arequest({
					path: "/hospital/mobile/getHospital",
				});
				console.log("getHospital==>", JSON.stringify(result));
				console.log("getHospital==>", JSON.stringify(result.data.code));
				if (result.data.code == 200) {
					this.hospitalInto = result.data.data;
					console.log("this.hospitalInto--->", JSON.stringify(this.hospitalInto))
				}
			},
			totel() {
				if (this.hospitalInto.contact) {
					uni.makePhoneCall({
						phoneNumber: this.hospitalInto.contact //
					});
				}
			},
			navito() {
				uni.openLocation({
					latitude: 27.304252,
					longitude: 105.281939,
					// latitude: Number(this.hospitalInto.latitude),
					// longitude: Number(this.hospitalInto.longitude),
					name: this.hospitalInto.name
				});
			},
			joinUrl(url) {
				console.log("url===>", url);
				const newurl = config.baseUrl + '/' + url;
				console.log("newurl===>", newurl);
				return newurl;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		.head-view-size {
			height: 52px;
			line-height: 52px;
			text-align: center;
		}

		.active {
			color: $uni-color-primary;
		}

		.unactive {
			color: $uni-text-color-grey;
		}

		.head-line {
			background: #C8C7CC;
			height: 1px;
			width: 100%;
		}
	}

	.content1 {
		.hs1-title {
			color: $uni-color-primary;
			height: 53px;
			line-height: 53px;
			text-align: center;
		}

		.hs1-img {
			width: 100%;
			height: 200px;
		}

		.item {
			display: flex;
			height: 50px;
			line-height: 50px;
			justify-content: space-between;
			padding: 0px 15px;
			background: $uni-bg-color-grey;
			align-items: center;

			.hs1-text {
				color: $uni-text-color;
			}

			.hs1-icon {
				width: 15px;
				height: 15px;
			}
		}

		.hs1-detail {
			color: $uni-text-color-grey;
		}
	}

	.traffic {
		margin: 10px;
		;
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
	}

	.contact {
		color: $uni-text-color;
	}

	.number {
		margin-left: 10px;
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
	}

	.m-line {
		width: 1px;
		height: 22px;
		background: #E2E2E2;
	}



	.content2 {
		background: $uni-bg-color-grey;
		height: 100vh;

		.contact-item {
			height: 60px;
			line-height: 60px;
			padding: 0px 15px;
			background: $uni-bg-color;
			align-items: center;
			display: flex;
			justify-content: space-between;
		}
	}
</style>