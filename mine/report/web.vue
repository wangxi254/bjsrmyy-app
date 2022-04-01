<!--
 * @Author: seven
 * @Date: 2022-01-17 13:55:39
 * @LastEditTime: 2022-04-01 23:22:39
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\test\web.vue
 * 博虹出品，抄袭必究😄
-->
<template>
  <web-view :src="src"></web-view>
</template>

<script>
import md5 from 'js-md5';
let Base64 = require('js-base64').Base64
export default {
    data(){
        return {
            src: ""
        }
    },
    onLoad(options){
        let data = options.idCard;
        console.log(data)
        // return
        let hospId = "hl_bjsdyrmyy"
                //this.credentialNo
        let idCard = '522421195307218048' //data;//"522421195307218048"
        let str = Base64.encode(idCard);
        let timescamp = parseInt(new Date().getTime()/1000);
        let md5str = md5(`${hospId}@${idCard}@www.newdcm.com@${timescamp}`);
        //let uri = `http://123.60.31.228/Visit/GetByIDCard?hospId=${hospId}&id=${str}&t=${timescamp}&co=${md5str}`;
        //let uri = `http://61.189.240.138:9007/Visit/GetByIDCard?hospId=${hospId}&id=${str}&t=${timescamp}&co=${md5str}`;
        let uri = `https://bjsyy.gzzxbd.com:9448/Visit/GetByIDCard?hospId=${hospId}&id=${str}&t=${timescamp}&co=${md5str}`;
        console.log(uri)
        this.src = uri
    }
}
</script>

<style>

</style>