<template>
	<view class="info">
		<view class="info_con">
			<view class="avator">
				<span class="left">头像</span>
				<view class="right">
					<open-data class="awarimg" type="userAvatarUrl"></open-data>
					<image class="i_right" src="../static/common/right.png"></image>
				</view>
			</view>
			<view class="item">
				<span class="left">昵称</span>
				
				<view class="right">
					<open-data class="tit" type="userNickName"></open-data>
					<image class="i_right" src="../static/common/right.png"></image>
				</view>
			</view>
			<view class="item">
				<span class="left">电话号码</span>
				<view class="right">
					<span class="tit">{{phone ? phone : ''}}</span>
					<image class="i_right" src="../static/common/right.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				phone:uni.getStorageSync("phone"),
			}
		},
		onLoad() {
			const that = this
			// 获取用户信息
			uni.getUserInfo({
			  provider: 'weixin',
			  success: function (infoRes) {
			    console.log(infoRes);
				that.userInfo = infoRes.userInfo
			  }
			});
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		background: #F5F5F5;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		
		.info_con {
			width: 305px;
			height: 233px;
			background: #FFFFFF;
			border-radius: 5px;
			margin-top: 16px;
			display: flex;
			flex-direction: column;
			padding: 0 20px;
			
			.avator {
				height: 90px;
				border-bottom: 1px solid #F5F5F5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.left {
					font-weight: bold;
					font-size: 14px;
				}
				
				.right {
					display: flex;
					align-items: center;
					image:nth-child(1) {
						width: 50px;
						height: 50px;
						border-radius: 50px;
						margin-right: 10px;
					}
					image:nth-child(2) {
						width: 15px;
						height: 15px;
					}
					
					.awarimg{
						width: 50px;
						height: 50px;
						margin-right: 10px;
						overflow:hidden;
						display: block;
						border-radius: 50%;
					}
				}
			}
			.item {
				height: 60px;
				border-bottom: 1px solid #F5F5F5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.left {
					font-weight: bold;
					font-size: 14px;
				}
				
				.right {
					display: flex;
					align-items: center;
					.tit {
						color: #8F8F8F;
						font-size: 14px;
						margin-right: 10px;
					}
					image {
						width: 15px;
						height: 15px;
					}
				}
			}
		}
	}
</style>
