<template>
  <view class="detailPage">
      <hs-card class="user-view">
          <view class="flex justify-between items-center">
              <view class="flex flex-column">
                <text class="username">张三</text>
                <text class="idCard">5201******1211</text>
            </view>
            <view class="btn">
                <uni-icons @click="showUserList"  type="settings" size="14" color="#fff" />
            </view>
          </view>
      </hs-card>
      <view class="pageContainer">
            <view class="text-view flex justify-between">
                <text>预约列表</text>
                <uni-icons @click="showSearch"  type="settings" size="16" />
            </view>
            <view class="list">
                <hs-card class="list-item" @click="goDetail({})">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                                <text class="error">待支付</text>
                                <text class="waring">已锁号</text>
                                <!-- <text class="success">已支付</text>
                                <text class="default">已完成</text>
                                <text class="default">已取消</text> -->
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
                <hs-card class="list-item" @click="goDetail({})">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                                <text class="success">已支付</text>
                                <!-- <text class="default">已完成</text>
                                <text class="default">已取消</text> -->
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
                <hs-card class="list-item" @click="goDetail({})">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                               <text class="default">已完成</text>
                                 <!-- <text class="default">已取消</text> -->
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
                <hs-card class="list-item" @click="goDetail({})">
                    <template v-slot:header>
                        <view class="title-model flex justify-between items-center">
                            <text>心血管内科门诊</text>
                            <view class="status">
                                 <text class="default">已取消</text>
                            </view>
                        </view>
                    </template>
                    <view>就诊医生：<text>蔡涛</text></view>
                    <view>就诊时间：<text>2021-12-19 下午</text></view>
                    <view>就诊人：<text>张三</text></view>
                </hs-card>
            </view>
      </view>
    <uni-popup ref="searchpopup" type="right" background-color="#fff">
        <view class="search-view">
            <view class="label">请选择预约日期</view>
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
            <view class="label">请选择预约的时间段</view>
            <view class="flex">
                <view @click="clickTags('dayType',1)" :class="['tags',searchForm.dayType == 1?'active':'']">上午</view>
                <view @click="clickTags('dayType',2)" :class="['tags',searchForm.dayType == 2?'active':'']">下午</view>
            </view>
            <view class="label">请选择状态</view>
            
            <view class="status-view flex flex-wrap">
                <view v-for="(item,index) in Object.keys(statusEnum)" :key="index" 
                :class="['tags','status-item',searchForm.status == item?'active':'']"
                @click="clickTags('status',item)">
                    {{statusEnum[item]}}
                </view>
            </view>
            <view class="btngroup flex">
                <button class="primary-btn" @click="submit"> 确认</button>
                <button type="default" @click="reset">重置</button>
            </view>
        </view>
    </uni-popup>
    <userModel ref="userModelref"  @changeUser="changeUser" />
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
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
    components: { uniPopup, userModel },
    data(){
        return {
            statusEnum: {
                1: '未就诊',
                2: '已就诊',
                3: '取消',
                4: '停诊',
                5: '违约',
            },
            searchForm: {
                startDate: "",
                endDate: "",
                dayType: 0,
                status: 0
            },
            startDate:getDate('start'),
			endDate:getDate('end')
        }
    },
    mounted() {
        //this.$refs.userpopup.open('bottom');
    },
    methods: {
        goDetail(row) {
            console.log(row)
            uni.navigateTo({
				url:'/pages/yx/appointment/payment'
			})
        },
        showSearch() {
            this.$refs.searchpopup.open();
        },
        showUserList() {
            this.$refs.userModelref.show();
        },
        changeUser(row) {
            
        },
        clickTags(key,val) {
            this.searchForm[key] = val;
        },
        changeUser(row) {
            this.$refs.userpopup.close();
        },
        submit() {
            this.$refs.searchpopup.close();
        },
        reset() {
            this.$refs.searchpopup.close();
            this.searchForm = {
                startDate: "",
                endDate: "",
                dayType: 0,
                status: 0
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .pageContainer{
        padding-top: 0;
    }
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
    .text-view{
        margin: 10rpx 0rpx;
    }
    .list{
        .list-item{
            view{
                margin-bottom: 20rpx;
                color: $uni-text-color-grey;
            }
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
            .error{background: $uni-color-error;}
            .waring{ background: $uni-color-warning;}
            .success{ background: $uni-color-success;}
            .default{ background: #ccc;}
        }
    }
    .search-view{
        width: 70vw;
        padding: 20rpx;
        view.label{
            line-height: 2;
            color: $uni-text-color-placeholder;
        }
        .tags{
            width: 120rpx;
            text-align: center;
            line-height: 2;
            background: $uni-bg-color-grey;
            margin: 10rpx;
            border-radius: $uni-border-radius-base;
            &.active{
                background: rgba($color: $uni-color-primary, $alpha: 0.2);
                color: $uni-color-primary;
            }
        }
        .status-view{
            .status-item{
                
            }
        }
        .btngroup{
            margin-top: 20rpx;
            button{
                font-size: $uni-font-size-base;
                width: calc(50% - 10rpx);
            }
        }
    }
    .dateInput{
        border: 1rpx solid $uni-border-color;
        border-radius: $uni-border-radius-base;
        padding: 10rpx 20rpx;
    }
    
</style>