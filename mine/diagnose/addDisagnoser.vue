<template>
	<view>
		<view class="flex-row">
			<view>
				就诊人类型
			</view>
			<radio-group @change="paintChange">
				<view class="row-cls">
					<label class="row-cls left15" v-for="(patintIem, index) in patints" :key="patintIem.value">
						<view>
							<radio :value="patintIem.value" :checked="patintIem.value == patientIndex" />
						</view>
						<view>{{patintIem.name}}</view>
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
				证件类型
			</view>
			<picker :value="credentialTypeIndex" :range="credentialTyps" @change="credentialTypeChange" range-key="name">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{credentialTyps[credentialTypeIndex].name||'选择联系人类型'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
		</view>
		<view class="flex-row">
			<view>
				手机号码
			</view>
			<input v-model="phone" placeholder="请输入就诊人手机号码" />
		</view>
		<view class="flex-row">
			<view>
				证件号
			</view>
			<input v-model="idcard" placeholder="请输入就诊人证件号" />
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
				民族
			</view>
			<picker :value="nationIndex" :range="nations" @change="nationChange">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{nations[nationindex]||'选择民族'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
		</view>
		
		<view class="flex-row" v-if="patientIndex === 1">
			<view>
				联系人类型
			</view>
			<picker :value="contactTypeIndex" :range="contactTypes" @change="contactTypeChange" range-key="name">
				<view class="flex-row picker-view height40 hs-border">
				  <view>
						{{contactTypes[contactTypeIndex].name||'选择联系人类型'}}
				  </view>
				   <image class="right" src="../../static/common/right.png"></image>
				</view>
			</picker>
		</view>
		
		   
		<view class="flex-row" v-if="patientIndex === 1">
			<view>
				联系人姓名
			</view>
			<input v-model="contactName" placeholder="请输入联系人姓名" />
		</view>
		
		<view class="flex-row" v-if="patientIndex === 1">
			<view>
				联系人电话
			</view>
			<input v-model="contactPhone" placeholder="请输入联系人电话" />
		</view>
		    
		<view class="flex-row" v-if="patientIndex === 1">
			<view>
				联系人身份证号
			</view>
			<input v-model="contactIdcard" placeholder="请输入联系人身份证号" />
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
				sex:1,
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
				nation:"",
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
			}
		},
		onLoad(options) {
			console.log("options==>",options.item);
			if(options.item){
				let item = JSON.parse(options.item);
				
				
			

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
				this.sex = item.sex;
				
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
				// for(let i = 0; i < this.sexs.length; i ++){
				// 	const patintItem = this.sexs[i];
				// 	if(patintItem.value == item.sex){
				// 		this.sex = item.sex;
				// 		break;
				// 	}
				// }
				for(let i = 0; i < this.nations.length; i ++){
					const nation = this.nations[i];
					if(nation == item.nation){
						this.nationindex =  i;
						break;
					}
				}
				
			}
		},
		methods: {
			clickSwit(){
				this.defaultDisgnose = !this.defaultDisgnose;
			},
			radioChange(evt){
				for (let i = 0; i < this.sexs.length; i++) {
					if (this.sexs[i].value == evt.detail.value) {
						this.sex = this.sexs[i].value;
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
				if(this.idcard.length === 0){
					return uni.showToast({
						icon:'none',
						title:"请输入身份证号"
					})
				}

				let req = {
					userId:uni.getStorageSync("userId"),
					credentialNo:this.idcard,
					credentialType:8,
					name:this.name,
					sex:this.sex,
					birthday:this.birthday,
					patientType:this.patientIndex,
					nation:this.nation,
					defaultPatient:this.defaultDisgnose ? 1 : 0,
				}
				if(this.patientIndex == 1){
					req = {
						userId:uni.getStorageSync("userId"),
						credentialNo:this.idcard,
						credentialType:8,
						name:this.name,
						sex:this.sex,
						birthday:this.birthday,
						patientType:this.patientIndex,
						address:this.address,
						contactPhone:this.contactPhone,
						contactIdcard:this.contactIdcard,
						contactName:this.contactName,
						contactType:this.contactType,
						nation:this.nation,
						phone:this.phone,
						defaultPatient:this.defaultDisgnose,
					}
				}
				
				if(this.patientId && this.patientId.length > 0){
					req["id"] = this.patientId;
					this.$request({
						path:"/patient/mobile/edit",
						method:'PUT',
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
				}else{
					this.$request({
						path:"/patient/mobile/add",
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