<!--
 * @Author: seven
 * @Date: 2021-12-23 09:47:01
 * @LastEditTime: 2021-12-24 10:19:07
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\App.vue
 * 博虹出品，抄袭必究😄
-->
<script>
	export default {
		onLaunch: async function() {
			//var globalData = getApp().globalData;
			//获取默认就诊人
			const res = await this.$request({
				path:`/patient/mobile/getPatientByUserId?userId=${this.$userId}`,
			})
			if(res.data.code == 200) {
				const current = res.data.data || [{}];
				getApp().globalData.PatientList = current;
			}else getApp().globalData.PatientList = [{}];
		},
		globalData: {
			PatientList: []
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		render:function(createElement){
			return createElement('div',{
				style:{
					color: '#333'
				}
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
</style>
