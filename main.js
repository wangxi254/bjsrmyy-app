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

// 调试
Vue.prototype.$getUserId = ()=>{
    const userId = uni.getStorageSync("userId") || "346829058917404672";
    if(userId) return userId;
    else  uni.navigateTo({
        url:"/pages/auth/auth"
    })
}
// Vue.prototype.$userId = '346829058917404672'
// 调试

//测试
// Vue.prototype.$getUserId = ()=>{
//     const userId = uni.getStorageSync("userId");
//     if(userId) return userId;
//     else  uni.navigateTo({
//         url:"/pages/auth/auth"
//     })
// }
//测试

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])
})


App.mpType = 'app' 

const app = new Vue({
    ...App
})
app.$mount()
