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
    

    <uni-popup ref="userpopup">
        <view class="userlist-view">
            <view class="title-model flex justify-between">
                <text>选择就诊人</text>
                <view class="usermanage">就诊人管理</view>
            </view>
            <scroll-view class="list-view" scroll-y="true">
                <view v-for="(item,index) in userList" :key="index"
                 class="user-item flex justify-between" @click="changeUser(item)">
                    <text>{{item.name}}</text>
                    <text>{{item.idCard}}</text>
                </view>
            </scroll-view>
            
        </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
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
    components: { uniPopup },
    data(){
        return {
            searchForm: {
                startDate: "",
                endDate: ""
            },
            startDate:getDate('start'),
			endDate:getDate('end'),
            userList: [{
                name: "张三",
                idCard: "5201******1211"
            },{
                name: "张三",
                idCard: "5201******1211"
            },{
                name: "张三",
                idCard: "5201******1211"
            },{
                name: "张三",
                idCard: "5201******1211"
            }]
        }
    },
    methods: {
        showUserList() {
            this.$refs.userpopup.open('bottom');
        },
        changeUser(row) {
            this.$refs.userpopup.close();
        },
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
    .userlist-view{
        width: calc(100% - 40rpx);
        background:#fff;
        margin: 0 auto;
        margin-bottom: 20rpx;
        border-radius: $uni-border-radius-lg;
        .title-model{
            border-bottom: none !important;
        }
        .usermanage{
            color: $uni-color-primary;
            font-size: $uni-font-size-sm;
        }
        .list-view{
            max-height: 400rpx;
            overflow: auto;
            // padding: 20rpx;
            box-sizing: border-box;
            .user-item{
                background: $uni-bg-color-grey;
                padding: 30rpx 20rpx;
                border-radius: $uni-border-radius-lg;
                margin: 20rpx;
            }
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
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 20rpx;
        box-sizing: border-box;
    }
</style>