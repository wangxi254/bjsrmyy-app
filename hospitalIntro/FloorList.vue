<template>
    <view class="content">
    	<view class="Grid">
    		<view class="Grid-Item" v-for="(item,index) in list" :key="item.id" @click="onClick(item)" >
    			<view :class="index % 2 == 0 ? 'margin00':'margin01'" >
					<image class="Image" mode="" :src="item.picture"></image>
					<view class="GStitle font-size-14-w400">{{ item.name }}</view>
				</view>
    		</view>
    	</view>
		<view v-if="list.length == 0" class="font-size-m12-w400 text-color-8f8f8f no-data" v-else>
			暂无数据
		</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
					// {img:"http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",title:"龙洞堡区住院楼"},
				]
            }
        },
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item);
				this.reqHospitalBuilding(item.id);
			}
		},
        methods: {
			onClick(item){
				uni.navigateTo({
					url:`./naviToFloor?item=${JSON.stringify(item)}`,
				})
			},
			reqHospitalBuilding(id){
				
				this.$request({
					path:'/hospitalBuilding/mobile/selectUsableHospitalBuildingByHospitalId',
					query:{
						hospitalId:id,
					},
				}).then(res=>{
					if(res.data.code == 200){
						this.list = res.data.data;
					}
				})
			}
        }
    }
</script>

<style lang="less" scoped>
    page {
        min-height: 100%;
		background: #f5f5f5;
    }
	
	.content{
		min-height: 100%;
		background: #f5f5f5;
	}
	.Grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background: #f5f5f5;
		height: 100%;
		.Grid-Item {
			width: 50%;
			margin-top: 15px;
			background: #f5f5f5;
			.Image {
				width: 330rpx;
				height: 320rpx;
				background: #FFFFFF;
			}
			.GStitle {
				width: 330rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #FFFFFF;
				overflow: hidden;
				word-break: break-all;  /* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;  /* 超出部分省略号 */
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2; /** 显示的行数 **/
			}
		}
	}
	
	.margin00{
		margin-left: 30rpx;
		margin-right: 15rpx;
		background: #FFFFFF;
	}
	.margin01{
		margin-right: 30rpx;
		margin-left: 15rpx;
		background: #FFFFFF;
	}
</style>
