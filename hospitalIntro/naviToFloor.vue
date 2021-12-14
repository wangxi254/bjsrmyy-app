<template>
    <view class="content flex-column">
        <view class="top-view flex-center" @tap="clickEvnet(0)">
            点击我实现滚动到顶部
        </view>
        <view class="scroll-view flex-1">
            <scroll-view :scroll-y="true" :scroll-top="scrollTop" :style="{'height':scrollViewH}" scroll-with-animation="true">
                <block v-for="(item,index) in list" :key="index">
                    <view class="item-view">
                        {{item}}
                    </view>
                </block>
            </scroll-view>
        </view>
        <view class="bottom-view flex-center" @tap="clickEvnet(1)">
            点击我实现滚动到底部
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                scrollViewH: "",
                scrollTop: 0,
                list: []
            }
        },
        onLoad(options) {
            let that = this;
            for (var i = 0; i < 100; i++) {
                that.list.push("滚动列表内容" + i)
            }
			
        },
        mounted() {
            let that = this;
            const query = uni.createSelectorQuery().in(this);
            query.select('.scroll-view').boundingClientRect();
            query.exec(res => {
                const scrollViewH = res[0].height;
                console.log("scrollViewH==" + scrollViewH)
                that.scrollViewH = scrollViewH + "px"
            });
        },
        methods: {
            clickEvnet(type) {
                let that = this;
                that.goToBottom(type == 0 ? 0 : 99999)
            },
            // 容器滚动到底部
            goToBottom(scrollTop) {
                let that = this
                that.scrollTop = scrollTop + Math.random() * 10
            },
        }
    }
</script>

<style>
    .content {
        height: 100%;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }
    .flex-center{
        align-items:center;
        justify-content:center;
    }
    .flex-1 {
        flex: 1;
    }

    .scroll-view {
        background-color: red;
        overflow: hidden;
    }

    .top-view,
    .bottom-view {
        background-color: #0081FF;
        height: 50px;
        color: #fff;
        font-size: 18px;
    }

    .item-view {
        color: #333333;
        padding: 10px;
        border-bottom: 1px solid #888888;
    }
</style>
