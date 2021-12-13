<template>
	<view>
		<hsMenuList :List="dataList" @menuClick="menuClick" />
	</view>
</template>

<script>
	import hsMenuList from "../../components/hs-menu-list.vue";
	export default{
		data(){
			return {
				dataList:[
						{id:1,img:'/static/tabbar/home.png',title:'医院介绍',detail:'appointment'},
						{id:2,img:'/static/tabbar/home.png',title:'出诊安排',detail:'appointment'},
						{id:3,img:'/static/tabbar/home.png',title:'就诊指南',detail:'appointment'},
						{id:4,img:'/static/tabbar/home.png',title:'科室介绍',detail:'appointment'},
						{id:5,img:'/static/tabbar/home.png',title:'专家介绍',detail:'appointment'},
						{id:6,img:'/static/tabbar/home.png',title:'楼层导航',detail:'appointment'},
						{id:7,img:'/static/tabbar/home.png',title:'健康百科',detail:''},
						{id:8,img:'/static/tabbar/home.png',title:'健康咨询',detail:'appointment'}
				   ]
			}
		},
		components:{
			hsMenuList
		},
		methods:{
			menuClick(item){
				console.log("item",JSON.stringify(item));
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
		background: #f7f7f7;
		padding:10rpx 0;
		.Grid-Item {
			width: 50%;
			height: 213rpx;
			text-align: center;
			border:1rpx solid #ccc;
			box-sizing:border-box;
			.GSimg {
				width: 96rpx;
				height: 96rpx;
				margin-top: 42rpx;
				margin-left: 50rpx;
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
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>


