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
			
		</view>
		<view class="flex-row margin">
			<picker :value="credentialTypeIndex" :range="patientList" @change="credentialTypeChange" range-key="name">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{patientList[credentialTypeIndex].name||'选择联系人类型'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
			<view class="height40 hs-border" @click="search">查询</view>
		</view>
		
		
		<view v-for="item in reportlist">
			<view class="cell hs-border" @click="getDetailInfo(item)">
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
				reportlist:[
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
				patientList:[],
				credentialTypeIndex:0,
				credentialType:'',
				credentialNo:'',
				mrn:'',
			}
		},
		onLoad(options) {
			console.log("options.item",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				// this.mrn = item.mrn;
			}
			// this.getCheckreport();
			this.requestList();
			// this.getCheckreportbyUserId();
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
					this.patientList = list;
					console.log("list===>",JSON.stringify(list));
					for(let i = 0; i < list.length; i ++){
						const item = list[i];
						
						if(item.defaultPatient == 1){
							defaultPatientItem = item;
							this.credentialTypeIndex = i;
							break;
						}
					}
				}
				
				let req = {
					condition:defaultPatientItem.credentialNo,
					conditionType:defaultPatientItem.credentialType,
				}
				this.credentialNo = defaultPatientItem.credentialNo;
				this.credentialType = defaultPatientItem.credentialType;
				this.getreport();
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
			getCheckreport(mrn){
				let that = this;
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path:'/checkReport/mobile/getInfo',
					query:{
						beginDate:date,
						endDate:date,
						mrn:mrn,
					}
				}).then(res=>{
					if(res.data.code == 200){
						that.reportlist = res.data.data;
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
					path:'/checkReport/mobile/getInfoByPatient',
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
			search(){
				// if(this.mrn.length > 0){
				// 	this.getCheckreport(this.mrn);
				// }else{
				// 	this.requestList();
				// }
				// this.getCheckreportbyUserId();
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
				
				if(this.credentialNo.length == 0){
					return uni.showToast({
						icon:"none",
						title:"选择就诊人"
					})
				}
			
				this.getreport();
			},
			async getreport(){
				let that = this;
				let req = {
					condition:this.credentialNo,
					conditionType:this.credentialType,
				}
				const [perr,pres] = await this.$arequest({
					path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
					query:req,
				})
				console.log("res",JSON.stringify(pres));
				if(pres.data.code == 200){
					const data = pres.data.data;
					const mrn = data.mrn
					this.mrn = mrn;
					that.getCheckreport(mrn);
				}
			},
			getDetailInfo(item){
				let req = {
					beginDate:this.startDate,
					endDate:this.endDate,
					mrn:this.mrn,
					...item
				}
				uni.navigateTo({
					url:`checkdetail?item=${JSON.stringify(req)}`
				})
				// this.$request({
				// 	path:'/checkReport/mobile/getDetailInfoByPatient',
				// 	query:{
				// 		reportCode:item.reportCode,
				// 		beginDate:this.startDate,
				// 		endDate:this.endDate,
				// 	}
					
				// }).then(res=>{
					
				// })
			},
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.credentialTyps[index].credentialType;
				this.credentialNo = this.credentialTyps[index].credentialNo;
				this.search();
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