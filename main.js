/*
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-24 18:14:07
 * @LastEditors: seven
 * @LastEditTime: 2021-12-25 17:37:53
 */
import Vue from 'vue'
import App from './App'
import './common/styles/main.scss';
import * as filters from './utils/filter'
import hsCard from '@/components/hs-card/index.vue'
import uniTitle from '@/components/uni-title.vue'
import uniIcons from '@/components/uni-icons/uni-icons.vue'


Vue.config.productionTip = false
Vue.component('uni-title',uniTitle)
Vue.component('uni-icon',uniIcons)
Vue.component('hs-card',hsCard)

import request from 'common/request.js';
Vue.prototype.$request = request.apprequst;
Vue.prototype.$arequest = request.arequest;
Vue.prototype.$getUserCard = request.getUserCard;
Vue.prototype.$getPatientList = request.getPatientList;
Vue.prototype.$userInit = request.userInit;
Vue.prototype.$getUserInfo = request.getUserInfo;
Vue.prototype.$appUpdate = request.appUpdate;

if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function (res) {
				if (res.hasUpdate) {
				updateManager.onUpdateReady(function () {
					console.log('更新')
					wx.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: function (res) {
						if (res.confirm) {
						updateManager.applyUpdate()
						}
					}
					})
				})
				updateManager.onUpdateFailed(function () {
					console.log('已经是最新版本')
					wx.showModal({
					title: '已经有新版本了哟~',
					content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
					})
				})
				}
				console.log(res)
				console.log('获取更新信息完毕')
			})
			console.log('完毕')
		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}

//测试
Vue.prototype.$getUserId = ()=>{
    const userId = uni.getStorageSync("userId");
    if(userId) return userId;
    else  uni.navigateTo({
        url:"/pages/auth/auth"
    })
}


//测试

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])
})


App.mpType = 'app' 

const app = new Vue({
    ...App
})
app.$mount()
