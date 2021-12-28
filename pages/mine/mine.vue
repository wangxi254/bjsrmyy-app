<template>
	<view>
		<view v-for="item in list" class="cell" @click="navitoPage(item)">
			<view class="flex-row info">
				<view class="name">
					{{item.name}}
				</view>
				<image class="right-img" src="../../static/common/right.png"></image>
			</view>
		</view>
		<tabbar current="2" @tabClick="tabClick" />
	</view>
</template>

<script>
	import tabbar from "../../components/tabbar.vue";
	export default {
		data() {
			return {
				list:[
					{
						name:"就诊人管理",
						navi:"../../mine/diagnose/diagnoseLsit",
					},
					{
						name:"我的关注",
						navi:"../../attention/index",
					},
					{
						name:"查询病例信息",
						navi:"../../mine/diagnose/searchdiagnose",
					},
					{
						name:"智能快捷绑卡",
						navi:"../../mine/diagnose/bindCard",
					}
				]
			}
		},
		onLoad() {
			if(uni.getStorageSync("userId") === null || uni.getStorageSync("userId").length === 0){
				uni.navigateTo({
					url:"../auth/auth"
				})
			}
		},
		components:{
			tabbar
		},
		methods: {
			navitoPage(item){
				if(uni.getStorageSync("userId") === null || uni.getStorageSync("userId").length === 0){
					return uni.navigateTo({
						url:"../auth/auth"
					})
				}
				uni.navigateTo({
					url:item.navi
				})
			},
			tabClick(e){
				if(e.index == 0){
					uni.switchTab({
						url:"../index/index"
					})
				}else if(e.index==1){
					uni.switchTab({
						url:"../eleguide/eleguide"
					})
				}else if(e.index == 2){
					uni.switchTab({
						url:"../mine/mine"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell{
		.info{
			align-items: center;
			margin-left: 15px;
			margin-right: 15px;
			justify-content: space-between;
			.name{
				line-height: 40px;
				height: 40px;
			}
			.right-img{
				width: 15px;
				height: 15px;
			}
		}
	}
	
	
</style>