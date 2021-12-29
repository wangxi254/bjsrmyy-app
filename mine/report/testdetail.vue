<template>
	<view>
		<view class="paading15">
			<view class="space-beteewn">
				<view>就诊人：{{testReport.name}}</view>
				<view>性别：{{testReport && testReport.sex == 'M'? '男':'女'}}</view>
				<view>年龄：{{testReport.age}}</view>
			</view>
			<view>身份证号：</view>
		</view>
		
		
		<view>报告单名称：{{testReport && testReport.reportName ? testReport.reportName:''}}</view>
		<view>检验编号：{{testReport && testReport.reportCode ? testReport.reportCode:''}}</view>
		
		<view class="space-beteewn">
			<view>科室名称：{{testReport && testReport.depName ? testReport.depName : ''}}</view>
			<view>申请医生：{{testReport && testReport.sqDoc ? testReport.sqDoc : ''}}</view>
		</view>
		<view>检验时间：{{testReport && testReport.cyTime ? testReport.cyTime :''}}</view>
		
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据" @selection-change="selectionChange">
				<uni-tr>
					<uni-th align="center" width="75">
						<view class="header">检查项目</view>
					</uni-th>
					<uni-th align="center" width="75">
						<view class="header">定性结果</view>
					</uni-th>
					<uni-th align="center" width="75">
						<view class="header">参考值范围</view>
					</uni-th>
					<uni-th align="center" width="75">
						<view class="header">计量单位</view>
					</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td>{{testReport&&testReport.checkResult ? testReport.checkResult :'' }}</uni-td>
					<uni-td>
						{{testReport&&testReport.qualitative?testReport.qualitative:''}}
					</uni-td>
					<uni-td>
						{{testReport&&testReport.reference?testReport.reference:''}}
					</uni-td>
					<uni-td>
						{{testReport&&testReport.measurement?testReport.measurement:''}}
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
		</view>
		<view v-if="testReport && testReport.diagnosis">小结：（临床诊断）{{testReport && testReport.diagnosis ? testReport.diagnosis : ''}}</view>
		<view class="space-beteewn">
			<view>操作人：{{testReport && testReport.reportDoc ? testReport.reportDoc : ''}}</view>
			<view>审核人：{{testReport && testReport.shDoc ? testReport.shDoc : ''}}</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            testReport:{}
	        }
	    },
	    onLoad(options) {
	        if(options.item){
				const item = JSON.parse(options.item);
				this.getDetailInfoByPatient(item);
			}
	    },
	    methods: {
	        // 容器滚动到底部
	        getDetailInfoByPatient(item) {
				let that = this;
	            let date = new Date().toISOString().slice(0, 10);
	            this.$request({
	            	path:'/testReport/mobile/getDetailInfo',
	            	query:{
	            		// mrn:mrn,
	            		reportSeq:item.reportSeq,
	            		reportCode:item.reportCode,
						// userId:uni.getStorageSync("userId"),
						mrn:item.mrn,
	            	}
	            }).then(res=>{
	            	if(res.data.code == 200){
						console.log("getDetailInfo:res====>",JSON.stringify(res));
						that.testReport = res.data.data;
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
	            })
	        },
	    }
	}
	
</script>

<style>
</style>
