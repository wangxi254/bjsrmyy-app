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
								<view :class="['surplus',x.active?'active':'']" @click="open(x)">{{!showDate?'可挂号':'可预约'}}({{x.surplus}})</view>
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
							<view class="sel-item justify-center" v-for="(item,index) in selList[currentRow.type]" :key="index" @click="chooseDate(item)">
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
				var dd = new Date();
				if(this.showDate)dd.setDate(dd.getDate()+1); 
				var y = dd.getFullYear();
				var m = dd.getMonth()+1; 
				var d = dd.getDate();
				this.currentDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
					
				// this.currentDate = new Date().toISOString().slice(0, 10) //year+'-'+month + '-' + date;
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
					//time.getHours()>20 && (num = num + 1);
					var date = new Date(time.setDate(time.getDate() + num)).getDate()  //这里先获取日期，在按需求设置日期，最后获取需要的
					var year = time.getFullYear()  //获取年份
					var month = time.getMonth() + 1 
					if(date<10) date = `0${date}`
                    if(month<10) month = `0${month}`
					return year+'-'+month + '-' + date
				}
				var arr = []
				let startNum = 0
				let endNum = 8
				for (let i = startNum; i < endNum; i++) {
					arr.push(returnDate(i))
				}
				return arr;
			},
			changeHasNum(){

			},
			open(row){
				if(!row.active) return
				this.currentRow = row;
				this.getCodeList(row);
				this.$refs.popup.open('right');
			},
			chooseDate(row){ 
				this.currentRow['currentDate'] = this.currentDate;
				this.currentRow = {...this.currentRow,...row,deptCode: this.classId,registerType: this.showDate?1:0}
				uni.redirectTo({
					url:'./confirm?row=' + JSON.stringify(this.currentRow)
				})
			},
			clickDate(date) {
				// 获取当前日期的专家
				const topArr = [],
				bottomArr = [];
				uni.showLoading({
					title: "加载中..."
				})
				this.Data.map(item=>{
					if(item.code == 1){
						//只显示未停诊的值班医生
						const dealdate = `${item.date} ${item.deadLine}`;
						const newdate = dealdate.replace(/-/g,'/');
						if(item.date == date && item.depCode == this.classId && item.timeType == '上午') topArr.push({
							name: item.docInfo && item.docInfo.docName ? item.docInfo.docName : '',
							img: '',
							price: item.etPrice,
							postion: item.docInfo && item.docInfo.docTitle ? item.docInfo.docTitle : '',
							describe: item.docInfo && item.docInfo.special ? item.docInfo.special : '',
							surplus: item.docInfo && item.docInfo.total1 ? item.docInfo.total1 : 0,
							depName:item.depName,
							pbCode: item.pbCode,
							docCode: item.docInfo && item.docInfo.docCode ? item.docInfo.docCode : '',
							type: 0,
							active: (new Date().getTime()< new Date(newdate).getTime())?true:false
						})
						if(item.date == date && item.depCode == this.classId && item.timeType == '下午') bottomArr.push({
							name: item.docInfo && item.docInfo.docName ? item.docInfo.docName : '',
							img: '',
							price: item.etPrice,
							postion: item.docInfo && item.docInfo.docTitle ? item.docInfo.docTitle : '',
							describe: item.docInfo && item.docInfo.special ? item.docInfo.special : '',
							surplus: item.docInfo && item.docInfo.total2 ? item.docInfo.total2 : 0 ,
							depName:item.depName,
							pbCode: item.pbCode,
							docCode: item.docInfo && item.docInfo.docCode ? item.docInfo.docCode : '',
							type: 1,
							active: (new Date().getTime()< new Date(newdate).getTime())?true:false
						})
					}
				})
				this.list = [topArr,bottomArr]
				this.currentDate = date;
				setTimeout(()=>{
					uni.hideLoading();
				},1000)
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
				const firstDate = this.showDate?arr[1]:arr[0];
				const endDate = this.showDate?arr[arr.length - 1]:arr[0];
				arr.splice(0,1);
				let PromiseAll  = arr.map(item=>{ return this.getEachDay(item) })
				Promise.all(PromiseAll).then(res=> {
					let data = []
					res.map(item=>{
						data = [...data,...item]
					})
					this.loading = false;
					uni.hideLoading();
					//const data = res.data.data || [];
					this.Data = data;
					if(this.showDate){
						arr.map(item=>{
							const has = data.find(x=>{
								const dealdate = `${x.date} ${x.deadLine}`;
								const newdate = dealdate.replace(/-/g,'/');
								// console.log(x.date,item)
								return (x.date == item && x.depCode == this.classId && (new Date().getTime()< new Date(newdate).getTime()) && x.code == 1)
							})
							this.hasData[item] = has?true:false;
						})
						
					}else{
						this.clickDate(this.currentDate)
					}
				})
				
				return
				// this.$request({
				// 	path:`/smartinquiry/schedule/list?ampm=0&beginDate=${firstDate}&endDate=${endDate}`,
				// }).then(res=>{
				// 	this.loading = false;
				// 	uni.hideLoading();
				// 	if(res.data.code == 200){
				// 		const data = res.data.data || [];
				// 		this.Data = data;
				// 		if(this.showDate){
				// 			arr.map(item=>{
				// 				const has = data.find(x=>{
				// 					const dealdate = `${x.date} ${x.deadLine}`;
				// 					const newdate = dealdate.replace(/-/g,'/');
				// 					// console.log(x.date,item)
				// 					return (x.date == item && x.depCode == this.classId && (new Date().getTime()< new Date(newdate).getTime()))
				// 				})
				// 				this.hasData[item] = has?true:false;
				// 			})
							
				// 		}else{
				// 			this.clickDate(this.currentDate)
				// 		}
				// 	}
				// })
			},
			getEachDay(day) {
				return new Promise((reslove,reject)=> {
					this.$request({
						path:`/smartinquiry/schedule/list?ampm=0&beginDate=${day}&endDate=${day}`,
					}).then(res=>{
						if(res.data.code == 200) {
							reslove(res.data.data || [])
						}
					})
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
	.m-20{
		margin: 20rpx;
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
						margin-right: 20rpx;
					}
					
					.surplus{
						background: $uni-text-color-disable;
						color: #fff;
						width: 160rpx;
						height: 50rpx;
						line-height: 50rpx;
						border-radius: 10rpx;
						text-align: center;
						margin-left: 10rpx;
					}
					.active{
						background: $uni-color-primary !important;
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
			font-size: 30rpx;
			text-align: center;
			line-height: 2;
		}
		.nodes-txt{
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			margin-bottom: 10rpx;
		}
		.selList{
			overflow: auto;
			padding: 10rpx;
			overflow-y: auto;
			.sel-item{
				border: 1rpx solid #000000;
				padding: 10rpx 16rpx;
				color: #000000;
				margin: 10rpx;
			}
		}
	}
</style>