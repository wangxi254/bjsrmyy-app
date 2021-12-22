<template>
	<view class="content">
		<view class="doctor-header flex-row">
			<image class="img" :src="exportInfo.icon"></image>
			<view>
				<view class="name">
					{{exportInfo.name}}
				</view>
				<view class="profical">
					{{exportInfo.profical}}
				</view>
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">
				简介
			</view>
			<view class="item-detail">
				{{exportInfo.intro}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">
				擅长
			</view>
			<view class="item-detail">
				{{exportInfo.goodat}}
			</view>
		</view>
		
		
		<view class="item">
			<view class="item-title">
				门诊地点
			</view>
			<view class="item-detail">
				{{exportInfo.address}}
			</view>
		</view>
		
		
		<view class="item">
			<view class="item-title">
				门诊时间
			</view>
			<view class="item-detail">
				{{exportInfo.time}}
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">
				挂号费
			</view>
			<view class="item-detail">
				{{exportInfo.fee}}
			</view>
		</view>
		
		<view style="height: 30px;background: #F1F1F1;">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exportInfo:{
					icon:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",
					name:"zty",
					profical:"主任医生",
					intro:"贵州医科大学博士导师。贵州省专家，擅长打通任督二脉，开天眼，擒拿手，龙爪手，大乘功法，呼风唤雨，要啥都可以，天下武功，自创武林绝学，数据对接圣诞节时间段数据对接圣诞节数据对接圣诞节就SDK看SDKSDK思考的考试的嗯哦哦问哦沃尔沃二欧文",
					goodat:"擅长：打家劫舍，来来来，啦啦啦啦，订货会合法化发挥发挥，牛牛牛牛牛，啛啛喳喳，啊啊啊啊啊啊啊啊，点点滴滴的点点滴滴，坎坎坷坷扩，将军金甲夜不脱",
					address:"外科室",
					time:"每周一上午，每周三下午",
					fee:"12.5",
				},
			}
		},
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item);
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
	.content{
		background: #F1F1F1;
	}
	
	.doctor-header{
		background: #FFFFFF;
		padding: 15px;
		align-items: center;
		.img{
			width: 50px;
			height: 70px;
			margin-right: 10px;
		}
		
		.name{
			margin-bottom: 10px;
			font-size: $uni-font-normal-title;
			color: $uni-text-color;
		}
		
		.profical{
			font-size: $uni-font-detail-title;
			color: $uni-text-color-grey;
		}
	}
	
	.item{
		margin: 20px 10px ;
		padding: 15px;
		padding-right: 0px;
		background: #FFFFFF;
		.item-title{
			font-size: $uni-font-normal-title;
			color: $uni-text-color;
			border-bottom: 0.5px solid $uni-border-color;
			padding-bottom: 10px;
		}
		
		.item-detail{
			padding-top: 10px;
			font-size: $uni-font-detail-title;
			color: $uni-text-color;
		}
	}
</style>