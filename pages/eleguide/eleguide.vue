<template>
	<view>
		<view class="checklayer" v-if="openlayer">
			<view class="parkbox">
				<!-- <view class="center height40 bottomborder">姓名：{{disagnoseCode.name}}</view> -->
				<view class="center h-title bottomborder flex-row">
					<view style="margin-left: 10px;">姓名：</view>
					<view>
						<picker :value="credentialTypeIndex" :range="patientList" @change="credentialTypeChange" range-key="name">
							<view class="flex-row picker-view height40">
							  <view>
									{{patientList[credentialTypeIndex].name||'选择联系人类型'}}
							  </view>
							   <image class="right" src="../../static/common/right.png"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="center">
					<view class="tcode">
						<w-barcode :options="barcode"></w-barcode>
					</view>
					<!-- <image class="tcode" mode="aspectFill" :src="disagnoseCode.tcode"></image> -->
				</view>
				<view class="center height40">
					{{mrn}}
				</view>
				<view class="center bottomborder">
					<view class="scode">
						<w-qrcode @press="longtap" style="margin-top: 1rem;" :options="scancode" ref="qrcode" @generate="hello"></w-qrcode>
					</view>
					<!-- <image class="scode" mode="aspectFill" :src="disagnoseCode.tcode"></image> -->
				</view>
				<view class="center height50" @tap="coselayer">
					<view class="font-size-m14-w500 text-color-53B7C7" >关闭</view>
				</view>
			</view>
		</view>
		<tabbar current="1" @tabClick="tabClick" />
	</view>
</template>

<script>
	import tabbar from "../../components/tabbar.vue";
	export default {
		data() {
			return {
				list:[],
				scancode:{},/*{
					code: '',
					size: 260, // 二维码大小
				},*/
				barcode:{},/*{
					code: '',
					color:['#333333','#333333'], // 条形码的颜色
					bgColor: '#FFFFFF', // 背景色
					width: 300, // 宽度
					height: 50 // 高度
				},*/
				mrn:'',
				patientList:[],
				credentialTypeIndex:0,
				credentialType:'',
				credentialNo:'',
				// disagnoseCode:{
				// 	scode:'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
				// 	tcode:'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
				// 	name:'张先生',
				// 	code:'0010101010101'
				// }
				openlayer:false,
			}
		},
		onLoad() {
			
		},
		onShow() {
			if(uni.getStorageSync("userId") === null || uni.getStorageSync("userId").length === 0){
				this.barcode = {}
				this.scancode = {}
				this.openlayer = false;
				uni.navigateTo({
					url:"../auth/auth?backindex=eleguide",
					animationType: 'pop-in',
					animationDuration: 10
				})
			}else{
				this.openlayer = true;
				this.requestList();
			}
		},
		components:{
			tabbar
		},
		methods: {
			addDisagnoseMan(){
				uni.navigateTo({
					url:"./addDisagnoser"
				})
			},
			unbindDisagnose(item){
				let that = this;
				uni.showModal({
					title:"温馨提示",
					content:"请确认是否要解绑当前就诊人，解绑后操作记录等信息将无法在进行查看",
					cancelText:"取消",
					confirmText:"确定",
					success: (res) => {
						console.log("res==",JSON.stringify(res))
						if(res.confirm){
							that.unbind(item);
						}
					}
				})
			},
			unbind(item){
				//调取消接口
				let that = this;
				this.$request({
					path:`/patient/mobile/disable?id=${item.id}`,
					query:{
						id:item.id,
					},
					method:'DELETE',
				}).then(res=>{
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
						uni.showToast({
							icon:'none',
							title:res.data.msg,
						})
						this.requestList();
					}
				})
			},
			openCode(){
				this.getPainInfo();
			},
			coselayer(){
				uni.switchTab({
					url:"../index/index"
				})
			},
			edit(item){
				uni.navigateTo({
					url:`./addDisagnoser?item=${JSON.stringify(item)}`
				})
			},
			bindCard(item){
				uni.navigateTo({
					url:`./bindCard?item=${JSON.stringify(item)}`
				})
			},
			async requestList(){
				const [err,res] = await this.$arequest({
					path:"/patient/mobile/getPatientByUserId",
					query:{
						userId:uni.getStorageSync("userId"),
					}
				})
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
								this.credentialNo = item.credentialNo;
								this.credentialType = item.credentialType;
								this.credentialTypeIndex = i;
								break;
							}
						}
						if(defaultPatientItem == null){
							const item = list[0];
							this.credentialNo = item.credentialNo;
							this.credentialType = item.credentialType;
							this.credentialTypeIndex = 0;
						}
						this.openCode()
					}else{
						// uni.showToast({
						// 	icon:"none",
						// 	title:res.data.msg
						// })
						this.openlayer = false;
						uni.showModal({
							content:"你还没有添加就诊人，去添加就诊人？",
							cancelText:"否",
							confirmText:"是",
							success: (e) => {
								console.log("e==>",JSON.stringify(e))
								if(e.confirm){
									uni.navigateTo({
										url:"../../mine/diagnose/addDisagnoser"
									})
								}else{
									this.coselayer();
								}
							}
						})
					}
				}
				
			},
			getPainInfo(){
				uni.showLoading();
				let that = this;
				this.$request({
					path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
					query:{
						conditionType:this.credentialType,
						condition:this.credentialNo,
					},
					hastoast:true,
				}).then(res=>{
					uni.hideLoading();
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
						const mrn = res.data.data.mrn;
						that.barcode = {
										code: mrn,
										color:['#333333','#333333'], // 条形码的颜色
										bgColor: '#FFFFFF', // 背景色
										width: 300, // 宽度
										height: 50 // 高度
									};
						that.scancode = {
											code: mrn,
											size: 260, // 二维码大小
										};
						that.mrn = mrn;
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				})
			},
			longtap (e){
				console.log(e)
			},
			
			hello(res) {
				try {
					// console.log(321, res)
				} catch (e) {}
			},
			async saveCode(){//手动触发获取图片
				const res = await this.$refs.qrcode.GetCodeImg();
				// console.log(res)
			},
			eleguide(item){
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path:"/guideDiag/mobile/selectInfo",
					method:'POST',
					query:{
						patientid:item.id,
						beginDate:date,
						endDate:date,
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
				})
			},
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.patientList[index].credentialType;
				this.credentialNo = this.patientList[index].credentialNo;
				
				this.openCode();
			},
			tabClick(e){
				if(e.index == 0){
					uni.switchTab({
						url:"../index/index"
					})
				}else if(e.index==1){
					uni.switchTab({
						url:"../eleguide/eleguide"
					})
				}else if(e.index == 2){
					uni.switchTab({
						url:"../mine/mine"
					})
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	page{
		background: #FFFFFF;
		width: 100%;
		height: 100%;
	}
	
	.right-img{
		width: 15px;
		height: 15px;
	}
	
	.cell{
		border: 0.5px solid $uni-border-color;
		margin: 10px;
		border-radius: 5px;
		.name{
			padding: 10px 15px;
			border-bottom: 0.5px solid $uni-border-color;
			font-size: $uni-font-detail-title;
			color: $uni-text-color;
		}
		
		.info{
			justify-content: center;
			align-items: center;
			display: flex;
			border-bottom: 0.5px solid $uni-border-color;
			padding: 10px 15px;
			
			font-size: $uni-font-detail-title;
			color: $uni-text-color;
		}
		
		.space-btw{
			justify-content: space-between;
			display: flex;
			padding: 10px 15px;
			
			.btn{
				font-size: $uni-font-detail-title;
				color: $uni-text-color;
				border: 0.5px solid $uni-border-color;
				padding: 5px;
			}
		}
	}
	
	.checklayer {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999999;
		overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		-webkit-align-items: center; /* Safari 7.0+ */
		vertical-align: middle;
		display: flex;
	}

	.parkbox{
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-sizing: border-box;
		position: relative;
		padding: 0 15rpx;
		width: 80%;
	}
	
	.tcode{
		height: 50px;
		margin-top: 10px;
		justify-content: center;
		align-items: center;
	}
	
	.scode{
		padding: 0px 45px;
		height: 180px;
		width: 180px;
		margin-bottom: 10px;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	
	.center{
		align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
		padding-left: 15px;
		padding-right: 15px;
	}
	
	.height40{
		line-height: 50px;
		height: 50px;
	}
	
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
	
	.height50{
		height: 60px;
		line-height: 60px;
		margin: 0px 5px;
		border-radius: 5px;
	}
	
	.h-title{
		justify-content: center;
		align-items: center;
	}
</style>