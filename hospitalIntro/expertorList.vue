<template>
	<view class="content-view">
		<!-- <view class="search">
			<view class="show-center flex1 justify-content">
				<image class="search-icon marginl10r10" src="../static/index/search.png">
				<input class="search-input" type="text" placeholder="请输入专家名称" v-model="searchText" @input="input"  @focus="vauleEmpty" confirm-type="search" />
			</view>
		</view> -->
		<scroll-view scroll-y v-if="expertorList && expertorList.length > 0" class="scroll-view">
			<view class="expert" v-for="item in expertorList" @click="onClick(item)">
				<image class="expert-icon" mode="" src="../static/common/person.jpg"></image>
				<view class="content marginl15">
					<view class="space-beteewn">
						<view class="font-size-16-w600">{{item.docName}}</view>
						<view class="font-size-m14-w500 fav" @click.stop="usrfav(item)">
							{{item.isfav == 0 ? '关注':'取消关注'}}
						</view>
					</view>
					<view class="flex-row margint5">
						<view class="font-size-m12-w400" style="color: #333;">
							{{item.docTitle ? item.docTitle : ''}}:
						</view>
						<view class="font-size-m12-w400 special" style="flex: 1;margin-left: 10rpx;">
							{{item.docDes ? item.docDes : ''}}
						</view>
					</view>
					<view class="flex-row margint5">
						<view style="color: #333;">擅长：</view>
						<view class="font-size-m12-w400 special" style="flex: 1;">
							{{item.docDes ? item.docDes : ''}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="font-size-m12-w400 text-color-8f8f8f no-data" v-else>
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expertorList: [],
				searchText: '',
				isNotSearching: true,
				depCode: '',
			}
		},
		onLoad(options) {
			if (options.item) {
				let item = JSON.parse(options.item)
				this.depCode = item.depCode;

				this.getexpert();
			}
		},
		methods: {
			onClick(item) {
				uni.navigateTo({
					url: `expertorDetail?item=${JSON.stringify(item)}`
				})
			},
			searchClick() {
				this.isNotSearching = false;
			},
			valueEmpty(e) {
				return this.searchText = '';
			},
			cancleEdit() {
				this.isNotSearching = true;
			},
			input(item) {
				console.log("input:", JSON.stringify(item));
				this.getexpert();
			},
			getexpert() {
				let that = this;
				let date = new Date().toISOString().slice(0, 10);

				let time = new Date();
				let num = 15;
				var dates = new Date(time.setDate(time.getDate() + num)).getDate() //这里先获取日期，在按需求设置日期，最后获取需要的
				var year = time.getFullYear() //获取年份
				var month = time.getMonth() + 1 // 获取月份
				const endtime = year + '-' + month + '-' + dates;
				this.$request({
					path: '/expert/mobile/listNoPage',
					query: {
						beginDate: date,
						endDate: endtime,
						depCode: this.depCode,
						search: this.searchText,
					}
				}).then(res => {
					if (res.data.code == 200) {
						// this.expertorList = res.data.data;
						const expertorList = res.data.data;
						console.log("zzexpertorList===>", JSON.stringify(expertorList))
						that.getfavlist(expertorList);
						// uni.request({
						//     url: 'https://min.his.gzskt.net/bjrmWebApi/userfav/list/' + this.userId +'?docName=' + this.searchValue, //仅为示例，并非真实接口地址。
						//     success: (res) => {
						// 		this.persons = res.data.data
						// 	}
						// })

					}
				})
			},
			async getfavlist(expertorList) {
				const [err, res] = await this.$arequest({
					path: `/userfav/list/${uni.getStorageSync("userId")}`
				})
				console.log("res===>", JSON.stringify(res));
				if (res && res.data && res.data.code == 200) {
					const favlist = res.data.data;

					console.log("expertorListb===>", JSON.stringify(expertorList));

					this.expertorList = expertorList.forEach((item) => {
						let isfav = 0;
						for (let i = 0; i < favlist.length; i++) {
							const favitem = favlist[i];
							if (favitem.docCode == item.docCode) {
								isfav = 1;
								break;
							}
						}
						item.isfav = isfav;
						return item;
					})
					this.expertorList = expertorList;
					console.log("expertorLista===>", JSON.stringify(expertorList));
					console.log("expertorLista===>", JSON.stringify(this.expertorList));
				} else {

					this.expertorList = expertorList;
				}

			},
			usrfav(item) {
				if (!uni.getStorageSync("userId")) {
					uni.navigateTo({
						url: "../pages/auth/auth"
					})
				}
				this.$request({
					path: '/userfav/doctor',
					query: {
						userId: uni.getStorageSync("userId"),
						docCode: item.docCode,
						docTitle: item.docTitle,
						special: item.special,
						docInfo: item.docInfo,
						docName: item.docName,
					},
					method: 'POST',
				}).then(res => {
					if (res.data.code == 200) {
						item.isfav = !item.isfav;
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content-view {
		height: 100%;
		background: $uni-bg-color-grey;
	}

	.scroll-view {
		background: $uni-bg-color-grey;
	}

	.expert {
		padding: 15px;
		flex-direction: row;
		display: flex;
		margin: 15px 15px 0px 15px;
		background: #FFFFFF;

		.expert-icon {
			width: 80px;
			height: 80px;
		}

		.content {
			width: 100%;
			height: 160rpx;
			padding: 0px 10rpx;

			.expertor-pro {
				margin-top: 8px;
				font-size: $uni-font-normal-title;
				color: $uni-text-color-grey;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;

				text {
					color: $uni-text-color;
					font-weight: bold;
				}
			}
		}

		.right-icon {
			width: 15px;
			height: 15px;
		}

	}



	.search {
		height: 50px;
		line-height: 50px;
		width: 100%;
		background: #FFFFFF;
	}

	.show-center {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
		height: 30px;
		background: #F5F5F5;
		border-radius: 15px;
		margin: 10px 15px;
	}

	.justify-content {
		justify-content: start;
	}

	.search-icon {
		width: 18px;
		height: 18px;
	}

	.search-text {
		color: $uni-text-color;
		font-size: $uni-font-detail-title;
	}

	.search-bg {
		background: #FFFFFF;
		height: 28px;
		width: 100%;
		margin: 8px;
	}

	.marginl10r10 {
		margin-left: 10px;
		margin-right: 10px;
	}

	.space-beteewn {
		justify-content: space-between;
		display: flex;
	}

	.cancle {
		height: 28px;
		line-height: 28px;
		padding-left: 8px;
		font-size: $uni-font-detail-title;
		color: $uni-color-primary;
		background: $uni-bg-color-hover;
		text-align: right;
	}

	.search-input {
		font-size: $uni-font-detail-title;
		color: $uni-text-color;
		margin-right: 8px;
		font-size: 14px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 30px;
		height: 30px;
	}

	.fav {
		text-align: center;
		color: $uni-color-primary;
	}

	.special {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>