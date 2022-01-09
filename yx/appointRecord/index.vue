<template>
  <view class="detailPage flex flex-column" style="height: auto;">
      <hs-card class="user-view">
          <view class="flex justify-between items-center">
              <view class="flex flex-column">
                <text class="username">{{PatientInfo.name?PatientInfo.name:'请选择就诊人'}}</text>
                <text class="idCard">{{(PatientInfo.credentialNo?PatientInfo.credentialNo:'') | haddenIdCard}}</text>
            </view>
            <view class="flex items-center" @click="showUserList">
                <!-- <uni-icons @click="showUserList"  type="settings" size="14" color="#fff" /> -->
                <view class="font-size-14-w400 text-color-8f8f8f">切换</view>
				<image class="right marginl10" style="width: 10px;height: 10px" src="../../static/common/exchange.png"></image>
            </view>
          </view>
      </hs-card>
      <view class="flex-1 flex flex-column">
            <view class="text-view flex justify-between" style="padding: 0 20rpx;box-sizing: border-box;">
                <text>挂号列表</text>
                <!-- <uni-icons @click="showSearch"  type="settings" size="16" /> -->
            </view>
            <scroll-view class="flex-1" scroll-y="true"  style="height: calc(100% - 50px)">
                <view class="list" style="padding: 0 20rpx;box-sizing: border-box;">
                    <NoData v-if="list.length == 0" />
                    <hs-card v-else v-for="(item,index) in list" :key="index" class="list-item" @click="goDetail(item)">
                        <template v-slot:header>
                            <view class="title-model flex justify-between items-center">
                                <text>挂号时间：{{item.date}}</text>
                                <view class="status">
								{{registerEnum[parseInt(item.active)]}}
                                </view>
                            </view>
                        </template>
						<view>号源编号：<text>{{item.seqNum}}</text></view>
                        <view>预约时间：<text>{{item.visitDate}}  {{timeEnum[parseInt(item.timePart)]}}</text></view>
						<view>医生信息：<text>{{item.doctorName?item.doctorName||''+" ":''}} {{docEnum[item.docTitle || 0]}}</text></view>
						<view>{{item.deptName?'门诊科室':'导诊信息'}}：<text>{{item.deptName?item.deptName:item.dzInfo}}</text>
						</view>
                        <view v-if="item.deptName">导诊信息：<text>{{item.dzInfo}}</text></view>
                        <view>预约费用：<text>￥{{item.fee}}</text></view>
                    </hs-card>
                </view>
            </scroll-view>
            
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
    components: { uniPopup, userModel,NoData },
    data(){
        return {
            statusEnum: {
                1: '未就诊',
                2: '已就诊',
                3: '取消',
                4: '停诊',
                5: '违约',
            },
			docEnum: {
				0: '--',
				1: '主任医师',
				2: '副主任医师',
				3: '主治医师',
				4: '住院医师',
				5: '民族医专家',
			},
			timeEnum: {
				0: '全部',
				1: '上午',
				2: '下午'
			},
			registerEnum: {
				0: '待诊',
				1: '挂号',
				2: '退号'
			},
            searchForm: {
                startDate: "",
                endDate: "",
                dayType: 0,
                status: 0
            },
            startDate:getDate('start'),
			endDate:getDate('end'),
            PatientInfo: {},
            PatientCard:{},
            list: []
        }
    },
    // onLoad: function (option) {
    //     const { PatientList, PatientCard }  = getApp().globalData;
    //     this.PatientInfo = PatientList[0];
    //     this.PatientCard = PatientCard;
    //     this.getList();
    // },
    async onLoad() {
        //const { PatientList, PatientCard }  = getApp().globalData;
        const { PatientList, PatientCard }  = await this.$getUserInfo();
        this.PatientInfo = PatientList[0];
        this.PatientCard = PatientCard;
        this.getList();
    },
    methods: {
        getList() {
            uni.showLoading({
                title: '加载中...'
            })
            this.$request({
                path:`/registration/order/get-register-record-list`,
                method: 'post',
                query: {
                    medicalRecordNo: this.PatientCard.mrn,
                    name:this.PatientInfo.name,
                    certificateType: this.PatientInfo.credentialType,
                    certificateNo: this.PatientInfo.credentialNo,
                    phoneNum: this.PatientInfo.phone
                }
            }).then(res=>{
                uni.hideLoading()
                if(res.data.code == 200){
                    this.list = res.data.data;
                }else this.list = []
            })
        },
        goDetail(row) {
            const rows = {
                ...row,
                patientName: this.PatientInfo.name,
                certificateNo: this.PatientInfo.credentialNo,
                phoneNum: this.PatientInfo.phone,
                currentDate: row.visitDate,
                timeType: row.timePart,
                payAmountStr: row.fee?row.fee:"暂无"
                // doctorName: row.docName
            }
            
            uni.navigateTo({
				url:'../appointment/payment',
				success: function(res) {
					res.eventChannel.emit('acceptDataFromOpenerPage', {
						data: rows,
						onlyShow: true
					})
				}
			})
        },
        showSearch() {
            this.$refs.searchpopup.open();
        },
        showUserList() {
            this.$refs.userModelref.show();
        },
        clickTags(key,val) {
            this.searchForm[key] = val;
        },
        changeUser(row) {
            this.PatientInfo = row;
            this.$getUserCard(row).then(res=>{
                this.PatientCard = res
                this.getList();
            });
           
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
    }}
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