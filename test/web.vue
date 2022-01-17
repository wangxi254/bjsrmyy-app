<!--
 * @Author: seven
 * @Date: 2022-01-17 13:55:39
 * @LastEditTime: 2022-01-17 14:01:10
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
        this.src = options.uri
    }
}
</script>

<style>

</style>