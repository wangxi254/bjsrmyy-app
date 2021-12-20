<template>
  <view class="detailPage">
      <hs-card class="user-view">
          <view class="flex justify-between items-center">
              <view class="flex flex-column">
                <text class="username">张三</text>
                <text class="idCard">5201******1211</text>
            </view>
            <view class="btn">
                <uni-icons  type="settings" size="14" color="#fff" />
            </view>
          </view>
      </hs-card>
      <view class="pageContainer">
            <view class="text-view flex justify-between">
                <text>预约列表</text>
                <uni-icons  type="settings" size="16" />
            </view>
            <view class="list">
                <hs-card class="list-item">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                                <text class="error">待支付</text>
                                <text class="waring">已锁号</text>
                                <!-- <text class="success">已支付</text>
                                <text class="default">已完成</text>
                                <text class="default">已取消</text> -->
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
                <hs-card class="list-item">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                                <text class="success">已支付</text>
                                <!-- <text class="default">已完成</text>
                                <text class="default">已取消</text> -->
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
                <hs-card class="list-item">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                               <text class="default">已完成</text>
                                 <!-- <text class="default">已取消</text> -->
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
                <hs-card class="list-item">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                                 <text class="default">已取消</text>
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
            </view>
      </view>
      
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .pageContainer{
        padding-top: 0;
    }
    .user-view{
        .username{
            font-weight: bold;
            font-size: $uni-font-size-lg;
        }
        .btn{
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
            background: $uni-color-primary;
            text-align: center;
        }
    }
    .text-view{
        margin: 10rpx 0rpx;
    }
    .list{
        .list-item{
            view{
                margin-bottom: 20rpx;
                color: $uni-text-color-grey;
            }
        }
    }
    
    .title-model{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 20rpx;
        box-sizing: border-box;
        .status{
            text{
                color: #fff;
                display: inline-block;
                margin: 0 10rpx;
                padding: 6rpx 10rpx;
                border-radius: 30rpx;
                font-size: $uni-font-size-sm;
            }
            .error{background: $uni-color-error;}
            .waring{ background: $uni-color-warning;}
            .success{ background: $uni-color-success;}
            .default{ background: #ccc;}
        }
    }
</style>