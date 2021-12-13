<template>
	<view>
		<view class="search show-center">
			<view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
				<view class="search-text">搜索</view><image class="search-icon" src="../static/tabbar/homed.png">
			</view>
			<view v-else class="search-bg show-center justify-content">
				<image class="search-icon marginl10r10" src="../static/tabbar/homed.png">
				<input type="text" placeholder="搜索" v-model="searchText"  @focus="vauleEmpty" confirm-type="search" />
			</view>
		</view>
		
		<view class="row navBox" :style="scrollHeiht">
			<!-- 左侧一级分类列表 -->
			<scroll-view scroll-y class="leftNavBox col20-5">
				<view class="leftNavItem py-20 text-center" @tap="leftTap(index)" v-for="(item,index) in leftNavData" :key="index">
					<view :class="leftActiveIndex===index?'leftActive':'leftUnActive'" class="leftNavContent py-10">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
			
				<!-- 右侧二级分类列表 -->
			<scroll-view @scroll="rightScroll" scroll-y class="col20-15" scroll-with-animation>
				<view class="rightNavItem" v-for="index in 5" :key="index">
					{{index}}
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftActiveIndex: 0,
				leftNavData: [{title:1},{title:2}], /* 一级导航栏的所有数据 */
				rightNavData: [], /* 二级导航栏的所有数据 */
				scrollTop:0, 
				scrollHeiht:"",  /* 可视区域的高度 */
				leftScrollTop:[],    /*左侧每一个分类项距离顶部的高度*/
				rightScrollTop:[],   /*右侧每一个分类项距离顶部的高度*/
				leftNavItemHeight:0, /*左侧一个分类项的高度*/
				scrollTopLeft:0,
				searchText:'',
				isNotSearching:true,
			}
		},
		onLoad() {
			/* 获取屏幕可视区域的高度 */
			let height=uni.getSystemInfoSync().windowHeight
			this.scrollHeiht=`height:${height}px`
			
		},
		onReady() {
			let query = uni.createSelectorQuery();
			
			/* 右侧商品分类距离顶部的距离的一个数组 */
			query.selectAll('.rightNavItem').boundingClientRect(data => {
				this.rightScrollTop=data.map(item=>item.top)
			}).exec();
			
			/* 左侧商品分类距离顶部的距离的一个数组 */
			query.selectAll(".leftNavItem").boundingClientRect(data=>{
				this.leftScrollTop=data.map(item=>item.top)
			}).exec(res=>{
				/*获取左侧一个分类项的高度*/
				this.leftNavItemHeight=this.leftScrollTop[1]-this.leftScrollTop[0];
			})
		},
		methods: {
			// 点击左边一级导航
			leftTap(index) {
				this.leftActiveIndex = index;
				this.scrollTop=this.rightScrollTop[index]
			},
			/* 右侧二级导航滚动事件 */
			rightScroll(event){
				// event.detail.scrollTop实时获取右侧商品距离顶部的距离 
				//this.rightScrollTop右侧商品分类距离顶部的距离
				
				// this.rightScrollTop.forEach((item,index)=>{
				// 	if(item<=event.detail.scrollTop){
				// 		this.leftActiveIndex=index
				// 	}
				// })
			},
			searchClick(){
				this.isNotSearching = false;
			},
			valueEmpty(e){
				return this.searchText = '';
			}
		},
		watch:{
			leftActiveIndex(newValue,oldValue){
				//console.log("新"+newValue)
				//console.log("旧"+oldValue)
				// 判断左侧scroll-view是否需要滚动
				uni.createSelectorQuery().select(".leftNavBox").fields({
					size:true,
					scrollOffset:true/* 超出顶部可视区域的距离 ，（滚上去以后的距离）*/
				},res=>{
					//this.leftScrollTop[newValue] 左侧每个元素距离顶部的距离
					//this.leftNavItemHeight 左侧每个元素的高度
					//res.scrollTop  超出顶部可视区域的距离 ，（滚上去以后的距离）
					let H=res.height /* 可视区域的高度（573）*/
					
					/* 判断是否需要向上滚动 */
					if(this.leftScrollTop[newValue]+ this.leftNavItemHeight>H + res.scrollTop){
						console.log("需要左侧向上滚动");
						this.scrollTopLeft=this.leftScrollTop[newValue] + this.leftNavItemHeight-H;
					}
					
					/* 判断是否需要向下滚动 */
					if(res.scrollTop>this.leftScrollTop[newValue]){
						this.scrollTopLeft=this.leftScrollTop[newValue];
					}
				}).exec()
			}
		}
	}
</script>

<style>
	.navBox {
		border-top: 1px solid #F1F1F1;
	}
	.leftNavBox{
		border-right: 1px solid #F1F1F1;
	}
	.leftNavItem {
		border-bottom: 1px solid #F1F1F1;
		height: 50px;
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
		border-left: 3px solid #007aff;
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
	
	.search{
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: #F1F1F1;
		padding: 8px;
	}
	
	.show-center{
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
	}
	
	.justify-content{
		justify-content: start;
	}
	
	.search-icon{
		width: 20px;
		height: 20px;
	}
	
	.search-text{
		color: $uni-text-color;
		font-size: $uni-font-detail-title;
	}
	
	.search-bg{
		background: #FFFFFF;
		height: 28px;
		width: 100%;
	}
	
	.marginl10r10{
		margin-left: 10px;
		margin-right: 10px;
	}
</style>

