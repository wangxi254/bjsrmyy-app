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
			<view class="height40 hs-border" @click="search()">查询</view>
		</view>

		<view v-for="item in list">
			<view class="cell hs-border">
				<view class="space-between">
					<view>科室名称：{{item.depName}}</view>
					<view>检验名称：{{item.reportName}}</view>
				</view>
				<view class="space-between">
					<view>检验编号：{{item.reportCode}}</view>
					<!-- <view>检查医生：{{item.sqDoc}}</view> -->
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
				startDate:new Date().toISOString().slice(0, 10),
				endDate:new Date().toISOString().slice(0, 10),
				list:[
					// {
					// 	expert:'外科检查',
					// 	date:'2021-12-20',
					// 	name:'常规检查',
					// 	number:'00003283434834',
					// },
					// {
					// 	expert:'外科检查',
					// 	date:'2021-12-20',
					// 	name:'常规检查',
					// 	number:'00003283434834',
					// }
				],
				mrn:'',
			}
		},
		onLoad(options) {
			console.log("options.item",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				this.mrn = item.mrn;
			}
			this.requestList();
		},
		methods: {
			async requestList(){
				const [err,res] = await this.$arequest({
					path:"/patient/mobile/getPatientByUserId",
					query:{
						userId:uni.getStorageSync("userId"),
					}
				});
				let defaultPatientItem = {};
				if(res.data.code == 200){
					const list = res.data.data;
					console.log("list===>",JSON.stringify(list));
					for(let i = 0; i < list.length; i ++){
						const item = list[i];
						if(item.defaultPatient == 1){
							defaultPatientItem = item;
							break;
						}
					}
				}
				
				let req = {
					condition:defaultPatientItem.credentialNo,
					conditionType:defaultPatientItem.credentialType,
				}
				let that = this;
				const [perr,pres] = await this.$arequest({
					path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
					query:req,
				})
				console.log("res",JSON.stringify(pres));
				if(pres.data.code == 200){
					const data = pres.data.data;
					const mrn = data.mrn
					this.mrn = mrn;
					this.getTestreport(mrn);
				}
			},
			bindSDateChange(e) {
			  let date = e.detail.value;
			  this.startDate = date;
			  this.reportlist = [];
			},
			bindEDateChange(e) {
			  let date = e.detail.value;
			  this.endDate = date;
			  this.reportlist = [];
			},
			search(){
				if(this.mrn.length > 0){
					this.getTestreport(this.mrn);
				}else{
					this.requestList();
				}
			},
			getDetailInfo(mrn){
				
				let date = new Date().toISOString().slice(0, 10);		
				this.$request({
					path:'/testReport/mobile/getDetailInfo',
					query:{
						beginDate:this.startDate,
						endDate:this.endDate,
						reportCode:mrn,
					}
				}).then(res=>{
					
				})
			},
			getTestreport(mrn){
				let that = this;
				this.$request({
					path:'/testReport/mobile/getInfo',
					query:{
						beginDate:this.startDate,
						endDate:this.endDate,
						mrn:mrn,
					}
				}).then(res=>{
					if(res.data.code == 200){
						that.list = res.data.data;
					}
				})
			},
			getCheckreportbyUserId(){
				
				if(this.startDate.length == 0){
					return uni.showToast({
						icon:"none",
						title:"请选择开始时间"
					})
				}
				
				if(this.endDate.length == 0){
					return uni.showToast({
						icon:"none",
						title:"请选择结束时间"
					})
				}
				
				let that = this;  
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path:'/testReport/mobile/getInfoByPatient',
					query:{
						beginDate:this.startDate,
						endDate:this.endDate,
						userId:uni.getStorageSync("userId"),
					}
				}).then(res=>{
					if(res.data.code == 200){
						that.reportlist = res.data.data;
					}
				})
			},
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