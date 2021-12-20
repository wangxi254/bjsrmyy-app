import Vue from 'vue'
import App from './App'
import './common/styles/main.scss';
import hsCard from '@/components/hs-card/index.vue'
import uniTitle from '@/components/uni-title.vue'
import uniIcons from '@/components/uni-icons/uni-icons.vue'



Vue.config.productionTip = false
Vue.component('uni-title',uniTitle)
Vue.component('uni-icon',uniIcons)
Vue.component('hs-card',hsCard)

import request from 'common/request.js';
Vue.prototype.$request = request.apprequst;

App.mpType = 'app' 

const app = new Vue({
    ...App
})
app.$mount()
