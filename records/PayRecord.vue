<template>
  <view class="detailPage">
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
                <picker mode="date" :value="startDate" :start="startDate" :end="endDate">
                    <view class="uni-input">{{startDate}}</view>
                </picker>
            </view>
            <text>至</text>
            <view class="dateInput">
                <picker mode="date" :value="endDate" :start="startDate" :end="endDate">
                    <view class="uni-input">{{endDate}}</view>
                </picker>
            </view>
            
        </view>
        <button class="primary-btn" style="margin-top: 10rpx">查询</button>
    </view>
    <view class="pageContainer">
        
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
                startDate: "",
                endDate: ""
            },
            startDate:getDate('start'),
			endDate:getDate('end'),
            list: [{time: '2021-12-01 15:00:00',amount: 15,status: 1},{time: '2021-12-01 15:00:00',amount: 15,status: 2}],
            PatientInfo:{}
        }
    },
    onLoad() {
        this.PatientInfo = getApp().globalData.PatientList[0];
        this.$getUserId();
        this.getList();
    },
    methods: {
        showUserList() {
            this.$refs.userModelref.show();
        },
        changeUser(row) {
            this.PatientInfo = row;
            this.getList();
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
                }
            })
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
</style>