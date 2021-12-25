<template>
	<view class="detailPage">
		<chooseDay v-if="showDate && !loading" :hasData="hasData" @clickDate="clickDate" />
		<view class="sel-condition">
			<text>{{currentDate}}</text>
			<!-- <view class="v-switch">
				<text>只看有号</text>
				<switch :checked="hasNum" @change="changeHasNum" color="#007aff" style="transform:scale(0.5)" />
			</view> -->
		</view>
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
								<text class="price">挂号费：{{x.price}}</text>
								<view class="surplus" @click="open(x)">可预约({{x.surplus}})</view>
							</view>
						</view>
						<view class="tex">
							职称：{{x.postion}}
						</view>
						<view class="tex">
							擅长：{{x.describe}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="right" background-color="#fff">
			<view class="selTimeBox flex flex-column">
				<view class="current-dateV">
					<text>2021年12月24日</text>
					<text>上午</text>
				</view>
				<view class="nodes">选择想要预约的时间段</view>
				<scroll-view scroll-y="true" style="height: calc(100% - 20px)">
					<view class="selList flex flex1 flex-wrap ">
						
							<view class="sel-item justify-center" v-for="(item,index) in selList[currentRow.type]" :key="index" @click="chooseDate(item)">
								号源{{item.seqNum}}
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
		components: { NoData, uniPopup, chooseDay },
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
				hasData: {},
				showDate: true,
				loading: true,
				classId: '',
				currentRow: {}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			option.type == 1?(this.showDate = false): ""
			option.id?(this.classId = option.id): (this.classId = 'P')
			if(option.type == 1){
				var time = new Date()
				var date = time.getDate()  //这里先获取日期，在按需求设置日期，最后获取需要的
				var year = time.getFullYear()  //获取年份
				var month = time.getMonth() + 1 
				this.currentDate = year+'-'+month + '-' + date;
			}
			uni.setNavigationBarTitle({
			　　title:option.title
			})
			this.getexpert();
		},
		methods: {
			getDateforSearch() {
				function returnDate(num){
					var time = new Date()
					//判断当前时间是否超过20:00
					time.getHours()>20 && (num = num + 1);
					var date = new Date(time.setDate(time.getDate() + num)).getDate()  //这里先获取日期，在按需求设置日期，最后获取需要的
					var year = time.getFullYear()  //获取年份
					var month = time.getMonth() + 1 
					if(date<10) date = `0${date}`
                    if(month<10) month = `0${month}`
					return year+'-'+month + '-' + date
				}
				var arr = []
				for (let i = 0; i < 7; i++) {
					arr.push(returnDate(i))
				}
				return arr;
			},
			changeHasNum(){

			},
			open(row){
				this.currentRow = row;
				this.getCodeList(row);
				this.$refs.popup.open('right');
			},
			chooseDate(row){
				this.currentRow['currentDate'] = this.currentDate;
				this.currentRow = {...this.currentRow,...row,deptCode: this.classId,registerType: this.showDate?1:0}
				uni.navigateTo({
					url:'./confirm?row=' + JSON.stringify(this.currentRow)
				})
			},
			clickDate(date) {
				// 获取当前日期的专家
				const topArr = [],
				bottomArr = [];
				this.Data.map(item=>{
					if(item.date == date && item.depCode == this.classId && item.timeType == '上午') topArr.push({
						name: item.docInfo.docName,
						img: '',
						price: item.etPrice,
						postion: item.docInfo.docTitle,
						describe: item.docInfo.special,
						surplus: item.docInfo.total1,
						depName:item.depName,
						pbCode: item.pbCode,
						docCode: item.docInfo.docCode,
						type: 0
					})
					if(item.date == date && item.classId == this.classId && item.timeType == '下午') bottomArr.push({
						name: item.docInfo.docName,
						img: '',
						price: item.etPrice,
						postion: item.docInfo.docTitle,
						describe: item.docInfo.special,
						surplus: item.docInfo.total2,
						depName:item.depName,
						pbCode: item.pbCode,
						docCode: item.docInfo.docCode,
						type: 1
					})
				})
				this.list = [topArr,bottomArr]
				this.currentDate = date;
			},
			getCodeList(row) {
				uni.showLoading({
					title: "加载中..."
				})
				this.selList = [[],[]];
				this.$request({
					path:`/registration/numOrigin/get-num-origin-detail`,
					method: 'post',
					query: {
						pbCode: row.pbCode,
						pbDate: this.currentDate,
						timeType: row.type + 1
					}
				}).then(res=>{
					uni.hideLoading();
					if(res.data.code == 200) {
						res.data.data.map(item=>{
							if(item.timeType == row.type + 1) this.selList[row.type].push(item);
						})
					}
				})
			},
			getexpert(){
				uni.showLoading({
					title: "加载中..."
				})
				const arr = this.getDateforSearch();
				const firstDate = arr[0];
				const endDate = this.showDate?arr[arr.length - 1]:arr[0];
				this.$request({
					path:`/smartinquiry/schedule/list?ampm=0&beginDate=${firstDate}&endDate=${endDate}`,
				}).then(res=>{
					this.loading = false;
					uni.hideLoading();
					if(res.data.code == 200){
						const data = res.data.data || [];
						this.Data = data;
						if(this.showDate){
							arr.map(item=>{
								const has = data.find(x=>{
									return (x.date == item && x.depCode == this.classId)
								})
								this.hasData[item] = has?true: false;
							})
						}else{
							this.clickDate(this.currentDate)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sel-condition{
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.v-switch{
			display: flex;
			align-items: center;
		}
	}
	.person-list{
		.t-part{
			.title{
				background: #fff;
				border-bottom: 1px solid #eee;
				padding: 20rpx;
				.icon{
					width: 10rpx;
					height: 32rpx;
					background: $uni-color-primary;
					border-radius: 8rpx;
					margin-right: 10rpx;
				}
				.text{ 
					font-size: $uni-font-size-lg;
					font-weight: bold;
					line-height: 2;
				}
			}
			.person-item{
				background: #fff;
				margin-bottom: 20rpx;
				box-shadow: 0 10rpx 20rpx 0 rgba(0,0,0,.1);
				padding: 20rpx;
				.avater{
					height: 200rpx;
					width: 160rpx;
					border-radius: 10rpx;
					background: #eee;
					margin-right: 20rpx;
				}
				.person-item-info{
					.name{
						font-size: $uni-font-size-lg;
					}
					.price{
						color: red;
					}
					.surplus{
						background: $uni-color-primary;
						color: #fff;
						width: 160rpx;
						height: 50rpx;
						line-height: 50rpx;
						border-radius: 10rpx;
						text-align: center;
						margin-left: 10rpx;
					}
					.tex{
						color: $uni-text-color-grey;
						margin: 10rpx 0;
					}
				}
			}
		}
	}
	.selTimeBox{
		width: 70vw;
		.current-dateV{
			background: $uni-bg-color-grey;
			font-size: $uni-font-size-lg;
			text-align: center;
			line-height: 2;
			text:nth-child(1){
				margin-right: 10rpx;
			}
		}
		.nodes{
			font-weight: bold;
			font-size: 40rpx;
			text-align: center;
			line-height: 2;
		}
		.selList{
			overflow: auto;
			padding: 10rpx;
			.sel-item{
				border: 1rpx solid red;
				padding: 10rpx;
				color: red;
				margin: 10rpx;
			}
		}
	}
</style>