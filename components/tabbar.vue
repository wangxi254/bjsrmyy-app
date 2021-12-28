<template>
    <view class="TabBar">
        <view class="tab" v-for="(item,index) in TabBarList" :key="index" @tap="navigatorTo(item)">
            <!-- 判断是否有点击，如果没有就不是激活样式，点击就是激活的样式 -->
            <image class="imgsize" v-if="item.type == 0" :src="current == index ? item.selectIcon : item.icon" mode=""></image>
            <!-- 设置一个状态值（type），判断加号是否展示 -->
            
			<view class="addimgsize" v-if="item.type == 1" >
				<image class="mimgsize" src="../static/tabbar/elecode.png" mode=""></image>
			</view>
            <view class="text">{{item.name}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            current: {
                type: Number,
                default: 0 //默认第一个页面tabbar激活
            }
        },
        data() {
            return {
                TabBarList: [{
                        type: 0,
                        icon: '../static/tabbar/index.png',
                        selectIcon: '../static/tabbar/indexed.png',
                        name: '首页',
						index:0
                    },
                    {
                        type: 1,
                        icon: '../static/tabbar/elecode.png',
                        selectIcon: '../static/tabbar/elecode.png',
                        name: '电子就诊码',
						index:1
                    },
                    {
                        type: 0,
                        icon: '../static/tabbar/home.png',
                        selectIcon: '../static/tabbar/homed.png',
                        name: '我的',
						index:2
                    },
                ]
            }
        },
        methods: {
            navigatorTo(e) {
				console.log("e===>",JSON.stringify(e));
				this.$emit('tabClick',e);
            }
        }
    }
</script>

<style scoped>
.TabBar {
    position: fixed;
    bottom: 0;
    height: 156upx;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
	height: 88upx;
	margin-bottom: 68upx;
}
.imgsize {
	margin-top: 10upx;
    width: 48upx;
    height: 48upx;
}
.addimgsize {
    width: 110upx;
    height: 88upx;
	border-top-left-radius: 70upx;
	border-top-right-radius: 70upx;
    margin-top: -38upx;
	background: #FFFFFF;
}
.mimgsize{
	height: 70upx;
	width: 70upx;
	padding-left: 20upx;
	margin-top: 20upx;
}
.text {
    font-size: 12px;
}
</style>
