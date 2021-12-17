<template>
	<view class="search show-center">
		<view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
			<view class="search-input">搜索</view>
			<image class="search-icon" :src="searchIcon">
		</view>
		<view v-else class="space-beteewn search-bg">
			<view class="show-center justify-content">
				<image class="search-icon marginl10r10" :src="searchIcon">
				<input class="search-input" type="text" placeholder="搜索" v-model="searchText" @input="input"  @focus="vauleEmpty" confirm-type="search" />
			</view>
			<view @click="cancleEdit" class="cancle">取消</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			searchIcon:{
				type:String,
				default:"../static/index/search.png"
			}
		},
		data(){
			return {
				searchText:'',
				isNotSearching:true,
			}
		},
		mounted() {
			
		},
		methods:{
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
				this.$emit('input', item);
			}
		}
	}
</script>

<style>
	.search{
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: #F1F1F1;
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
		color: #333;
		font-size: 13px;
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
		font-size: 13px;
		color: #007aff;
		background: #f1f1f1;
		text-align: right;
	}
	
	.search-input{
		font-size: 13px;
		color: #333;
		margin-right: 8px;
	}
</style>
