<!--
 * @Author: seven
 * @Date: 2022-01-17 09:47:37
 * @LastEditTime: 2022-01-17 14:00:36
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\test\index.vue
 * 博虹出品，抄袭必究😄
-->
<template>
  
</template>

<script>
import md5 from 'js-md5';
 let Base64 = require('js-base64').Base64
export default {
    onShow(){
        let hospId = "123456"
        let idCard = "520123199311031211"
        let str = Base64.encode(idCard);
        console.log('身份证base64加密结果',str)
        let timescamp = parseInt(new Date().getTime()/1000);
        console.log('当前时间10位时间戳',parseInt(new Date().getTime()/1000))
        let md5str = md5(`${hospId}@${idCard}@www.newdcm.com`);
        console.log('当前加密MD5',md5str)
        let uri = `http://61.189.240.138:9007/Visit/GetByIDCard?hospId=${hospId}&id=${str}&t=${timescamp}&co=${md5str}`;
        // window.open(`http://61.189.240.138:9007/Visit/GetByIDCard?hospId=${hospId}&id=${str}&t=${timescamp}&co=${md5str}`)
        uni.navigateTo({
            url: './web?uri=' + uri ,
        })
    }
}
</script>

<style>

</style>