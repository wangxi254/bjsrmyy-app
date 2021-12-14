<template>
	<view class="content">
		<view class="title">康复医学科</view>
		<view class="detail">吾问无为谓我问问我若若日珥我的烦恼我问问呜呜呜呜嗡
		嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的烦恼我问问
		呜呜呜呜嗡嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的烦恼
		我问问呜呜呜呜嗡嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的
		烦恼我问问呜呜呜呜嗡
		嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的烦恼我问问
		呜呜呜呜嗡嗡窝囊废件基金进阶军吾问无为谓我问问我若若日珥我的烦恼
		我问问呜呜呜呜嗡嗡窝囊废件基金进阶军</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item);
				
			}
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.flex-row{
		display: flex;
		flex-direction: row;
	}
	
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