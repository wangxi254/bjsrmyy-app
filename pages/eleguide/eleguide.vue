<template>
	<view>
		<view class="checklayer" v-if="openlayer">
			<view class="parkbox">
				<!-- <view class="center height40 bottomborder">姓名：{{disagnoseCode.name}}</view> -->
				<view class="center bottomborder flex-row">
					<view>姓名：</view>
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
				<view class="center height40">
					<view class="footer-box footer-box-w share-next" @tap="coselayer">关闭</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				openlayer:false,
				scancode:{
					code: 'https://qm.qq.com/cgi-bin/qm/qr?k=LKqML292dD2WvwQfAJXBUmvgbiB_TZWF&noverify=0',
					size: 260, // 二维码大小
				},
				barcode:{
					code: '1111',
					color:['#333333','#333333'], // 条形码的颜色
					bgColor: '#FFFFFF', // 背景色
					width: 300, // 宽度
					height: 50 // 高度
				},
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
			}
		},
		onLoad() {

		},
		onShow() {
			this.requestList();
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
				this.openlayer = false;
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
				let defaultPatientItem = {};
				if(res.data.code == 200){
					const list = res.data.data;
					this.patientList = list;
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
				}
				this.openCode()
			},
			getPainInfo(){
				let that = this;
				this.$request({
					path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
					query:{
						conditionType:this.credentialType,
						condition:this.credentialNo,
					},
					hastoast:true,
				}).then(res=>{
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
						const mrn = res.data.data.mrn;
						that.barcode["code"] = mrn;
						that.scancode['code'] = mrn;
						that.mrn = mrn;
						that.openlayer = true;
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
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
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
	}
	
	.scode{
		padding: 0px 45px;
		height: 180px;
		width: 180px;
		margin-bottom: 10px;
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
		line-height: 40px;
		height: 40px;
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
</style>