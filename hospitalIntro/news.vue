<template>
    <view class="content">
		<wybTable ref="table" :headers="headers" :contents="contents" :url-col="urlCol" />
    </view>
</template>

<script>
	import wybTable from "../components/wyb-table/wyb-table.vue";
    export default {
        data() {
			const theUrl = '/pages/demos/noticeBar-demo/more' // 本地的某个页面
			const httpUrl = 'https://ext.dcloud.net.cn/plugin?id=2667' // 某个网址
            return {
                headers: [{
					label: '姓名',
					key: 'name'
				}, {
					label: '年龄',
					key: 'age'
				}, {
					label: '学院',
					key: 'collage'
				}, {
					label: '成绩',
					key: 'score'
				}, {
					label: '路由',
					key: 'url'
				}, {
					label: '网址',
					key: 'link'
				},{
					label: '设置',
					key: 'set'
				}],
				contents: [{
					name: '刘一',
					age: '',
					collage: '信息学院',
					score: '99',
					url: ['查看更多', theUrl],
					link: '',
					set: '操作',
				}, {
					name: '陈二',
					age: '18',
					collage: '商学院',
					score: '98',
					url: ['我带参数', theUrl, {name: '陈二'}],
					link: '',
					set: '操作',
				}, {
					name: '张三',
					age: '22',
					collage: '统计与数学学院',
					score: '97',
					url: ['查看更多', theUrl],
					link: '',
					set: '操作',
				}, {
					name: '李四',
					age: '19',
					collage: '城市与环境学院',
					score: '96',
					url: '',
					link: ['访问网址', httpUrl],
					set: '操作',
				}, {
					name: '王五',
					age: '20',
					collage: '旅游与酒店管理学院',
					score: '95',
					url: ['查看更多', theUrl],
					link: '',
					set: '操作',
				}, {
					name: '赵六 ',
					age: '20',
					collage: '',
					score: '88',
					url: ['查看更多', theUrl],
					link: '',
					set: '操作',
				}, {
					name: '孙七',
					age: '21',
					collage: '',
					score: '95',
					url: '',
					link: ['访问网址', httpUrl],
					set: '操作',
				}, {
					name: '周八 ',
					age: '21',
					collage: '会计学院',
					score: '85',
					url: ['查看更多', theUrl],
					link: '',
					set: '操作',
				}, {
					name: '吴九 ',
					age: '20',
					collage: '',
					score: '91',
					url: ['查看更多', theUrl],
					link: '',
					set: '操作',
				}, {
					name: '郑十',
					age: '19',
					collage: '',
					score: '95',
					url: '',
					link: ['访问网址', httpUrl],
					set: '操作',
				}],
				urlCol: [{
					type: 'route',
					key: 'url'
				}, {
					type: 'http',
					key: 'link'
				}]
				
            }
        },
		components:{
			wybTable
		},
        onLoad(options) {
            let that = this;
            for (var i = 0; i < 100; i++) {
                that.list.push("滚动列表内容" + i)
            }
			
        },
        methods: {
            clickEvnet(type) {
                let that = this;
                that.goToBottom(type == 0 ? 0 : 99999)
            },
            // 容器滚动到底部
            goToBottom(scrollTop) {
                let that = this
                that.scrollTop = scrollTop + Math.random() * 10
            },
        }
    }
</script>

<style>
    .content {
        height: 100%;
    }

    .flex-column {
        display: flex;
        flex-direction: row;
    }
</style>
