<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据" @selection-change="selectionChange">
				<uni-tr>
					<uni-th width="100" align="center">
						<view class="header">楼层名称</view>
					</uni-th>
					<uni-th align="center">
						<view class="header">楼层详情</view>
					</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td>{{ item.name }}</uni-td>
					<uni-td>
						<view class="name">{{ item.synopsis }}</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
		</view>
	</view>
</template>

<script>
	
export default {
	data() {
		return {
			searchVal: '',
			tableData:[],
			// tableData: [
			// 	{
			// 		floor:"1F",
			// 		room:"门诊化验室、收费处、药方、挂号处、急诊室、住院处、抽血室、换药室"
			// 	},
			// 	{
			// 		floor:"2F",
			// 		room:"门诊化验室、收费处、药方、挂号处、急诊室、住院处、抽血室、换药室"
			// 	},
			// 	{
			// 		floor:"3F",
			// 		room:"门诊化验室、收费处、药方、挂号处、急诊室、住院处、抽血室、换药室"
			// 	},
			// 	{
			// 		floor:"3F",
			// 		room:"门诊化验室、收费处、药方、挂号处、急诊室、住院处、抽血室、换药室"
			// 	},
			// 	{
			// 		floor:"3F",
			// 		room:"门诊化验室、收费处、药方、挂号处、急诊室、住院处、抽血室、换药室"
			// 	}
			// ],
			// 每页数据量
			pageSize: 10,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			loading: false,
			buildInfo:{},
		}
	},
	onLoad(opions) {
		this.selectedIndexs = []
		if(opions.item){
			let buildInfo = JSON.parse(opions.item);
			this.buildInfo = buildInfo;
			this.getData(1);
		}
	},
	methods: {
		// 多选处理
		selectedItems() {
			return this.selectedIndexs.map(i => this.tableData[i])
		},
		// 多选
		selectionChange(e) {
			console.log(e.detail.index)
			this.selectedIndexs = e.detail.index
		},
		//批量删除
		delTable() {
			console.log(this.selectedItems())
		},
		// 分页触发
		change(e) {
			this.$refs.table.clearSelection()
			this.selectedIndexs.length = 0
			this.getData(e.current)
		},
		// 搜索
		search() {
			this.getData(1, this.searchVal)
		},
		// 获取数据
		getData(pageCurrent, value = '') {
			let that = this;
			this.loading = true
			this.pageCurrent = pageCurrent
			this.loading = false
			this.$request({
				path:'/buildingFloor/mobile/selectUsableBuildingFloorByBuildingId',
				query:{
					buildingId:this.buildInfo.id,
				},
			}).then(res=>{
				if(res.data.code == 200){
					
					const list = res.data.data;
					that.tableData = list;
				}
			})
			
		}
		
	}
}
</script>

<style lang="less" scoped>
/* #ifndef H5 */
/* page {
	padding-top: 85px;
} */
/* #endif */
.uni-group {
	display: flex;
	align-items: center;
}
.header{
	color: #000000;
	font-weight: bold;
}

</style>
