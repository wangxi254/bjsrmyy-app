<template>
  <view class="detailPage">
    <view v-if="item">
        <hs-card class="pageContainer">
            <view class="header">
                <view class="flex justify-between">
                        <text>就诊人：{{item.PatientInfo.name}}</text>
                        <text>性别：{{sexEnums[item.PatientInfo.sex] || ''}}</text>
                        <text>年龄：{{item.PatientInfo.ageForAccountApply}}</text>
                </view>
                <view>身份证号：{{item.PatientInfo.credentialNo | haddenIdCard}}</view>
            </view>
            <view>{{item.recipeCode}}</view>
            <view class="flex justify-between"><text>科室名称：{{item.depName}}</text><text>医生姓名：{{item.docName}}</text></view>
            <view>明细：</view>
            <view v-for="(x,i) in item.feeList" :key="i">{{x.docMName}}<text style="margin: 0 10rpx">*</text>{{x.num}}</view>
            <view>诊断信息：<text>{{item.zdInfo}}</text></view>
            <view class="flex justify-between">
                <text>订单状态：未结算</text><text>费用：{{item.total}}</text></view>
                <!-- <view>院区：<text>{{item.district}}</text></view>
                <view>医院唯一号：<text>{{item.seqNum}}</text></view>
                <view>处方号：<text>{{item.drugno}}</text></view>
                <view>科室编号：<text>{{item.depCode}}</text></view>
                <view>科室名称：<text>{{item.depName}}</text></view>
                <view>医生编号：<text>{{item.docCode}}</text></view>
                <view>医生姓名：<text>{{item.docName}}</text></view>
                <view>处方类别：<text>{{item.recipeType}}</text></view>
                <view>就诊时间：<text>{{item.visitTime}}</text></view>
                <view>总费用：<text>{{item.total}}</text></view>
                <view>就诊状态：<text>{{visitStatusEnums[parseInt(item.visitStatus)]|| ''}}</text></view>
                <view>诊断信息：<text>{{item.zdInfo}}</text></view>
                <view>处方来源：<text>{{enums[item.lyInfo] || "未知"}}</text></view>
                <view>结算状态：<text>{{item.settlementState == 1?"已结算":"未结算"}}</text></view> -->
        </hs-card>
        <button class="btn" @click="submit">支付</button>
    </view>
    <NoData v-else />
  </view>
</template>

<script>
import NoData from '@/components/nodata/index.vue'
export default {
    components: { NoData },
    data(){
        return {
            enums:{
                'O':'门诊',
                'P':'体检',
                'E':'急诊',
                'I':'住院',
            },
            visitStatusEnums:{
                1:'半年内',
                2:'半年外',
                3:'全部'
            },
            sexEnums: {
                '1':'男',
                '2':'女',
                '':'未知'
            },
            item: {}   
        }
    },
    async onLoad(options){
        // options.row?(this.item = JSON.parse(options.row)):(this.item = null)
		let that = this 
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('acceptDataFromOpenerPage', function(data) {
			that.item = data.data
		})
    },
    methods: {
        submit() {
            this.payMoney()
        },
        payMoney() {
            const row = this.item;
            if(row.settlementState!=1){
                uni.showModal({
                    title:'提示',
                    content: '当前订单未支付，是否现在支付',
                    success: (res)=>{
                        if(res.confirm){
                            uni.showLoading({
                                text: "加载中..."
                            })
                            this.$request({
                                path: `/registration/settlement/create-order-and-pay`,
                                method:'post',
                                query: {
                                    openId: uni.getStorageSync("openId"),
                                    payAmountStr: row.total,
                                    medicalRecordNo: row.PatientInfo.mrn && row.PatientInfo.mrn.length > 0 ? row.PatientInfo.mrn : row.PatientCard.mrn,
                                    depCode: row.depCode,
                                    docCode: row.docCode,
                                    certificateType: row.PatientInfo.credentialType,
                                    certificateNo: row.PatientInfo.credentialNo,
                                    phoneNum: row.PatientInfo.phone,
                                    patientId: row.PatientInfo.id,
                                    patientName: row.PatientInfo.name,
                                    jsonStr: row.jsonStr
                                }
                            }).then(data=>{
                                uni.hideLoading();
                                if(data.data.code == 200) this.weixinPay(data.data.data)
                            })
                        }
                    }
                })
            }
        },
        weixinPay(payinfo) {
            uni.requestPayment({
                timeStamp: payinfo.timeStamp,
                nonceStr: payinfo.nonceStr,
                package: 'prepay_id' + payinfo.packages,
                signType: payinfo.signType,
                paySign: payinfo.paySign,
                success: payFlag => {
                    this.$afterPay({
                        order: payinfo.orderId,
                        responseData: payFlag,
                        status: 'success'
                    })
                    uni.showToast({
                        title: '支付成功',
                        duration: 2000
                    })
                    uni.navigateBack()
                },
                fail: err => {
                    this.$afterPay({
                        order: payinfo.orderId,
                        responseData: err,
                        status: 'fail'
                    })
                    uni.showToast({
                        title: '支付失败',
                        duration: 2000
                    })
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .btn{
        width: calc(100% - 40rpx);
        font-size: $uni-font-size-lg;
        background: $uni-color-primary;
        color: #fff;
    }
    .header{
        border-bottom: 1px solid #eee;
        padding: 20rpx 0;
        margin-bottom: 20rpx;
    }
</style>