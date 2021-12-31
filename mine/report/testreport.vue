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
			<view class="height40 hs-border" @click="search()">查询</view>
		</view>

		<view v-for="item in list">
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
				this.credentialType = this.credentialTyps[index].credentialType;
				this.credentialNo = this.credentialTyps[index].credentialNo;
				if(this.judgeCondition()){
					this.search();
				}
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