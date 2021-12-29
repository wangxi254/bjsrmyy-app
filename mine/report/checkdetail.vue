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
		
		<image v-if="testReport && testReport.picUrl" :src="testReport.picUrl"></image>
		<view v-if="testReport && testReport.checkDetail">检查所见：{{testReport && testReport.checkDetail ? testReport.checkDetail : ''}}</view>
		<view v-if="testReport && testReport.diagnosis">临床诊断：{{testReport && testReport.diagnosis ? testReport.diagnosis : ''}}</view>
		<view v-if="testReport && testReport.qualitative">诊断结果：{{testReport && testReport.qualitative ? testReport.qualitative : ''}}</view>
		<view class="space-beteewn">
			<view>{{testReport && testReport.reportDoc ? testReport.reportDoc : ''}}</view>
			<view>{{testReport && testReport.shDoc ? testReport.shDoc : ''}}</view>
		</view>
		<view>采样时间：{{testReport && testReport.cyTime ? testReport.cyTime:''}}</view>
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
	            	path:'/checkReport/mobile/getDetailInfo',
	            	query:{
	            		// mrn:mrn,
	            		reportSeq:item.reportSeq,
	            		reportCode:item.reportCode,
						// userId:uni.getStorageSync("userId"),
						mrn:item.mrn,
	            	}
	            }).then(res=>{
					console.log("getDetailInfo:res====>",JSON.stringify(res));
	            	if(res.data.code == 200){
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
