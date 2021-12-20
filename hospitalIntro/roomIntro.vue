<template>
	<view>
		<view class="search show-center">
			<view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
				<view class="search-input">搜索</view><image class="search-icon" src="../static/index/search.png">
			</view>
			<view v-else class="space-beteewn search-bg">
				<view class="show-center justify-content">
					<image class="search-icon marginl10r10" src="../static/index/search.png">
					<input class="search-input" type="text" placeholder="搜索" v-model="searchText"  @focus="vauleEmpty" confirm-type="search" />
				</view>
				<view @click="cancleEdit" class="cancle">取消</view>
			</view>
		</view>
		<hsSubfieldList :leftNavData="leftNavData" :rightNavData="rightNavData" :scrollHeiht="scrollHeiht" @leftClick="leftClick" @rightClick="rightClick" />
	</view>
</template>

<script>
	import hsSubfieldList from "../components/hs-subfield-list.vue";
	export default {
		data() {
			return {
				leftNavData:[
					{title:1},
					{title:2},
					{title:3},
					{title:4},
					{title:5},
					{title:6},
					{title:20},
					{title:7},
					{title:8},
					{title:9},
					{title:10},
					{title:40},
					{title:11},
					{title:12},
					{title:13},
					{title:14},
					{title:36},
					{title:15},
					{title:16},
					{title:50},
					{title:17},
					{title:18},
					{title:19},
					{title:20},
				],
				rightNavData:[],
				searchText:'',
				isNotSearching:true,
				scrollHeiht:'',
			}
		},
		onLoad() {
			/* 获取屏幕可视区域的高度 */
			let height=uni.getSystemInfoSync().windowHeight - 44
			this.scrollHeiht=`height:${height}px`
		},
		onShow() {
			this.leftClick(this.leftNavData[0]);
		},
		components:{
			hsSubfieldList
		},
		methods: {
			leftClick(item){
				console.log("expert:",JSON.stringify(item));
				if(item.title){
					let array = [];
					for(let i=0; i < item.title; i++){
						array.push(Math.ceil(Math.random()*20));
					}
					this.rightNavData = array;
				}
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
			rightClick(item){
				console.log("expert:",JSON.stringify(item));
				uni.navigateTo({
					url:`./roomDetail?item=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
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