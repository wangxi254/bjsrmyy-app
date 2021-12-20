<template>
  <view class="flex flex-wrap justify-center">
      <view class="flex flex-column justify-center" style="width: 30%;margin: 20rpx 0" v-for="(item,index) in Object.keys(icons)" :key="index">
          <uni-icons  class="right" :type="item" size="20" />
          <view>{{item}}</view>
      </view>
      
  </view>
</template>

<script>
import icons from '@/components/uni-icons/icons.js'
export default {
    data(){
        return {
            icons
        }
    }
}
</script>

<style>

</style>