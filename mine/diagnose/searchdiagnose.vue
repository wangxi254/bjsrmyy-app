<template>
	<view>
		<view class="flex-row">
			
			<picker :value="credentialTypeIndex" :range="credentialTyps" @change="credentialTypeChange" range-key="name">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{credentialTyps[credentialTypeIndex].name||'选择联系人类型'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
			<input v-model="idcard" placeholder="请输入就诊人证件号" />
			
			<view @click="searchdiagnose">查询</view>
		</view>
		
		
		<view class="flex-row" v-if="patientInfo">
			<view>
				就诊卡信息id
			</view>
			<view>
				{{patientInfo.id}}
			</view>
		</view>
		<view class="flex-row" v-if="patientInfo">
			<view>
				病人信息id
			</view>
			<view>
				{{patientInfo.patientId}}
			</view>
		</view>
		
		<view class="flex-row" v-if="patientInfo">
			<view>
				就诊卡号
			</view>
			<view>
				{{patientInfo.patientCardId}}
			</view>
		</view>
		
		<view class="flex-row" v-if="patientInfo">
			<view>
				病例号
			</view>
			<view>
				{{patientInfo.mrn}}
			</view>
		</view>
		
		<view class="flex-row" v-if="patientInfo && patientInfo.mzh">
			<view>
				门诊号
			</view>
			<view>
				{{patientInfo.mzh}}
			</view>
		</view>
		
		<view class="flex-row" v-if="patientInfo && patientInfo.zyh">
			<view>
				住院号
			</view>
			<view>
				{{patientInfo.zyh}}
			</view>
		</view>
		
		<view class="flex-row" v-if="patientInfo">
			<view class="addBtn" @click="check">
				检查报告
			</view>
			<view class="addBtn" @click="test">
				检验报告
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idcard:'',
				credentialTyps:[
					// {
					// 	value:0,
					// 	name:'未知',
					// },
					{
						value:1,
						name:'证件号'
					},
					{
						value:2,
						name:'电话号码',
					},
					{
						value:3,
						name:'病人信息id'
					},
					{
						value:4,
						name:'就诊卡号',
					},
				],
				credentialTypeIndex:0,
				credentialType:1,
				patientId:'',
				patientInfo:null
			}
		},
		onLoad(options) {
			console.log("options==>",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				this.patientId = item.id;
			}
		},
		methods: {
			
			searchdiagnose(){
				if(this.idcard.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人证件号"
					})
				}
				let req = {
					// userId:uni.getStorageSync("userId"),
					condition:this.idcard,
					conditionType:this.credentialType,
				}
				let that = this;
				this.$request({
					path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
					query:req,
				}).then(res=>{
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
						that.patientInfo = res.data.data;
					}
				})
				
			},
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.credentialTyps[index].value;
			},
			check(){
				uni.navigateTo({
					url:`../report/checkreport?item=${JSON.stringify(this.patientInfo)}`
				})
			},
			test(){
				uni.navigateTo({
					url:`../report/testreport?item=${JSON.stringify(this.patientInfo)}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.row-cls{
		display: flex;
		flex-direction: row;
	}
	
	.flex-row{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-right: 15px;
		margin-left: 15px;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 0.5px solid $uni-border-color;
	}
	
	.left15{
		margin-left: 15px;
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
	
	.right{
		width: 10px;
		height: 10px;
	}
</style>