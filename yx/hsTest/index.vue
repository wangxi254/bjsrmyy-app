<!--
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2021-12-24 21:09:34
 * @LastEditors: seven
 * @LastEditTime: 2021-12-27 00:16:35
-->
<template>
    <view class="container">
        <view class="banner">
            
        </view>
        <view class="content">
            <view class="notes">
                尊敬的患者 ： 根据国家卫生健康委员会、国家中医药 
                管理局颁发的《新型冠状病毒肺炎诊疗方案》的文件，依照 
                乙类传染病、甲类传染病管理要求，需要全面统计填报新型 
                冠状病毒感染的肺炎疫情防控信息，请您提供真实、准确的 
                流行病学史信息，感谢您的配合。
            </view>
            <view class="list">
                <view class="item" v-for="(item,index) in list" :key="index">
                    <view class="title">
                        {{index + 1}}、{{item.title}}
                    </view>
                    <radio-group  @change="radioChange" :id="index">
                        <view class="radiao"><radio color="#007aff" :value="true" :checked="item==true" />是</view>
                        <view class="radiao"><radio color="#007aff" :value="false" :checked="item==false" />否</view>
                    </radio-group>
                </view>
            </view>
        </view>
        
        <button class="btn" @click="submit">提交</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {title: "近3天是否发热（体温＞ 37.3℃。)",val: ""},
                {title: "入院前14天内有病例报告社区的旅行史或居住史。或与 来自上述地区人员接触。入院前14天内曾接触过来自有病例报告社区的发热或有呼吸道症状的患者",val: ""},
                {title: "入院前14天内曾接触过来自有病例报告社区的发热或有呼吸道症状的患者。",val: ""},
                {title: "入院前14天内与新型冠状病毒感染的患者或无症状感 染者有接触史。",val: ""},
                {title: "近3天是否发热（体温＞ 37.3℃。)",val: ""},
                {title: "近3天是否发热（体温＞ 37.3℃。)",val: ""},
            ],
            keyArr: ['answerOne','answerTwo','answerThree','answerFour','answerFive','answerSix'],
            userId: uni.getStorageSync("userId")
        }
    },
    methods: {
        radioChange(e) {
            let index = e.currentTarget.id;
            let value = e.target.value;
            this.list[index]['val'] = value;
        },
        submit(){
            uni.showLoading({
                text: "加载中..."
            })
            const query = {
                userId: this.userId
            }
			let answerNum = 0
            this.keyArr.map((item,index)=>{
                query[item] = this.list[index]['val']
				if(query[item] && query[item].length > 0){
					answerNum += 1
				}
            })
			if(answerNum != this.keyArr.length){
				return uni.showToast({
					title:'请阅读并完成所有信息的勾选',
					icon:'none'
				})
			}
            this.$request({
					path:`/nucleicQuestion`,
                    method: 'post',
                    query
			}).then(res=>{
                uni.hideLoading()
                if(res.data.code == 200) {
                    uni.navigateTo({
                        url:'./pay?row=' + JSON.stringify(res.data.data)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .banner{
        width: 100%;
        height: 200rpx;
        background: yellow;
    }
    .content{
        padding: 20rpx;
        .notes{
            text-indent: 20px;
            line-height: 1.6;
            color: $uni-text-color-grey;
        }

    }
	.title{
		margin-top: 20rpx;
	}
    .radiao{
        radio{
            transform: scale(1);
			margin: 10rpx 10rpx 0 10rpx;
        }
    }
    .btn{
        width: calc(100% - 40rpx);
        font-size: $uni-font-size-lg;
        background: $uni-color-primary;
        color: #fff;
        margin-bottom: 40rpx;
    }
</style>