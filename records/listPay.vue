<template>
  <view class="detailPage flex flex-column">
    <hs-card class="user-view">
        <view class="flex justify-between items-center">
            <view class="flex flex-column">
            <text class="username">{{PatientInfo.name?PatientInfo.name:'请选择就诊人'}}</text>
            <text class="idCard">{{(PatientInfo.credentialNo?PatientInfo.credentialNo:'') | haddenIdCard}}</text>
        </view>
        <view class="btn">
            <uni-icons @click="showUserList"  type="settings" size="14" color="#fff" />
        </view>
        </view>
    </hs-card>
    <view class="search-view">
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
    </view>
    <view class="pageContainer flex-1" style="overflow:auto">
        <scroll-view class="flex-1" scroll-y="true"  style="height: calc(100% - 50px)">
            <view class="list">
                <NoData v-if="list.length == 0" />
                <hs-card v-else v-for="(item,index) in list" :key="index" class="list-item" @click="payMoney(item)">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>{{item.visitTime}}</text>
                            <view class="status">
                                <text class="success" v-if="item.settlementState==1">已结算</text>
                                <text class="error" v-else>未结算</text>
                            </view>
                        </view>
                    </template>
                    <view>处方号:<text>{{item.recipeCode}}</text></view>
                    <view>处方信息：<text>{{item.zdInfo}}</text></view>
                    <view>金额:<text>{{item.total}}</text></view>
                    
                </hs-card>
            </view>
        </scroll-view>
    </view>
    <!-- <button class="btns" @click="submit">支付</button> -->
    <userModel ref="userModelref"  @changeUser="changeUser" />
  </view>
</template>

<script>
import userModel from '@/components/userList/index.vue'
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
    components: { userModel },
    data(){
        return {
            searchForm: {
                startDate: new Date().toISOString().slice(0, 10),
                endDate: new Date().toISOString().slice(0, 10),
            },
            PatientInfo: {},
            PatientCard: {},
            list: []
        }
    },
    async onLoad() {
        //const { PatientList, PatientCard }  = getApp().globalData;
        const { PatientList, PatientCard }  = await this.$getUserInfo();
        this.PatientInfo = PatientList[0];
        this.PatientCard = PatientCard;
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
        payMoney(row) {
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
                                    medicalRecordNo: this.PatientCard.mrn,
                                    depCode: row.depCode,
                                    docCode: row.docCode,
                                    certificateType: this.PatientInfo.credentialType,
                                    certificateNo: this.PatientInfo.credentialNo,
                                    phoneNum: this.PatientInfo.phone,
                                    patientId: this.PatientInfo.id,
                                    patientName: this.PatientInfo.name,
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
                    uni.showToast({
                        title: '支付成功',
                        duration: 2000
                    })
                    this.getList()
                },
                fail: err => {
                    uni.showToast({
                        title: '支付失败',
                        duration: 2000
                    })
                }
            });
        },
        getList() {
            uni.showLoading({
                text: "加载中..."
            })
            this.$request({
                path:`/registration/settlement/list`,
                method: 'post',
                query: {
                    mrn:this.PatientCard.mrn,
                    beginDate: this.searchForm.startDate,
                    endDate: this.searchForm.endDate
                }
            }).then(res=>{
                uni.hideLoading();
                if(res.data.code == 200){
                    this.list = res.data.data;
                }else this.list = []
            })
        },
        change1(e) {
            let date = e.detail.value;
			this.searchForm.startDate = date;
        },
        change2(e) {
            let date = e.detail.value;
			this.searchForm.endDate = date;
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
    .btns{
        position: fixed;
        bottom: 0;
        width: 100%;
        font-size: $uni-font-size-lg;
        background: $uni-color-primary;
        color: #fff;
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