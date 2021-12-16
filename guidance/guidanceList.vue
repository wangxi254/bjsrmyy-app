<template>
	<view class="row navBox">
		<!-- 左侧一级分类列表 -->
		<scroll-view scroll-y class="leftNavBox">
			<view class="leftNavItem py-20 text-center" v-for="(item,index) in leftNavData" :key="index" @tap="leftTap(item,index)" >
				<view :class="leftActiveIndex===index?'leftActive':'leftUnActive'" class="leftNavContent py-10">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		
			<!-- 右侧二级分类列表 -->
		<scroll-view scroll-y class="rightBox" scroll-with-animation>
			<view class="rightNavItem" @click="clickObjectItem(item)" v-for="(item,index) in rightNavData" :key="index">
				<span>{{item.title}}</span>
				<span>></span>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftNavData: [{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3}],
				rightNavData: [{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1}]
			}
		},
		methods: {
			leftTap() {},
			clickObjectItem() {}
		}
	}
</script>

<style lang="scss" scoped>
	.navBox {
		border-top: 1px solid $uni-bg-color-hover;
		height: 100%;
	}
	.leftNavBox{
		border-right: 1px solid $uni-bg-color-hover;
	}
	.leftNavItem {
		border-bottom: 1px solid $uni-bg-color-hover;
	}
	.rightNavItem{
		height: 45px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 15px;
		border-bottom: 1px solid #d8d8d8;
		padding: 0 10px;
		
		span:last-child {
			color: #c3bac1;
		}
	}
	
	.leftNavContent {
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
	}
	
	.leftActive {
		border-left: 3px solid $uni-color-primary;
		background: #FFFFFF;
	}
	
	.leftUnActive {
		background-color: #F1F1F1;
	}
	.rightNavContent{
		margin:10upx;
	}
	.rightNavContent image{
		width: 120upx;
		height: 120upx;
		display: block;
	}
	.row{
		display: flex;
		flex-direction: row;
	}
	
	.leftNavBox {
		width: 16%;
	}
	.rightBox {
		width: 84%;
		box-sizing: border-box;
	}
</style>
