<!--
 * @Author: seven
 * @Date: 2021-12-24 11:01:11
 * @LastEditTime: 2021-12-24 11:23:59
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \my-project\src\pages\pay\success.vue
 * 博虹出品，抄袭必究😄
-->
<template>
  <view class="page flex flex-column items-center">
      <uni-icons class="icon" type="checkbox-filled" size="80" color="#06bb07" style="margin-top: 20px"  />
      <view class="info">支付成功</view>
      <button class="btn btn1">查看订单</button>
      <button class="btn">继续缴费</button>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .info{
    line-height: 4;
  }
  .btn{
    width: calc(100% - 40rpx);
    font-size: $uni-font-size-lg;
    margin: 20rpx 0;
  }
  .btn1{
    background: #06bb07;
    color: #fff;
  }
</style>