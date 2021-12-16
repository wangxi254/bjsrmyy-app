<template>
	<view class="content">
		<view class="list">
			<scroll-view scroll-y>
				<view v-for="i in 3" class="list_item">
					<span>干咳</span>
					<icon type="cancel" size="22"/>
				</view>
			</scroll-view>
		</view>
		<view class="btn">
			<span>继续添加</span>
			<span>诊断</span>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.content {
		height: 100%;
		.list {
			height: 100%;
			background: #f1f1f1;
			padding-bottom: 40px;
			display: flex;
			
			&_item {
				margin-top: 10px;
				padding: 6px 16px;
				background: white;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.btn {
			position: absolute;
			bottom: 0;
			background: white;
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 10px;
			
			span {
				height: 30px;
				text-align: center;
				line-height: 30px;
				background: #039fff;
				color: white;
				flex: 1;
				border-radius: 4px;
				
				&:last-child {
					margin-left: 10px;
				}
			}
		}
	}
</style>
