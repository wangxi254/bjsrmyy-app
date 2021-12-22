<template>
	<view class="row navBox" :style="scrollHeiht" >
		<!-- 左侧一级分类列表 -->
		<scroll-view scroll-y class="leftNavBox col20-5">
			<view class="leftNavItem py-20 text-center" v-for="(item,index) in leftNavData" :key="index" @tap="leftTap(item,index)" >
				<view :class="leftActiveIndex===index?'leftActive':'leftUnActive'" class="leftNavContent py-10">
					{{item.depName}}
				</view>
			</view>
		</scroll-view>
			<!-- 右侧二级分类列表 -->
		<scroll-view scroll-y class="col20-15" scroll-with-animation>
			<view class="rightNavItem" @click="clickObjectItem(oitem)" v-for="(oitem,index) in rightNavData" :key="index">
				{{oitem}}
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	const defaultProps = {
		depName: 'depName',
	}
	export default {
		props: {
			leftNavData:{
				type:Array,
				default:[] /* 一级导航栏的所有数据 */
			},
			rightNavData:{
				type:Array,
				default:[],  /* 二级导航栏的所有数据 */
			},
			scrollHeiht:{
				type:String,
				default:'',  /* 可视区域的高度 */
				
			},
			leftProps:{
				type:Object,
			}
		},
		data() {
			return {
				leftActiveIndex: 0,
				scrollTop:0, 
				
				leftScrollTop:[],    /*左侧每一个分类项距离顶部的高度*/
				rightScrollTop:[],   /*右侧每一个分类项距离顶部的高度*/
				leftNavItemHeight:0, /*左侧一个分类项的高度*/
				scrollTopLeft:0,
			}
		},
		methods: {
			// 点击左边一级导航
			leftTap(item,index) {
				console.log("leftTap:",JSON.stringify(item));
				this.leftActiveIndex = index;
				this.$emit('leftClick', item);
			},
			clickObjectItem(item){
				console.log("rightTap:",JSON.stringify(item));
				this.$emit('rightClick', item);
			}
		},
		watch:{
			leftProps (newProps) {
			  this.leftProps = Object.assign({}, defaultProps, newProps)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navBox {
		border-top: 1px solid $uni-bg-color-hover;
	}
	.leftNavBox{
		border-right: 1px solid $uni-bg-color-hover;
	}
	.leftNavItem {
		border-bottom: 1px solid $uni-bg-color-hover;
	}
	
	.rightNavItem{
		height: 45px;
		line-height: 45px;
		margin-left: 15px;
	}

	.leftNavContent {
		border-left: 3px solid transparent;
		height: 50px;
		line-height: 50px;
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
	
	.col20-5{
		width: 35%;
	}
	
	.col20-15{
		width: 65%;
	}
	
</style>
		
		