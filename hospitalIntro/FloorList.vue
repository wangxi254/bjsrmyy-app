<template>
    <view>
    	<view class="Grid">
    		<view class="Grid-Item" v-for="(item,index) in list" :key="item.id" @click="onClick(item)" >
    			<view :style="index % 2 == 0 ? 'padding-left: 30rpx;padding-right: 15rpx;':'padding-right: 30rpx;padding-left: 15rpx;'" >
					<image class="Image" mode="aspectFill" :src="item.img"></image>
					<view class="GStitle">{{ item.title }}</view>
				</view>
    		</view>
    	</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					{img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
				]
            }
        },
		onLoad() {

		},
        methods: {
			onClick(item){
				uni.navigateTo({
					url:`./naviToFloor?item=${JSON.stringify(item)}`,
				})
			}
        }
    }
</script>

<style lang="less" scoped>
    .content {
        height: 100%;
    }
	.Grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background: #FFFFFF;
		.Grid-Item {
			width: 50%;
			margin-top: 10px;
			margin-bottom: 20px;
			.Image {
				width: 330rpx;
				height: 330rpx;
			}
			.GStitle {
				width: 100%;
				height: 34rpx;
				line-height: 34rpx;
				color: #06121e;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}
</style>
