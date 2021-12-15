<template>
	<view class="content">
		<view class="sex">
			<div class="man">男</div>
			<div class="woman">女</div>
		</view>
		
		<view class="list">症状列表</view>
		
		<!--人体图片-->
		<div class="picture">
			<img id="imaPic" src="../static/guidance/man.png" width="80%" height="99%" style="margin-left: 10%;margin-right: 10%;position: absolute;" />
			<!--头部-->
			<div class="head"></div>
			<!--颈部-->
			<div class="neck"></div>
			<!--胸部-->
			<div class="bosom"></div>
			<!--腹部-->
			<div class="belly"></div>
			<!--上肢左-->
			<div class="upperLimbLeft"></div>
			<!--上肢右-->
			<div class="upperLimbRight"></div>
			<!--生殖器-->
			<div class="genitals"></div>
			<!--下肢-->
			<div class="lowerLimbs"></div>
		</div>
		<div class="zhuanshen">
			<!--<img class="zhuanshen" src="img/zhuanshen.png" width="10%" height="7%" />-->
		</div>
	</view>
</template>

<script>
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
				background: #007AFC;
				border-radius: 10px;
				float: left;
				text-align: center;
				color: white;
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
		}
		
		.picture {
			position: absolute;
			width: 100%;
			height: 90%;
			z-index: 1;
			
			.head {
				/*background: skyblue;*/
				position: absolute;
				width: 16%;
				height: 12%;
				margin-left: 43%;
				margin-right: 43%;
				top: 3%;
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
