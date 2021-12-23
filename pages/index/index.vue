<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 20:38:45
 * @LastEditors: seven
 * @LastEditTime: 2021-12-21 23:18:15
-->
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
						{id:3,img:'/static/tabbar/home.png',title:'就诊指南',detail:'appointment',navigation:'../../hospitalIntro/neadnkow'},
						{id:4,img:'/static/tabbar/home.png',title:'科室介绍',detail:'appointment',navigation:'../../hospitalIntro/roomIntro'},
						{id:5,img:'/static/tabbar/home.png',title:'专家介绍',detail:'appointment',navigation:'../../hospitalIntro/expertIntro'},
						{id:6,img:'/static/tabbar/home.png',title:'楼层导航',detail:'appointment',navigation:'../../hospitalIntro/FloorList'},
						{id:7,img:'/static/tabbar/home.png',title:'电子导诊单',detail:'appointment',navigation:'../../hospitalIntro/guideDiag'},
						{id:9,img:'/static/tabbar/home.png',title:'预约挂号',detail:'Appointment',navigation:'/pages/yx/Booking_instructions/index'},
						{id:10,img:'/static/tabbar/home.png',title:'当日挂号',detail:'Day Registration',navigation:'/pages/yx/Department/index?type=1'},
						{id:11,img:'/static/tabbar/home.png',title:'智能导诊',detail:'Intelligent Guidance',navigation:'../../guidance/index'},
						{id:12,img:'/static/tabbar/home.png',title:'出诊信息',detail:'scheduling',navigation:'../../scheduling/index'},
						{id:13,img:'/static/tabbar/home.png',title:'检查报告',detail:'appointment',navigation:'../../mine/report/checkreport'},
						{id:14,img:'/static/tabbar/home.png',title:'检验报告',detail:'appointment',navigation:'../../mine/report/testreport'},
						{id:15,img:'/static/tabbar/home.png',title:'缴费记录',detail:'records',navigation:'/pages/records/PayRecord'},
						{id:16,img:'/static/tabbar/home.png',title:'门诊清单',detail:'records',navigation:'/pages/records/listRecord'},
						{id:17,img:'/static/tabbar/home.png',title:'预约记录',detail:'Appointment',navigation:'/pages/yx/appointRecord/index'},
				   ],
				banners:[],
				props:{
					image:"carouselImageUrl",
				}
			}
		},
		components:{
			hsMenuList,
			hsBannerView
		},
		onLoad() {
			this.requestHospitalInto();
		},
		methods:{
			menuClick(item){
				console.log("menuClick:item===>",JSON.stringify(item));
				uni.navigateTo({
					url:item.navigation,
				})
			},
			bannerClick(item){
				uni.navigateTo({
					url:"../auth/auth"
				})
			},
			hospitalnews(id){
				let that = this;
				this.$request({
					path:"/hospitalInfo/mobile/selectUsableHospitalInfoByHospital",
					query:{
						hospitalId:id
					},
				}).then(res=>{
					if(res.data.code == 200){
						let list = res.data.data;
						let array = [];
						for(let i = 0; i < list.length; i++){
							const banner =  list[i];
							if(banner.isShow){
								array.push(banner);
							}
						}
						that.banners = array;
					}
				})
			},
			async requestHospitalInto(){
				const [error,result] = await this.$arequest({
					path:"/hospital/mobile/getHospital",
				});
				console.log("getHospital==>",JSON.stringify(result));
				console.log("getHospital==>",JSON.stringify(result.data.code));
				if(result.data.code == 200){
					this.hospitalInto = result.data.data;
					this.hospitalnews(result.data.data.id);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>


