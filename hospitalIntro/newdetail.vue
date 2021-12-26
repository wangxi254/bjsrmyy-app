<template>
	<view class="paading15">
		<view>{{detailInfo.contentTitle}}</view>
		<view>{{detailInfo.content}}</view>
		<view>{{detailInfo.createTime}}</view>
		<image class="img" mode="" :src="detailInfo.carouselImageUrl"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailInfo:{}
			}
		},
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item);
				this.detailInfo = item;
			}
		},
		onShow() {

		},
		methods: {
			
			
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
	
	.img{
		width: 200px;
		height: 150px;
	}
</style>