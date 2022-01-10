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
        <!-- <NoData v-if="list.length == 0" /> -->
        <hs-card v-for="(item,index) in list1" :key="index" class="list-item" @click="goDetail(0,item)">
            <template v-slot:header>
                <view class="title-model flex justify-between items-center">
                    <text>{{item.registerTime || getdate}}</text>
                    <view class="status">
                        <text class="err">待支付</text>
                    </view>
                </view>
            </template>
            <view>院区：<text>{{item.district}}</text></view>
            <view>处方号：<text>{{item.drugno}}</text></view>
            <view>处方类别：<text>{{item.recipeType}}</text></view>
            <view>支付金额：<text>{{item.total}}</text></view>
        </hs-card>
        <hs-card  v-for="(item,index) in list2" :key="index" class="list-item" @click="goDetail(1,item)">
            <template v-slot:header>
                <view class="title-model flex justify-between items-center">
                    <text>{{item.registerTime || getdate}}</text>
                    <view class="status">
                        <text class="success">已支付</text>
                    </view>
                </view>
            </template>
            <view>院区：<text>{{item.district}}</text></view>
            <view>处方号：<text>{{item.drugno}}</text></view>
            <view>处方类别：<text>{{item.registerFlag}}</text></view>
            <view>支付金额：<text>{{item.total}}</text></view>
        </hs-card>
        <NoData v-if="list1.length == 0 && list2.length == 0" />
    </view>
    </s-pull-scroll>
    <userModel ref="userModelref"  @changeUser="changeUser" />
  </view>
</template>

<script>
import userModel from '@/components/userList/index.vue'
import NoData from '@/components/nodata/index.vue'
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
    components: { userModel,NoData },
    data(){
        return {
            searchForm: {
                startDate: new Date().toISOString().slice(0, 10),
                endDate: new Date().toISOString().slice(0, 10),
            },
            startDate:getDate('start'),
			endDate:getDate('end'),
            PatientInfo: {},
            PatientCard:{},
            list1: [],
            list2: []
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
        goDetail(type,row){
            if(type == 0) {
                let data = {
                    ...row,
                    PatientInfo: this.PatientInfo,
                    PatientCard: this.PatientCard
                }
                uni.navigateTo({
                    url:'./listRecord/pageOne?row=',
					success: function(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', { data: data })
					}
                })
            }else{
                uni.navigateTo({
                    url:'./listRecord/pageTwo?row=',
					success: function(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', { data: row })
					}
                })
            }
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
                path:`/registration/settlement/ty-outpatient-list`,
                method: 'post',
                query: {
                    mrn: this.PatientCard.mrn,
                    certificateType:this.PatientInfo.credentialType,
                    certificateNo : this.PatientInfo.credentialNo,
                    beginDate: this.searchForm.startDate,
                    endDate: this.searchForm.endDate
                }
            }).then(res=>{
                uni.hideLoading();
                if(res.data.code == 200){
                    this.list1 = res.data.data.notPayList;
                    this.list2 = res.data.data.paidList
                }else {
                    this.list1 = []
                    this.list2 = []
                }
            })
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
    .list-item{
        .title-model{
            width: 100%;
            border-bottom: 1px solid #eee;
            padding: 20rpx;
            box-sizing: border-box;
            .status{
                .success {
                     color: $uni-text-color-disable;
                }
                .err{
                    color: $uni-color-error;
                }
                text{
                    // color: #fff;
                    // display: inline-block;
                    // margin: 0 10rpx;
                    // padding: 6rpx 10rpx;
                    // border-radius: 30rpx;
                    // font-size: $uni-font-size-sm;
                }
            }
        }
    }
    
</style>