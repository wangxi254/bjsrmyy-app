<template>
	<view class="row navBox">
		<!-- 左侧一级分类列表 -->
		<scroll-view scroll-y :scroll-into-view="firstId" class="leftNavBox">
			<view class="leftNavItem py-20 text-center" v-for="(item,index) in navData" :key="item.id" @tap="leftTap(item,index)" >
				<view :id="'nav'+item.id" :class="leftActive==='nav'+item.id?'leftActive':'leftUnActive'" class="leftNavContent py-10">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		
			<!-- 右侧二级分类列表 -->
		<scroll-view scroll-y class="rightBox" scroll-with-animation>
			<!-- <picker @change="bindPickerChange" :value="type" :range="array"> -->
			<view v-for="(item,index) in rightNavData" :key="index" class="rightNavItem" @click="clickObjectItem(item)">
				<span>{{item.name}}</span>
				<span>></span>
			</view>
			<!-- </picker> -->
		</scroll-view>
		<uni-popup ref="popup" type="right" :animation="true">
			<view class="bzlist">
				<view class="title">选择科室</view>
				<view class="list">
					<NoData style="position:absolute" v-if="current.length === 0" />
					<picker @change="bindPickerChange" :value="type" :range="array">
						<view @click="chooseDep(i)" v-for="i in current" :key="i.depCode" class="item">{{i.depName}}</view>
					</picker>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import NoData from '@/components/nodata/index.vue' 
	import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
	export default {
		components: { NoData, uniPopup },
		data() {
			return {
				dep: {},
				current: [],
				type: 0,
				array: ['预约挂号','当日挂号'],
				firstId: '',
				leftActive: '',
				navData: [],
				rightNavData: []
			}
		},
		onLoad(options) {
			this.getData(options.id)
		},
		methods: {
			chooseDep(item) {
				this.dep = item
			},
			bindPickerChange(e) {
				this.type = e.target.value
				uni.navigateTo({
					url:'../yx/appointment/index?title=' + this.dep.depName +'&&type=' + this.type + '&&id='+ this.dep.depCode
				})
			},
			getData(id) {
				uni.request({
				    url: 'https://min.his.gzskt.net/bjrmWebApi/smartinquiry/body/listRelData', //仅为示例，并非真实接口地址。
				    success: (res) => {
						this.navData = res.data.data
						this.$nextTick(function(){
							if (id) {
								this.firstId = 'nav' + id
								this.leftActive = 'nav' + id
								const arr = this.navData.filter((item) => {
									return ('nav' + item.id) === this.leftActive
								})
								if (arr && arr.length > 0) {
									this.rightNavData = arr[0].symptoms
								}
								console.log(this.rightNavData)
							} else {
								this.leftActive = 'nav' + this.navData[0].id
								this.rightNavData = this.navData[0].symptoms
							}
						})
				    }
				});
			},
			leftTap(item) {
				this.firstId = ''
				this.leftActive = 'nav' + item.id
				const arr = this.navData.filter((item) => {
					return ('nav' + item.id) === this.leftActive
				})
				if (arr && arr.length > 0) {
					this.rightNavData = arr[0].symptoms
				}
			},
			clickObjectItem(item) {
				uni.request({
				    url: 'https://min.his.gzskt.net/bjrmWebApi/smartinquiry/symptom/listDeps?symptomId=' + item.id, //仅为示例，并非真实接口地址。
				    success: (res) => {
						this.current = res.data.data
						this.$refs.popup.open()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bzlist {
		width: 200px;
		height: 100%;
		background: #ffffff;
		.title {
			text-align: center;
			height: 40px;
			line-height: 40px;
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.item {
				color:white;
				padding: 4px 7px;
				border-radius: 3px;
				background-color: #18bc37;
				border-color: #18bc37;
				margin-left: 20px;
				margin-bottom: 20px;
			}
		}
	}
	.navBox {
		border-top: 1px solid $uni-bg-color-hover;
		height: 100%;
	}
	.leftNavBox{
		border-right: 1px solid $uni-bg-color-hover;
	}
	.leftNavItem {
		border-bottom: 1px solid $uni-bg-color-hover;
	}
	.rightNavItem{
		height: 45px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 15px;
		border-bottom: 1px solid #d8d8d8;
		padding: 0 10px;
		
		span:last-child {
			color: #c3bac1;
		}
	}
	
	.leftNavContent {
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	
	.leftActive {
		border-left: 3px solid $uni-color-primary;
		background: #FFFFFF;
	}
	
	.leftUnActive {
		background-color: #F1F1F1;
	}
	.rightNavContent{
		margin:10upx;
	}
	.rightNavContent image{
		width: 120upx;
		height: 120upx;
		display: block;
	}
	.row{
		display: flex;
		flex-direction: row;
	}
	
	.leftNavBox {
		width: 16%;
	}
	.rightBox {
		width: 84%;
		box-sizing: border-box;
	}
</style>
