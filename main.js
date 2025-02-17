/*
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-24 18:14:07
 * @LastEditors: seven
 * @LastEditTime: 2022-05-30 23:18:48
 */
import Vue from 'vue'
import App from './App'
import './common/styles/main.scss';
import * as filters from './utils/filter'
import hsCard from '@/components/hs-card/index.vue'
import uniTitle from '@/components/uni-title.vue'
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import SpullScroll from '@/components/s-pull-scroll/index.vue' 

import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用

Vue.config.productionTip = false
Vue.component('uni-title',uniTitle)
Vue.component('uni-icon',uniIcons)
Vue.component('hs-card',hsCard)
Vue.component('sPullScroll',SpullScroll)

import request from 'common/request.js';
Vue.prototype.$request = request.apprequst;
Vue.prototype.$arequest = request.arequest;
Vue.prototype.$getUserCard = request.getUserCard;
Vue.prototype.$getPatientList = request.getPatientList;
Vue.prototype.$userInit = request.userInit;
Vue.prototype.$getUserInfo = request.getUserInfo;
Vue.prototype.$appUpdate = request.appUpdate;
Vue.prototype.$afterPay = request.afterPay;

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
