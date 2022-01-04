<template>
  <view class="detailPage flex flex-column">
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
    <view class="flex-1" style="overflow: auto">
        <scroll-view class="flex-1" scroll-y="true"  style="height: calc(100% - 20rpx)">
                <NoData v-if="list.length == 0" />
                    <hs-card v-else v-for="(item,index) in list" :key="index" class="list-item">
                        <template v-slot:header>
                            <view class="title-model flex justify-between items-center">
                                <text>{{item.orderName}}</text>
                                <view class="status">
                                    <text>{{item.appointmentDate}}</text>
                                </view>
                            </view>
                        </template>
                        <view>订单iD：<text>{{item.id}}</text></view>
                        <view>就诊人：<text>{{item.patientName}}</text></view>
                        <view>挂号状态：<text>{{statusEnam[item.orderState]}}</text></view>
                        <view>支付金额：<text>{{item.payAmountStr}}</text></view>
                        <view>缴费时间：<text>{{item.appointmentDate||''}}</text></view>
                    </hs-card>
        </scroll-view>
    </view>
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
            startDate:getDate('start'),
			endDate:getDate('end'),
            list: [],
            PatientInfo:{},
            statusEnam: {
                0:'未支付',  1:'已支付' ,2:'已取消'
            }
        }
    },
    // onLoad() {
    //     this.PatientInfo = getApp().globalData.PatientList[0];
    //     this.$getUserId();
    //     this.getList();
    // },
    async onLoad() {
        //const { PatientList, PatientCard }  = getApp().globalData;
        const { PatientList }  = await this.$getUserInfo();
        this.PatientInfo = PatientList[0];
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
        getList() {
            uni.showLoading({
                title: '加载中...'
            })
            this.$request({
                path:`/registration/order/list?phoneNum=${this.PatientInfo.phone}`
            }).then(res=>{
                uni.hideLoading()
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
    .list-item{
            view{
                margin-bottom: 20rpx;
                color: $uni-text-color-grey;
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
        }
    }
</style>