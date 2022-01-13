<template>
  <view class="detailPage">
      <hs-card class="pageContainer">
          <view class="header">
               <view class="flex justify-between">
                        <text>就诊人：{{item.PatientInfo.name}}</text>
                        <text>性别：{{sexEnums[item.PatientInfo.sex] || ''}}</text>
                        <text>年龄：{{item.PatientInfo.ageForAccountApply}}</text>
                </view>
                <view>身份证号：{{item.PatientInfo.credentialNo | haddenIdCard}}</view>
          </view>
          <view>{{item.drugno}}</view>
          <view class="flex justify-between"><text>科室名称：{{item.depName}}</text><text>医生姓名：{{item.docName || ''}}</text></view>
          <!-- <view>明细：</view>
          <view v-for="(x,i) in item.feeList" :key="i">{{x.docMName}}<text style="margin: 0 10rpx">*</text>{{x.num}}</view> -->
          <view>诊断信息：<text>{{item.zdInfo || ''}}</text></view>
          <view class="flex justify-between"><text>订单状态：已结算
              <!-- {{item.settlementState == 1?"已结算":"未结算"}} -->
              </text>
              <text>费用：{{item.total}}</text></view>
            <!-- <view>院区：<text>{{item.district}}</text></view>
            <view>院区名字：<text>{{item.hosname}}</text></view>
            <view>卡号：<text>{{item.cardNum}}</text></view>
            <view>发票号：<text>{{item.invoiceNum}}</text></view>
            <view>科室名称：<text>{{item.depName}}</text></view>
            <view>病人 ID 号：<text>{{item.mrn}}</text></view>
            <view>姓名：<text>{{item.name}}</text></view>
            <view>性别：<text>{{sexEnums[item.sex] || ''}}</text></view>
            <view>年龄：<text>{{item.age}}</text></view>
            <view>费别：<text>{{item.chargeType}}</text></view>
            <view>挂号科室编号：<text>{{item.depCode}}</text></view>
            <view>挂号科室名称：<text>{{item.depName}}</text></view>
            <view>挂号日期：<text>{{item.registerTime}}</text></view>
            <view>本次费用金：<text>{{item.total}}</text></view>
            <view>操作时间：<text>{{item.operTime}}</text></view>
            <view>打印人姓名：<text>{{item.printer}}</text></view>
            <view>处方号：<text>{{item.drugno}}</text></view>
            <view>处方类型：<text>{{item.registerFlag}}</text></view>
            <view>缴费渠道：<text>{{item.payChannel}}</text></view> -->
        </hs-card>
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
            sexEnums: {
                '1':'男',
                '2':'女',
                '':'未知'
            },
            item: {}
        }
    },
    onLoad(options){
        // options.row?(this.item = JSON.parse(options.row)):(this.item = null)
		let that = this 
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('acceptDataFromOpenerPage', function(data) {
			that.item = data.data
		})
    }
}
</script>

<style>
    .header{
        border-bottom: 1px solid #eee;
        padding: 20rpx 0;
        margin-bottom: 20rpx;
    }
</style>