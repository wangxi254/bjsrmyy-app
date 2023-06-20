<template>
	<view class="content">
		<!-- <uni-search-bar v-model="searchValue" @confirm="getData" placeholder="搜索" ></uni-search-bar> -->
		<view class="time">
			<scroll-view scroll-x scroll-with-animation>
				<div class="timer">
					<span @click="clickTime(index)" v-for="(item, index) in realTime" :key="'time' + item"
						:class="{'active': timeIndex === index}">{{item}}</span>
				</div>
			</scroll-view>
		</view>
		<view class="main">
			<scroll-view scroll-y scroll-with-animation>
				<view class="item-con">
					<view class="item" v-for="(item, index) in sourceData" :key='index'>
						<view class="dep">{{item.depName}}</view>
						<view class="ztime">
							<span class="ztime-zw">上午</span>
							<view class="persons">
								<span v-if="person.timeType === '上午' && person.docInfo"
									v-for="(person,index) in item.persons" :key='index' @click='lookDetails'
									:data-item='person'>
									{{person.docInfo.docName}}
								</span>
							</view>
						</view>
						<view class="ztime">
							<span class="ztime-zw">下午</span>
							<view class="persons">
								<span v-if="person.timeType === '下午' && person.docInfo"
									v-for="(person,index) in item.persons" :key='index' @click='lookDetails'
									:data-item='person'>
									{{person.docInfo.docName}}
								</span>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeIndex: 0,
				searchValue: '',
				time: [],
				realTime: [],
				sourceData: []
			}
		},
		created() {
			this.time = [this.getDay(0), this.getDay(1), this.getDay(2), this.getDay(3), this.getDay(4), this.getDay(5),
				this.getDay(6)
			]
			this.realTime = [this.time[0].split('-')[1] + '-' + this.time[0].split('-')[2], this.time[1].split('-')[1] +
				'-' + this.time[1].split('-')[2], this.time[2].split('-')[1] + '-' + this.time[2].split('-')[2], this
				.time[3].split('-')[1] + '-' + this.time[3].split('-')[2], this.time[4].split('-')[1] + '-' + this
				.time[4].split('-')[2], this.time[5].split('-')[1] + '-' + this.time[5].split('-')[2], this.time[6]
				.split('-')[1] + '-' + this.time[6].split('-')[2]
			]
			this.getData()
		},
		methods: {
			clickTime(index) {
				this.timeIndex = index
				this.sourceData = []
				this.getData()
			},
			getData() {

				this.$request({
					path: `/smartinquiry/schedule/list`,
					method: 'get',
					query: {
						ampm: 0,
						beginDate: this.time[this.timeIndex],
						endDate: this.time[this.timeIndex]
					}
				}).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						const data = res.data.data
						data.map((item) => {
							if (item.code === "0") {
								return
							}
							let hasDep = false
							this.sourceData.map((data) => {
								if (data.depName === item.depName) {
									data.persons.push(item)
									hasDep = true
								}
							})
							if (!hasDep) {
								this.sourceData.push({
									depName: item.depName,
									persons: [item]
								})
							}
						})
					}
				})
			},
			getDay(day) {
				var today = new Date();

				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

				today.setTime(targetday_milliseconds); //注意，这行是关键代码

				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				return tYear + "-" + tMonth + "-" + tDate;
			},
			doHandleMonth(month) {
				let m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},

			lookDetails(e) {
				let item = e.currentTarget.dataset.item
				if (!item) return
				if (item.docInfo.docName == '普通' || !item.docInfo.docName) {
					//普通号只根据科室查询
					this.searchDepartment(item)
					return
				}
				this.searchDoctor(item)
			},

			//根据科室、时间查询
			searchDepartment(item) {
				let list = [{
					date: item.date
				}]
				let url = '../yx/appointment/index'
				uni.navigateTo({
					url: url + '?title=' + item.depName + '&&type=' + 2 + '&&id=' + item.depCode +
						'&&date=' + item.date + '&&docCode=' + item.docCode +
						'&&doctorPbList=' + JSON.stringify(list)
				})
			},

			//根据医生名称、科室、时间查询
			searchDoctor(item) {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				})
				let name = item.docInfo && item.docInfo.docName ? item.docInfo.docName : ''
				let newurl = '/smartinquiry/schedule/searchDoctorNameWithDate'
				newurl += "?doctorName=" + name + "&beginDate=" + item.date + "&endDate=" + item.date
				this.$request({
					path: newurl
				}).then(res => {
					this.doctorListNotice = ''
					if (res.data.code == 200 && res.data.data && res.data.data.length > 0) {
						let result = {}
						let leg = res.data.data.length
						for (var i = 0; i < leg; i++) {
							if (item.depCode == res.data.data[i].depCode) {
								result = res.data.data[i]
								break
							}
						}
						if (result.docCode) {
							let url = '../yx/appointment/index'
							url += '?title=' + result.depName + '&&type=' + 2
							url += '&&id=' + result.depCode + '&&docCode=' + result.docCode
							url += '&&docName=' + result.docName +
								'&&doctorPbList=' + JSON.stringify(result.doctorPbList)
							uni.navigateTo({
								url
							})
						} else {
							uni.showToast({
								title: "未获取到排班信息",
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: "未获取到排班信息",
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: "未获取到排班信息",
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.item-con {
			display: flex;
			flex-direction: column;
		}

		.time {
			height: 40px;
			width: 100%;
			margin-top: 10px;
			display: flex;

			.timer {
				display: flex;
				justify-content: space-around;

				span {
					border: 1px solid rgba(0, 0, 0, .2);
					padding: 4px;
					border-radius: 4px;
				}

				.active {
					color: #fff;
					background-color: #5db1ff;
				}
			}
		}

		.main {
			flex: 1;
			background: #f8f8f8;
			display: flex;
			overflow: auto;

			.item {
				background: white;
				margin-top: 10px;

				.dep {
					height: 30px;
					padding-left: 20px;
					line-height: 30px;
				}

				.ztime {
					border-top: 1px solid #f8f8f8;
					display: flex;

					.ztime-zw {
						width: 22%;
						border-right: 1px solid #f8f8f8;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.persons {
						width: 78%;

						span {
							display: inline-block;
							padding: 10px;
							margin-left: 10px;
						}
					}
				}
			}
		}
	}
</style>