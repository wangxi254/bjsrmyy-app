<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 22:41:26
 * @LastEditors: seven
 * @LastEditTime: 2021-12-21 23:03:55
-->
<template>
    <uni-popup ref="userpopup">
        <view class="userlist-view">
            <view class="title-model flex justify-between">
                <text>选择就诊人</text>
                <view class="usermanage" @click="goManage">就诊人管理</view>
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
</template>

<script>
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
export default {
    components: { uniPopup },
    data() {
        return {
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
        show() {
            this.$refs.userpopup.open('bottom');
        },
        close() {
            this.$refs.userpopup.close();
        },
        changeUser(row) {
            this.$emit('changeUser',row);
            this.close();
        },
        goManage() {
            uni.navigateTo({
				url:'/mine/diagnose/diagnoseLsit'
			})
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .title-model{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 20rpx;
        box-sizing: border-box;
    }
</style>