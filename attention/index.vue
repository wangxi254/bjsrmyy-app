<template>
	<view class="content">
		<uni-search-bar v-model="searchValue" @confirm="getData" placeholder="搜索" ></uni-search-bar>
		<view class="list">
			<view class="box" v-if="persons.length === 0">
				<icon type="info" color="#007aff" size="26"/>
				<view>暂无数据</view>
			</view>
			<scroll-view scroll-y scroll-with-animation>
				<view class="person-item flex" v-for="item in persons" :key="item.docCode">
					<image class="avater" mode="aspectFit" src="../static/common/person.jpg"></image>
					<view class="person-item-info flex-1">
						<view class="flex justify-between items-center">
							<text class="name">{{item.docName}}</text>
							<view class="flex items-center">
								<picker @change="bindPickerChange" :value="type" :range="array">
									<!-- <view class="surplus">去预约</view> -->
								</picker>
							</view>
						</view>
						<view class="tex">
							职称：{{item.docTitle}}
						</view>
						<view class="tex" @click="getDetail(item)">
							<span>擅长：{{item.special}}</span>
							<span class="jt">></span>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import NoData from '@/components/nodata/index.vue' 
	export default {
		components: { NoData },
		data() {
			return {
				userId: '',
				array: ['当日挂号','预约挂号'],
				type: 0,
				searchValue: '',
				persons: []
			}
		},
		onLoad() {
			this.userId = this.$getUserId()
			this.getData()
		},
		methods: {
			bindPickerChange(e) {
				this.type = e.target.value
			},
			getData() {
				uni.request({
				    url: 'https://min.his.gzskt.net/bjrmWebApi/userfav/list/' + this.userId +'?docName=' + this.searchValue, //仅为示例，并非真实接口地址。
				    success: (res) => {
						this.persons = res.data.data
					}
				})
			},
			getDetail(item) {
				uni.navigateTo({
					url:`expertorDetail?item=${JSON.stringify(item)}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
		.box{
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -40px;
			margin-top: -100px;
		    height: 80px;
		    width: 80px;
		    display: flex;
		    flex-flow: column;
		    align-items: center;
		    justify-content: center;
		    view{
		        line-height: 2;
		        color: $uni-color-primary;
		    }
		}
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.list {
		flex: 1;
		flex: 1;
		background: #f8f8f8;
		display: flex;
		overflow: auto;
		
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
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.jt {
						display: inline-block;
						width: 50px;
						text-align: center;
					}
				}
			}
		}
		
		.item {
			display: flex;
			padding: 10px;
			background-color: white;
			margin-top: 10px;
			&:first-child {
				margin-top: 0;
			}
			
			.avator {
				width: 40px;
				height: 40px;
				margin-right: 10px;
				
				img {
					width: 40px;
					height: 40px;
					border-radius: 40px;
				}
			}
			
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				
				.top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.name {
						display: flex;
						flex-direction: column;
					}
					.btn {
						border-radius: 6px;
						padding: 4px 8px;
						color: #fff;
						background-color: #5db1ff;
					}
				}
				.bottom {
					margin-top: 10px;
					display: flex;
					align-items: center;
					
					.jt {
						display: inline-block;
						width: 50px;
						text-align: center;
					}
				}
			}
		}
	}
</style>
