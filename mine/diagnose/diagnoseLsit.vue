<template>
	<view class="content-view">
		<view class="note-view">
			<view>温馨提示：</view>
			<view>1.请如实提供就诊人真实姓名</view>
		</view>
		<view v-for="item in list" class="cell" @click="eleguide(item)">
			
			<view class="space-between align-items-center paadinglr15 cell-height">
				<view class="name flex1">{{item.name}}</view>
				<view class="eidt" @click.stop="edit(item)">
					编辑
				</view>
				<image class="right-img marginl15" src="../../static/common/right.png"></image>
			</view>
			<view class="info">
				<view>电话：{{item.phone}}</view>
				<view>出生日期：{{item.birthday}}</view>
				<view>证件号：{{item.credentialNo}}</view>
			</view>
			<view class="bottom-view space-between paadinglr15">
				<view @click.stop="openCode(item)">电子就诊码</view>
				<view @click.stop="bindCard(item)">绑定就诊卡</view>
				<!-- <view @click.stop="edit(item)">编辑</view> -->
				<view @click.stop="unbindDisagnose(item)">解绑</view>
			</view>
		</view>
		
		
		<view class="circleButton" @click="addDisagnoseMan">
			添加
		</view>
		
		<view class="checklayer" v-if="openlayer">
			<view class="parkbox">
				<view class="center height40 bottomborder">姓名：{{disagnoseCode.name}}</view>
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
				disagnoseCode:{},
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
			console.log(getCurrentPages())
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
				this.getPainInfo(item);
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
					},
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
						userId:uni.getStorageSync("userId"),
						beginDate:date,
						endDate:date,
						patientid:item.id
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.content-view{
		background: #F5F5F5;
		min-height: 100%;
		width: 100%;
	}
	
	.right-img{
		width: 15px;
		height: 15px;
	}
	
	.cell{
		margin: 0px 15px 20px 15px;
		border-radius: 5px;
		background: #FFFFFF;
		
		
		.cell-height{
			height: 51px;
			line-height: 51px;
			border-bottom: 1px solid #F5F5F5;
			.name{
				font-size: 16px;
				font-family: PingFang-SC-Semibold, PingFang-SC;
				font-weight: 600;
				color: #333333;
			}
			.eidt{
				font-size: 14px;
				font-family: PingFang-SC-Regular, PingFang-SC;
				font-weight: 400;
				color: #8F8F8F;
			}
		}
		
		.info{
			// justify-content: center;
			// align-items: center;
			// border-bottom: 0.5px solid $uni-border-color;
			// padding: 10px 15px;
			// font-size: $uni-font-detail-title;
			// color: $uni-text-color;
			padding: 20px 15px;
			view{
				height: 20px;
				font-size: 14px;
				font-family: PingFang-SC-Regular, PingFang-SC;
				font-weight: 400;
				color: #5E5E5E;
				line-height: 20px;
				margin-bottom: 5px;
			}
			
		}
		
		.bottom-view{
			border-top: 1px solid #F5F5F5;
			height: 50px;
			line-height: 50px;
			view{
				
				font-size: 14px;
				font-family: PingFang-SC-Regular, PingFang-SC;
				font-weight: 400;
				color: #53B7C7;
				
			}
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
	
	.note-view{
		padding: 20px 36px 10px 36px;
		font-size: 12px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #333333;
	}
	

</style>