<template>
	<view>
		<view>科室名称：{{testReport.depName}}</view>
		<view>检验名称：{{testReport.reportName}}</view>
		<view>检验编号：{{testReport.reportCode}}</view>
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
				
				// let that = this;
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
