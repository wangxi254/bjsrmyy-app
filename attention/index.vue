<template>
	<view class="content">
		<uni-search-bar v-model="searchValue" @confirm="getData" placeholder="搜索" ></uni-search-bar>
		<view class="list">
			<scroll-view scroll-y scroll-with-animation>
				<view class="item" v-for="item in 10">
					<view class="avator">
						<img src="../static/tabbar/home.png" >
					</view>
					<view class="info">
						<view class="top">
							<view class="name">
								<span>张麻子</span>
								<span>副主任医师</span>
							</view>
							<span class="btn">去预约</span>
						</view>
						<view class="bottom" @click="getDetail(item)">
							<span>擅长：治疗肾虚治疗肾虚治疗肾虚治疗肾虚治疗肾虚治疗肾虚治疗肾虚治疗肾虚治疗肾虚</span>
							<span class="jt">></span>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: ''
			}
		},
		methods: {
			getData() {},
			getDetail(item) {
				uni.navigateTo({
					url:`expertorDetail?item=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
