<template>
	<view class="content">
		<view class="doctor-header flex-row">
			<image class="img" mode="" :src="exportInfo.icon ? exportInfo.icon : '../static/common/person.jpg'"></image>
			<view>
				<view class="font-size-16-w500 text-color-333333">
					{{exportInfo.docName || emptyText}}
				</view>
				<view class="font-size-16-w500 text-color-8f8f8f">
					{{exportInfo.docTitle || emptyText}}
				</view>
			</view>
		</view>
		
		<view class="item margint10">
			<view class="item-title font-size-m14-w500">
				
				简介
			</view>
			<view class="item-detail font-size-14-w400 text-color-8f8f8f">
				{{exportInfo.docInfo || emptyText}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title font-size-m14-w500">
				擅长
			</view>
			<view class="item-detail font-size-14-w400 text-color-8f8f8f">
				{{exportInfo.docDes || emptyText}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title font-size-m14-w500">
				门诊地点
			</view>
			<view class="item-detail font-size-14-w400 text-color-8f8f8f">
				{{exportInfo.address || emptyText}}
			</view>
		</view>
		
		
		<view class="item">
			<view class="item-title font-size-m14-w500">
				号源
			</view>
			<view class="item-detail font-size-14-w400 text-color-8f8f8f">
				上午剩余号源：{{exportInfo.total1 || emptyText}}        下午剩余号源：{{exportInfo.total2 || emptyText}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title font-size-m14-w500">
				挂号费
			</view>
			<view class="item-detail font-size-14-w400 text-color-8f8f8f">
				{{exportInfo.fee || emptyText}}
			</view>
		</view>
		
		<view style="height: 30px;background: #F5F5F5;">
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
		background: $uni-bg-color-grey;
	}
	
	.doctor-header{
		background: #FFFFFF;
		padding: 20px;
		align-items: center;
		.img{
			width: 60px;
			height: 80px;
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
		margin: 10px 15px ;
		padding: 15px;
		padding-right: 0px;
		background: #FFFFFF;
		.item-title{
			border-bottom: 0.5px solid $uni-bg-color-grey;
			padding-bottom: 10px;
		}
		
		.item-detail{
			padding-top: 10px;
		}
	}
</style>