<template>
	<view>
		<view v-for="item in list" class="cell">
			<view class="name">{{item.name}}</view>
			<view class="flex-row info">
				<view class="flex1">
					<view>身份证：{{item.idnumber}}</view>
					<view>联系电话：{{item.phone}}</view>
					<view>档案状态：{{item.phone}}</view>
				</view>
				<image class="right-img" src="../../static/common/right.png"></image>
			</view>
			<view class="space-btw">
				<view class="btn">电子就诊码</view>
				<view class="btn">档案更新</view>
				<view class="btn">编辑</view>
				<view class="btn">解绑</view>
			</view>
		</view>
		
		
		<view class="addBtn" @click="addDisagnoseMan">
			添加
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name:"张xx",
						idnumber:"522122199xxxxxxxxxx",
						phone:"1851000xxxx",
					},
					{
						name:"张xx",
						idnumber:"522122199xxxxxxxxxx",
						phone:"1851000xxxx",
					},
					{
						name:"张xx",
						idnumber:"522122199xxxxxxxxxx",
						phone:"1851000xxxx",
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			addDisagnoseMan(){
				uni.navigateTo({
					url:"./addDisagnoser"
				})
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
	
</style>