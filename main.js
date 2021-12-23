import Vue from 'vue'
import App from './App'
import './common/styles/main.scss';
import * as filters from './utils/filter'
import hsCard from '@/components/hs-card/index.vue'
import uniTitle from '@/components/uni-title.vue'
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import fullLoading from '@/components/loading/fullloading.vue'
import wybLoading from '@/components/loading/wyb-loading/wyb-loading.vue'


Vue.config.productionTip = false
Vue.component('uni-title',uniTitle)
Vue.component('uni-icon',uniIcons)
Vue.component('hs-card',hsCard)
Vue.component('full-loading',fullLoading)
Vue.component('wybLoading',wybLoading)

import request from 'common/request.js';
Vue.prototype.$request = request.apprequst;
Vue.prototype.$arequest = request.arequest;
Vue.prototype.$getUserId = ()=>{
    const userId = uni.getStorageSync("userId");
    if(userId) return userId;
    else  uni.navigateTo({
        url:"/pages/auth/auth"
    })
}
// 设置用户id 
Vue.prototype.$userId = '346829058917404672'

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])
})

App.mpType = 'app' 

const app = new Vue({
    ...App
})
app.$mount()
