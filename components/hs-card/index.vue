<!--
 * @Author: seven
 * @Date: 2021-12-23 09:47:00
 * @LastEditTime: 2021-12-28 11:59:19
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\components\hs-card\index.vue
 * 博虹出品，抄袭必究😄
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
            view{
                line-height: 2;
            }
        }
    }
</style>

