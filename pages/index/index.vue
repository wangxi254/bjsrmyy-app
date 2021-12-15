<template>
	<view>
		<hsBannerView :banners="banners" :props="props" @bannerClick="bannerClick" />
		<hsMenuList :List="dataList" @menuClick="menuClick" />
	</view>
</template>

<script>
	import hsMenuList from "../../components/hs-menu-list.vue";
	import hsBannerView from "../../components/hs-banner-view.vue";
	export default{
		data(){
			return {
				dataList:[
						{id:1,img:'/static/tabbar/home.png',title:'医院介绍',detail:'appointment',navigation:'../../hospitalIntro/index'},
						{id:2,img:'/static/tabbar/home.png',title:'出诊安排',detail:'appointment'},
						{id:3,img:'/static/tabbar/home.png',title:'就诊指南',detail:'appointment'},
						{id:4,img:'/static/tabbar/home.png',title:'科室介绍',detail:'appointment',navigation:'../../hospitalIntro/roomIntro'},
						{id:5,img:'/static/tabbar/home.png',title:'专家介绍',detail:'appointment',navigation:'../../hospitalIntro/expertIntro'},
						{id:6,img:'/static/tabbar/home.png',title:'楼层导航',detail:'appointment',navigation:'../../hospitalIntro/naviToFloor'},
						{id:7,img:'/static/tabbar/home.png',title:'健康百科',detail:''},
						{id:8,img:'/static/tabbar/home.png',title:'健康咨询',detail:'appointment'},
						{id:9,img:'/static/tabbar/home.png',title:'预约挂号',detail:'Appointment',navigation:'/pages/yx/Booking_instructions/index'},
						{id:10,img:'/static/tabbar/home.png',title:'当日挂号',detail:'Day Registration',navigation:'/pages/yx/Registration/index'}
				   ],
				banners:[
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"},
				],
				props:{
					image:"img",
				}
			}
		},
		components:{
			hsMenuList,
			hsBannerView
		},
		onLoad() {
			
		},
		methods:{
			menuClick(item){
				console.log("menuClick:item===>",JSON.stringify(item));
				uni.navigateTo({
					url:item.navigation,
				})
			},
			bannerClick(item){
				console.log("bannerClick:item==>",JSON.stringify(item));
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>


