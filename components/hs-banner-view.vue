<template>
	<view v-if="banners && banners.length > 0">
		<swiper :indicator-dots="banner.indicatorDots" :autoplay="banner.autoplay"
			:interval="banner.interval" :duration="banner.duration">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<image :src="item[props.image]" mode="aspectFill" @click="bannerClick(item)">
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
			  this.pickerProps = Object.assign({}, defaultProps, newProps)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-row{
		display: flex;
		flex-direction: row;
	}
</style>