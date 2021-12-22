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
			<picker @change="bindPickerChange" :value="type" :range="array" v-for="(item,index) in rightNavData" :key="index">
			<view class="rightNavItem" @click="clickObjectItem(item)">
				<span>{{item.name}}</span>
				<span>></span>
			</view>
			</picker>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				array: ['当日挂号','预约挂号'],
				firstId: '',
				leftActive: '',
				navData: [],
				rightNavData: []
			}
		},
		created() {
			this.getData()
		},
		methods: {
			bindPickerChange(e) {
				this.type = e.target.value
				console.log(this.type)
			},
			getData() {
				uni.request({
				    url: 'https://min.his.gzskt.net/bjrmWebApi/smartinquiry/body/listRelData', //仅为示例，并非真实接口地址。
				    success: (res) => {
						this.navData = res.data.data
						if (!this.leftActive) {
							this.leftActive = 'nav' + this.navData[0].id
							this.rightNavData = this.navData[0]
						}
						this.$nextTick(function(){
							if (this.getParam(location.href, 'id')) {
								this.firstId = 'nav' + this.getParam(location.href, 'id')
								this.leftActive = 'nav' + this.getParam(location.href, 'id')
							}
							if (this.leftActive) {
								const arr = this.navData.filter((item) => {
									return ('nav' + item.id) === this.leftActive
								})
								if (arr && arr.length > 0) {
									this.rightNavData = arr[0].symptoms
								}
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
			clickObjectItem() {
				// uni.navigateTo({
				// 	url: './symptomsList',
				// })
			},
			getParam(path, name) { 
			    const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");   
			    if (reg.test(path))  
					return unescape(RegExp.$2.replace(/\+/g, " ")); 
			    return "";    
			}
		}
	}
</script>

<style lang="scss" scoped>
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
