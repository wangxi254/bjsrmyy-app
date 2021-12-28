<template>
    <view class="TabBar">
        <view class="tab" v-for="(item,index) in TabBarList" :key="index" @tap="navigatorTo(item)">
            <!-- 判断是否有点击，如果没有就不是激活样式，点击就是激活的样式 -->
            <image class="imgsize" v-if="item.type == 0" :src="current == index ? item.selectIcon : item.icon" mode="widthFix"></image>
            <!-- 设置一个状态值（type），判断加号是否展示 -->
            <image class="addimgsize" v-if="item.type == 1" src="../static/tabbar/elecode.png" mode="widthFix"></image>
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
                        icon: '/static/tabbar/index.png',
                        selectIcon: '/static/tabbar/indexed.png',
                        name: '首页',
                        url: '/pages/index/index',
						midButton: false,
						customIcon: false,
						index:0,
                    },
                    {
                        type: 1,
                        icon: '/static/tabbar/elecode.png',
                        selectIcon: '/static/tabbar/elecode.png',
                        name: '发布供需',
                        url: '/pages/eleguide/eleguide',
						midButton: true,
						customIcon: false,
						index:1,
                    },
                    {
                        type: 0,
                        icon: '/static/tabbar/home.png',
                        selectIcon: '/static/tabbar/homed.png',
                        name: '我的',
                        url: '/pages/mine/mine',
						midButton: false,
						customIcon: false,
						index:2,
                    },
                ], 
            }
        },
        methods: {
            navigatorTo(e) {
				console.log("e===>",JSON.stringify(e));
				this.$emit('tabclick',e);
            }
        }
    }
</script>

<style scoped>
.TabBar {
    position: fixed;
    bottom: 0;
    height: 80upx;
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
}
.imgsize {
    width: 40upx;
    height: 40upx;
}
.addimgsize {
    width: 70upx;
    height: 70upx;
    margin-top: -30upx;
}
.text {
    font-size: 12px;
}
</style>