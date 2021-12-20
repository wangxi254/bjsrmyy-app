<template>
	<view>
		<view class="search show-center">
			<view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
				<view class="search-input">搜索</view>
				<image class="search-icon" src="../static/index/search.png">
			</view>
			<view v-else class="space-beteewn search-bg">
				<view class="show-center justify-content">
					<image class="search-icon marginl10r10" src="../static/index/search.png">
					<input class="search-input" type="text" placeholder="搜索" v-model="searchText" @input="input"  @focus="vauleEmpty" confirm-type="search" />
				</view>
				<view @click="cancleEdit" class="cancle">取消</view>
			</view>
		</view>
		<scroll-view scroll-y>
			<view class="expert" v-for="item in expertorList" @click="onClick(item)">
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
				],
				searchText:'',
				isNotSearching:true,
			}
		},
		onLoad() {

		},
		methods: {
			onClick(item){
				uni.navigateTo({
					url:`expertorDetail?item=${JSON.stringify(item)}`
				})
			},
			searchClick(){
				this.isNotSearching = false;
			},
			valueEmpty(e){
				return this.searchText = '';
			},
			cancleEdit(){
				this.isNotSearching = true;
			},
			input(item){
				console.log("input:",JSON.stringify(item));
			}
		}
	}
</script>

<style lang="scss" scoped>
	
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
	
	
	
	.search{
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: $uni-bg-color-hover;
	}
	
	.show-center{
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
	}
	
	.justify-content{
		justify-content: start;
	}
	
	.search-icon{
		width: 20px;
		height: 20px;
	}
	
	.search-text{
		color: $uni-text-color;
		font-size: $uni-font-detail-title;
	}
	
	.search-bg{
		background: #FFFFFF;
		height: 28px;
		width: 100%;
		margin: 8px;
	}
	
	.marginl10r10{
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.space-beteewn{
		justify-content: space-between;
		display: flex;
	}
	
	.cancle{
		height: 28px;
		line-height: 28px;
		padding-left: 8px;
		font-size: $uni-font-detail-title;
		color: $uni-color-primary;
		background: $uni-bg-color-hover;
		text-align: right;
	}
	
	.search-input{
		font-size: $uni-font-detail-title;
		color: $uni-text-color;
		margin-right: 8px;
	}
</style>