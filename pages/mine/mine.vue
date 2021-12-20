<template>
	<view>
		<view v-for="item in list" class="cell" @click="navitoPage(item)">
			<view>
				{{item.name}}
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name:"就诊人管理",
						navi:"../../mine/diagnose/diagnoseLsit",
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			navitoPage(item){
				uni.navigateTo({
					url:item.navi
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>