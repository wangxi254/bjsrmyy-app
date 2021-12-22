<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 20:59:26
 * @LastEditors: seven
 * @LastEditTime: 2021-12-21 22:27:53
-->
<template>
    <view class="date-view flex items-center">
        <view class="optBtn">
            <uni-icons @click="clickLast"  type="arrowleft" size="18" />
        </view>
        
        <scroll-view class="day-vew flex-1" scroll-x="true" :scroll-left="LeftWid" scroll-with-animation>
            <view class="day-item" v-for="(item,index) in weekInfo" :key="index" @click="chooseDay(index)">
                    <view class="week">{{item.week}}</view>
                    <view :class="['hasflag',index%2==1?'active':'']">{{index%2==1?'有号':'无号'}}</view>
                    <view :class="['day',current == index?'active':'']"> {{item.day}}</view>
            </view>
        </scroll-view>
        <view class="optBtn">
            <uni-icons @click="clickNext"  type="arrowright" size="18" />
        </view>
        
    </view>
</template>

<script>
export default {
    data() {
        return {
            weekInfo: [],
            LeftWid: 0,
            current: 0
        }
    },
    created() {
        this.setCurrent();
        this.$emit('clickDate',this.weekInfo[0]['date']);
    },
    methods: {
        dealTime(num) {
            var time = new Date()     // 获取当前时间日期
            //判断当前时间是否超过20:00
            time.getHours()>20 && (num = num + 1);
            var date = new Date(time.setDate(time.getDate() + num)).getDate()  //这里先获取日期，在按需求设置日期，最后获取需要的
            var year = time.getFullYear()  //获取年份
            var month = time.getMonth() + 1   // 获取月份
            var day = time.getDay()   //  获取星期
            switch (day) {             //  格式化
            case 0: day = "日"
                break
            case 1: day = "一"
                break
            case 2: day = "二"
                break
            case 3: day = "三"
                break
            case 4: day = "四"
                break
            case 5: day = "五"
                break
            case 6: day = "六"
                break
            }
            var obj = {
            day:  date,
            // month: month,
            week:day,
            date:year+'-'+month + '-' + date
            }
            return obj      // 返回对象
        },
        setCurrent() {
            var arr = []
            for (let i = 0; i < 8; i++) {
                arr.push(this.dealTime(i))
            }
            this.weekInfo = arr;
        },
        clickLast() {
            this.current > 1 && (this.LeftWid -= 50) && (this.current-=1)
        },
        clickNext() {
            this.current < 7 && (this.LeftWid += 50) && (this.current+=1)
        },
        chooseDay(index) {
            this.current = index;
            this.$emit('clickDate',this.weekInfo[index]['date']);
        }
    }
}
</script>

<style lang="scss" scoped>
    .date-view{
        padding: 20rpx;
        background: #fff;
        .optBtn{
            width: 80rpx;
            text-align: center;
        }
        .day-vew{
            width: calc(100% - 160rpx);
            white-space: nowrap;
        }
        .day-item{
            display: inline-block;
            width: 50px;
            margin: 0 10rpx;
            text-align: center;
            .week{
                font-size: $uni-font-size-lg;
                color: $uni-text-color-placeholder;
            }
            .hasflag{
                font-size: $uni-font-size-sm;
                line-height: 2;
                color: $uni-text-color-placeholder;
                &.active{
                    color: $uni-color-primary;
                }
            }
            .day{
                font-size: $uni-font-size-sm;
                color: $uni-text-color-placeholder;
                height: 30px;
                width: 30px;
                line-height: 30px;
                margin: 0 auto;
                &.active{
                    background: $uni-color-primary;
                    border-radius: 50%;
                    color: #fff;
                }
                
            }
        }
    }

</style>