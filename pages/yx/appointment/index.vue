<template>
	<view class="detailPage">
		<scroll-view scroll-x style="height:80px">
			<view style="width: 100%;background: #fff;height:80px" >
			</view>
		</scroll-view>
		<view class="sel-condition">
			<text>2021-12-19</text>
			<view class="v-switch">
				<text>只看有号</text>
				<switch :checked="hasNum" @change="changeHasNum" color="#007aff" style="transform:scale(0.5)" />
			</view>
		</view>
		<view class="person-list">
			<view class="t-part" v-for="(item,index) in list" :key="index">
				<view class="title flex items-center">
					<view class="icon"></view>
					<text class="text">{{index == 0?"上午":"下午"}}号源</text>
				</view>
				<view class="person-item flex" v-for="x in item" :key="x">
					<image class="avater" mode="aspectFit" :src="x.img?x.img:personImg"></image>
					<view class="person-item-info flex-1">
						<view class="flex justify-between items-center">
							<text class="name">{{x.name}}</text>
							<view class="flex items-center">
								<text class="price">挂号费：{{x.price}}</text>
								<view class="surplus" @click="open">可预约({{x.surplus}})</view>
							</view>
						</view>
						<view class="tex">
							职称：{{x.postion}}
						</view>
						<view class="tex">
							擅长：{{x.describe}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="right" background-color="#fff">
			<view class="selTimeBox flex flex-column">
				<view class="current-dateV">
					<text>2021年12月24日</text>
					<text>上午</text>
				</view>
				<view class="nodes">选择想要预约的时间段</view>
				<view class="selList flex flex1 flex-wrap ">
					<view class="sel-item justify-center" v-for="(item,index) in selList" :key="index">
						{{item}}
					</view>
					<!-- <view style="height: 100vh;background:red;width: 100%"></view> -->
				</view>
			</view>
		</uni-popup>
		<NoData />
	</view>
</template>

<script>
	import NoData from '@/components/nodata/index.vue' 
	import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
	export default {
		components: { NoData,uniPopup },
		data() {
			return {
				personImg: require('../../../common/styles/imgs/person.jpg'),
				hasNum: false,
				list: [[{name: "张三",img: "", price: 10.5,surplus: 30,postion: "主任医师",describe: "擅长冠心病的接入治疗，高血压及心力衰竭的诊治"}
				,{name: "张三",img: "", price: 10.5,surplus: 30,postion: "主任医师",describe: "擅长冠心病的接入治疗，高血压及心力衰竭的诊治"}],[
					{name: "张三",img: "", price: 10.5,surplus: 30,postion: "主任医师",describe: "擅长冠心病的接入治疗，高血压及心力衰竭的诊治"},
					{name: "张三",img: "", price: 10.5,surplus: 30,postion: "主任医师",describe: "擅长冠心病的接入治疗，高血压及心力衰竭的诊治"}
				]],
				selList: ['14:00-15:00','14:00-15:00','14:00-15:00','14:00-15:00','14:00-15:00']
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); 
			uni.setNavigationBarTitle({
			　　title:option.title
			})
		},
		methods: {
			changeHasNum(){

			},
			open(){
				console.log(this.$refs)
				this.$refs.popup.open('right')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sel-condition{
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.v-switch{
			display: flex;
			align-items: center;
		}
	}
	.person-list{
		.t-part{
			.title{
				background: #fff;
				border-bottom: 1px solid #eee;
				padding: 20rpx;
				.icon{
					width: 10rpx;
					height: 32rpx;
					background: $uni-color-primary;
					border-radius: 8rpx;
					margin-right: 10rpx;
				}
				.text{ 
					font-size: $uni-font-size-lg;
					font-weight: bold;
					line-height: 2;
				}
			}
			.person-item{
				background: #fff;
				margin-bottom: 20rpx;
				box-shadow: 0 10rpx 20rpx 0 rgba(0,0,0,.1);
				padding: 20rpx;
				.avater{
					height: 200rpx;
					width: 160rpx;
					border-radius: 10rpx;
					background: #eee;
					margin-right: 20rpx;
				}
				.person-item-info{
					.name{
						font-size: $uni-font-size-lg;
					}
					.price{
						color: red;
					}
					.surplus{
						background: $uni-color-primary;
						color: #fff;
						width: 160rpx;
						height: 50rpx;
						line-height: 50rpx;
						border-radius: 10rpx;
						text-align: center;
						margin-left: 10rpx;
					}
					.tex{
						color: $uni-text-color-grey;
						margin: 10rpx 0;
					}
				}
			}
		}
	}
	.selTimeBox{
		width: 70vw;
		.current-dateV{
			background: $uni-bg-color-grey;
			font-size: $uni-font-size-lg;
			text-align: center;
			line-height: 2;
			text:nth-child(1){
				margin-right: 10rpx;
			}
		}
		.nodes{
			font-weight: bold;
			font-size: 40rpx;
			text-align: center;
			line-height: 2;
		}
		.selList{
			overflow: auto;
			padding: 10rpx;
			.sel-item{
				border: 1rpx solid red;
				padding: 10rpx;
				color: red;
				margin: 10rpx;
			}
		}
	}
</style>