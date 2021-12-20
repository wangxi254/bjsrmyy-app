<template>
  <view class="box" :style="'height:'+height">
      <icon type="info" color="#007aff" size="26"/>
      <view>暂无数据 ...</view>
  </view>
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: '80px'
        }
    }
}
</script>

<style lang="scss" scope>
    .box{
        min-height: 80px;
        width: 100%;
        background: #fff;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        view{
            line-height: 2;
            color: $uni-color-primary;
        }
    }
</style>