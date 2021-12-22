<template>
	<view>
		<view class="flex-row">
			<view>
				就诊人类型
			</view>
			<radio-group @change="radioChange">
				<view class="row-cls">
					<label class="row-cls left15" v-for="(patint, index) in patints" :key="patint.value">
						<view>
							<radio :value="patint.value" :checked="patint.value === patientIndex" />
						</view>
						<view>{{patint.name}}</view>
					</label>
				</view>
			</radio-group>
		</view>
		<view class="flex-row">
			<view>
				姓名
			</view>
			<input v-model="name" placeholder="请输入就诊人姓名" />
		</view>
		<view class="flex-row">
			<view>
				性别
			</view>
			<radio-group @change="radioChange">
				<view class="row-cls">
					<label class="row-cls left15" v-for="(sex, index) in sexs" :key="sex.value">
						<view>
							<radio :value="sex.value" :checked="sex.value === current" />
						</view>
						<view>{{sex.name}}</view>
					</label>
				</view>
			</radio-group>
		</view>
		
		<view class="flex-row">
			<view>
				身份证号
			</view>
			<input v-model="idcard" placeholder="请输入就诊人身份证号" />
		</view>
		<view class="flex-row">
			<view>
				就诊ID
			</view>
			<input v-model="diagnoseId" placeholder="请输入就诊人ID" />
		</view>
		<view class="flex-row">
			<view>
				出生日期
			</view>
			<picker mode="date" :value="birthday" @change="birthdayChange">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{birthday||'选择出生日期'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
		</view>
		
		<view class="flex-row">
			<view>
				详细地址
			</view>
			<input v-model="address" placeholder="请输入就诊人详细地址" />
		</view>
		<view class="flex-row">
			<view>
				设为默认就诊人
			</view>
			<view @click="clickSwit">
				<switch  color="#14C759" disabled="true" :checked="defaultDisgnose" style="transform: scale(0.5,0.5)" ></switch>
			</view>
		</view>
		
		<view class="addBtn" @click="addPatient">
			绑定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				idcard:'',
				sex:'',
				address:'',
				phone:'',
				identify:'',
				diagnoseId:'',
				defaultDisgnose:false,
				birthday:'',
				sexs:[
					{
						value:1,
						name:'男',
					},
					{
						value:2,
						name:'女'
					}
				],
				patints:[
					{
						value:0,
						name:'成人',
					},
					{
						value:1,
						name:'儿童'
					}
				],
				current:1,
				patientIndex:0,
				
			}
		},
		onLoad(options) {
			console.log("options==>",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				this.name = item.name;
				this.idcard = item.idnumber;
				this.phone = item.phone;
				if(item.sex == 'woman'){
					this.current = 1;
					console.log("woman")
				}else{
					this.current = 0;
				}
				
			}
		},
		methods: {
			clickSwit(){
				this.defaultDisgnose = !this.defaultDisgnose;
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.sexs.length; i++) {
					if (this.sexs[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			addPatient(){
				if(this.name.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入姓名"
					})
				}
				if(this.idcard.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入身份证号"
					})
				}
				
				this.$request({
					path:"/patient/mobile/add",
					method:'POST',
					query:{
						userId:uni.getStorageSync("userId"),
						credentialNo:this.idcard,
						credentialType:8,
						name:this.name,
						sex:this.current,
						birthday:this.birthday,
						patientType:this.patientIndex,
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
				})
				
			},
			birthdayChange(e) {
			  let date = e.detail.value;
			  this.birthday = date;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.row-cls{
		display: flex;
		flex-direction: row;
	}
	
	.flex-row{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-right: 15px;
		margin-left: 15px;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 0.5px solid $uni-border-color;
	}
	
	.left15{
		margin-left: 15px;
	}
	
	.picker-view{
		min-width: 80px;
		padding: 0 10px;
		
		align-items: center;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}
	
	.height40{
		height: 30px;
		line-height: 30px;
		margin: 0px 5px;
		border-radius: 5px;
	}
	
	.right{
		width: 10px;
		height: 10px;
	}
</style>