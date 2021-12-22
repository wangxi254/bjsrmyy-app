<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 20:38:45
 * @LastEditors: seven
 * @LastEditTime: 2021-12-21 20:52:55
-->
<template>
    <view class="card" @click="_onClick">
        <slot name="header" />
        <view class="card-body">
            <slot />
        </view>
    </view>
</template>

<script>
export default {
    props:{
        title: {
            type:String,
            default: ''
        },
        titlePrefixIcon: {
            type:String,
            default: ''
        },
        titleSuffixIcon: {
            type:String,
            default: ''
        }
    },
    methods: {
        _onClick() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
    .card{
        width: 100%;
        background: #fff;
        border-radius: $uni-border-radius-base;
        box-sizing: border-box;
        margin-bottom: 20rpx;
        .card-body{
            padding: 20rpx;
            min-height: 80rpx;
        }
    }
</style>

