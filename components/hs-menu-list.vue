<template>
	<view>
		<view class="Grid">
			<view class="Grid-Item" v-for="item in List" :key="item.id" @click="onClick(item)">
				<view class="GSimg"><image class="Image" :src="item.img"></image></view>
			    <view>
					<view class="GStitle">{{ item.title }}</view>
					<view v-if="item.detail" class="GSDetail">{{ item.detail }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniSteps',
		components: {
			/* uniIcons */
		},
		props: {
			List:{
				type:Array,
				default:[]
			},
		},
		data() {
			return {}
		},
		methods:{
			
			onClick(item){
				this.$emit('menuClick', item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		background: #FFFFFF;
		padding:20px 0;
		.Grid-Item {
			width: 50%;
			height: 70px;
			// text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			border:1rpx solid #ccc;
			box-sizing:border-box;
			.GSimg {
				width: 96rpx;
				height: 96rpx;
				.Image {
					width: 96rpx;
					height: 96rpx;
				}
			}
			.GStitle {
				width: 100%;
				height: 34rpx;
				line-height: 34rpx;
				color: #06121e;
				font-size: 28rpx;
				font-weight: 500;
			}
			.GSDetail {
				width: 100%;
				height: 34rpx;
				line-height: 34rpx;
				color: #06121e;
				font-size: 24rpx;
			}
		}
	}
</style>

