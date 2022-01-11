<template>
	<view class="page-view">
		<view class="content-view">
			<view class="cell-view row-cls">
				<view class="left-text">
					就诊人类型
				</view>
				<view class="flex1 row-right">
					<radio-group @change="paintChange" style="transform: scale(0.77,0.77);margin-right: -20px;">
						<view class="row-right">
							<label class="marginl15 align-items-center row-cls" v-for="(patintIem, index) in patints" :key="patintIem.value">
								<view>
									<radio color="#53B7C7" :value="patintIem.value" :checked="patintIem.value == patientIndex" />
								</view>
								<view class="radio-name">{{patintIem.name}}</view>
							</label>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>姓名
				</view>
				<input class="right-text" v-model="name" placeholder="请输入就诊人姓名" />
			</view>
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>手机号码
				</view>
				<input class="right-text" v-model="phone" maxlength="11" type="number" placeholder="请输入就诊人手机号码" />
			</view>
			
			
			
			<!-- <view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>证件类型
				</view>
				<picker :value="credentialTypeIndex" :range="credentialTyps" @change="credentialTypeChange" range-key="name">
					<view class="row-cls picker-view">
					  <view class="right-text marginr15">
							{{credentialTyps[credentialTypeIndex].name||'选择联系人类型'}}
					  </view>
					   <image class="right" src="../../static/common/right.png"></image>
					</view>
				</picker>
			</view> -->
			
			
			
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>证件号
				</view>
				<input v-model="idcard" class="right-text" type="idcard" @input="changecertno" maxlength="18" placeholder="请输入就诊人证件号" />
			</view>
			
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>性别
				</view>
				<view class="flex1 row-right">
					<radio-group @change="radioChange" style="transform: scale(0.77,0.77);margin-right: -20px;">
						<view class="row-right">
							<label class="marginl15 align-items-center row-cls" v-for="(sexItem, index) in sexs" :key="sexItem.value">
								<view>
									<radio color="#53B7C7" :value="sexItem.value" :checked="sexItem.value == sexValue" />
								</view>
								<view class="radio-name">{{sexItem.name}}</view>
							</label>
						</view>
					</radio-group>
				</view>
			</view>
			
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>出生日期
				</view>
				<picker mode="date" :value="birthday" @change="birthdayChange">
					<view class="row-cls picker-view ">
					  <view class="right-text marginr15">
							{{birthday||'选择出生日期'}}
					  </view>
					   <image class="right" src="../../static/common/right.png"></image>
					</view>
				</picker>
			</view>
			
			
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>民族
				</view>
				<picker :value="nationIndex" :range="nations" @change="nationChange">
					<view class="row-cls picker-view">
					  <view class="right-text marginr15">
							{{nations[nationindex]||'选择民族'}}
					  </view>
					   <image class="right" src="../../static/common/right.png"></image>
					</view>
				</picker>
			</view>
			
			<view class="cell-view row-cls" v-if="patientIndex === 1">
				<view class="left-text">
					<text>*</text>联系人类型
				</view>
				<picker :value="contactTypeIndex" :range="contactTypes" @change="contactTypeChange" range-key="name">
					<view class="row-cls picker-view">
					  <view class="right-text marginr15">
							{{contactTypes[contactTypeIndex].name||'选择联系人类型'}}
					  </view>
					   <image class="right" src="../../static/common/right.png"></image>
					</view>
				</picker>
			</view>
			
			   
			<view class="cell-view row-cls" v-if="patientIndex === 1">
				<view class="left-text">
					<text>*</text>联系人姓名
				</view>
				<input class="right-text" v-model="contactName" placeholder="请输入联系人姓名" />
			</view>
			
			<view class="cell-view row-cls" v-if="patientIndex === 1">
				<view class="left-text">
					<text>*</text>联系人电话
				</view>
				<input class="right-text" type="number" v-model="contactPhone" maxlength="11" placeholder="请输入联系人电话" />
			</view>
			    
			<view class="cell-view row-cls" v-if="patientIndex === 1">
				<view class="left-text">
					<text>*</text>联系人身份证号
				</view>
				<input class="right-text" type="idcard"  v-model="contactIdcard" maxlength="18" placeholder="请输入联系人身份证号" />
			</view>
			
			<view class="cell-view row-cls">
				<view class="left-text">
					<text>*</text>详细地址
				</view>
				<input class="right-text" v-model="address" placeholder="请输入就诊人详细地址" />
			</view>
			
			<view class="cell-view row-cls">
				<view class="left-text width50">
					设为默认就诊人
				</view>
				<view @click="clickSwit">
					<switch  color="#14C759" disabled="true" :checked="defaultDisgnose" style="transform: scale(0.5,0.5)" ></switch>
				</view>
			</view>
			<view class="note">
				温馨提示:实行实名制就诊,请务必填写真实有效就诊信息。
			</view>
			<view class="circleButton marginb20" @click="addPatient">
				确定
			</view>
			<view style="height: 34px;"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				idcard:'',
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
				sexValue:0,
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
				patientIndex:0,
				contactTypes:[
					// {
					// 	value:0,
					// 	name:'未知',
					// },
					{
						value:1,
						name:'父亲'
					},
					{
						value:2,
						name:'母亲',
					},
					{
						value:3,
						name:'爷爷'
					},
					{
						value:4,
						name:'奶奶',
					},
					{
						value:5,
						name:'外公'
					},
					{
						value:6,
						name:'外婆',
					},
					{
						value:7,
						name:'叔伯/舅舅'
					},
					{
						value:8,
						name:'姑姑/姨妈'
					}
				],
				contactType:1,
				contactTypeIndex:0,
				nations:[
					"汉族",
					"壮族",
					"满族",
					"回族",
					"苗族",
					"维吾尔族",
					"土家族",
					"彝族",
					"蒙古族",
					"藏族",
					"布依族",
					"侗族",
					"瑶族",
					"朝鲜族",
					"白族",
					"哈尼族",
					"哈萨克族",
					"黎族",
					"傣族",
					"畲族",
					"傈僳族",
					"仡佬族",
					"东乡族",
					"高山族",
					"拉祜族",
					"水族",
					"佤族",
					"纳西族",
					"羌族",
					"土族",
					"仫佬族",
					"锡伯族",
					"柯尔克孜族",
					"达斡尔族",
					"景颇族",
					"毛南族",
					"撒拉族",
					"布朗族",
					"塔吉克族",
					"阿昌族",
					"普米族",
					"鄂温克族",
					"怒族",
					"京族",
					"基诺族",
					"德昂族",
					"保安族",
					"俄罗斯族",
					"裕固族",
					"乌兹别克族",
					"门巴族",
					"鄂伦春族",
					"独龙族",
					"塔塔尔族",
					"赫哲族",
					"珞巴族",	
				],
				nationindex:0,
				nation:"汉族",
				contactIdcard:'',
				contactPhone:'',
				contactName:'',
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
				isAdd:false,
			}
		},
		onLoad(options) {
			console.log("options==>",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				this.isAdd = false;
				
				uni.setNavigationBarTitle({
					title:"编辑就诊人"
				})

				this.patientId = item.id;
				this.name = item.name;
				this.idcard = item.idnumber;
				this.phone = item.phone;
				this.birthday = item.birthday;
				this.idcard = item.credentialNo;
				this.address = item.address
				this.contactPhone = item.contactPhone;
				this.contactIdcard = item.contactIdcard;
				this.contactName = item.contactName;
				this.contactType = item.contactType;
				this.nation = item.nation;
				this.contactIdcard = item.contactIdcard;
				this.contactName = item.contactName;
				this.credentialType = item.credentialType;
				this.sexValue = item.sex;
				this.defaultDisgnose = item.defaultPatient ? true : false;
				for(let i = 0; i < this.contactTypes.length; i ++){
					const contactTypeItem = this.contactTypes[i];
					if(contactTypeItem.value == item.contactType){
						this.contactTypeIndex =  i;
						break;
					}
				}
				for(let i = 0; i < this.credentialTyps.length; i ++){
					const contactTypeItem = this.credentialTyps[i];
					if(contactTypeItem.value == item.credentialType){
						this.credentialTypeIndex =  i;
						break;
					}
				}
				for(let i = 0; i < this.patints.length; i ++){
					const patintItem = this.patints[i];
					if(patintItem.value == item.patientType){
						this.patientIndex =  i;
						break;
					}
				}
				for(let i = 0; i < this.sexs.length; i ++){
					const patintItem = this.sexs[i];
					if(patintItem.value == item.sex){
						this.sexValue = item.sex;
						break;
					}
				}
				for(let i = 0; i < this.nations.length; i ++){
					const nation = this.nations[i];
					if(nation == item.nation){
						this.nationindex =  i;
						break;
					}
				}
				
			}else{
				this.isAdd = true;
				uni.setNavigationBarTitle({
					title:"添加就诊人"
				})
			}
		},
		methods: {
			clickSwit(){
				this.defaultDisgnose = !this.defaultDisgnose;
			},
			radioChange(evt){
				for (let i = 0; i < this.sexs.length; i++) {
					if (this.sexs[i].value == evt.detail.value) {
						this.sexValue = this.sexs[i].value;
						break;
					}
				}
			},
			paintChange(evt){
				for (let i = 0; i < this.patints.length; i++) {
					console.log("this.patints[i].value====>",this.patints[i].value);
					if (this.patints[i].value == evt.detail.value) {
						this.patientIndex = i;
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
				
				
				
				if(this.phone.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人手机号"
					})
				}
				
				if(this.idcard.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人证件号"
					})
				}
				
				if(!(this.sexValue == 1 || this.sexValue == 2)){
					return uni.showToast({
						icon:'none',
						title:"请选择性别"
					})
				}
				
				if(this.birthday.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请选择出生日期"
					})
				}
				
				if(this.address.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入就诊人详细地址"
					})
				}
				
				let req = {
					userId:uni.getStorageSync("userId"),
					credentialNo:this.idcard,
					credentialType:this.credentialType,
					name:this.name,
					sex:this.sexValue,
					birthday:this.birthday,
					patientType:this.patientIndex,
					phone:this.phone,
					nation:this.nation,
					address:this.address,
					defaultPatient:this.defaultDisgnose ? 1 : 0,
				}
				if(this.patientIndex == 1){
					req = {
						userId:uni.getStorageSync("userId"),
						credentialNo:this.idcard,
						credentialType:this.credentialType,
						name:this.name,
						sex:this.sexValue,
						birthday:this.birthday,
						patientType:this.patientIndex,
						address:this.address,
						contactPhone:this.contactPhone,
						contactIdcard:this.contactIdcard,
						contactName:this.contactName,
						contactType:this.contactType,
						nation:this.nation,
						phone:this.phone,
						defaultPatient:this.defaultDisgnose ? 1 : 0,
					}
				}
				
				if(this.patientId && this.patientId.length > 0){
					req["id"] = this.patientId;
					this.$request({
						path:"/patient/mobile/edit",
						method:'PUT',
						query:req,
						hastoast:true,
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
				}else{
					this.$request({
						path:"/patient/mobile/add",
						method:'POST',
						query:req,
						hastoast:true,
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
				}
				
				
				
			},
			birthdayChange(e) {
			  let date = e.detail.value;
			  this.birthday = date;
			},
			contactTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.contactTypeIndex =  index;
				this.contactType = this.contactTypes[index].value;
			},
			credentialTypeChange(e){
				console.log("e===>",JSON.stringify(e));
				const index = e.detail.value;
				this.credentialTypeIndex =  index;
				this.credentialType = this.credentialTyps[index].value;
			},
			nationChange(e){
				const index = e.detail.value;
				this.nationindex =  index;
				this.nation = this.nations[index];
			},
			changecertno(){
				if(this.isAdd){
					if(this.idcard.length == 18){
						let that = this;
						this.$request({
							path:'/user/mobile/parseIDCard',
							query:{
								idCard:this.idcard
							}
						}).then(res=>{
							console.log("res===>",JSON.stringify(res))
							if(res.data.code == 200){
								let data = res.data.data;
								that.sexValue = (data.sex == 1 ? 1 : 2);
								that.birthday = data.birthday;
								// if(that.birthday.length == 0){
								// 	that.birthday = data.birthday;
								// }
							}
						})
					}
				}
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.page-view{
		background: #F5F5F5;
		padding: 5px 15px;
	}
	
	.content-view{
		background: #FFFFFF;
	}
	
	.cell-view{
		margin: 0px 15px;
		border-bottom: 1px solid #F5F5F5;
		height: 60px;
		justify-content: space-between;
		align-items: center;
		display: flex;
	}
	.left-text{
		font-size: 14px;
		font-family: PingFang-SC-Medium, PingFang-SC;
		font-weight: 500;
		color: #333333;
		width: 30%;
		text{
			color: #FF6E15;
		}
	}
	
	
	.width50{
		width: 50%;
	}
	
	.right-text{
		font-size: 14px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #333333;
	}
	.radio-name{
		font-size: 12px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #53B7C7;
	}
	
	.row-cls{
		display: flex;
		// flex-direction: row;
		justify-content: space-between;
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
	
	.row-right{
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.note{
		font-size: 12px;
		font-family: PingFang-SC-Regular, PingFang-SC;
		font-weight: 400;
		color: #8F8F8F;
		line-height: 17px;
		margin: 20px 15px 40px 15px;
	}
	
	.marginb20{
		margin-bottom: 20px;
	}
	
</style>