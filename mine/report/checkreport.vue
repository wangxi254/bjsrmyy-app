<template>
	<view>
		<view class="flex-row margin">
			<picker mode="date" :value="startDate" @change="bindSDateChange">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{startDate||'选择日期'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
			<view class="height40">至</view>
			<picker mode="date" :value="endDate" @change="bindEDateChange">
				<view class="flex-row height40 picker-view hs-border">
				  <view>
						{{endDate||'选择日期'}}
				  </view>
				  <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
			<view class="height40 hs-border">查询</view>
		</view>
		
		<view v-for="item in reportlist">
			<view class="cell hs-border">
				<view class="space-between">
					<view>科室名称：{{item.expert}}</view>
					<view>检查时间：{{item.date}}</view>
				</view>
				<view>
					<view>检验名称：{{item.name}}</view>
					<view>检验编号：{{item.number}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					name:"张某某",
					idcard:'522122xxxxxxxxx0011'
				},
				startDate:'',
				endDate:'',
				reportlist:[
					{
						expert:'外科检查',
						date:'2021-12-20',
						name:'常规检查',
						number:'00003283434834',
					},
					{
						expert:'外科检查',
						date:'2021-12-20',
						name:'常规检查',
						number:'00003283434834',
					}
				]
			}
		},
		onLoad() {
			this.getCheckreport();
		},
		methods: {
			bindSDateChange(e) {
			  let date = e.detail.value;
			  this.startDate = date;
			  this.list = [];
			},
			bindEDateChange(e) {
			  let date = e.detail.value;
			  this.endDate = date;
			  this.list = [];
			},
			getCheckreport(){
				this.$request({
					path:'/checkReport/mobile/getInfo'
				}).then(res=>{
					
				})
			},
			getDetailInfo(){
				this.$request({
					path:'/checkReport/mobile/getDetailInfo'
				}).then(res=>{
					
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.right{
		height: 10px;
		width: 10px;
	}
	
	.picker-view{
		min-width: 80px;
		padding: 0 10px;
		
		align-items: center;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}
	
	.height40{
		height: 30px;
		line-height: 30px;
		margin: 0px 5px;
		border-radius: 5px;
	}
	
	.margin{
		margin: 10px 15px;
	}
	
	.cell{
		margin: 10px;
		
		padding: 10px;
		
	}
</style>