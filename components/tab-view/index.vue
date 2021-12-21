<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-21 23:24:29
 * @LastEditors: seven
 * @LastEditTime: 2021-12-22 01:34:31
-->
<template>
    <view class="tabGroup flex flex-column">
        <view class="tab-header flex">
            <view :class="['tab-item', 'flex-1',item.id === current ? 'active': '']" v-for="(item,index) in tablist"
            @click="clickItem(item)"
            >
                {{item.name}}
            </view>
        </view>
        <view class="tab-body flex-1">
            <scroll-view class="scroll-view" scroll-x="false" :scroll-into-view="'view-item-'+current" scroll-with-animation>
                <view  class="view-item" v-for="(item,index) in tablist" :key="index" :id="'view-item-'+item.id">
                    <slot :row="item" />
                    <!-- <view>
                        <slot :row="item">
                    </view> -->
                </view>
            </scroll-view>
            
        </view>
    </view>
</template>

<script>
export default {
    props: {
        tablist: {
            type: Array,
            default: ()=>{
                return [{name: 'tab1',id: 1},{name: 'tab2',id: 2},{name: 'tab3',id: 3}]
            }
        }  
    },
    data() {
        return {
            current: this.tablist[0]['id'] || 0
        }
    },
    methods: {
        clickItem(row) {
            this.current = row.id;
            this.$emit('tabChange',row.id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabGroup{
        height: 100%;
        .tab-header{
            .tab-item{
                text-align: center;
                line-height: 3;
                font-size: $uni-font-size-lg;
                font-weight: bold;
                &.active{
                    border-bottom: 1rpx solid $uni-color-primary;
                    color: $uni-color-primary;
                }
            }
        }
        .tab-body{
            padding: 20rpx;
            .scroll-view{
                width: 100%;
                white-space: nowrap;
            }
            .view-item{
                height: 100%;
                width: 100vw;
                display: inline-block;
            }
            
        }
    }
</style>