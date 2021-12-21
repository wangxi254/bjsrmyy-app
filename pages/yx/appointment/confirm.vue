<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 20:38:45
 * @LastEditors: seven
 * @LastEditTime: 2021-12-21 23:10:45
-->
<template>
  <view class="detailPage pageContainer">
        <hs-card class="tips-view">
            <uni-title type="h4" title="温馨提示" align="left"></uni-title>
            <view>1、请您如实提供患者的真实姓名、有效证件号</view>
            <view>2、<text class="textRed">自费挂号</text>在医院缴费时按自费结算</view>
            <view>3、<text class="textRed">医保挂号</text>只做预约登记，就诊前需到挂号窗口或自助机取号缴费</view>
        </hs-card>
        <hs-card class="appointinfo-view">
            <template v-slot:header>
                <view class="title-model"><text>预约信息</text></view>
            </template>
            <view>就诊科室：<text>普通外科门诊</text><uni-icons class="right" type="arrowright" size="14" /></view>
            <view>就诊医生：<text>蔡涛</text><uni-icons class="right" type="arrowright" size="14" /></view>
            <view>挂号费用：<text>￥20.50</text></view>
        </hs-card>
        <hs-card class="appointdate-view">
            <template v-slot:header>
                <view class="title-model"><text>预约时间</text></view>
            </template>
            <view>时间：<text class="textRed">2021-12-19</text></view>
            <view>时段：<text class="textRed">上午</text></view>
        </hs-card>
        <hs-card class="appointuser-view" @click="showUserList">
            <template v-slot:header>
                <view class="title-model flex justify-between">
                    <text>张三(自费)</text>
                <uni-icons type="arrowright" size="14" /></view>
            </template>
            <view>身份证号：<text>5201******1211</text></view>
            <view>手机号码：<text>18******39</text></view>
        </hs-card>
        <hs-card class="nodes">
            <view style="line-height: 2">
                当前您的挂号类型为自费挂号，在线支付成功后可直接来院到该诊区就诊，后续如您需要转换为医保结算，请到每层楼的人工窗口进行切换。
            </view>
        </hs-card>
        <button class="primary-btn btn" type="primary" @click="submit">提交</button>
        <userModel ref="userModelref"  @changeUser="changeUser" />
  </view>
</template>

<script>
import userModel from '@/components/userList/index.vue'
export default {
    components: { userModel },
    methods: {
        submit() {
            uni.navigateTo({
					url:'/pages/yx/appointment/payment'
			})
        },
        showUserList() {
            this.$refs.userModelref.show();
        },
        changeUser(row) {
            
        }
    }
}
</script>

<style lang="scss" scoprd>
    .tips-view{
        view{
            line-height: 2;
            font-size: $uni-font-size-sm;
            text{
                font-size: $uni-font-size-sm;
            }
        }
    }
    .title-model{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 20rpx 0;
        box-sizing: border-box;
        text{
            color: $uni-color-primary;
        }
    }
    .appointinfo-view,.appointdate-view,.appointuser-view{
        view{
            margin-bottom: 20rpx;
            color: $uni-text-color-grey;
            text{
                margin-left: 20rpx;
            }
        }
    }
    .btn{
        margin-bottom: 20rpx;
    }
</style>