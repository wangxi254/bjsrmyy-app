<template>
	<view>
		<div class="search-tab-div">
			<div class="item" :class="searchType == 1 ? 'selected':''" @click='searchType = 1'>专科搜索</div>
			<div class="item" :class="searchType == 2 ? 'selected':''" @click='searchType = 2'>医生搜索</div>
		</div>
		<view v-if="searchType == 1" class="search show-center">
			<!-- <view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
				<view class="search-input">专科搜索</view>
				<image class="search-icon" src="../../static/index/search.png">
			</view> -->
			<view class="space-beteewn search-bg">
				<view class="show-center justify-content">
					<image class="search-icon marginl10r10" src="../../static/index/search.png">
						<input class="search-input" type="text" placeholder="输入专科关键字搜索" v-model="searchText"
							@focus="valueEmpty" confirm-type="search" />
				</view>
				<view @click="cancleEdit" class="cancle">取消</view>
			</view>
		</view>
		<view v-if="searchType == 2" class="search show-center">
			<view class="space-beteewn search-bg">
				<view class="show-center justify-content">
					<image class="search-icon marginl10r10" src="../../static/index/search.png">
						<input class="search-input" type="text" placeholder="输入医生名字搜索" v-model="nameSearchText"
							confirm-type="search" />
				</view>
				<div style="display: flex;align-items: center;">
					<view @click="reSetNameSearch" class="cancel-btn">重置</view>
					<view @click="toSearchDoctor" class="sure-btn">搜索</view>
				</div>
			</view>
		</view>

		<uni-notice-bar class="noticebar" backgroundColor="#FEF0E9" :scrollable="true" :showIcon="true" :single="true"
			text="注：出诊时间如有变化，以当日挂号为准" />
		<div v-if="searchType == 1">
			<hsSubfieldList :leftNavData="searchList" :rightNavData="rightNavData" :scrollHeiht="scrollHeiht"
				@leftClick="leftClick" @rightClick="rightClick" />
		</div>
		<div v-else class="doctor-list-root">
			<div v-if="!doctorListNotice">
				<div class="user-list-div" v-for="(item,index) in doctorList" :key='index'
					@click="lookDoctorScheduling(item)">
					<div class="name">{{ item.docName }}</div>
					<div class="tag">{{ item.depName }}</div>
				</div>
			</div>
			<div v-else class="doctor-list-notice">
				{{doctorListNotice}}
			</div>
		</div>
	</view>
</template>

<script>
	import hsSubfieldList from "@/components/hs-subfield-list.vue";
	import uniNoticeBar from "@/components/uni-notice-bar.vue";
	export default {
		data() {
			return {
				searchType: 1,
				leftNavData: [],
				rightNavData: [],
				searchText: '',
				nameSearchText: "",
				isNotSearching: true,
				scrollHeiht: '',
				pageType: 0,
				searchList: [],

				sevenDayDate: '',
				nowDate: '',
				doctorList: [],
				doctorListNotice: ""
			}
		},
		onLoad(options) {
			/* 获取屏幕可视区域的高度 */
			let height = uni.getSystemInfoSync().windowHeight - 44 - 42
			this.scrollHeiht = `height:${height}px`
			options.type && (this.pageType = options.type)
			this.getDepartment();

			//当前日期
			this.nowDate = this.$moment(new Date()).format('YYYY-MM-DD');
			this.sevenDayDate = this.$moment().add(7, 'days').format('YYYY-MM-DD');
			console.log('当前日期 = ', this.nowDate)
			console.log('七天后的日期 = ', this.sevenDayDate)

			// {
			// 	var dd = new Date();
			// 	var y = dd.getFullYear();
			// 	var m = dd.getMonth() + 1;
			// 	var d = dd.getDate();
			// 	let date = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
			// 	//当前日期
			// 	this.nowDate = date

			// 	//七天后的日期
			// 	let time = dd;
			// 	let num = 7;
			// 	time.getHours() > 20 && (num = num + 1);
			// 	var dates = new Date(time.setDate(time.getDate() + num)).getDate()
			// 	var year = time.getFullYear() //获取年份
			// 	var month = time.getMonth() + 1 // 获取月份
			// 	let endtime = year + '-' + (month < 10 ? '0' + month : month) + '-' + (dates < 10 ? '0' + dates :
			// 		dates);
			// 	this.sevenDayDate = endtime
			// }
		},
		onShow() {
			this.toSearchDoctor()
		},
		components: {
			hsSubfieldList,
			uniNoticeBar
		},
		watch: {
			searchText(val) {
				this.filter(val);
			}
		},
		methods: {
			reSetNameSearch() {
				this.nameSearchText = ''
				this.toSearchDoctor()
			},
			toSearchDoctor() {
				this.doctorList = []
				this.doctorListNotice = '正在加载中...'
				let url = '/smartinquiry/schedule/searchDoctorNameWithDate'
				url += "?doctorName=" + this.nameSearchText
				url += "&beginDate=" + this.nowDate
				if (this.pageType == 1) {
					//当日预约
					url += "&endDate=" + this.nowDate
				} else {
					//预约挂号
					url += "&endDate=" + this.sevenDayDate
				}
				this.$request({
					path: url
				}).then(res => {
					this.doctorListNotice = ''
					if (res.data.code == 200) {
						if (!this.doctorList) {
							this.doctorList = [];
						}
						for (let doc of res.data.data) {
							let item = {
								depCode: doc.depCode,
								depName: doc.depName,
								docName: doc.docName,
								fatherCode: "",
								fathername: "",
								depDes: "",
								district: "A001",
								ageLimit: "",
								cj: "",
								orderid: null,
								empid: "",
								subData: null,
								ifExistSubData: false,
								type: this.pageType,
								doctorPbList: doc.doctorPbList || [],
								docCode: doc.docCode,
								docInfo: doc.docInfo,
							};
							this.doctorList.push(item);
						}
					}
				}).catch(err => {
					this.doctorListNotice = '加载失败，请重试'
				})
			},
			//查看搜索到的医生排班数据
			lookDoctorScheduling(item) {
				uni.navigateTo({
					url: '../appointment/index?title=' + item.depName + '&&type=' + this.pageType + '&&id=' + item
						.depCode + '&&docCode=' + item.docCode + '&&docName=' + item.docName +
						'&&doctorPbList=' + JSON.stringify(item.doctorPbList)
				})
			},
			leftClick(item) {
				let array = [];
				this.rightNavData = array;
				uni.navigateTo({
					url: '../appointment/index?title=' + item.depName + '&&type=' + this.pageType + '&&id=' + item
						.depCode
				})
			},
			filter(val) {
				this.searchList = this.leftNavData.filter(item => {
					if (item.depName.indexOf(val) > -1) {
						return item
					}
				})

				this.$request({
					path: '/smartinquiry/schedule/searchDoctorName?doctorName=' + val
				}).then(res => {
					if (res.data.code == 200) {
						if (!this.searchList) {
							this.searchList = [];
						}
						for (let doc of res.data.data) {
							let item = {
								depCode: doc.depCode,
								depName: doc.docName + '-' + doc.depName,
								fatherCode: "",
								fathername: "",
								depDes: "",
								district: "A001",
								ageLimit: "",
								cj: "",
								orderid: null,
								empid: "",
								subData: null,
								ifExistSubData: false
							};
							this.searchList.push(item);
						}
					}
				})
			},
			searchClick() {
				this.isNotSearching = false;
			},
			valueEmpty(e) {
				return this.searchText = '';
			},
			cancleEdit() {
				this.isNotSearching = true;
			},
			rightClick(item) {
				uni.navigateTo({
					url: `./roomDetail?item=${JSON.stringify(item)}`
				})
			},
			getDepartment() {
				uni.showLoading({
					title: "加载中..."
				})
				let date = null
				let endtime = null

				if (this.pageType != 1) {
					var dd = new Date();
					dd.setDate(dd.getDate() + 1);
					var y = dd.getFullYear();
					var m = dd.getMonth() + 1;
					var d = dd.getDate();
					date = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);

					if (this.pageType == 1) {
						//当日挂号开始结束都是当前日期
						endtime = date
					} else {
						//预约挂号，获取当前日期七天后的日期
						let time = dd;
						let num = 7;
						time.getHours() > 20 && (num = num + 1);
						var dates = new Date(time.setDate(time.getDate() + num)).getDate()
						var year = time.getFullYear() //获取年份
						var month = time.getMonth() + 1 // 获取月份
						endtime = year + '-' + (month < 10 ? '0' + month : month) + '-' + (dates < 10 ? '0' + dates :
							dates);
					}
				} else {
					let tempDate = new Date()
					var year = tempDate.getFullYear()
					var month = tempDate.getMonth() + 1
					var dates = tempDate.getDate()
					date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (dates < 10 ? '0' + dates :
						dates);
					endtime = date
				}

				this.$request({
					path: '/department/mobile/listNoPage',
					query: {
						beginDate: date,
						endDate: endtime,
						// regtype:1
					}
				}).then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						this.leftNavData = res.data.data;
						this.searchList = res.data.data;
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.search-tab-div {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border-bottom: 1px #f8f8f8 solid;

		.item {
			width: 100px;
			height: 35px;
			line-height: 35px;
			color: #666;
			font-size: 13px;
			text-align: center;
		}

		.selected {
			color: #6495ED;
			font-size: 15px;
			font-weight: bold;
			border-bottom: 2px #6495ED solid;
		}
	}

	.search {
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: $uni-bg-color-hover;
	}

	.show-center {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
	}

	.justify-content {
		justify-content: start;
	}

	.search-icon {
		width: 20px;
		height: 20px;
	}

	.search-text {
		color: $uni-text-color;
		font-size: $uni-font-detail-title;
	}

	.search-bg {
		background: #FFFFFF;
		height: 30px;
		width: 100%;
		margin: 8px;
	}

	.marginl10r10 {
		margin-left: 10px;
		margin-right: 10px;
	}

	.space-beteewn {
		justify-content: space-between;
		display: flex;
	}

	.cancle {
		height: 28px;
		line-height: 28px;
		padding-left: 8px;
		font-size: $uni-font-detail-title;
		color: $uni-color-primary;
		background: $uni-bg-color-hover;
		text-align: right;
	}

	.search-input {
		width: 100%;
		font-size: $uni-font-detail-title;
		color: $uni-text-color;
		margin-right: 8px;
	}

	.cancel-btn {
		width: 50px;
		height: 28px;
		line-height: 28px;
		font-size: $uni-font-detail-title;
		color: #333;
		text-align: center;
		border-radius: 4px;
		background: #ddd;
	}

	.sure-btn {
		width: 50px;
		height: 28px;
		line-height: 28px;
		font-size: $uni-font-detail-title;
		color: #fff;
		background: #6495ED;
		margin: 0 10px;
		text-align: center;
		border-radius: 4px;
	}

	.noticebar {
		line-height: 30rpx;
	}

	.doctor-list-root {
		height: calc(100vh - 150px);
		overflow-y: auto;
		overflow-x: hidden;
	}

	.user-list-div {
		padding: 20px;
		margin-bottom: 10px;
		border-bottom: 2px #eee solid;

		.name {
			color: #333;
			font-size: 16px;
			font-weight: bold;
		}

		.tag {
			color: #666;
			font-size: 14px;
			margin-top: 10px;
		}
	}

	.doctor-list-notice {
		padding: 50px 0;
		text-align: center;
		font-size: 15px;
		color: #333;
	}
</style>