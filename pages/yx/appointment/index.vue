<template>
	<view>
		<scroll-view scroll-x style="height:80px">
			<view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentindex:0,
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); 
			uni.setNavigationBarTitle({
			　　title:option.title
			})
		},
		methods: {
			clickTab(index){
				this.currentindex = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-row{
		display: flex;
		flex-direction: row;
	}
	
	.flex1{
		flex: 1;
	}
	
	.head{
		.head-view{
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: $uni-font-normal-title;
		}
		.active{
			color: $uni-color-primary;
			border-bottom: 1px solid $uni-color-primary;
		}
		.unactive{
			color: $uni-text-color;
		}
		.head-line{
			background: #C8C7CC;
			height: 1px;
			width: 100%;
		}
	}
	
	.content1{
		.hs1-title{
			color: $uni-color-primary;
			font-size: $uni-font-big-title;
			height: 40px;
			line-height: 40px;
			margin-left: 15px;
			font-weight: bold;
		}
		.hs1-img{
			width: 100%;
			height: 100px;
			margin-top: 5px;
		}
		
		.item{
			display: flex;
			flex-direction: row;
			height: 40px;
			line-height: 40px;
			justify-content: space-between;
			padding: 0px 15px;
			border-bottom: 0.5px solid $uni-border-color;
			.hs1-text{
				color: $uni-text-color;
				font-size: $uni-font-detail-title;
				text{
					color: $uni-color-primary;
				}
			}
			.hs1-icon{
				width: 20px;
				height: 20px;
				margin-top: 10px;	
			}
		}
		
		.hs1-detail{
			padding: 10px;
			color: $uni-text-color;
			font-size: $uni-font-detail-title;
		}
	}
	
	.traffic{
		margin: 10px;;
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
	}
	
	.contact{
		margin-top: 10px;
		margin-left: 10px;
		color: $uni-text-color;
		font-size: $uni-font-detail-title;
	}
	
	.number{
		margin-left: 10px;
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
	}
</style>