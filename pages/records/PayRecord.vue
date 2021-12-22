<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 20:38:45
 * @LastEditors: seven
 * @LastEditTime: 2021-12-22 01:35:06
-->
<template>
    <tabView style="height: 100vh" :tablist="tablist" @tabChange="tabChange">
        <template #default="scope">
            <!-- <view>{{JSON.stringify(scope)}}</view> -->
            123123
           <!-- {{JSON.stringify(scope)}} -->
        </template>
    </tabView>
</template>

<script>
import tabView from '@/components/tab-view/index.vue'
export default {
    components: { tabView },
    data() {
        return {
            tablist: [{name: '全部',id: 1},{name: '未支付',id: 2},{name: '已支付',id: 3}]
        }
    },
    methods: {
        tabChange(id) {
            
        }
    }
}
</script>

<style>

</style>