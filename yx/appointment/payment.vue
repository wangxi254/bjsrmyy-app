<template>
  <view class="detailPage pageContainer box">
        <view class="topbg-view"></view>
        <view class="keeptime-view">
            <view class="icon flex justify-center items-center">
                <uni-icons  class="right" type="checkbox" size="20" color="#fff" />
                <text v-if="!onlyShow">已锁号</text>
            </view>
            <!-- <view>剩余: 9分48秒</view> -->
            <view v-if="!onlyShow" class="flex justify-center items-center">
                <view style="margin-right: 10rpx">剩余: </view>
                <uni-countdown  color="#FFFFFF" :show-day="false" :hour="0" :minute="8" :second="0" @timeup="timeup"></uni-countdown>
            </view>
            
            <view v-if="!onlyShow">超时未支付将会自动取消挂号哦!</view>
        </view>
        <hs-card class="appointInfo-view">
            <template v-slot:header>
                <view class="title-model flex justify-between">
                    <text>预约信息</text>
                </view>
            </template>
            <view v-if="!onlyShow">就诊科室：<text>{{info.deptName}}</text></view>
            <view v-if="!onlyShow">就诊医生：<text>{{info.doctorName}}</text></view>
            <view>就诊日期： <text>{{info.currentDate}}</text></view>
            <view>就诊时间：<text>{{info.timeType==1?'上午':'下午'}}</text></view>
            <view>挂号费用：<text>￥{{info.payAmountStr}}</text></view>
        </hs-card>
        <hs-card class="appointuser-view">
            <template v-slot:header>
                <view class="title-model flex justify-between">
                    <text>{{info.patientName}}(自费)</text>
                </view>
            </template>
            <view>身份证号：<text>{{info.certificateNo | haddenIdCard}}</text></view>
            <view>手机号码：<text>{{info.phoneNum | haddenPhone}}</text></view>
        </hs-card>
        <hs-card class="tips-view">
            <uni-title type="h4" title="温馨提示" align="left"></uni-title>
            <view>1、请您如实提供患者的真实姓名、有效证件号</view>
            <view>2、<text class="textRed">自费挂号</text>在医院缴费时按自费结算</view>
            <view>3、<text class="textRed">医保挂号</text>只做预约登记，就诊前需到挂号窗口或自助机取号缴费</view>
        </hs-card>
        <view class="flex justify-end">
            <view class="flex listText" @click="goList">
                <uni-icons style="margin-right: 10rpx" class="right" type="info" size="16" color="#007aff" />
                我的预约记录
            </view>
            
        </view>
        <view v-if="!onlyShow" class="pay-view flex">
            <view class="pay-info flex flex-1 justify-between">
                <view>
                    总费用：<text class="textRed amount">￥{{info.payAmountStr}}</text>
                </view>
                <!-- <text @click="cancel">取消预约</text> -->  
            </view>
            <view class="pay-btn" @click="payfor">立即支付</view>
        </view>
        <button v-if="cancelBtn" class="cancelbtn" @click="confirmMsgback">取消订单</button>
        <view style="height: 100rpx"></view>
        <uni-popup ref="popup" type="dialog">
            <uni-popup-dialog mode="base" title="提示" content="是否确定取消当前预约" @close="closeMsg"
            @confirm="confirmMsg" message="成功消息" :duration="2000"></uni-popup-dialog>
        </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
import uniPopupDialog from '@/components/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
export default {
    components: { uniPopup, uniPopupDialog,uniCountdown },
    data(){
        return {
            info: {},
            openId: uni.getStorageSync("openId")||"",
            onlyShow: false,
            cancelBtn: false
        }
    },
    onLoad(options) {
        options.row? (this.info = JSON.parse(options.row)): (this.info = {})
        if(this.info.hasOwnProperty('active')){
            this.onlyShow = true
            if(this.info.active == 1){
                var time = new Date()
                var year = time.getFullYear()  //获取年份
                var month = time.getMonth() + 1 
                var date = new Date(time.setDate(time.getDate() + 1)).getDate() 
                var nowDate = year+'/'+month + '/' + date
                if(this.info.currentDate>nowDate){
                    this.cancelBtn = true;
                }
            }

            
        }
    },
    onUnload() {
        const pages = getCurrentPages();
        if(pages[pages.length - 2]['route'] == 'yx/appointment/confirm') {
            uni.navigateBack({  
                delta: 2  
            }); 
        }
    },
    methods:{
        payfor(){
            uni.showLoading({
                title:"加载中..."
            })
            this.$request({
					path:`/registration/order/xl-wx-applet-pay?openId=${this.openId}&orderId=${this.info.id}`
				}).then(res=>{
                    uni.hideLoading()
					const payinfo = res.data.data;
					uni.requestPayment({
						timeStamp: payinfo.timeStamp,
						nonceStr: payinfo.nonceStr,
						package: 'prepay_id' + payinfo.packages,
						signType: payinfo.signType,
						paySign: payinfo.paySign,
						success: payFlag => {
                            uni.navigateTo({
                                url:'../appointRecord/index'
                            })
						},
						fail: err => {
                            uni.showToast({
                                title: "支付失败",
                                duration: 2000
                            })
                            setTimeout(()=>{
                                uni.navigateTo({
                                    url:'../appointRecord/index'
                                })
                            },2000)
						}
					});
            })
        },
        cancel() {
            this.$refs.popup.open()
        },
        closeMsg() {
            this.$refs.popup.close()
        },
        confirmMsg() {
            if(!this.info.id) {
                return uni.showToast({
                        icon: 'none',
                        title: "暂无订单id",
                        duration: 2000
                })
            }
            this.$request({
                path:`/registration/order/cancel?orderId=${this.info.id}`
            }).then(res=>{
                if(res.data.code == 200){
                    uni.showToast({
                        icon: 'none',
                        title: "取消成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        // uni.navigateTo({
                        //         url:'../appointRecord/index'
                        // })
                        uni.navigateBack();
                    })
                }
            })
            
        },
        confirmMsgback() {
            if(!this.info.preId) {
                return uni.showToast({
                        icon: 'none',
                        title: "暂无订单id",
                        duration: 2000
                })
            }
            this.$request({
                path:`/registration/order/cancel?preId=${this.info.preId}`
            }).then(res=>{
                if(res.data.code == 200){
                    uni.showToast({
                        icon: 'none',
                        title: "取消成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        uni.navigateTo({
                                url:'../appointRecord/index'
                        })
                    })
                }
            })
        },
        goList() {
            uni.navigateTo({
					url:'../appointRecord/index'
			})
        },
        timeup() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .topbg-view{
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 400rpx;
        background: $uni-color-primary;
    }
    .keeptime-view{
        text-align: center;
        margin-bottom: 40rpx;
        text,view{
            color: #fff;
        }
        .icon{
            width: 200rpx;
            height: 80rpx;
            border: 1rpx solid #fff;
            border-radius: 50rpx;
            margin: 0 auto;
            margin-bottom: 20rpx;
        }
    }
    .title-model{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 20rpx;
        box-sizing: border-box;
    }
    .appointInfo-view,.appointuser-view{
        view{
            margin-bottom: 20rpx;
            // color: $uni-text-color-grey;
            text{
                margin-left: 20rpx;
            }
        }
    }
    .tips-view{
        view{
            line-height: 2;
            font-size: $uni-font-size-sm;
            text{
                font-size: $uni-font-size-sm;
            }
        }
    }
    .listText{
        color: $uni-color-primary;
        margin: 10rpx;
    }
    .pay-view{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 100rpx;
        line-height: 100rpx;
        background: #fff;
        .pay-info{
            padding: 0 20rpx;
        }
        .pay-btn{
            width: 30%;
            height: 100%;
            background: $uni-color-error;
            color: #fff;
            text-align: center;
            font-size: $uni-font-size-lg;
        }
    }
    ::v-deep .uni-countdown__number,.uni-countdown__splitor{
        color: #fff !important;
        font-size: $uni-font-size-sm !important;
    }
    ::v-deep .uni-countdown__splitor{
        color: #fff !important;
        font-size: $uni-font-size-sm !important;
    }
    .cancelbtn{
        width: calc(100% - 40rpx);
        font-size: $uni-font-size-lg;
        background: $uni-color-error;
        color: #fff;
    }
</style>