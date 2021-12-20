<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<!-- <scroll-view scroll-y :style="'height:'+height+'px'"> -->
				<scroll-view scroll-y style="height:680px">
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryClickMain(item,index)" :key="index"
					:class="{'acitveItem': index==categoryActive}"
					:style="index==categoryActive?'color:'+activeTextColor?activeTextColor:''+';background-color:'+activeBackgroundColor?activeBackgroundColor:'':''">
					 <!-- :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''"> -->
						{{item[label]}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" style="height:680px" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<view>{{item[label]}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue";
	export default {
		name: "category",
		components:{
			uniList
		},
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				}
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: ''
			},
			activeBackgroundColor: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			},
		},
		mounted() {
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 35%;
	}

	.nav-left-item {
		height: 50px;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f0f0f0;
	}
	.acitveItem{
		background: #f7f7f7;
		color: $uni-color-primary;
	}

	.nav-right {
		width: 65%;
	}

	.nav-right-item {
		width: 100%;
		border-bottom: 1px solid #E0E0E0;
		height: 50px;
		line-height: 50px;
		float: left;
		text-align: left;
		text-indent: 10px;
		padding: 5px;
		font-size: 13px;
	}

	.nav-right-item image {
		width: 50px;
		height: 50px;
	}

	.active {
		color: #F24544;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
</style>
