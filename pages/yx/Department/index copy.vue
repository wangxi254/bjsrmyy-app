<template>
	<view>
		<view style="top">
			<view class="search">
				<uniSearch :bgColor='gray' @input='filterData' radius="6" bgColor="#fff" placeholderColor="#808080"></uniSearch>
			</view>
			<uni-notice-bar backgroundColor="#FEF0E9" :scrollable="true" :showIcon="true" :single="true" text="注：出诊时间如有变化，以当日挂号为准" />
		</view>
		<category activeTextColor="#007aff" style="height: 680px;overflow: hidden;" :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category>
	</view>
</template>

<script>
	import uniSearch from "@/components/uni-search-bar.vue";
	import category from "@/components/qiyue-category/qiyue-category.vue";
	import uniNoticeBar from "@/components/uni-notice-bar.vue";
	export default {
		components:{
			category,
			uniSearch,
			uniNoticeBar
		},
		data() {
			return {
				gray: 'rgb(229 229 229)',
				categoryList:[],
				subCategoryList:[],
				categoryListOld: [],
				pageType: 0
			}
		},
		onLoad(options) {
			options.type && (this.pageType = options.type)
		},
		mounted() {
			for(var i=0;i<20;i++){
				var subList = [];
				for(var j=0;j<30;j++){
					subList.push({"name":"分类"+i+":商品"+j,"logo":"http://placehold.it/50x50"})
				}
				this.categoryList.push({"name":"分类"+i,"subCategoryList":subList})
			}
			this.subCategoryList = this.categoryList[0].subCategoryList;
			this.categoryListOld = JSON.parse(JSON.stringify(this.categoryList))
			this.getexpert()
		},
		methods: {
			categoryMainClick(category){
				this.subCategoryList = category.subCategoryList;
			},
			categorySubClick(category){
				console.log(category);
				uni.navigateTo({
					url:'/pages/yx/appointment/index?title=' + category.name +'&&type=' +this.pageType
				})
			},
			filterData(val) {
				const str = val.value;
				this.categoryList = JSON.parse(JSON.stringify(this.categoryListOld))
				let arr = [];
				this.categoryList.map(v => {
					if(v.name.indexOf(str) >= 0){
						arr.push(v);
					}
				})
				this.categoryList = arr;
				this.subCategoryList = this.categoryList[0].subCategoryList;
			},
			getexpert(){
				this.$request({
					path:'/department/mobile/listNoPage?beginDate=2021-12-22&endDate=2021-12-22',
				}).then(res=>{
					console.log(res)
					// if(res.data.code == 200){
					// 	this.contentHtml = res.data.data.noticeContent
					// }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 50rpx;
	}
	.top {
		position: fixed;
	}
	.tips{
		font-size: 20rpx;
		margin-left: 20px;
		color: red;
	}
	.search{
		margin: 20rpx;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	}
	::v-deep {
		.uni-noticebar__content-text,.uni-noticebar-icon .uni-icons{
			color: $uni-color-primary !important;
		}
	}
</style>