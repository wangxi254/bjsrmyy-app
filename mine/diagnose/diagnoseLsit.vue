<template>
	<view>
		<view v-for="item in list" class="cell">
			<view class="name">{{item.name}}</view>
			<view class="flex-row info">
				<view class="flex1">
					<view>证件号：{{item.credentialNo}}</view>
					<view>联系电话：{{item.phone}}</view>
					<view>出生日期：{{item.birthday}}</view>
				</view>
				<image class="right-img" src="../../static/common/right.png"></image>
			</view>
			<view class="space-btw">
				<view class="btn" @click="openCode(item)">电子就诊码</view>
				<view class="btn" @click="bindCard(item)">绑定就诊卡</view>
				<view class="btn" @click="edit(item)">编辑</view>
				<view class="btn" @click="unbindDisagnose(item)">解绑</view>
			</view>
		</view>
		
		
		<view class="addBtn" @click="addDisagnoseMan">
			添加
		</view>
		
		<view class="checklayer" v-if="openlayer">
			<view class="parkbox">
				<view class="center height40 bottomborder">姓名：{{disagnoseCode.name}}</view>
				<view class="center">
					<image class="tcode" mode="aspectFill" :src="disagnoseCode.tcode"></image>
				</view>
				<view class="center height40">
					{{disagnoseCode.code}}
				</view>
				<view class="center bottomborder">
					<image class="scode" mode="aspectFill" :src="disagnoseCode.tcode"></image>
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
				disagnoseCode:{},
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
			openCode(item){
				this.disagnoseCode = item;
				this.openlayer = true;
			},
			coselayer(){
				this.openlayer = false;
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
			requestList(){
				let that = this;
				this.$request({
					path:"/patient/mobile/getPatientByUserId",
					query:{
						userId:uni.getStorageSync("userId"),
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
						that.list = res.data.data;
					}
				})
			},
			getPainInfo(item){
				let that = this;
				this.$request({
					path:"/tpatientCard/mobile/getPatientCardByPatientInfo",
					query:{
						conditionType:item.credentialType,
						condition:item.credentialNo,
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
					}
				})
			},
			
			
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
</style>