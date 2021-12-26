<template>
	<view class="content">
		<view class="doctor-header flex-row">
			<image class="img" :src="exportInfo.icon"></image>
			<view>
				<view class="name">
					{{exportInfo.docName || emptyText}}
				</view>
				<view class="profical">
					{{exportInfo.docTitle || emptyText}}
				</view>
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">
				
				简介
			</view>
			<view class="item-detail">
				{{exportInfo.docInfo || emptyText}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">
				擅长
			</view>
			<view class="item-detail">
				{{exportInfo.docDes || emptyText}}
			</view>
		</view>
		
		
		<view class="item">
			<view class="item-title">
				门诊地点
			</view>
			<view class="item-detail">
				{{exportInfo.address || emptyText}}
			</view>
		</view>
		
		
		<view class="item">
			<view class="item-title">
				号源
			</view>
			<view class="item-detail">
				上午剩余号源：{{exportInfo.total1 || emptyText}}        下午剩余号源：{{exportInfo.total2 || emptyText}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">
				挂号费
			</view>
			<view class="item-detail">
				{{exportInfo.fee || emptyText}}
			</view>
		</view>
		
		<view style="height: 30px;background: #F1F1F1;">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exportInfo:{},
				emptyText: '暂无'
			}
		},
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item);
				this.exportInfo = item;
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
	.content{
		background: #F1F1F1;
	}
	
	.doctor-header{
		background: #FFFFFF;
		padding: 15px;
		align-items: center;
		.img{
			width: 50px;
			height: 70px;
			margin-right: 10px;
		}
		
		.name{
			margin-bottom: 10px;
			font-size: $uni-font-normal-title;
			color: $uni-text-color;
		}
		
		.profical{
			font-size: $uni-font-detail-title;
			color: $uni-text-color-grey;
		}
	}
	
	.item{
		margin: 20px 10px ;
		padding: 15px;
		padding-right: 0px;
		background: #FFFFFF;
		.item-title{
			font-size: $uni-font-normal-title;
			color: $uni-text-color;
			border-bottom: 0.5px solid $uni-border-color;
			padding-bottom: 10px;
		}
		
		.item-detail{
			padding-top: 10px;
			font-size: $uni-font-detail-title;
			color: $uni-text-color;
		}
	}
</style>