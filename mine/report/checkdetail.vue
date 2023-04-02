<template>
	<view>
		<view class="root-container">
			<view class="user-info-card">
				<view class="name">{{testReport.name || 'xxx'}}</view>
				<view class="sex">{{testReport && testReport.sex == 'M'? '男':'女'}}</view>
				<view class="age">{{testReport.age || '--'}}岁</view>
			</view>

			<view class="label-container">
				<view class="label-item">
					<view class="label-txt">报告单名称：</view>
					<view class="label-content">{{testReport && testReport.reportName ? testReport.reportName:''}}
					</view>
				</view>
				<view class="label-item">
					<view class="label-txt">检验编号：</view>
					<view class="label-content">{{testReport && testReport.reportCode ? testReport.reportCode:''}}
					</view>
				</view>
				<view class="label-item">
					<view class="label-txt">科室名称：</view>
					<view class="label-content">{{testReport && testReport.depName ? testReport.depName : ''}}</view>
				</view>
				<view class="label-item">
					<view class="label-txt">申请医生：</view>
					<view class="label-content">{{testReport && testReport.sqDoc ? testReport.sqDoc : ''}}</view>
				</view>
				<view class="label-item">
					<view class="label-txt">检验时间：</view>
					<view class="label-content">{{testReport && testReport.cyTime ? testReport.cyTime :''}}</view>
				</view>

				<view class="label-item" v-if="testReport && testReport.checkDetail">
					<view class="label-txt">检查所见：</view>
					<view class="label-content">{{testReport && testReport.checkDetail ? testReport.checkDetail : ''}}
					</view>
				</view>
				<view class="label-item" v-if="testReport && testReport.diagnosis">
					<view class="label-txt">临床诊断：</view>
					<view class="label-content">{{testReport && testReport.checkDetail ? testReport.checkDetail : ''}}
					</view>
				</view>
				<view class="label-item" v-if="testReport && testReport.qualitative">
					<view class="label-txt">诊断结果：</view>
					<view class="label-content">{{testReport && testReport.diagnosis ? testReport.diagnosis : ''}}
					</view>
				</view>
				<view class="label-item" v-if="testReport && testReport.qualitative">
					<view class="label-txt">报告医生：</view>
					<view class="label-content">
						{{testReport && testReport.reportDoc ? testReport.reportDoc : ''}}
					</view>
				</view>
				<view class="label-item" v-if="testReport && testReport.qualitative">
					<view class="label-txt">审核医生：</view>
					<view class="label-content">{{testReport && testReport.shDoc ? testReport.shDoc : ''}}</view>
				</view>
			</view>

			<view v-if="testReport && testReport.picUrl">
				<!-- 图片 -->
				<view v-if="testReport.type == 'image'" class="report-container">
					<image :src="testReport.picUrl" mode='widthFix'></image>
				</view>
				<!-- PDF -->
				<view v-if="testReport.type == 'pdf'" class="report-container-pdf">
					<view class="open-btn" @click="openPdf">附件</view>
					<!-- <web-view :src="testReport.picUrl"></web-view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../config.js';

	export default {
		data() {
			return {
				fileHost: '',
				testReport: {}
			}
		},
		onLoad(options) {
			this.fileHost = config.baseUrl.replace('/api', '')
			if (options.item) {
				const item = JSON.parse(options.item);
				this.getDetailInfoByPatient(item);
			}
		},
		methods: {
			openPdf() {
				let that = this;
				// #ifdef MP-WEIXIN
				uni.showLoading({
					title: '加载中...'
				})
				if (that.cachePdfFilePath) {
					wx.openDocument({
						filePath: that.cachePdfFilePath,
						fileType: 'pdf',
						success: function(res) {
							uni.hideLoading()
						},
						fail: function(err) {
							uni.hideLoading()
							console.log('fail:' + JSON.stringify(err));
						}
					});
				} else {
					wx.downloadFile({
						url: this.testReport.picUrl,
						success: function(res) {
							uni.hideLoading()
							that.cachePdfFilePath = res.tempFilePath;
							uni.showLoading({
								title: '正在打开',
								mask: true
							})
							wx.openDocument({
								filePath: that.cachePdfFilePath,
								fileType: 'pdf',
								success: function(res) {
									console.log(res)
									uni.hideLoading()
								},
								fail: function(err) {
									uni.hideLoading()
									console.log('fail:' + JSON.stringify(err));
								}
							});
						},
						fail: function(err) {
							uni.hideLoading()
							console.log('fail:' + JSON.stringify(err));
						}
					});
				}
				// #endif

				// // #ifndef MP-WEIXIN
				// uni.openDocument({
				// 	filePath: this.testReport.picUrl,
				// 	filetype: "pdf",
				// 	showMenu: true,
				// 	success: function(file) {
				// 		console.log("file-success", file)
				// 	},
				// 	fail: function(file) {
				// 		console.log("file-fail", file)
				// 	}
				// })
				// // #endif
			},

			getDetailInfoByPatient(item) {
				let that = this;
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path: '/checkReport/mobile/getDetailInfo',
					query: {
						reportSeq: item.reportSeq,
						reportCode: item.reportCode,
						// userId:uni.getStorageSync("userId"),
						mrn: item.mrn,
					}
				}).then(res => {
					if (res.data.code == 200) {
						let resultData = res.data.data
						resultData.picUrl = this.fileHost + resultData.picUrl
						that.testReport = resultData;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.root-container {
		padding: 10px 5px 30px 5px;
	}

	.label-container {
		border: 1px #e7e7e7 solid;
		border-radius: 2px;
		margin-top: 10px;

		.label-item {
			display: flex;
			font-size: 13px;
			border-bottom: 1px #e7e7e7 solid;

			.label-txt {
				min-width: 85px;
				height: 100%;
				color: #666666;
				padding: 12px 10px;
			}

			.label-content {
				display: flex;
				align-items: center;
				color: #000000;
				min-height: 20px;
				padding: 5px 15px;
				word-wrap: break-word;
				border-left: 1px #e7e7e7 solid;
			}
		}

		.label-item:last-child {
			border-bottom: none;
		}
	}

	.user-info-card {
		display: flex;
		align-items: center;
		color: #000000;
		font-size: 15px;
		border-radius: 5px;
		padding: 20px;
		margin: 5px;
		margin-bottom: 20px;
		box-shadow: 0px 2px 10px #e7e7e7;

		.name {
			font-size: 17px;
			font-weight: bold;
		}

		.age {
			margin-left: 10px;
		}

		.sex {
			margin-left: 30px;
		}
	}

	.report-container {
		width: 100vw;
		min-height: 600px;
		margin-bottom: 20px;

		image {
			width: 100vw;
		}
	}

	.report-container-pdf {
		width: 100vw;

		.open-btn {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: 14px;
			color: blueviolet;
			font-weight: bold;
		}
	}
</style>