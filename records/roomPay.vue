<template>
  <view class="detailPage">
      <s-pull-scroll ref="pullScroll" :pullDown="pullDown">
    <hs-card class="user-view">
        <view class="flex justify-between items-center">
            <view class="flex flex-column">
            <text class="username">{{PatientInfo.name?PatientInfo.name:'请选择就诊人'}}</text>
            <text class="idCard">{{(PatientInfo.credentialNo?PatientInfo.credentialNo:'') | haddenIdCard}}</text>
        </view>
        <view class="flex items-center" @click="showUserList">
            <!-- <uni-icons @click="showUserList"  type="settings" size="14" color="#fff" /> -->
            <view class="font-size-14-w400 text-color-8f8f8f">切换</view>
            <image class="right marginl10" style="width: 10px;height: 10px" src="../static/common/exchange.png"></image>
        </view>
        </view>
    </hs-card>
    <view class="space-between paadinglr15">
        <picker mode="date" :value="searchForm.startDate" @change="change1">
            <view class="picker-view flex items-center" >
                <view class="font-size-14-w400 text-color-8f8f8f">开始：</view>
                <view class="font-size-14-w400 text-color-333333">
                    {{searchForm.startDate||'选择日期'}}
                </view>
                <image class="marginl10" style="width: 10px;height: 10px" src="../static/common/down.png"></image>
            </view>
        </picker>
        <picker mode="date" :value="searchForm.endDate" @change="change2">
            
            <view class="picker-view height50 flex items-center">
                <view class="font-size-14-w400 text-color-8f8f8f">结束：</view>
                <view class="font-size-14-w400 text-color-333333">
                    {{searchForm.endDate||'选择日期'}}
                </view>
                <image class="marginl10" style="width: 10px;height: 10px" src="../static/common/down.png"></image>
            </view>
        </picker>
    </view>
    <!-- <view class="search-view">
        <view class="date-view flex justify-between items-center">
            <view class="dateInput">
                <picker mode="date" :value="searchForm.startDate" :start="startDate" :end="endDate" @change="change1">
                    <view class="uni-input">{{searchForm.startDate}}</view>
                </picker>
            </view>
            <text>至</text>
            <view class="dateInput">
                <picker mode="date" :value="searchForm.endDate" :start="startDate" :end="endDate" @change="change2">
                    <view class="uni-input">{{searchForm.endDate}}</view>
                </picker>
            </view>
            
        </view>
         <button class="primary-btn" style="margin-top: 10rpx" @click="getList">查询</button>
    </view> -->
    <view class="pageContainer">
        <NoData v-if="list.length == 0" />
        <hs-card class="appointInfo-view" v-for="(item,index) in list" :key="index">
            <template v-slot:header>
                <view class="title-model flex items-center justify-between">
                    <view class="flex items-center">
                        <view class="icon"></view>
                        <text>{{item.district}}>{{item.depName}}</text>
                    </view>
                    <view>{{item.admissionTime}}-{{item.leaveTime}}</view>
                    <view>{{item.status==1?'住院中':'出院'}}</view>
                </view>
            </template>
            <view>
                <view class="group-item">
                    <label for="">科室</label>
                    <text>{{item.depName}}</text>
                </view>
                <view class="group-item">
                    <label for="">医生</label>
                    <text>{{item.docName}}</text>
                </view>
                <view class="group-item">
                    <label for="">总费用</label>
                    <text>{{item.total}}</text>
                </view>
                <view class="group-item">
                    <label for="">预缴款总额</label>
                    <text>{{item.preTotal}}</text>
                </view>
                <view class="group-item">
                    <label for="">预缴款余额</label>
                    <text>{{item.preBalance}}</text>
                </view>
            </view>
        </hs-card>
    </view>
      </s-pull-scroll>
    <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog mode="input" message="成功消息" :duration="2000" @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
    <userModel ref="userModelref"  @changeUser="changeUser" />
    
    <button class="bottom" @click="openNums">充值</button>
  </view>
</template>

<script>
import userModel from '@/components/userList/index.vue'
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
import uniPopupDialog from '@/components/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
import NoData from '@/components/nodata/index.vue'
const time = new Date();
function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 10;
		} else if (type === 'end') {
			year = year + 10;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
}
export default {
    components: { userModel, uniPopup ,uniPopupDialog, NoData },
    data(){
        return {
            searchForm: {
                startDate: new Date(time.setDate(time.getDate() - 30)).toISOString().slice(0, 10),
                endDate: new Date().toISOString().slice(0, 10),
            },
            startDate:getDate('start'),
			endDate:getDate('end'),
            PatientInfo: {},
            list: [],
            currentInfo:null,
            openId: uni.getStorageSync("openId"),
            PaientCard: {}
        }
    },
    async onLoad() {
        //const { PatientList, PatientCard }  = getApp().globalData;
        const { PatientList, PatientCard }  = await this.$getUserInfo();
        this.PatientInfo = PatientList[0];
        this.PaientCard = PatientCard;
        this.getList();
    },
    methods: {
        showUserList() {
            this.$refs.userModelref.show();
        },
        changeUser(row) {
            this.PatientInfo = row;
            this.$getUserCard(row).then(res=>{
                this.PatientCard = res
                this.getList();
            });
        },
        pullDown(pullScroll) {
            this.getList();
            setTimeout(()=>{
                pullScroll.success();
            },2000)
        },
        getList() {
            uni.showLoading({
                text: "加载中..."
            })
            this.$request({
                path:`/registration/inHospital/list`,
                method: 'post',
                query: {
                    cardType:this.PatientInfo.credentialType,
                    cardNum : this.PatientInfo.credentialNo,
                    ...this.searchForm.startDate?{
                        beginDate: this.searchForm.startDate,
                        endDate: this.searchForm.endDate
                    }:{}
                    
                }
            }).then(res=>{
                uni.hideLoading()
                if(res.data.code == 200) {
                    this.list = res.data.data || [];
                    this.currentInfo = this.list.find(item=>{
                        return item.status == 1
                    })
                }else this.list = []
            })
        },
        openNums() {
            if(!this.currentInfo){
                return uni.showToast({
                    icon: 'none',
                    title: '暂无住院信息,不可充值',
                    duration: 2000
                })
            }
            this.$refs.inputDialog.open();
        },
        getPaientCard(PaientInfo) {
            uni.showLoading({
                title: '加载中...'
            })
            this.$request({
                path:`/tpatientCard/mobile/getPatientCardByPatientInfo?condition=${PaientInfo.credentialNo}&conditionType=${PaientInfo.credentialType}`,
            }).then(res=>{
                uni.hideLoading();
                if(res.data.code == 200) {
                    this.PaientCard = res.data.data;
                }
            })
        },
        confirm(val){
            if(val){
                this.$request({
                    path:`/registration/inHospital/create-order-and-pay`,
                    method: 'post',
                    query: {
                        openId: this.openId,
                        payAmountStr: parseInt(val), //*100,
                        patientMedicalRecordNo: this.PaientCard.mrn,
                        depCode: this.currentInfo.depCode,
                        docCode: this.currentInfo.docCode,
                        certificateType: this.PatientInfo.credentialType,
                        certificateNo: this.PatientInfo.credentialNo,
                        phoneNum: this.PatientInfo.phone,
                        patientId: this.PatientInfo.id,
                        patientName: this.PatientInfo.name,
                        jsonStr: this.currentInfo.jsonStr
                    }
                }).then(res=>{
                    if(res.data.code == 200) this.weixinPay(res.data.data)
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
                    //刷新列表
                    uni.showLoading({
                        title: '加载中...'
                    })
                    this.$afterPay({
                        order: payinfo.orderId,
                        responseData: payFlag,
                        status: 'success'
                    })
                    setTimeout(()=>{
                        uni.hideLoading()
                    },2000)
                    this.getList();
                    // uni.navigateTo({
                    //     url:'../../records/listPay'
                    // })
                },
                fail: err => {
                    this.$afterPay({
                        order: payinfo.orderId,
                        responseData: err,
                        status: 'fail'
                    })
                    uni.showToast({
                        title: "支付失败",
                        duration: 2000
                    })
                }
            });
        },
        change1(e) {
            let date = e.detail.value;
			this.searchForm.startDate = date;
            this.getList();
        },
        change2(e) {
            let date = e.detail.value;
			this.searchForm.endDate = date;
            this.getList();
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .search-view{
        background: #fff;
        padding: 20rpx;
        margin-top: -18rpx;
        .dateInput{
            // border: 1rpx solid $uni-border-color;
            background: $uni-bg-color-grey;
            border-radius: $uni-border-radius-base;
            padding: 10rpx 20rpx;
            width: calc(50% - 50rpx);
            box-sizing: border-box;
            text-align: center;
        }
    }
    .title-model{
        border-bottom: 1px solid #eee;
        line-height: 2;
        padding: 20rpx;
        .icon{
            width: 10rpx;
            height: 32rpx;
            background: $uni-color-primary;
            border-radius: 8rpx;
            margin-right: 10rpx;
        }
    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: $uni-color-primary;
        text-align: center;
        color: #fff;
    }
    .group-item{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    .pageContainer{
        margin-bottom: 50px;
    }
</style>