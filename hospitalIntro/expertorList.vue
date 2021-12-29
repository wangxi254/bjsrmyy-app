<template>
	<view>
		<view class="search">
			<!-- <view v-if="isNotSearching" @click="searchClick" class="search-bg show-center">
				<view class="search-input">搜索</view>
				<image class="search-icon" src="../static/index/search.png">
			</view>
			<view v-else class="space-beteewn search-bg">
				<view class="show-center justify-content">
					<image class="search-icon marginl10r10" src="../static/index/search.png">
					<input class="search-input" type="text" placeholder="搜索" v-model="searchText" @input="input"  @focus="vauleEmpty" confirm-type="search" />
				</view>
				<view @click="cancleEdit" class="cancle">取消</view>
			</view> -->
			<view class="show-center flex1 justify-content">
				<image class="search-icon marginl10r10" src="../static/index/search.png">
				<input class="search-input" type="text" placeholder="请输入专家名称" v-model="searchText" @input="input"  @focus="vauleEmpty" confirm-type="search" />
			</view>
		</view>
		<scroll-view scroll-y>
			<view class="expert" v-for="item in expertorList" @click="onClick(item)">
				<image class="expert-icon" mode="" src="../static/common/person.jpg"></image>
				<view class="content">
					<view class="flex-row">
						<view>{{item.docName}}</view>
						<view style="margin-left: 10px;">{{item.docTitle}}</view>
					</view>
					<view class="space-beteewn">
						<view class="expertor-pro">
							<text class="">擅长：</text>{{item.special}}
						</view>
						<view class="fav addBtn" style="text-align: right;"  @click.stop="usrfav(item)">{{item.isfav == 0 ? '关注':'取消关注'}}</view>
					</view>
				</view>
				<image class="right-icon" src="../static/common/right.png">
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expertorList:[],
				searchText:'',
				isNotSearching:true,
			}
		},
		onLoad(options) {
			if(options.item){
				let item = JSON.parse(options.item)
				this.getexpert(item.depCode);
			}
		},
		methods: {
			onClick(item){
				uni.navigateTo({
					url:`expertorDetail?item=${JSON.stringify(item)}`
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
			input(item){
				console.log("input:",JSON.stringify(item));
			},
			getexpert(depCode){
				let that = this;
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path:'/expert/mobile/listNoPage',
					query:{
						beginDate:date,
						endDate:date,
						depCode:depCode
					}
				}).then(res=>{
					if(res.data.code == 200){
						// this.expertorList = res.data.data;
						const expertorList = res.data.data;
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
			async getfavlist(expertorList){
				const [err,res] = await this.$arequest({
					path:`/userfav/list/${uni.getStorageSync("userId")}`
				})
				console.log("res===>",JSON.stringify(res));
				if(res && res.data && res.data.code == 200){
					const favlist = res.data.data;
					
					console.log("expertorListb===>",JSON.stringify(expertorList));
					this.expertorList = expertorList.forEach((item)=>{
						let isfav = 0;
						for(let i = 0; i < favlist.length; i++){
							const favitem = favlist[i];
							if(favitem.docCode == item.docCode){
								isfav = 1;
								break;
							}
						}
						item.isfav = isfav;
						return item;
					})
					this.expertorList = expertorList;
					console.log("expertorLista===>",JSON.stringify(expertorList));
					console.log("expertorLista===>",JSON.stringify(this.expertorList));
				}else{
					
					this.expertorList = expertorList;
				}
				
			},
			usrfav(item){
				if(!uni.getStorageSync("userId")){
					uni.navigateTo({
						url:"../pages/auth/auth"
					})
				}
				this.$request({
					path:'/userfav/doctor',
					query:{
						userId:uni.getStorageSync("userId"),
						docCode:item.docCode,
						docTitle:item.docTitle,
						special:item.special,
						docInfo:item.docInfo,
						docName:item.docName,
					},
					method:'POST',
				}).then(res=>{
					if(res.data.code == 200){
						item.isfav = !item.isfav;
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.expert{
		padding: 8px 15px;
		border-bottom: 0.5px solid $uni-border-color;
		flex-direction: row;
		display: flex;
		justify-content: center;
		align-items: center;
		.expert-icon{
			width: 60px;
			height: 75px;
		}
		.content{
			width: 100%;
			height: 75px;
			padding: 0px 5px;
			.expertor-pro{
				margin-top: 8px;
				font-size: $uni-font-normal-title;
				color: $uni-text-color-grey;
				// overflow: hidden;
				// word-break: break-all;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				display: -webkit-box;/*弹性伸缩盒子模型显示*/
				-webkit-box-orient: vertical;   /*排列方式*/ 
				-webkit-line-clamp: 2;/*显示文本行数*/
				overflow: hidden;/*溢出隐藏*/
				text{
					color: $uni-text-color;
					font-weight: bold;
				}
			}
		}
		.right-icon{
			width: 15px;
			height: 15px;
		}
		
	}
	
	
	
	.search{
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: #FFFFFF;
	}
	
	.show-center{
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
		height: 30px;
		background: #F5F5F5;
		border-radius: 15px;
		margin: 10px 15px;
	}
	
	.justify-content{
		justify-content: start;
	}
	
	.search-icon{
		width: 18px;
		height: 18px;
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
		font-size: 14px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 30px;
		height: 30px;
	}
	
	.fav{
		min-width: 30px;
		height: 10px;
		line-height: 10px;
		text-align: center;
	}
</style>