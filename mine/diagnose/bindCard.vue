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
				年龄
			</view>
			<input type="number" v-model="age" placeholder="请输入年龄" />
		</view>
		<view class="flex-row">
			<view>
				就诊卡号
			</view>
			<input type="number" v-model="jzCard" placeholder="请输入就诊卡号" />
		</view>
		<view class="flex-row">
			<view>
				性别
			</view>
			<radio-group @change="radioChange">
				<view class="row-cls">
					<label class="row-cls left15" v-for="(sexitem, index) in sexs" :key="sexitem.value">
						<view>
							<radio :value="sexitem.value" :checked="sexitem.value == sex" />
						</view>
						<view>{{sexitem.name}}</view>
					</label>
				</view>
			</radio-group>
		</view>
		<view class="flex-row">
			<view>
				手机号码
			</view>
			<input v-model="phone" placeholder="请输入就诊人手机号码" />
		</view>
		<view class="flex-row">
			<view>
				证件类型
			</view>
			<picker :value="credentialTypeIndex" :range="credentialTyps" @change="credentialTypeChange" range-key="name">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{credentialTyps[credentialTypeIndex].name||'选择证件类型'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
		</view>
		
		<view class="flex-row">
			<view>
				证件号
			</view>
			<input v-model="idcard" placeholder="请输入就诊人证件号" />
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
				age:0,
				idcard:'',
				address:'',
				phone:'',
				identify:'',
				birthday:'',
				sexs:[
					{
						value:'M',
						name:'男',
					},
					{
						value:'F',
						name:'女'
					}
				],
				sex:'M',
				patientIndex:0,
				credentialTyps:[
					// {
					// 	value:0,
					// 	name:'未知',
					// },
					{
						value:1,
						name:'身份证'
					},
					{
						value:2,
						name:'军官证',
					},
					{
						value:3,
						name:'户口本'
					},
					{
						value:4,
						name:'护照',
					},
					{
						value:5,
						name:'外国人永久居住证'
					},
					{
						value:6,
						name:'就诊卡号',
					},
					{
						value:7,
						name:'住院号'
					},
					{
						value:8,
						name:'病历号'
					}
				],
				credentialTypeIndex:0,
				credentialType:1,
				patientId:'',
				jzCard:'',
			}
		},
		onLoad(options) {
			console.log("options==>",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				this.patientId = item.id;
			}
		},
		methods: {
			radioChange(evt){
				for (let i = 0; i < this.sexs.length; i++) {
					if (this.sexs[i].value == evt.detail.value) {
						this.sex = this.sexs[i].value;
						break;
					}
				}
			},
			addPatient(){
				if(this.name.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人姓名"
					})
				}
				if(this.age.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人年龄"
					})
				}
				if(this.jzCard.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊卡号"
					})
				}
				
				if(this.phone.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人手机号"
					})
				}
				
				if(this.idcard.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人证件号码"
					})
				}
				
				
				
				if(this.birthday.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请选择就诊人出生日期"
					})
				}
				
				if(this.address.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人居住地"
					})
				}
				
				let req = {
					userId:uni.getStorageSync("userId"),
					cardNum:this.idcard,
					cardType:this.credentialType,
					name:this.name,
					sex:this.sex, // //性别(M：男，F：女)
					birthday:this.birthday.replace(/-/g,''), // 格式：YYYYMMDD
					patientType:this.patientIndex,
					addr:this.address,
					age:parseInt(this.age),
					phoneNum:this.phone,
					style:'A',  // 自费/医保类型(A：自费，B：医保)
					jzCard:this.jzCard,
					patientId:this.patientId,
				}
				
				this.$request({
					path:"/patientCard/mobile/patientCardDinding",
					method:'POST',
					query:req,
				}).then(res=>{
					console.log("res",JSON.stringify(res));
					if(res.data.code == 200){
						uni.showToast({
							icon:'none',
							title:res.data.msg,
							success() {
								setTimeout(()=>{
									uni.navigateBack();
								},1000)
							}
						})
					}
				})
				
				
				
			},
			birthdayChange(e) {
			  let date = e.detail.value;
			  this.birthday = date;
			},
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.credentialTyps[index].value;
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