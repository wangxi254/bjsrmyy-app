<template>
	<view class="date-view flex items-center">
		<view class="optBtn">
			<uni-icons @click="clickLast" type="arrowleft" size="18" />
		</view>

		<scroll-view class="day-vew flex-1" scroll-x="true" :scroll-left="LeftWid" scroll-with-animation>
			<view class="day-item" v-for="(item,index) in weekInfo" :key="index" @click="chooseDay(index)">
				<view class="week">{{item.week}}</view>
				<view :class="['hasflag',item.hasNum === 'true' ? 'active' : '' ]">
					{{item.hasNum === 'true' ? '有号' : '无号'}}
				</view>
				<view :class="['day',current == index?'active':'']"> {{item.day}}</view>
			</view>
		</scroll-view>
		<view class="optBtn">
			<uni-icons @click="clickNext" type="arrowright" size="18" />
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			classId: {
				type: String,
				default: () => {
					return ''
				}
			}
		},
		data() {
			return {
				weekInfo: [],
				LeftWid: 0,
				current: 0
			}
		},
		created() {
			this.setDate();
		},
		methods: {
			setDate() {
				this.$request({
					path: `/user/mobile/getDateList?deptId=${this.classId}`,
				}).then(res => {
					if (res.data.code == 200) {
						this.weekInfo = res.data.data;
						this.$emit('getDateData', this.weekInfo[0]['date']);
					}
				})
			},
			clickLast() {
				if (this.current >= 1) {
					this.current -= 1
					this.LeftWid -= 50
					this.$emit('getDateData', this.weekInfo[this.current]['date']);
				}
			},
			clickNext() {
				if (this.current < this.weekInfo.length) {
					this.current += 1
					this.LeftWid += 50
					this.$emit('getDateData', this.weekInfo[this.current]['date'])
				}
			},
			chooseDay(index) {
				this.current = index;
				this.$emit('getDateData', this.weekInfo[index]['date']);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.date-view {
		padding: 20rpx;
		background: #fff;

		.optBtn {
			width: 80rpx;
			text-align: center;
		}

		.day-vew {
			width: calc(100% - 160rpx);
			white-space: nowrap;
		}

		.day-item {
			display: inline-block;
			width: 50px;
			margin: 0 10rpx;
			text-align: center;

			.week {
				font-size: $uni-font-size-lg;
				color: $uni-text-color-placeholder;
			}

			.hasflag {
				font-size: $uni-font-size-sm;
				line-height: 2;
				color: $uni-text-color-placeholder;

				&.active {
					color: $uni-color-primary;
				}
			}

			.day {
				font-size: $uni-font-size-sm;
				color: $uni-text-color-placeholder;
				height: 30px;
				width: 30px;
				line-height: 30px;
				margin: 0 auto;

				&.active {
					background: $uni-color-primary;
					border-radius: 50%;
					color: #fff;
				}

			}
		}
	}
</style>