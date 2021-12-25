<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-24 18:14:07
 * @LastEditors: seven
 * @LastEditTime: 2021-12-25 21:16:33
-->
<script>
	export default {
		onLaunch: async function() {
			uni.$once('Login',function(data){
				this.$getPatientList().then(res=>{
					getApp().globalData.PatientList = res.length>0?res: [{}];
					if(res.length>0) return this.$getUserCard(res[0]);
					else return {};
				}).then(info=>{
					getApp().globalData.PatientCard = info;
				})
			})
			//var globalData = getApp().globalData;
			//获取默认就诊人
			this.$getPatientList().then(res=>{
				getApp().globalData.PatientList = res.length>0?res: [{}];
				if(res.length>0) return this.$getUserCard(res[0]);
				else return {};
			}).then(info=>{
				getApp().globalData.PatientCard = info;
			})
		},
		globalData: {
			PatientList: [],
			PatientCard: {}
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
