<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-25 12:50:58
 * @LastEditors: seven
 * @LastEditTime: 2021-12-26 23:28:00
-->
<template>
	<view v-if="banners && banners.length > 0" class="banner-view">
		<swiper  :indicator-dots="banner.indicatorDots" :autoplay="banner.autoplay"
			:interval="banner.interval" :duration="banner.duration">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<!-- <image class="banner-view" :src="item[props.image]" mode="aspectFill" @click="bannerClick(item)">
				</image> -->
				<image class="banner-view" src="https://second-vedio.oss-cn-shenzhen.aliyuncs.com/image/banner%201.png" mode="" @click="bannerClick(item)">
				</image>
				
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const defaultProps = {
		image: 'image',
	}
	export default {
		props:{
			banners:{
				type:Array, // 轮播图列表
				default:[],
			},
			props:{
				type:Object,
			},
			banner:{
				type:Object,
				default:{
					indicatorDots: true,
					autoplay: true,
					interval: 2000,
					duration: 500,
				},  /* 可视区域的高度 */	
			},
		},
		methods: {
			bannerClick(item){
				console.log("bannerClick:item==>",JSON.stringify(item));
				this.$emit('bannerClick', item);
			}
		},
		watch:{
			props (newProps) {
			  this.props = Object.assign({}, defaultProps, newProps)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-row{
		display: flex;
		flex-direction: row;
	}
	
	.banner-view{
		width: 100%;
		height: 150px;
		margin-top: 30px;
	}
	
	// .banner-img{
	// 	margin-left: 15px;
	// 	margin-right: 15px;
	// 	width: 345px;
	// }
	
</style>