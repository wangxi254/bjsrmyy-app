<template>
	<view class="content-view flex flex-column">
		<view class="head-view">
			<picker :value="credentialTypeIndex" :range="patientList" @change="credentialTypeChange" range-key="name">
				<view class="picker-view paadinglr15">
				  <view class="font-size-16-w600 text-color-333333">
						{{patientList[credentialTypeIndex].name||'选择联系人类型'}}
				  </view>
				  <view class="flex1 marginl10 text-color-333333 font-size-14-w400">{{ utils.hideIdentityCard(patientList[credentialTypeIndex].credentialNo)}}</view>
				  <view class="font-size-14-w400 text-color-8f8f8f">切换</view>
				  <image class="right marginl10" src="../../static/common/exchange.png"></image>
				</view>
			</picker>
		</view>
        <view class="uni-padding-wrap" style="margin: 15rpx;">
			<button class="primary-btn btn" type="primary" @click="getreport">查询</button>
		</view>
        <!-- <view class="flex-1" style="background:red">
            <web-view v-if="src" :src="src"></web-view>
        </view> -->
	</view>
</template>

<script>
    
	import utils from "../../utils/utils.js";
	export default {
		data() {
			return {
				utils,
				patientList:[],
				credentialTypeIndex:0,
				credentialType:'',
				credentialText:'',
				credentialNo:'',
				mrn:''
			}
		},
		onLoad(options) {
			console.log("options.item",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				// this.mrn = item.mrn;
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
				let defaultPatientItem;
				if(res.data.code == 200){
					const list = res.data.data;
					if(list && list.length > 0){
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
			},
			getreport() {
                uni.navigateTo({
                    url: './web?idCard=' +  this.credentialNo,
                })
            },
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.patientList[index].credentialType;
				this.credentialNo = this.patientList[index].credentialNo;
			}
			
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
		margin: 15px 15px 0px 15px;
		padding: 15px;
		background: #FFFFFF;
	}
	
</style>