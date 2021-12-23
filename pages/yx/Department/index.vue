<template>
	<view>
		<view class="search show-center">
			<view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
				<view class="search-input">搜索</view><image class="search-icon" src="../static/index/search.png">
			</view>
			<view v-else class="space-beteewn search-bg">
				<view class="show-center justify-content">
					<image class="search-icon marginl10r10" src="../static/index/search.png">
					<input class="search-input" type="text" placeholder="搜索" v-model="searchText"  @focus="vauleEmpty" confirm-type="search" />
				</view>
				<view @click="cancleEdit" class="cancle">取消</view>
			</view>
		</view>
		<uni-notice-bar class="noticebar" backgroundColor="#FEF0E9" :scrollable="true" :showIcon="true" :single="true" text="注：出诊时间如有变化，以当日挂号为准" />
		<hsSubfieldList :leftNavData="leftNavData" :rightNavData="rightNavData" :scrollHeiht="scrollHeiht" @leftClick="leftClick" @rightClick="rightClick" />
	</view>
</template>

<script>
	import hsSubfieldList from "@/components/hs-subfield-list.vue";
	import uniNoticeBar from "@/components/uni-notice-bar.vue";
	export default {
		data() {
			return {
				leftNavData:[],
				rightNavData:[],
				searchText:'',
				isNotSearching:true,
				scrollHeiht:'',
				pageType: 0
			}
		},
		onLoad(options) {
			/* 获取屏幕可视区域的高度 */
			let height=uni.getSystemInfoSync().windowHeight - 44 - 42
			this.scrollHeiht=`height:${height}px`
			options.type && (this.pageType = options.type)
			this.getDepartment();
		},
		onShow() {
			//this.leftClick(this.leftNavData[0]);
		},
		components:{
			hsSubfieldList,uniNoticeBar
		},
		watch: {
			'searchText': ()=>{
				alert(1)
			}
		},
		methods: {
			// leftClick(item){
			// 	console.log("expert:",JSON.stringify(item));
			// 	let array = [];
			// 	this.rightNavData = array;
				
			// },
			leftClick(item){
				let array = [];
				this.rightNavData = array;
				uni.navigateTo({
					url:'/pages/yx/appointment/index?title=' + item.depName +'&&type=' +this.pageType + '&&id='+item.depCode
				})
			},
			searchClick(){
				this.isNotSearching = false;
			},
			valueEmpty(e){
				return this.searchText = '';
			},
			cancleEdit(){
				this.isNotSearching = true;
			},
			rightClick(item){
				console.log("expert:",JSON.stringify(item));
				uni.navigateTo({
					url:`./roomDetail?item=${JSON.stringify(item)}`
				})
			},
			getDepartment(){
				
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path:'/department/mobile/listNoPage',
					query:{
						beginDate:date,
						endDate:date,
						regtype:1
					}
				}).then(res=>{
					if(res.data.code == 200){
						this.leftNavData = res.data.data;
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	
	.search{
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: $uni-bg-color-hover;
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
		margin: 8px;
	}
	
	.marginl10r10{
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.space-beteewn{
		justify-content: space-between;
		display: flex;
	}
	
	.cancle{
		height: 28px;
		line-height: 28px;
		padding-left: 8px;
		font-size: $uni-font-detail-title;
		color: $uni-color-primary;
		background: $uni-bg-color-hover;
		text-align: right;
	}
	
	.search-input{
		font-size: $uni-font-detail-title;
		color: $uni-text-color;
		margin-right: 8px;
	}
	.noticebar {
		line-height: 30rpx;
	}
</style>