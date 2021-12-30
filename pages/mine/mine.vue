<template>
	<view class="mine_page">
		<view class="navibarbg">
			<view class="navibartitle">
				<!-- {{hospitalInto.name}} -->
				我的
			</view>
			<view class="person">
				<view class="left">
					<!-- <image :src="userInfo.avatarUrl"></image> -->
					<open-data class="awarimg" type="userAvatarUrl"></open-data>
					<view class="name">
						<!-- <span>{{userInfo.nickName}}</span> -->
						<open-data class="nickname" type="userNickName"></open-data>
						<span>{{phone ? phone : ''}}</span>
					</view>
				</view>
				<view class="right" @click="navitoPage('../../info/index')">
					个人主页 >
				</view>
			</view>
			<view class="mine">
				<view class="m_de" @click="navitoPage('../../attention/index')">
					<span>{{total}}</span>
					<span>我关注的</span>
				</view>
				<view class="m_de">
					<span>2</span>
					<span>浏览记录</span>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item special" @click="navitoPage('../../mine/diagnose/diagnoseLsit')">
				<view class="item_con">
					<view class="i_left">
						<image src="../../static/common/m_person.png"></image>
						<span>就诊人管理</span>
					</view>
					<image class="i_right" src="../../static/common/right.png"></image>
				</view>
			</view>
			<view class="item" @click="navitoPage('../../mine/diagnose/searchdiagnose')">
				<view class="item_con">
					<view class="i_left">
						<image src="../../static/common/m_record.png"></image>
						<span>查询病例信息</span>
					</view>
					<image class="i_right" src="../../static/common/right.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="item_con">
					<view class="i_left">
						<image src="../../static/common/m_pj.png"></image>
						<span>电子票据</span>
					</view>
					<image class="i_right" src="../../static/common/right.png"></image>
				</view>
			</view>
			<view class="item" @click="navitoPage('../../records/roomPay')">
				<view class="item_con">
					<view class="i_left">
						<image src="../../static/common/m_yj.png"></image>
						<span>住院预缴金查询</span>
					</view>
					<image class="i_right" src="../../static/common/right.png"></image>
				</view>
			</view>
			<view class="item" @click="navitoPage('../../mine/diagnose/bindCard')">
				<view class="item_con">
					<view class="i_left">
						<image src="../../static/common/m_pj.png"></image>
						<span>智能快捷绑卡</span>
					</view>
					<image class="i_right" src="../../static/common/right.png"></image>
				</view>
			</view>
		</view>
		<tabbar current="2" @tabClick="tabClick" />
	</view>
</template>

<script>
	import tabbar from "../../components/tabbar.vue";
	export default {
		data() {
			return {
				userId: null,
				total: 0,
				userInfo: {},
				phone:'',
			}
		},
		onShow() {
			console.log(111)
			if(uni.getStorageSync("userId") === null || uni.getStorageSync("userId").length === 0){
				uni.navigateTo({
					url:"../auth/auth"
				})
			} else {
				this.userId = uni.getStorageSync("userId")
				this.userInfo = uni.getStorageSync("userInfo");
				this.phone = uni.getStorageSync('phone');
				this.getData()
			}
		},
		onLoad() {
		},
		components:{
			tabbar
		},
		methods: {
			getData() {
				uni.request({
				    url: 'https://min.his.gzskt.net/bjrmWebApi/userfav/list/' + this.userId, //仅为示例，并非真实接口地址。
				    success: (res) => {
						this.total = res.data.data.length > 0 ? res.data.data.length : 0
					}
				})
			},
			navitoPage(path){
				if(uni.getStorageSync("userId") === null || uni.getStorageSync("userId").length === 0){
					return uni.navigateTo({
						url:"../auth/auth"
					})
				}
				uni.navigateTo({
					url: path
				})
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
	.mine_page{
		background: #F5F5F5;
		width: 100%;
		height: 100%;
	}
	.navibarbg{
		width: 100%;
		height: 263px;
		background: #53B7C7;
		display: flex;
		flex-direction: column;
	}
	
	.navibartitle{
		font-size: 17px;
		font-family: PingFang-SC-Semibold, PingFang-SC;
		font-weight: 600;
		color: #FFFFFF;
		padding-top: 54px;
		height: 24px;
		padding-left: 15px;
	}
	.person {
		box-sizing: border-box;
		width: 100%;
		height: 77px;
		margin-top: 30px;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.left {
			display: flex;
			image {
				width: 77px;
				height: 77px;
				border-radius: 77px;
			}
			.awarimg{
				width: 77px;
				height: 77px;
				border-radius: 77px;
				
				overflow:hidden;
				display: block;
				margin: 20rpx;
				border-radius: 50%;
			}
			.name {
				height: 77px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 10px;
				
				
				
				span:first-child {
					color: white;
					font-size: 20px;
					font-weight: bold;
				}
				span:last-child {
					color: #5abaca;
					background: #cbe9ee;
					padding: 4px 6px;
					border-radius: 3px;
				}
				
				.nickname{
					color: white;
					font-size: 20px;
					font-weight: bold;
				}
			}
		}
		.right {
			color: white;
			font-size: 16px;
		}
	}
	
	.mine {
		height: 66px;
		display: flex;
		align-items: center;
		.m_de {
			margin-left: 50px;
			display: flex;
			flex-direction: column;
			color: white;
			span:nth-child(1) {
				font-size: 16px;
				font-weight: bold;
			}
		}
	}
	
	.list {
		width: 100%;
		position: absolute;
		top: 243px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.item {
			width: 297px;
			background: white;
			border-radius: 6px;
			padding: 0 24px;
			
			.item_con {
				width: 100%;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f5f5f5;
			}
			
			.i_left {
				display: flex;
				align-items: center;
				image {
					width: 26px;
					height: 26px;
					margin-right: 10px;
				}
				span {
					font-size: 16px;
				}
			}
			.i_right {
				width: 15px;
				height: 15px;
			}
		}
		.special {
			margin-bottom: 16px;
			.item_con {
				border-bottom: none;
			}
		}
	}
</style>