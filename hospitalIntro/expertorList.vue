<template>
	<view>
		<scroll-view scroll-y>
			<view class="expert" v-for="item in expertorList">
				<image class="expert-icon" src="../static/tabbar/homed.png">
				<view class="content">
					<view class="flex-row">
						<view>{{item.name}}</view>
						<view>{{item.job}}</view>
					</view>
					<view class="expertor-pro">
						<text class="">擅长：</text>{{item.professional}}
					</view>
				</view>
				<image class="right-icon" src="../static/tabbar/homed.png">
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expertorList:[
					{name:"刘小芳1",job:"主任医师",professional:"恶性实体肿瘤、血液病诊治",icon:"../static/tabbar/homed.png"},
					{name:"刘小芳2",job:"主任医师",professional:"恶性实体肿瘤、血液病诊治,恶性实体肿瘤、血液病诊治,恶性实体肿瘤、血液病诊治,恶性实体肿瘤、血液病诊治",icon:"../static/tabbar/homed.png"},
				]
			}
		},
		onLoad() {

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
	
	.expert{
		padding: 8px 15px;
		border-bottom: 0.5px solid $uni-border-color;
		flex-direction: row;
		display: flex;
		justify-content: center;
		align-items: center;
		.expert-icon{
			width: 40px;
			height: 75px;
		}
		.content{
			width: 100%;
			height: 75px;
			padding: 0px 5px;
			.expertor-pro{
				margin-top: 8px;
				font-size: $uni-font-normal-title;
				color: $uni-text-color-grey;
				// overflow: hidden;
				// word-break: break-all;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				display: -webkit-box;/*弹性伸缩盒子模型显示*/
				-webkit-box-orient: vertical;   /*排列方式*/ 
				-webkit-line-clamp: 2;/*显示文本行数*/
				overflow: hidden;/*溢出隐藏*/
				text{
					color: $uni-text-color;
					font-weight: bold;
				}
			}
		}
		.right-icon{
			width: 15px;
			height: 15px;
		}
		
	}
</style>