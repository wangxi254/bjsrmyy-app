<!--
 * @Author: seven
 * @Date: 2022-01-17 13:55:39
 * @LastEditTime: 2022-03-30 15:51:51
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\test\web.vue
 * 博虹出品，抄袭必究😄
-->
<template>
  <web-view :src="src"></web-view>
</template>

<script>
export default {
    data(){
        return {
            src: ""
        }
    },
    onLoad(options){
        let data = options.data;
        let uri = `http://61.189.240.138:9007/Visit/GetByIDCard?hospId=${data.hospId}&id=${data.str}&t=${data.timescamp}&co=${data.md5str}`;
        this.src = uri
    }
}
</script>

<style>

</style>