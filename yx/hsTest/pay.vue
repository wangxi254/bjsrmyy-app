<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-24 21:18:23
 * @LastEditors: seven
 * @LastEditTime: 2021-12-25 21:58:02
-->
<template>
    <view class="detailPage">
        <hs-card class="appointInfo-view">
            <template v-slot:header>
                <view class="title-model flex items-center">
                    <view class="icon"></view>
                    <text>个人信息</text>
                </view>
            </template>
            <view class="content">
                    <view class="label-valitem flex justify-between items-center height40" @click="chooseUser">
                        <label>姓名：</label>
                        <view>
                            <text>{{userInfo.name}}</text>
                            <uni-icons type="arrowright" size="14" />
                        </view>
                    </view>
                    <view class="label-valitem flex justify-between items-center height40">
                        <label>身份证号：</label>
                        <view>
                            <text>{{userInfo.credentialNo | haddenIdCard}}</text>
                        </view>
                    </view>
                    <view class="label-valitem flex justify-between items-center height40">
                        <label>证件类型：</label>
                        <view>
                            <text>{{credentialTyps[parseInt(userInfo.credentialType) - 1]['name']}}</text>
                        </view>
                    </view>
                    <view class="label-valitem flex justify-between items-center">
                        <label>来自地区（选填）</label>
                        <view>
                            <picker :value="selForm.sel1" :range="type1" @change="type1Change" :range-key="item">
                                <view class="flex-row picker-view height40 ">
                                    <view>
                                            {{ selForm.sel1 ||'请选择'}}
                                    </view>
                                    <uni-icons type="arrowright" size="14" />
                                </view>
                            </picker>
                        </view>
                    </view>
                    
            </view>
        </hs-card>
        <hs-card class="appointInfo-view">
            <template v-slot:header>
                <view class="title-model flex items-center">
                    <view class="icon"></view>
                    <text>检验信息</text>
                </view>
            </template>
            <view class="content">
                    <view class="label-valitem flex justify-between items-center">
                        <label>检验对象（选填）</label>
                        <view>
                            <picker :value="selForm.sel2" :range="type2" @change="type2Change" :range-key="item">
                                <view class="flex-row picker-view height40 ">
                                    <view>
                                            {{ selForm.sel2 ||'请选择'}}
                                    </view>
                                    <uni-icons type="arrowright" size="14" />
                                </view>
                            </picker>
                        </view>
                    </view>
                    <view class="label-valitem flex justify-between items-center">
                        <label>采样目的（选填）</label>
                        <view>
                            <picker :value="selForm.sel3" :range="type3" @change="type3Change" :range-key="item">
                                <view class="flex-row picker-view height40 ">
                                    <view>
                                            {{ selForm.sel3 ||'请选择'}}
                                    </view>
                                    <uni-icons type="arrowright" size="14" />
                                </view>
                            </picker>
                        </view>
                    </view>
            </view>
        </hs-card>
        <hs-card class="appointInfo-view">
            <template v-slot:header>
                <view class="title-model flex items-center">
                    <view class="icon"></view>
                    <text>检测金额</text>
                </view>
            </template>
            <view class="content">
                    <view class="label-valitem flex justify-between items-center">
                        <label>支付金额</label>
                        <view>
                            {{amount}}
                        </view>
                    </view>
            </view>
        </hs-card>
        <button class="btn" @click="submit">提交</button>
        <userModel ref="userModelref"  @changeUser="changeUser" />
    </view>
</template>

<script>
import userModel from '@/components/userList/index.vue'
export default {
    components: { userModel },
    data() {
        return {
            credentialTyps:[
					{
						value:1,
						name:'身份证'
					},
					{
						value:2,
						name:'军官证',
					},
					{
						value:3,
						name:'户口本'
					},
					{
						value:4,
						name:'护照',
					},
					{
						value:5,
						name:'外国人永久居住证'
					},
					{
						value:6,
						name:'就诊卡号',
					},
					{
						value:7,
						name:'住院号'
					},
					{
						value:8,
						name:'病历号'
					}
				],
            type1:['本市','境外','湖北（除武汉）','武汉','其他地区'],
            type2:['医务人员','检疫或边防检查人员','冷链相关工作人员','监所工作人员','社会福利养老工作人员','复工复产','境外入境','嫌疑人','复课师生'],
            type3:['病例排查','体检筛选','进博保障','其它（含就诊和住院）'],
            selForm: {
                sel1: undefined,
                sel2: undefined,
                sel3: undefined
            },
            openId: uni.getStorageSync("openId"),
            userInfo: {

            },
            PaientCard: {},
            amount: 0,
            quesionId: null,
        }
    },
    onLoad(options) {
        if(options.row){
            const row = JSON.parse(options.row);
            this.amount = row.money;this.quesionId  = row.id
        }
        
        const { PatientList, PatientCard }  = getApp().globalData;
        this.userInfo = PatientList[0];
        this.PaientCard = PatientCard;
        if(this.userInfo && Object.keys(this.userInfo).length>0){

        }else{
            uni.showModal({
                title: '提示',
                content: '暂无就诊人信息，是否现在去创建',
                success: function (res) {
                    if (res.confirm) {
                        uni.navigateTo({
                            url:'/mine/diagnose/diagnoseLsit'
                        })
                    } else if (res.cancel) {
                        uni.navigateTo({
                            url:'./index'
                        })
                    }
                }
            });
        }
    },
    methods: {
        type1Change(val) {
            this.selForm.sel1 = this.type1[parseInt(val.detail.value)]
        },
        type2Change(val) {
           this.selForm.sel2 = this.type2[parseInt(val.detail.value)]
        },
        type3Change(val) {
            this.selForm.sel3 = this.type3[parseInt(val.detail.value)]
        },
        changeUser(row) {
            this.userInfo = row;
            this.$getUserCard(row).then(res=> this.PaientCard = res);
        },
        chooseUser(row) {
            this.$refs.userModelref.show();
        },
        submit() {
            this.$request({
                path:`/nucleicPatientInfo `,
                method:'post',
                query: {
                    patientMrn: this.PaientCard.mrn,
                    area: this.selForm.sel1,
                    occupationClassify: this.selForm.sel2,
                    purpose: this.selForm.sel3,
                    openId: this.openId,
                    questionId: this.quesionId
                }  
            }).then(res=>{
                if(res.data.code == 200) this.weixinPay(res.data.data)
            })
            
        },
        weixinPay(payinfo) {
            uni.requestPayment({
                timeStamp: payinfo.timeStamp,
                nonceStr: payinfo.nonceStr,
                package: 'prepay_id' + payinfo.packages,
                signType: payinfo.signType,
                paySign: payinfo.paySign,
                success: payFlag => {
                    uni.navigateTo({
                        url:'../../records/listPay'
                    })
                },
                fail: err => {
                    uni.showToast({
                        title: '支付失败',
                        duration: 2000
                    })
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .height40{
        height: 40rpx;
        line-height: 40rpx;
        margin: 20rpx 0;
    }
    .btn{
        position: fixed;
        bottom: 0;
        width: 100%;
        font-size: $uni-font-size-lg;
        background: $uni-color-primary;
        color: #fff;
    }
</style>