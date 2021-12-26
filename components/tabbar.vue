<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" active-color='#5098FF'></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						pagePath: "/pages/index/index",
						text: "首页",
						iconPath: "/static/tabbar/index.png",
						selectedIconPath: "/static/tabbar/indexed.png",
						midButton: false,
						customIcon: false,
					},
					{
						"selectedIconPath":"/static/tabbar/elecode.png",
						"iconPath": "/static/tabbar/elecode.png",
						"pagePath":"/pages/eleguide/eleguide",
						midButton: true,
						customIcon: false,
					},
					{
						"pagePath": "/pages/mine/mine",
						"text": "个人中心",
						"iconPath": "/static/tabbar/home.png",
						"selectedIconPath": "/static/tabbar/homed.png",
						midButton: false,
						customIcon: false,
					}
				],
				current: 0
			}
		},
	}
</script>