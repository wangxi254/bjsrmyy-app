<template>
	<view>
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
							<radio :value="sex.value" :checked="index === current" />
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
				sexs:[
					{
						value:'man',
						name:'男',
					},
					{
						value:'womam',
						name:'女'
					}
				],
				current:0,
				
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
				if(this.idcard.length !== 18){
					return uni.showToast({
						icon:'none',
						title:"请输入正确的身份证号"
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
					}
				}).then(res=>{
					console.log("res",JSON.stringify(res));
				})
				
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
</style>