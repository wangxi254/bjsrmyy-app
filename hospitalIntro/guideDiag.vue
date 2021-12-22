<template>
	<view>
		电子导诊单
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.requestGuide();
		},
		methods: {
			requestGuide(){
				let date = new Date().toISOString().slice(0, 10);
				this.$request({
					path:"/guideDiag/mobile/selectInfo",
					method:'POST',
					query:{
						userId:uni.getStorageSync("userId"),
						beginDate:date,
						endDate:date,
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>