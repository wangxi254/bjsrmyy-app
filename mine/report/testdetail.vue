<template>
	<view class="root-container">
		<view class="user-info-card">
			<view class="name">{{testReport.name || 'xxx'}}</view>
			<view class="sex">{{testReport && testReport.sex == 'M'? '男':'女'}}</view>
			<view class="age">{{testReport.age || '--'}}岁</view>
		</view>

		<view class="label-container">
			<view class="label-item">
				<view class="label-txt">报告单名称：</view>
				<view class="label-content">
					{{testReport && testReport.reportName ? testReport.reportName:''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">检验编号：</view>
				<view class="label-content">
					{{testReport && testReport.reportCode ? testReport.reportCode:''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">科室名称：</view>
				<view class="label-content">
					{{testReport && testReport.depName ? testReport.depName : ''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">申请医生：</view>
				<view class="label-content">
					{{testReport && testReport.sqDoc ? testReport.sqDoc : ''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">检验时间：</view>
				<view class="label-content">
					{{testReport && testReport.cyTime ? testReport.cyTime :''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">检验时间：</view>
				<view class="label-content">
					{{testReport && testReport.cyTime ? testReport.cyTime :''}}
				</view>
			</view>
		</view>

		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据"
				@selection-change="selectionChange">
				<uni-tr>
					<uni-th align="center" width="75">
						<view class="header">检查项目</view>
					</uni-th>
					<uni-th align="center" width="75">
						<view class="header">定性结果</view>
					</uni-th>
					<uni-th align="center" width="75">
						<view class="header">参考值范围</view>
					</uni-th>
					<uni-th align="center" width="75">
						<view class="header">计量单位</view>
					</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td>{{testReport&&testReport.checkResult ? testReport.checkResult :'' }}</uni-td>
					<uni-td>
						{{testReport&&testReport.qualitative?testReport.qualitative:''}}
					</uni-td>
					<uni-td>
						{{testReport&&testReport.reference?testReport.reference:''}}
					</uni-td>
					<uni-td>
						{{testReport&&testReport.measurement?testReport.measurement:''}}
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent"
					:total="total" @change="change" /></view>
		</view>

		<view class="label-container" style="margin-top: 0;">
			<view class="label-item" v-if="testReport && testReport.diagnosis">
				<view class="label-txt">小结：</view>
				<view class="label-content">
					（临床诊断）{{testReport && testReport.diagnosis ? testReport.diagnosis : ''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">操作人：</view>
				<view class="label-content">
					{{testReport && testReport.reportDoc ? testReport.reportDoc : ''}}
				</view>
			</view>
			<view class="label-item">
				<view class="label-txt">审核人：</view>
				<view class="label-content">
					{{testReport && testReport.shDoc ? testReport.shDoc : ''}}
				</view>
			</view>
		</view>

		<view v-if="testReport && testReport.reportPdfUrl">
			<!-- 图片 -->
			<view v-if="testReport.type == 'image'" class="report-container">
				<image :src="cacheFilePath" mode='widthFix' @click="downloadAndOpen(true)"></image>
			</view>
			<!-- PDF -->
			<view v-if="testReport.type == 'pdf'" class="report-container-pdf">
				<view class="open-btn" @click="downloadAndOpen(true)">点击打开附件</view>
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
				testReport: {},
				cacheFilePath: "",
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
			getDetailInfoByPatient(item) {
				let that = this;
				this.$request({
					path: '/testReport/mobile/getDetailInfo',
					query: {
						reportSeq: item.reportSeq,
						reportCode: item.reportCode,
						// userId:uni.getStorageSync("userId"),
						mrn: item.mrn,
					}
				}).then(res => {
					if (res.data.code == 200) {
						let resultData = res.data.data
						if (resultData.reportPdfUrl) {
							if (resultData.reportPdfUrl.indexOf('http:') == -1 &&
								resultData.reportPdfUrl.indexOf('https:') == -1) {
								resultData.reportPdfUrl = that.fileHost + resultData.reportPdfUrl
							}
						}
						that.testReport = resultData;
						that.downloadAndOpen()
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				})
			},

			downloadAndOpen(needOpen) {
				if (!this.testReport.reportPdfUrl) return
				let that = this
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				if (that.cacheFilePath) {
					this.open()
					return
				}
				wx.downloadFile({
					url: that.testReport.reportPdfUrl,
					success: function(res) {
						uni.hideLoading()
						that.cacheFilePath = res.tempFilePath;

						if (needOpen) {
							that.open()
						}
					},
					fail: function(err) {
						that.cacheFilePath = ""
						uni.showToast({
							title: '加载失败'
						})
						uni.hideLoading()
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},

			open() {
				let that = this
				if (that.testReport.type == 'image') {
					uni.hideLoading()
					uni.previewImage({
						current: 0,
						urls: [that.cacheFilePath]
					})
					return
				}
				uni.openDocument({
					filePath: that.cacheFilePath,
					fileType: 'pdf',
					success: function(res) {
						uni.hideLoading()
					},
					fail: function(err) {
						that.cacheFilePath = ""
						uni.showToast({
							title: '打开失败'
						})
						uni.hideLoading()
						console.log('fail:' + JSON.stringify(err));
					}
				});
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