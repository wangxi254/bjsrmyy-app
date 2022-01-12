<template>
  <view class="detailPage">
      <hs-card class="pageContainer">
            <view>院区：<text>{{item.district}}</text></view>
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
            <view>缴费渠道：<text>{{item.payChannel}}</text></view>
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
                'M':'男',
                'W':'女',
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

</style>