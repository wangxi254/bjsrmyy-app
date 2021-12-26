<template>
	<view>
		<view class="navibarbg">
			<view class="navibartitle">
				{{hospitalInto.name}}
			</view>
		</view>
		<hsBannerView :banners="banners" :props="props" @bannerClick="bannerClick" />
		<view class="flex-row paadinglr15">
			<view class="notifacationtitle">
				最新通知｜
			</view>
			<view class="notifacationdetail">
				XXXXXXXXXXX通知标题
			</view>
		</view>
		<view class="flex-row">
			<view class="item-icon" @click="gridClick(item1)">
				<image class="img" :src="item1.img"></image>
				<view class="title">{{item1.title}}</view>
				<view class="detail">{{item1.detail}}</view>
			</view>
			<view class="item-icon" @click="gridClick(item2)">
				<image class="img" :src="item2.img"></image>
				<view class="title">{{item2.title}}</view>
				<view class="detail">{{item2.detail}}</view>
			</view>
			<view class="item-icon marginr15" @click="gridClick(item3)">
				<image class="img" :src="item3.img"></image>
				<view class="title">{{item3.title}}</view>
				<view class="detail">{{item3.detail}}</view>
			</view>
		</view>
		<!-- <indexMenuItem :item="item1"></indexMenuItem> -->
		<!-- <view class="menus clearfix paadinglr15">
			<view class="menus-view" v-for="item in menus">
				<view class="menu-item">
					<image class="img" :src="item.img"></image>
					<view class="title">{{item.title}}</view>
				</view>
			</view>
		</view> -->
		<view class="menus">
			<zy-grid @gridClick="gridClick" :grid-list=menus :show-tip="false" :col="4"></zy-grid>
		</view>
		
		<view class="hs-bar">
			<view class="title">
				医院导航
			</view>
			<view class="navi-menus-view">
				<zy-grid @gridClick="gridClick" :grid-list=naviMesus :show-tip="false" :col="5"></zy-grid>
				<!-- <indexMenuItem :grid-list=naviMesus :show-tip="false" :col="5"></indexMenuItem> -->
			</view>
		</view>
			
		<image class="hs-banner" mode="" src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"></image>
		
		<view v-for="item in news">
			<view class="cell paading15">
				<view class="cont">
					<view class="title">
						{{item.contentTitle}}
					</view>
					<view class="date">
						{{item.createTime && item.createTime.length > 10 ? item.createTime.substr(0,11) : item.createTime }}
					</view>
				</view>
				<image class="img" :src="item.carouselImageUrl" mode=""></image>
			</view>
		</view>
		<!-- <hsMenuList :List="dataList" @menuClick="menuClick" /> -->
		
		
	</view>
	
	
</template>

<script>
	import hsMenuList from "../../components/hs-menu-list.vue";
	import hsBannerView from "../../components/hs-banner-view.vue";
	import indexMenuItem from "../../components/index-menu-item.vue";
	import zyGrid from '../../components/zy-grid/zy-grid.vue'
	export default{
		data(){
			return {
				dataList:[
						// {id:1,img:'/static/tabbar/home.png',title:'医院介绍',detail:'appointment',navigation:'../../hospitalIntro/index'},
						// {id:3,img:'/static/tabbar/home.png',title:'就诊指南',detail:'appointment',navigation:'../../hospitalIntro/neadnkow'},
						// {id:4,img:'/static/tabbar/home.png',title:'科室介绍',detail:'appointment',navigation:'../../hospitalIntro/roomIntro'},
						// {id:5,img:'/static/tabbar/home.png',title:'专家介绍',detail:'appointment',navigation:'../../hospitalIntro/expertIntro'},
						// {id:6,img:'/static/tabbar/home.png',title:'楼层导航',detail:'appointment',navigation:'../../hospitalIntro/FloorList'},
						// {id:7,img:'/static/tabbar/home.png',title:'电子导诊单',detail:'appointment',navigation:'../../hospitalIntro/guideDiag'},
						// {id:9,img:'/static/tabbar/home.png',title:'预约挂号',detail:'Appointment',navigation:'../../yx/Booking_instructions/index?type=2'},
						// {id:9,img:'/static/tabbar/home.png',title:'预约挂号',detail:'Appointment',navigation:'../../yx/appointment/payment'},
						// {id:10,img:'/static/tabbar/home.png',title:'当日挂号',detail:'Day Registration',navigation:'../../yx/Booking_instructions/index?type=1'},
						// {id:11,img:'/static/tabbar/home.png',title:'智能导诊',detail:'Intelligent Guidance',navigation:'../../guidance/index'},
						// {id:12,img:'/static/tabbar/home.png',title:'出诊信息',detail:'scheduling',navigation:'../../scheduling/index'},
						// {id:13,img:'/static/tabbar/home.png',title:'检查报告',detail:'appointment',navigation:'../../mine/report/checkreport'},
						// {id:14,img:'/static/tabbar/home.png',title:'检验报告',detail:'appointment',navigation:'../../mine/report/testreport'},
						// {id:15,img:'/static/tabbar/home.png',title:'缴费记录',detail:'records',navigation:'../../records/PayRecord'},
						{id:16,img:'/static/tabbar/home.png',title:'门诊清单',detail:'records',navigation:'../../records/listRecord'},
						// {id:17,img:'/static/tabbar/home.png',title:'预约记录',detail:'Appointment',navigation:'../../yx/appointRecord/index'},
						// {id:18,img:'/static/tabbar/home.png',title:'挂号记录',detail:'Appointment',navigation:'../../yx/registerRecord/index'},
						// {id:19,img:'/static/tabbar/home.png',title:'住院预交金',detail:'Appointment',navigation:'../../records/roomPay'},
						{id:20,img:'/static/tabbar/home.png',title:'诊间支付',detail:'Appointment',navigation:'../../records/listPay'},
						{id:21,img:'/static/tabbar/home.png',title:'核算检测',detail:'Appointment',navigation:'../../yx/hsTest/index'}
				   ],
				banners:[
					{
						carouselImageUrl:''
					}
				],
				props:{
					image:"carouselImageUrl",
				},
				hospitalInto:{},
				item1:{
					img:'../../static/index/appointment.png',
					title:'预约挂号',
					detail:'提前挂号免排队',
					no:'1',
					navigation:'../../yx/Booking_instructions/index?type=2',
					hashospitalInto:false,
					noti:1,
				},
				item2:{
					img:'../../static/index/todaypoint.png',
					title:'当日挂号',
					detail:'在线挂号',
					no:'2',
					navigation:'../../yx/Booking_instructions/index?type=1',
					hashospitalInto:false,
				},
				item3:{
					img:'../../static/index/pay.png',
					title:'门诊缴费',
					detail:'在线快捷缴费',
					no:'3',
					navigation:'../../records/PayRecord',
					hashospitalInto:false,
					noti:2,
				},
				menus:[
					{
						img:'../../static/index/menu-item1.png',
						title:'智能导诊',
						no:1,
						navigation:'../../guidance/index',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item2.png',
						title:'诊间支付',
						no:2,
						navigation:'../../records/listPay',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item3.png',
						title:'住院缴费',
						no:3,
						navigation:'../../records/roomPay',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item4.png',
						title:'检验报告',
						no:4,
						navigation:'../../mine/report/testreport',
						hashospitalInto:false,
						needLogin:true,
					},
					{
						img:'../../static/index/menu-item5.png',
						title:'检查报告',
						no:5,
						navigation:'../../mine/report/checkreport',
						hashospitalInto:false,
						needLogin:true,
					},
					{
						img:'../../static/index/menu-item6.png',
						title:'缴费记录',
						no:6,
						navigation:'../../records/PayRecord',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item7.png',
						title:'挂号记录',
						no:7,
						navigation:'../../yx/registerRecord/index',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item7.png',
						title:'预约记录',
						no:7,
						navigation:'../../yx/appointRecord/index',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item7.png',
						title:'核酸检测',
						no:8,
						navigation:'../../yx/hsTest/index',
						hashospitalInto:false,
					}
					
				],
				naviMesus:[
					{
						img:'../../static/index/menu-item-navi1.png',
						title:'医院介绍',
						no:1,
						navigation:'../../hospitalIntro/index',
						hashospitalInto:true,
					},
					{
						img:'../../static/index/menu-item-navi2.png',
						title:'出诊信息',
						no:2,
						navigation:'../../scheduling/index',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item-navi3.png',
						title:'科室介绍',
						no:3,
						navigation:'../../hospitalIntro/roomIntro',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item-navi4.png',
						title:'专家信息',
						no:4,
						navigation:'../../hospitalIntro/expertIntro',
						hashospitalInto:false,
					},
					{
						img:'../../static/index/menu-item-navi5.png',
						title:'楼层导航',
						no:5,
						navigation:'../../hospitalIntro/FloorList',
						hashospitalInto:true,
					}
				],
				news:[
					// {
					// 	img:'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
					// 	title:'心电图、心脏彩超、心脏冠心脉照影三者的区别',
					// 	date:'2021-09-10',
					// },
					// {
					// 	img:'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
					// 	title:'心电图、心脏彩超、心脏冠心脉照影三者的区别',
					// 	date:'2021-09-10',
					// },
					// {
					// 	img:'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
					// 	title:'心电图、心脏彩超、心脏冠心脉照影三者的区别',
					// 	date:'2021-09-10',
					// }
				]
				
			}
		},
		components:{
			hsMenuList,
			hsBannerView,
			indexMenuItem,
			zyGrid
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
						let news = [];
						for(let i = 0; i < list.length; i++){
							const banner =  list[i];
							if(banner.isShow){
								array.push(banner);
							}
							if(i <= 3){
								news.push(banner);
							}
						}
						that.banners = array;
						that.news = news;
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
			},
			gridClick(item){
				let navigation = item.navigation + (item.hashospitalInto ? `?item=${JSON.stringify(this.hospitalInto)}` : '');
				console.log("navigation===>",navigation);
				if(item.noti==1){
					console.log("noti===>");
					var thin = this;
					// uni.requestSubscribeMessage({
					// 	tmplIds: ['MoiTqzChVSM7_DEWK8VHEe0SMngBLN-F9prORB8Eco0','WflkJ_8XxvotL-XW6rlstevkOQlmc6zimdrVlsGRMA4','7cILJ8g_K-nfBaWuIDozYW2w9bNUHCcaKlcaPMHh-UI','M8go0PLVzfKT2RXixiZ_YUngqaMjg2sl54x_OFxVcFQ'], //退款成功、退款失败
					// 	success(res) {
					// 		console.log(res)
					// 		thin.gotoNavi(navigation);
					// 	},
					// 	fail(err) {
					// 		console.error(err);
					// 		thin.gotoNavi(navigation);
					// 	},
					// })
					
					uni.requestSubscribeMessage({
						tmplIds: ['MoiTqzChVSM7_DEWK8VHEe0SMngBLN-F9prORB8Eco0','7cILJ8g_K-nfBaWuIDozYW2w9bNUHCcaKlcaPMHh-UI','M8go0PLVzfKT2RXixiZ_YUngqaMjg2sl54x_OFxVcFQ'], //退款成功、退款失败
						success(res) {
							console.log(res)
							thin.gotoNavi(navigation);
						},
						fail(err) {
							console.error(err);
							thin.gotoNavi(navigation);
						},
					})
				}else if(item.noti==2){
					var thin = this;
					// uni.requestSubscribeMessage({
					// 	tmplIds: ['MoiTqzChVSM7_DEWK8VHEe0SMngBLN-F9prORB8Eco0','WflkJ_8XxvotL-XW6rlstevkOQlmc6zimdrVlsGRMA4','7cILJ8g_K-nfBaWuIDozYW2w9bNUHCcaKlcaPMHh-UI','M8go0PLVzfKT2RXixiZ_YUngqaMjg2sl54x_OFxVcFQ'], //退款成功、退款失败
					// 	success(res) {
					// 		console.log(res)
					// 		thin.gotoNavi(navigation);
					// 	},
					// 	fail(err) {
					// 		console.error(err);
					// 		thin.gotoNavi(navigation);
					// 	},
					// })
					
					uni.requestSubscribeMessage({
						tmplIds: ['WflkJ_8XxvotL-XW6rlstevkOQlmc6zimdrVlsGRMA4','7cILJ8g_K-nfBaWuIDozYW2w9bNUHCcaKlcaPMHh-UI'], //退款成功、退款失败
						success(res) {
							console.log(res)
							thin.gotoNavi(navigation);
						},
						fail(err) {
							console.error(err);
							thin.gotoNavi(navigation);
						},
					})
				}
				else{
					this.gotoNavi(navigation);
				}
			},
			gotoNavi(navigation){
				uni.navigateTo({
					url:navigation,
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	page{
		background: #F5F5F5;
		width: 100%;
		height: 100%;
	}
	
	.navibarbg{
		width: 100%;
		height: 95px;
		background: #53B7C7;
	}
	
	.navibartitle{
		font-size: 17px;
		font-family: PingFang-SC-Semibold, PingFang-SC;
		font-weight: 600;
		color: #FFFFFF;
		padding-top: 54px;
		height: 24px;
		padding-left: 15px;
	}
	
	
	.notifacationtitle{
		width: 70px;
		height: 40px;
		font-size: 14px;
		font-family: PingFang-SC-Medium, PingFang-SC;
		font-weight: 500;
		color: #333333;
		line-height: 40px;
	}
	
	.notifacationdetail{
		height: 40px;
		font-size: 14px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #8F8F8F;
		line-height: 40px;
		margin-left: 10px;
		overflow: hidden;
		// word-break: break-all;
		text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 1;  // 表示超出2行显示省略号，以此类推
		white-space: nowrap;
		flex: 1;
	}
	
	  
	.item-icon{
		background: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(0, 67, 77, 0.1);
		border-radius: 10px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px 0px;
		margin-left: 15px;
		.img{
			width: 40px;
			height: 40px;
		}
		
		.title{
			height: 20px;
			font-size: 14px;
			font-family: PingFang-SC-Medium, PingFang-SC;
			font-weight: 500;
			color: #333333;
			line-height: 20px;
			text-align: center;
			margin-top: 4px;
			margin-bottom: 3px;
			width: 100%;
		}
		
		.detail{
			height: 16px;
			font-size: 11px;
			font-family: PingFang-SC-Regular, PingFang-SC;
			font-weight: 400;
			color: #8F8F8F;
			line-height: 16px;
			width: 100%;
			text-align: center;
		}
	}
	
	.menus{
		padding: 10px 0px;
	}
	
	
	.hs-bar{
		width: 100%;
		height: 82px;
		background: linear-gradient(357deg, #87E7E0 0%, #53B7C7 100%);
		opacity: 0.9;
		
		.title{
			padding-top: 15px;
			padding-left: 15px;
			font-size: 16px;
			font-family: PingFang-SC-Semibold, PingFang-SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 22px;
			height: 22px;
		}
		
		.navi-menus-view{
			margin-top: 15px;
			margin: 10px;
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0px 2px 10px 0px rgba(0, 67, 77, 0.1);
		}
	}
	
	.hs-banner{
		width: 100%;
		height: 120px;
		margin-top: 65px;
	}
	
	
	.cell{
		margin: 0px 10px;
		border-bottom: 1px solid #F5F5F5;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		.cont{
			.title{
				width: 217px;
				height: 40px;
				font-size: 14px;
				font-family: PingFang-SC-Regular, PingFang-SC;
				font-weight: 400;
				color: #333333;
				line-height: 20px;
			}
			
			.date{
				margin-top: 10px;
				width: 217px;
				font-size: 14px;
				font-family: PingFang-SC-Regular, PingFang-SC;
				font-weight: 400;
				color: #333333;
			}
		}
		
		.img{
			width: 50px;
			height: 50px;
			float: right;
		}
	}

</style>


