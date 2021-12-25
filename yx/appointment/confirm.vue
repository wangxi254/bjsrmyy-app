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
            <view>就诊科室：<text>{{appointmentInfo.depName}}</text><uni-icons class="right" type="arrowright" size="14" /></view>
            <view>就诊医生：<text>{{appointmentInfo.name}}</text><uni-icons class="right" type="arrowright" size="14" /></view>
            <view>挂号费用：<text>￥{{appointmentInfo.price}}</text></view>
        </hs-card>
        <hs-card class="appointdate-view">
            <template v-slot:header>
                <view class="title-model"><text>预约时间</text></view>
            </template>
            <view>时间：<text class="textRed">{{appointmentInfo.currentDate}}</text></view>
            <view>时段：<text class="textRed">{{appointmentInfo.type == 1?"上午":"下午"}}</text></view>
        </hs-card>
        <hs-card class="appointuser-view" @click="showUserList">
            <template v-slot:header>
                <view class="title-model flex justify-between">
                    <text>{{userInfo.name?userInfo.name:'请选择就诊人'}}</text>
                <uni-icons type="arrowright" size="14" /></view>
            </template>
            <view v-if="userInfo.name">身份证号：<text>{{userInfo.credentialNo | haddenIdCard}}</text></view>
            <view v-if="userInfo.name">手机号码：<text>{{userInfo.phone | haddenPhone}}</text></view>
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
    data(){
        return {
            appointmentInfo: {
                describe: "",
                img: "",
                name: "",
                postion: "",
                price: 0,
                surplus: 0,
                timePart: "",
                depName:"",
                type: 0,
                currentDate: "",
            },
            userInfo: {},
            PaientCard: {}
        }
    },
    onLoad: function (option) { //
        option.row && (this.appointmentInfo = JSON.parse(option.row))
        const { PatientList, PatientCard }  = getApp().globalData;
        this.userInfo = PatientList[0];
        this.PaientCard = PatientCard;
    },
    methods: {
        submit() {
            //验证
            if(!this.userInfo.name){
                return uni.showToast({
                    icon:'none',
                    title:"请选择就诊人",
                })
            }
            if(!this.PaientCard.mrn){
                return uni.showToast({
                    icon:'none',
                    title:"暂无病历号",
                })
            }
            uni.showLoading({
                title: "加载中..."
            })
            // 提交订单
            let query = {
                codeId: this.appointmentInfo.codeId,
                seqNum: this.appointmentInfo.seqNum,
                deptCode: this.appointmentInfo.deptCode,
                deptName: this.appointmentInfo.depName,
                pbCode: this.appointmentInfo.pbCode,
                doctorCode: this.appointmentInfo.docCode,
                doctorName: this.appointmentInfo.name,
                appointmentDate: this.appointmentInfo.currentDate,
                phoneNum: this.userInfo.phone,
                timeType: this.appointmentInfo.type + 1,
                timePart: this.appointmentInfo.timePart,
                payAmount: 1,//this.appointmentInfo.price * 100,
                patientId: this.userInfo.id,
                patientName: this.userInfo.name,
                medicalRecordNo: this.PaientCard.mrn,
                certificateType: parseInt(this.userInfo.credentialType),
                certificateNo: this.userInfo.credentialNo,
                registerType: this.appointmentInfo.registerType
            }
            this.$request({
					path:`/registration/order/post`,
					method: 'post',
					query
				}).then(res=>{
                    uni.hideLoading()
                    if(res.data.code == 200) {
                        uni.navigateTo({
                            url:'../appointment/payment?row=' + JSON.stringify({
                                ...res.data.data,
                                currentDate: this.appointmentInfo.currentDate
                            })
                        })
                    }
                })
            
        },
        showUserList() {
            this.$refs.userModelref.show();
        },
        changeUser(row) {
            this.userInfo = row;
            this.$getUserCard(row).then(res=> this.PaientCard = res);
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