<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-24 18:14:07
 * @LastEditors: seven
 * @LastEditTime: 2021-12-27 10:43:54
-->
<script>
	export default {
		onLaunch: async function() {
			uni.hideTabBar();
			uni.$once('Login',function(data){
				this.$userInit();
			})
			//var globalData = getApp().globalData;
			//获取默认就诊人
			//this.$userInit();
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
