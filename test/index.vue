<!--
 * @Author: seven
 * @Date: 2022-01-17 09:47:37
 * @LastEditTime: 2022-03-30 15:55:33
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\test\index.vue
 * 博虹出品，抄袭必究😄
-->
<template>
  <web-view v-if="src" :src="src"></web-view>
</template>

<script>
import md5 from 'js-md5';
 let Base64 = require('js-base64').Base64
export default {
    data() {
        return {
            src: ''
        }
    },
    onShow(){
        let hospId = "hl_bjsdyrmyy"
        let idCard = "522421195307218048"
        let str = Base64.encode(idCard);
        console.log('身份证base64加密结果',str)
        let timescamp = parseInt(new Date().getTime()/1000);
        console.log('当前时间10位时间戳',parseInt(new Date().getTime()/1000))
        console.log(`${hospId}@${idCard}@www.newdcm.com`)
        let md5str = md5(`${hospId}@${idCard}@www.newdcm.com@${timescamp}`);
        console.log('当前加密MD5',md5str)
        let uri = `http://61.189.240.138:9007/Visit/GetByIDCard?hospId=${hospId}&id=${str}&t=${timescamp}&co=${md5str}`;
        console.log(uri)
        this.src = uri;
        // uni.navigateTo({
        //     url: './web?data=' + JSON.stringify({
        //         hospId,
        //         str,
        //         timescamp,
        //         md5str
        //     }) ,
        // })
    }
}
</script>

<style>

</style>