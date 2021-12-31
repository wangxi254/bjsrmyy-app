<template>
	<view class="content-view">
		<view class="head-view">
			<picker :value="credentialTypeIndex" :range="patientList" @change="credentialTypeChange" range-key="name">
				<view class="picker-view paadinglr15">
				  <view class="font-size-16-w600 text-color-333333">
						{{patientList[credentialTypeIndex].name||'选择联系人类型'}}
				  </view>
				  <view class="flex1 marginl10 text-color-333333 font-size-14-w400">{{patientList[credentialTypeIndex].credentialNo}}</view>
				  <view class="font-size-14-w400 text-color-8f8f8f">切换</view>
				  <image class="right marginl10" src="../../static/common/exchange.png"></image>
				</view>
			</picker>
		</view>
		<view class="space-between paadinglr15">
			<picker mode="date" :value="startDate" @change="bindSDateChange">
				<view class="picker-view height50">
				  <view>
						{{startDate||'选择日期'}}
				  </view>
				   <image class="marginl10 right" src="../../static/common/down.png"></image>
				</view>
			</picker>
			<picker mode="date" :value="endDate" @change="bindEDateChange">
				<view class="picker-view height50">
				  <view>
						{{endDate||'选择日期'}}
				  </view>
				  <image class="marginl10 right" src="../../static/common/down.png"></image>
				</view>
			</picker>
		</view>
		
		<view v-for="item in list">
			<view class="cell" @click="getDetailInfo(item)">
				<view class="space-between border-bottom paddingb15">
					<view class="font-size-16-w600 text-color-53B7C7">{{item.depName}}</view>
					<view class="font-size-14-w400 text-color-8f8f8f">{{item.reportTime}}</view>
				</view>
				<view>
					<view class="margint10 font-size-14-w400 text-color-333333">检验名称：{{item.reportName}}</view>
					<view class="margint10 font-size-14-w400 text-color-333333">检验编号：{{item.reportCode}}</view>
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
					// 	depName:'外科检查',
					// 	reportTime:'2021-12-20',
					// 	reportName:'常规检查',
					// 	reportCode:'00003283434834',
					// },
					// {
					// 	depName:'外科检查',
					// 	reportTime:'2021-12-20',
					// 	reportName:'常规检查',
					// 	reportCode:'00003283434834',
					// }
				],
				mrn:'',
				patientList:[],
				credentialTypeIndex:0,
				credentialType:'',
				credentialNo:'',
				
			}
		},
		onLoad(options) {
			console.log("options.item",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				
			}
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
				let defaultPatientItem;
				if(res.data.code == 200){
					const list = res.data.data;
					this.patientList = list;
					if(list && list.length > 0){
						console.log("list===>",JSON.stringify(list));
						for(let i = 0; i < list.length; i ++){
							const item = list[i];
							if(item.defaultPatient == 1){
								defaultPatientItem = item;
								this.credentialTypeIndex = i;
								break;
							}
						}
						if(defaultPatientItem==null){
							 defaultPatientItem = list[0];
						}
					}
				}
				
				let req = {
					condition:defaultPatientItem.credentialNo,
					conditionType:defaultPatientItem.credentialType,
				}
				this.credentialNo = defaultPatientItem.credentialNo;
				this.credentialType = defaultPatientItem.credentialType;
				// let that = this;
				// const [perr,pres] = await this.$arequest({
				// 	path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
				// 	query:req,
				// })
				// console.log("res",JSON.stringify(pres));
				// if(pres.data.code == 200){
				// 	const data = pres.data.data;
				// 	const mrn = data.mrn
				// 	this.mrn = mrn;
				// 	this.getTestreport(mrn);
				// }
				this.getreport();
			},
			bindSDateChange(e) {
			  let date = e.detail.value;
			  this.startDate = date;
			  this.reportlist = [];
			  if(this.judgeCondition()){
			  				  this.search();
			  }
			},
			bindEDateChange(e) {
			  let date = e.detail.value;
			  this.endDate = date;
			  this.reportlist = [];
			  if(this.judgeCondition()){
				  this.search();
			  }
			},
			judgeCondition(){
				if(this.startDate.length == 0){
					return false;
				}
				
				if(this.endDate.length == 0){
					return false;
				}
				
				if(this.credentialNo.length == 0){
					return false;
				}	
				this.list = [];
				return true;
			},
			search(){
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
				console.log("getPatientCardByPatientInfo pres===>",JSON.stringify(pres));
				if(pres.data.code == 200){
					const data = pres.data.data;
					const mrn = data.mrn
					this.mrn = mrn;
					console.log("getPatientCardByPatientInfo: mrn=>",mrn);
					this.getTestreport(mrn);
				}
			},
			getDetailInfo(item){
				// mrn=522428198907190614&reportCode=123 reportSeq=
				const credentialTyps = [
					// {
					// 	value:0,
					// 	name:'未知',
					// },
					{
						value:1,
						name:'身份证'
					},
					{
						value:2,
						name:'军官证',
					},
					{
						value:3,
						name:'户口本'
					},
					{
						value:4,
						name:'护照',
					},
					{
						value:5,
						name:'外国人永久居住证'
					},
					{
						value:6,
						name:'就诊卡号',
					},
					{
						value:7,
						name:'住院号'
					},
					{
						value:8,
						name:'病历号'
					}
				];
				const credentialType = this.credentialType;
				let credentialText  = '';
				credentialTyps.forEach(item=>{
					if(item.value == credentialType){
						credentialText = item.name;
					}
				})
				let req = {
					beginDate:this.startDate,
					endDate:this.endDate,
					mrn:this.mrn,
					credentialText:credentialText,
					credentialType:credentialType,
					credentialNo:this.credentialNo,
					...item
				}
				uni.navigateTo({
					url:`testdetail?item=${JSON.stringify(req)}`
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
						that.list = res.data.data;
						
					}
				})
			},
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.patientList[index].credentialType;
				this.credentialNo = this.patientList[index].credentialNo;
				if(this.judgeCondition()){
					this.search();
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.right{
		height: 10px;
		width: 10px;
	}
	
	.head-view{
		height: 52px;
		background: #FFFFFF;
	}
	
	.picker-view{
		align-items: center;
		display: flex;
		justify-content: center;
		height: 52px;
		
	}
	
	.height50{
		height: 50px;
	}
	
	.height40{
		height: 50px;
	}
	
	.margin{
		margin: 10px 15px;
	}
	
	.cell{
		margin: 15px;
		margin-top: 0px;
		padding: 15px;
		background: #FFFFFF;
	}
</style>