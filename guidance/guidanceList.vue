<template>
	<view class="row navBox">
		<!-- 左侧一级分类列表 -->
		<scroll-view scroll-y :scroll-into-view="leftActive" class="leftNavBox">
			<view class="leftNavItem py-20 text-center" v-for="(item,index) in leftNavData" :key="index" @tap="leftTap(item,index)" >
				<view :id="'test'+item.id" :class="leftActive==='test'+item.id?'leftActive':'leftUnActive'" class="leftNavContent py-10">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		
			<!-- 右侧二级分类列表 -->
		<scroll-view scroll-y class="rightBox" scroll-with-animation>
			<view class="rightNavItem" @click="clickObjectItem(item)" v-for="(item,index) in rightNavData" :key="index">
				<span>{{item.title}}</span>
				<span>></span>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftActive: 'test18',
				leftNavData: [{title:'四肢', id: 1},{title:'口腔', id: 2},{title:'面部', id: 3},{title:'四肢', id: 4},{title:'口腔', id: 5},{title:'面部', id: 6},{title:'四肢', id: 7},{title:'口腔', id: 8},{title:'面部', id: 9},{title:'四肢', id: 10},{title:'口腔', id: 11},{title:'面部', id: 12},{title:'四肢', id: 13},{title:'口腔', id: 14},{title:'面部', id: 15},{title:'四肢', id: 16},{title:'口腔', id: 17},{title:'面部', id: 18},{title:'四肢', id: 19},{title:'口腔', id: 20},{title:'面部', id: 21}],
				rightNavData: [{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1},{title: '肾虚', id: 1}]
			}
		},
		created() {
			this.getData()
			console.log(this.getParam(location.href, 'id'))
		},
		methods: {
			getData() {
				uni.request({
				    url: 'http://47.111.101.255:8082/smartinquiry/body/listRelData', //仅为示例，并非真实接口地址。
				    success: (res) => {
				        console.log(res.data);
				    }
				});
			},
			leftTap(item) {
				this.leftActive = 'test' + item.id
			},
			clickObjectItem() {
				uni.navigateTo({
					url: './symptomsList',
				})
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
