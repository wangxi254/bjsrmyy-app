<template>
	<view class="content">
		<view class="title">{{roomdetail.depName}}</view>
		<view class="detail">{{roomdetail.depDes}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomdetail:{},
			}
		},
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item);
				this.roomdetail = item;
			}
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
	.content{
		background: $uni-bg-color-hover;
		height: 100vh;
	}
	
	.title{
		height: 40px;
		line-height: 40px;
		color: $uni-text-color;
		font-size: $uni-font-big-title;
		width: 100%;
		text-align: center;
	}
	
	.detail{
		color: $uni-text-color-grey;
		font-size: $uni-font-detail-title;
		margin-left: 15px;
		margin-right: 15px;
		height: auto;
		background: #FFFFFF;
	}
</style>