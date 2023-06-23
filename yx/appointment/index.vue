<template>
	<view class="detailPage">
		<div v-if="!limitDoctorDateList || limitDoctorDateList.length == 0">
			<chooseDay v-if="showDate && !loading" :classId="classId" @getDateData="getDateData" />
		</div>
		<div v-else class="top-limit-date">
			<div v-for="(item,index) in limitDoctorDateList" :key='index' class="item"
				@click="changeSelectedDate(index,item.date)">
				<div>{{ getWeek(item.date) }}</div>
				<div style="color: #53B7C7;margin: 5px 0;">有号</div>
				<div :class="dateSelectIdx == index ? 'select-point':''">{{ getItemTimeDay(item.date,item) }}</div>
			</div>
		</div>
		<view class="sel-condition">
			<text>{{currentDate}}</text>
			<!-- <view class="v-switch">
				<text>只看有号</text>
				<switch :checked="hasNum" @change="changeHasNum" color="#007aff" style="transform:scale(0.5)" />
			</view> -->
		</view>
		<view v-if="!showDate" class="m-20">注：当日挂号仅显示未被取号且处于医生就诊时间的号源</view>
		<view class="person-list">
			<view class="t-part" v-for="(item,index) in list" :key="index">
				<view class="title flex items-center">
					<view class="icon"></view>
					<text class="text">{{index == 0?"上午":"下午"}}号源</text>
				</view>
				<NoData v-if="item.length == 0" />
				<view v-else class="person-item flex" v-for="x in item" :key="x">
					<image class="avater" mode="aspectFit" :src="x.img?x.img:personImg"></image>
					<view class="person-item-info flex-1">
						<view class="flex justify-between items-center">
							<text class="name">{{x.name}}</text>
							<view class="flex items-center">
								<text class="price">挂号费：￥{{x.price}}</text>
								<!-- <view :class="['surplus',x.active?'active':'']" @click="open(x)">
									{{!showDate?'可挂号':'可预约'}}({{x.surplus}})
								</view> -->
								<view v-if="x.active" class="surplus active" @click="open(x)">
									{{!showDate?'可挂号':'可预约'}}({{x.surplus}})
								</view>
								<view v-else class="surplus">
									可挂号(0)
								</view>
							</view>
						</view>
						<view class="tex">
							职称：{{x.postion}}
						</view>
						<view class="tex">
							擅长：{{x.describe||'暂无介绍'}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="right" background-color="#fff">
			<view class="selTimeBox flex flex-column">
				<view class="current-dateV">
					<text>{{currentDate}}</text>
					<text>{{currentRow.type == 0?"上午":"下午"}}</text>
				</view>
				<view class="nodes">分时段号源</view>
				<!-- 	<view class="nodes-txt" v-if='showDate'>注：超过号源时间1小时后不可预约该号源</view> -->
				<scroll-view scroll-y="true" style="height: 85vh">
					<view class="selList flex flex1 flex-wrap ">
						<view class="sel-item justify-center" v-for="(item,index) in selList[currentRow.type]"
							:key="index" @click="chooseDate(item)">
							{{item.reg_time}} ( {{item.seqNum}}号 )
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import NoData from '@/components/nodata/index.vue'
	import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
	import chooseDay from '@/components/choosedate/index.vue'
	export default {
		components: {
			NoData,
			uniPopup,
			chooseDay
		},
		data() {
			return {
				personImg: "",
				hasNum: false,
				currentDate: '',
				Data: [],
				list: [],
				selList: [
					[],
					[]
					// ['08:00-08:30','08:30-9:00','09:00-09:30','09:30-10:00','10:00-10:30','10:30-11:00','11:00-11:30','11:30-12:00',],
					// ['14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30'],
				],
				showDate: true,
				loading: true,
				classId: '',
				currentRow: {},
				specialExplain: '',

				limitDoctorCode: "", //是否仅展示属于该 code 的医生排班
				limitDoctorName: "",
				limitDoctorDateList: [], //指定医生的有号的日期数据
				dateSelectIdx: 0,
			}
		},
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			// 是否是查询医生过来的
			this.limitDoctorCode = option.docCode || ''
			if (this.limitDoctorCode) {
				this.limitDoctorName = option.docName || ''
				if (option.type != 1) {
					let tmepList = JSON.parse(option.doctorPbList || [])
					tmepList.sort((a, b) => {
						let temptime = (a.date + ' 00:00:00').replace(/-/g, "/")
						let temptimeb = (b.date + ' 00:00:00').replace(/-/g, "/")
						return new Date(temptime) - new Date(temptimeb);
					})
					this.limitDoctorDateList = tmepList
				}
			}
			option.type == 1 ? (this.showDate = false) : ""
			option.id ? (this.classId = option.id) : (this.classId = 'P')

			if (option.type == 1) {
				if (this.showDate) {
					this.currentDate = this.$moment().add(1, 'days').format('YYYY-MM-DD');
				} else {
					this.currentDate = this.$moment(new Date()).format('YYYY-MM-DD');
				}
				console.log('得到的日期  =  ', this.currentDate)
				// var dd = new Date();
				// if (this.showDate) dd.setDate(dd.getDate() + 1);
				// var y = dd.getFullYear();
				// var m = dd.getMonth() + 1;
				// var d = dd.getDate();
				// this.currentDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);

				// this.currentDate = new Date().toISOString().slice(0, 10) //year+'-'+month + '-' + date;
				this.getDateData(this.currentDate);

			} else {
				if (this.limitDoctorDateList.length > 0) {
					this.getDateData(this.limitDoctorDateList[0].date)
				}
			}
			uni.setNavigationBarTitle({
				title: option.title
			})

			this.loading = false;
		},
		methods: {
			getItemTimeDay(dateStr, item) {
				if (dateStr && dateStr.indexOf('-') != -1) {
					let temp = dateStr.split('-')
					return temp[temp.length - 1]
				}
				return dateStr || ''
			},
			changeSelectedDate(idx, date) {
				this.dateSelectIdx = idx
				this.getDateData(date);
			},
			getWeek(date) {
				let weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
				let week = weekArray[new Date(date).getDay()];
				return week
			},
			changeHasNum() {

			},
			open(row) {
				if (!row.active) return
				this.currentRow = row;
				this.getCodeList(row);
				this.$refs.popup.open('right');
			},
			chooseDate(row) {
				this.currentRow['currentDate'] = this.currentDate;
				this.currentRow = {
					...this.currentRow,
					...row,
					deptCode: this.classId,
					registerType: this.showDate ? 1 : 0
				}
				let time = this.$moment(new Date()).format('YYYY-MM-DD');
				if (time === this.currentDate) {
					return this.toastMessageAndRedirect('13')
				}

				this.toastMessageAndRedirect('12')
			},
			toastMessageAndRedirect(messageId) {
				let that = this

				this.$request({
					path: '/system/notice/' + messageId,
				}).then(res => {
					uni.hideLoading()
					// 0表示显示，1表示关闭
					let showStatus = res.data.data.status === '0'
					if (res.data.code == 200 && showStatus) {
						that.specialExplain = res.data.data.noticeContent
						return uni.showModal({
							title: '提示',
							content: this.specialExplain.replace('<p>', '').replace('</p>', ''),
							confirmText: '确认告知',
							cancelText: '取消',
							success: function(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: './confirm?row=' + JSON.stringify(that.currentRow)
									})
								} else if (res.cancel) {}
							}
						});
					}

					uni.redirectTo({
						url: './confirm?row=' + JSON.stringify(that.currentRow)
					})
				})
			},
			clickDate(date) {
				// 获取当前日期的专家
				const topArr = [],
					bottomArr = [];
				uni.showLoading({
					title: "加载中..."
				})
				this.Data.map(item => {
					if (item.code == 1 && item.docInfo) {
						//只显示未停诊的值班医生
						const dealdate = `${item.date} ${item.deadLine}`;
						const newdate = dealdate.replace(/-/g, '/');
						if (item.date == date && item.depCode == this.classId && item.timeType == '上午')
							topArr.push({
								name: item.docInfo && item.docInfo.docName ? item.docInfo.docName : '',
								img: '',
								price: item.etPrice,
								postion: item.docInfo && item.docInfo.docTitle ? item.docInfo.docTitle : '',
								describe: item.docInfo && item.docInfo.docDes ? item.docInfo.docDes : '',
								surplus: item.docInfo && item.docInfo.total1 ? item.docInfo.total1 : 0,
								depName: item.depName,
								pbCode: item.pbCode,
								docCode: item.docInfo && item.docInfo.docCode ? item.docInfo.docCode : '',
								type: 0,
								active: (new Date().getTime() < new Date(newdate).getTime()) ? true : false,
								dzInfo: item.dzInfo
							})
						if (item.date == date && item.depCode == this.classId && item.timeType == '下午')
							bottomArr.push({
								name: item.docInfo && item.docInfo.docName ? item.docInfo.docName : '',
								img: '',
								price: item.etPrice,
								postion: item.docInfo && item.docInfo.docTitle ? item.docInfo.docTitle : '',
								describe: item.docInfo && item.docInfo.docDes ? item.docInfo.docDes : '',
								surplus: item.docInfo && item.docInfo.total2 ? item.docInfo.total2 : 0,
								depName: item.depName,
								pbCode: item.pbCode,
								docCode: item.docInfo && item.docInfo.docCode ? item.docInfo.docCode : '',
								type: 1,
								active: (new Date().getTime() < new Date(newdate).getTime()) ? true : false,
								dzInfo: item.dzInfo
							})
					}
				})

				this.list = [topArr, bottomArr]
				this.currentDate = date;
				setTimeout(() => {
					uni.hideLoading();
				}, 1000)
			},
			getCodeList(row) {
				uni.showLoading({
					title: "加载中..."
				})
				this.selList = [
					[],
					[]
				];
				this.$request({
					path: `/registration/numOrigin/get-num-origin-detail`,
					method: 'post',
					query: {
						pbCode: row.pbCode,
						pbDate: this.currentDate,
						timeType: row.type + 1
					}
				}).then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						res.data.data.map(item => {
							if (item.timeType == row.type + 1) this.selList[row.type].push(item);
						})
					}
				})
			},
			getEachDay(day) {
				return new Promise((reslove, reject) => {
					this.$request({
						path: `/smartinquiry/schedule/list?ampm=0&beginDate=${day}&endDate=${day}&depCode=${this.classId}`,
					}).then(res => {
						if (res.data.code == 200) {
							reslove(res.data.data || [])
						}
					})
				})
			},
			getDateData(day) {
				uni.showLoading({
					title: "加载中..."
				})
				this.$request({
					path: `/smartinquiry/schedule/list?ampm=0&beginDate=${day}&endDate=${day}&depCode=${this.classId}`,
				}).then(res => {
					if (res.data.code == 200) {
						// 获取当前日期的专家
						const topArr = [],
							bottomArr = [];
						uni.showLoading({
							title: "加载中..."
						})

						if (res.data.data && res.data.data.length > 0) {
							for (let item of res.data.data) {
								if (item.code == '1' && item.docInfo) {
									if (this.limitDoctorCode && this.limitDoctorCode.length > 0) {
										// 需要限制显示的医生
										if (item.docCode != this.limitDoctorCode) {
											continue
										}
									}
									//只显示未停诊的值班医生
									const dealdate = `${item.date} ${item.deadLine}`;
									const newdate = dealdate.replace(/-/g, '/');
									if (item.timeType == '上午') {
										topArr.push({
											name: item.docInfo && item.docInfo.docName ? item.docInfo
												.docName : '',
											img: '',
											price: item.etPrice,
											postion: item.docInfo && item.docInfo.docTitle ? item.docInfo
												.docTitle : '',
											describe: item.docInfo && item.docInfo.docDes ? item.docInfo
												.docDes : '',
											surplus: item.docInfo && item.docInfo.total1 ? item.docInfo
												.total1 : 0,
											depName: item.depName,
											pbCode: item.pbCode,
											docCode: item.docInfo && item.docInfo.docCode ? item.docInfo
												.docCode : '',
											type: 0,
											active: (new Date().getTime() < new Date(newdate).getTime()) ?
												true : false,
											dzInfo: item.dzInfo
										});
									}
									if (item.timeType == '下午') {
										bottomArr.push({
											name: item.docInfo && item.docInfo.docName ? item.docInfo
												.docName : '',
											img: '',
											price: item.etPrice,
											postion: item.docInfo && item.docInfo.docTitle ? item.docInfo
												.docTitle : '',
											describe: item.docInfo && item.docInfo.docDes ? item.docInfo
												.docDes : '',
											surplus: item.docInfo && item.docInfo.total2 ? item.docInfo
												.total2 : 0,
											depName: item.depName,
											pbCode: item.pbCode,
											docCode: item.docInfo && item.docInfo.docCode ? item.docInfo
												.docCode : '',
											type: 1,
											active: (new Date().getTime() < new Date(newdate).getTime()) ?
												true : false,
											dzInfo: item.dzInfo
										});
									}
								} else {
									console.log('无医生信息 docInfo = ', item)
								}
							}
							this.list = [topArr, bottomArr]
						} else {
							this.list = [
								[],
								[]
							];
						}
						this.currentDate = day;
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sel-condition {
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.v-switch {
			display: flex;
			align-items: center;
		}
	}

	.m-20 {
		margin: 20rpx;
	}

	.person-list {
		.t-part {
			.title {
				background: #fff;
				border-bottom: 1px solid #eee;
				padding: 20rpx;

				.icon {
					width: 10rpx;
					height: 32rpx;
					background: $uni-color-primary;
					border-radius: 8rpx;
					margin-right: 10rpx;
				}

				.text {
					font-size: $uni-font-size-lg;
					font-weight: bold;
					line-height: 2;
				}
			}

			.person-item {
				background: #fff;
				margin-bottom: 20rpx;
				box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, .1);
				padding: 20rpx;

				.avater {
					height: 200rpx;
					width: 160rpx;
					border-radius: 10rpx;
					background: #eee;
					margin-right: 20rpx;
				}

				.person-item-info {
					.name {
						font-size: $uni-font-size-lg;
					}

					.price {
						color: red;
						margin-right: 20rpx;
					}

					.surplus {
						background: $uni-text-color-disable;
						color: #fff;
						width: 160rpx;
						height: 50rpx;
						line-height: 50rpx;
						border-radius: 10rpx;
						text-align: center;
						margin-left: 10rpx;
					}

					.active {
						background: $uni-color-primary !important;
					}

					.tex {
						color: $uni-text-color-grey;
						margin: 10rpx 0;
					}
				}
			}
		}
	}

	.selTimeBox {
		width: 70vw;

		.current-dateV {
			background: $uni-bg-color-grey;
			font-size: $uni-font-size-lg;
			text-align: center;
			line-height: 2;

			text:nth-child(1) {
				margin-right: 10rpx;
			}
		}

		.nodes {
			font-weight: bold;
			font-size: 30rpx;
			text-align: center;
			line-height: 2;
		}

		.nodes-txt {
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			margin-bottom: 10rpx;
		}

		.selList {
			overflow: auto;
			padding: 10rpx;
			overflow-y: auto;

			.sel-item {
				border: 1rpx solid #000000;
				padding: 10rpx 16rpx;
				color: #000000;
				margin: 10rpx;
			}
		}
	}

	.top-limit-date {
		display: flex;
		align-items: center;
		height: 100px;
		overflow-x: auto;
		background: #fff;
		padding: 10px 0;
		margin-bottom: 10px;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 70px;
			text-align: center;
		}

		.select-point {
			width: 30px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			background: #007aff;
			border-radius: 20px;
			color: #fff;
		}
	}
</style>