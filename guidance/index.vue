<template>
	<view class="content">
		<view class="sex">
			<div @click="changeSex('man')" class="man" :class="{'activeSex': sex === 'man'}">男</div>
			<div @click="changeSex('woman')" class="woman" :class="{'activeSex': sex === 'woman'}">女</div>
		</view>
		
		<view class="list">症状列表</view>
		
		<!--人体图片-->
		<div class="picture" :class="{'zm': currentType === 'zm','fm': currentType === 'fm','man': sex === 'man','woman': sex === 'woman'}">
			<img id="imaPic" :src="personPic" style="width:80%;height:99%;margin-left: 10%;margin-right: 10%;position: absolute;" />
			<!--头部-->
			<div @click="choosePart('head', 344128816648425472)" class="head"></div>
			<!--面部-->
			<div @click="choosePart('face', 343584532023087104)" class="face"></div>
			<!--口腔-->
			<div @click="choosePart('oral', 343528358145822720)" class="oral"></div>
			<!--左眼-->
			<div @click="choosePart('leye', 343584789637238784)" class="leye"></div>
			<!--右眼-->
			<div @click="choosePart('reye', 343584789637238784)" class="reye"></div>
			<!--右耳-->
			<div @click="choosePart('lear', 343584766727950336)" class="lear"></div>
			<!--右耳-->
			<div @click="choosePart('rear', 343584766727950336)" class="rear"></div>
			<!--颈部-->
			<div @click="choosePart('neck', 343584727536373760)" class="neck"></div>
			<!--胸部-->
			<div @click="choosePart('bosom', 343584938107211776)" class="bosom"></div>
			<!--背部-->
			<div @click="choosePart('back', 343584843697623040)" class="back"></div>
			<!--腹部-->
			<div @click="choosePart('belly', 343584955891060736)" class="belly"></div>
			<!--腰部-->
			<div @click="choosePart('waist', 343584582216323072)" class="waist"></div>
			<!--上肢左-->
			<div @click="choosePart('upperLimbLeft', 343584665154490368)" class="upperLimbLeft"></div>
			<!--上肢右-->
			<div @click="choosePart('upperLimbRight', 343584665154490368)" class="upperLimbRight"></div>
			<!--生殖器-->
			<div @click="choosePart('genitals')" class="genitals"></div>
			<!--下肢-->
			<div @click="choosePart('lowerLimbs', 343584868481765376)" class="lowerLimbs"></div>
		</div>
		<div @click="zs" class="zhuanshen">
			<!--<img class="zhuanshen" src="img/zhuanshen.png" width="10%" height="7%" />-->
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: 'man', // 当前性别
				currentType: 'zm', // 当前正背面
				personPic: '../static/guidance/man.png' // 当前人体图片
			}
		},
		methods: {
			zs() {
				if (this.sex === 'man') {
					this.personPic = this.currentType === 'zm' ? '../static/guidance/manZ.png' : '../static/guidance/man.png'
				} else {
					this.personPic = this.currentType === 'zm' ? '../static/guidance/womanZ.png' : '../static/guidance/woman.png'
				}
				this.currentType = this.currentType === 'zm' ? 'fm' : 'zm'
			},
			changeSex(sex) {
				this.sex = sex
				if (this.sex === 'man') {
					this.personPic = this.currentType === 'zm' ? '../static/guidance/man.png' : '../static/guidance/manZ.png'
				} else {
					this.personPic = this.currentType === 'zm' ? '../static/guidance/woman.png' : '../static/guidance/womanZ.png'
				}
			},
			choosePart(type, id) {
				// 343528331197419520 四肢
				// 343528358145822720 口腔
				// 343584532023087104 面部
				// 343584556333273088 臀部
				// 343584582216323072 腰部
				// 343584627024072704 会阴
				// 343584646523392000 皮肤
				// 343584665154490368 上肢
				// 343584727536373760 颈部
				// 343584766727950336 五官
				// 343584789637238784 眼
				// 343584809195278336 全身
				// 343584843697623040 背部
				// 343584868481765376 下肢
				// 343584938107211776 胸部
				// 343584955891060736 腹部
				// 344128816648425472 颅部
				if (type === 'genitals') {
					// 正面=会阴 反面=臀部
					this.currentType === 'zm' && uni.navigateTo({
						url: './guidanceList?id=343584627024072704',
					})
					this.currentType === 'fm' && uni.navigateTo({
						url: './guidanceList?id=343584556333273088',
					})
				} else {
					uni.navigateTo({
						url: './guidanceList?id=' + id,
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #efeff4;
		
		.list {
			position: absolute;
			right: 23px;
			color: #007AFC;
			margin-top: 8px;
			font-weight: bold;
			font-size: 16px;
			padding: 4px;
		}
		
		.sex {
			margin-top: 10px;
			position: absolute;
			padding: 2px;
			font-size: 15px;
			width: 20%;
			height: auto;
			left: 25px;
			background: #E8E8E8;
			border-radius: 10px;
			z-index: 2;
			
			.man {
				width: 50%;
				height: 100%;
				border-radius: 10px;
				float: left;
				text-align: center;
				z-index: 3;
			}
			
			.woman {
				width: 50%;
				height: 100%;
				/*	background: red;*/
				border-radius: 10px;
				float: left;
				text-align: center;
				z-index: 3;
			}
			
			.activeSex {
				background: #007AFC;
				color: white;
			}
		}
		
		.picture {
			position: absolute;
			width: 100%;
			height: 90%;
			z-index: 1;
		}
		.zm.man {
			.head {
				/*background: skyblue;*/
				position: absolute;
				width: 16%;
				height: 12%;
				margin-left: 43%;
				margin-right: 43%;
				top: 3%;
				z-index: 2;
			}
			.face {
				position: absolute;
				width: 10%;
				height: 8.3%;
				margin-left: 45.5%;
				margin-right: 43%;
				top: 6.4%;
				z-index: 3;
			}
			.oral {
				position: absolute;
				width: 6%;
				height: 2%;
				margin-left: 47.5%;
				margin-right: 43%;
				top: 12%;
				z-index: 4;
			}
			.leye {
				position: absolute;
				width: 5%;
				height: 2.5%;
				margin-left: 45.3%;
				margin-right: 43%;
				top: 7.6%;
				z-index: 4;
			}
			.reye {
				position: absolute;
				width: 5%;
				height: 2.5%;
				margin-left: 50.6%;
				margin-right: 43%;
				top: 7.6%;
				z-index: 4;
			}
			.lear {
				position: absolute;
				width: 2.9%;
				height: 3%;
				margin-left: 43%;
				margin-right: 43%;
				top: 9%;
				z-index: 4;
			}
			.rear {
				position: absolute;
				width: 2.9%;
				height: 3%;
				margin-left: 55.8%;
				margin-right: 43%;
				top: 9%;
				z-index: 4;
			}
			.neck {
				/*background: green;*/
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 5%;
				margin-left: 37%;
				margin-right: 37%;
				top: 15%;
			}
			
			.bosom {
				/*background: yellow;*/
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 8%;
				margin-left: 37%;
				margin-right: 37%;
				top: 20%;
			}
			
			.waist {
				display: none;
			}
			
			.back {
				display: none;
			}
			
			
			/*腹部点击*/
			
			.belly {
				/*background: blue;*/
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 10%;
				margin-left: 37%;
				margin-right: 37%;
				top: 33%;
			}
			
			
			/*上肢左*/
			
			.upperLimbLeft {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				left: 17%;
				top: 20%;
			}
			
			
			/*上肢右*/
			
			.upperLimbRight {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				right: 17%;
				top: 20%;
			}
			
			
			/*下肢*/
			
			.lowerLimbs {
				/*background: salmon;*/
				position: absolute;
				z-index: 2;
				width: 28%;
				/*height: 185px;*/
				height: 43%;
				top: 54%;
				margin-left: 36%;
				margin-right: 36%;
				/*margin-top: 250px;*/
			}
			
			
			/*生殖器*/
			
			.genitals {
				/*background: greenyellow;*/
				position: absolute;
				z-index: 2;
				width: 28%;
				height: 10%;
				top: 43.5%;
				margin-left: 36%;
				margin-right: 36%;
			}
		}
		
		.fm.man {
			.head {
				/*background: skyblue;*/
				position: absolute;
				width: 16%;
				height: 12%;
				margin-left: 41%;
				margin-right: 43%;
				top: 3%;
				z-index: 2;
			}
			.face {
				display: none;
			}
			.oral {
				display: none;
			}
			.leye {
				display: none;
			}
			.reye {
				display: none;
			}
			.lear {
				display: none;
			}
			.rear {
				display: none;
			}
			.neck {
				/*background: green;*/
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 5%;
				margin-left: 37%;
				margin-right: 37%;
				top: 15%;
			}
			
			.bosom {
				display: none;
			}
			
			.back {
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 13%;
				margin-left: 37%;
				margin-right: 37%;
				top: 20%;
			}
			
			
			/*腹部点击*/
			
			.belly {
				/*background: blue;*/
				display: none;
			}
			
			/*腰*/
			.waist {
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 10%;
				margin-left: 37%;
				margin-right: 37%;
				top: 33%;
			}
			
			
			/*上肢左*/
			
			.upperLimbLeft {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				left: 17%;
				top: 20%;
			}
			
			
			/*上肢右*/
			
			.upperLimbRight {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				right: 17%;
				top: 20%;
			}
			
			
			/*下肢*/
			
			.lowerLimbs {
				/*background: salmon;*/
				position: absolute;
				z-index: 2;
				width: 28%;
				/*height: 185px;*/
				height: 43%;
				top: 54%;
				margin-left: 36%;
				margin-right: 36%;
				/*margin-top: 250px;*/
			}
			
			
			/*生殖器*/
			
			.genitals {
				/*background: greenyellow;*/
				position: absolute;
				z-index: 2;
				width: 28%;
				height: 10%;
				top: 43.5%;
				margin-left: 36%;
				margin-right: 36%;
			}
		}
		
		.zm.woman {
			.head {
				/*background: skyblue;*/
				position: absolute;
				width: 16%;
				height: 12%;
				margin-left: 42%;
				margin-right: 43%;
				top: 3%;
				z-index: 2;
			}
			.face {
				position: absolute;
				width: 10%;
				height: 8.3%;
				margin-left: 45%;
				margin-right: 43%;
				top: 6.4%;
				z-index: 3;
			}
			.oral {
				position: absolute;
				width: 6%;
				height: 2%;
				margin-left: 47%;
				margin-right: 43%;
				top: 11.5%;
				z-index: 4;
			}
			.leye {
				position: absolute;
				width: 5%;
				height: 2.5%;
				margin-left: 45.3%;
				margin-right: 43%;
				top: 7.6%;
				z-index: 4;
			}
			.reye {
				position: absolute;
				width: 5%;
				height: 2.5%;
				margin-left: 50.6%;
				margin-right: 43%;
				top: 7.6%;
				z-index: 4;
			}
			.lear {
				position: absolute;
				width: 2.9%;
				height: 3%;
				margin-left: 43%;
				margin-right: 43%;
				top: 9%;
				z-index: 4;
			}
			.rear {
				position: absolute;
				width: 2.9%;
				height: 3%;
				margin-left: 55.8%;
				margin-right: 43%;
				top: 9%;
				z-index: 4;
			}
			.neck {
				/*background: green;*/
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 5%;
				margin-left: 37%;
				margin-right: 37%;
				top: 15%;
			}
			
			.bosom {
				position: absolute;
				z-index: 2;
				width: 22%;
				height: 11%;
				margin-left: 39%;
				margin-right: 37%;
				top: 20%;
			}
			
			.waist {
				display: none;
			}
			
			.back {
				display: none;
			}
			
			
			/*腹部点击*/
			
			.belly {
				position: absolute;
				z-index: 2;
				width: 22%;
				height: 10%;
				margin-left: 39%;
				margin-right: 37%;
				top: 31%;
			}
			
			
			/*上肢左*/
			
			.upperLimbLeft {
				position: absolute;
				    z-index: 2;
				    width: 19%;
				    height: 37%;
				    left: 19%;
				    top: 20%;
			}
			
			
			/*上肢右*/
			
			.upperLimbRight {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				right: 19%;
				top: 20%;
			}
			
			
			/*下肢*/
			
			.lowerLimbs {
				/*background: salmon;*/
				position: absolute;
				z-index: 2;
				width: 28%;
				/*height: 185px;*/
				height: 43%;
				top: 54%;
				margin-left: 36%;
				margin-right: 36%;
				/*margin-top: 250px;*/
			}
			
			
			/*生殖器*/
			
			.genitals {
				/*background: greenyellow;*/
				position: absolute;
				    z-index: 2;
				    width: 24%;
				    height: 10%;
				    top: 41%;
				    margin-left: 38%;
				    margin-right: 36%;
			}
		}
		
		.fm.woman {
			.head {
				/*background: skyblue;*/
				position: absolute;
				width: 16%;
				height: 12%;
				margin-left: 42%;
				margin-right: 43%;
				top: 3%;
				z-index: 2;
			}
			.face {
				display: none;
			}
			.oral {
				display: none;
			}
			.leye {
				display: none;
			}
			.reye {
				display: none;
			}
			.lear {
				display: none;
			}
			.rear {
				display: none;
			}
			.neck {
				/*background: green;*/
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 5%;
				margin-left: 37%;
				margin-right: 37%;
				top: 15%;
			}
			
			.bosom {
				display: none;
			}
			
			.back {
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 13%;
				margin-left: 37%;
				margin-right: 37%;
				top: 20%;
			}
			
			
			/*腹部点击*/
			
			.belly {
				/*background: blue;*/
				display: none;
			}
			
			/*腰*/
			.waist {
				position: absolute;
				z-index: 2;
				width: 26%;
				height: 10%;
				margin-left: 37%;
				margin-right: 37%;
				top: 33%;
			}
			
			
			/*上肢左*/
			
			.upperLimbLeft {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				left: 17%;
				top: 20%;
			}
			
			
			/*上肢右*/
			
			.upperLimbRight {
				/*background: black;*/
				position: absolute;
				z-index: 2;
				width: 19%;
				height: 37%;
				right: 17%;
				top: 20%;
			}
			
			
			/*下肢*/
			
			.lowerLimbs {
				/*background: salmon;*/
				position: absolute;
				z-index: 2;
				width: 28%;
				/*height: 185px;*/
				height: 43%;
				top: 54%;
				margin-left: 36%;
				margin-right: 36%;
				/*margin-top: 250px;*/
			}
			
			
			/*生殖器*/
			
			.genitals {
				/*background: greenyellow;*/
				position: absolute;
				    z-index: 2;
				    width: 28%;
				    height: 9%;
				    top: 41%;
				    margin-left: 36%;
				    margin-right: 36%;
			}
		}
		
		.zhuanshen {
			background-image: url(../static/guidance/zhuanshen.png);
			background-size: 75px 59px;
			width: 75px;
			height: 59px;
			background-repeat: no-repeat;
			bottom: 30px;
			position: fixed;
			right: 20px;
			z-index: 5;
		}
	}
</style>
