<template>
	<view class="container">
		<view class="bg">
			<image src="../../static/background.jpeg"></image>
			<view class="profile">
				<image :src="profile" mode="aspectFill" @click="change"></image>
				<span>陈志扬<span>></span></span>
			</view>
		</view>
		<view class="box">
			<span>今日步数</span>
			<p>3488</p>
			<text>查看我的目标步数></text>
			<view class="progress-bar">
				<view class="progress-bg"></view>
			</view>
		</view>
		<view class="content">
			<uni-list-item class="list" link="switchTab" to="/pages/index/index" v-for="(item,index) in form" :key="index"
				:title="item.title" showArrow :thumb="item.image" thumb-size="base" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile: '',
				form: [{
						title: '我的笔记',
						image: '/static/日记.png'
					},
					{
						title: '修改资料',
						image: '/static/修改.png'
					},
					{
						title: '我的收藏',
						image: '/static/收藏.png'
					},
					{
						title: '关于',
						image: '/static/关于.png'
					},
					{
						title: '设置',
						image: '/static/设置.png'
					},
				]
			}
		},
		onLoad() {
			this.show();
		},
		onShow() {
			this.show();
		},
		methods: {
			show() {
				uniCloud.callFunction({
					name: 'getUser',
					success: (e) => {
						console.log(e);
						this.profile = e.result.data[0].profile;
					}
				})
			},
			change() {
				uniCloud.chooseAndUploadFile({
					type: 'image',
					success: (e) => {
						console.log(e.tempFiles[0].url);
						uniCloud.callFunction({
							name: 'updateUser',
							data: {
								profile: e.tempFiles[0].url
							},
							success: (e) => {
								console.log(e);
								this.show();
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f3f4f6;
	}

	.bg {
		width: 100%;
		position: relative;
	}

	.bg>image {
		width: 100%;
	}

	.profile {
		display: flex;
		align-items: center;
		position: absolute;
		top: 100px;
		left: 15px;
	}

	.profile>image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.profile>span {
		font-size: 20px;
		color: #fff;
		margin-left: 10px;
	}

	.box {
		width: 95%;
		height: 100px;
		border-radius: 10px;
		position: absolute;
		top: 170px;
		box-shadow: 0 0 10rpx 10rpx rgba(0, 0, 0, .1);
		background-color: #fff;
	}

	.box span {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 15px;
		font-weight: 700;
	}

	.box p {
		position: absolute;
		top: 50px;
		left: 10px;
		font-size: 20px;
		font-weight: 700;
	}

	.box text {
		position: absolute;
		font-size: 10px;
		color: #666;
		top: 60px;
		right: 10px;
	}

	.content {
		width: 90%;
		height: 300px;
		padding: 10px;
		border-radius: 10px;
		position: absolute;
		top: 300px;
		box-shadow: 0 0 10rpx 10rpx rgba(0, 0, 0, .1);
		background-color: #fff;
	}

	.list {
		padding: 5px;
	}

	.progress-bar {
		width: 95%;
		height: 5px;
		overflow: hidden;
		box-sizing: border-box;
		border-radius: 24px;
		background-color: #eee;
		position: absolute;
		left: 10px;
		bottom: 15px;
	}

	.progress-bg {
		width: 30%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		background-image: linear-gradient(135deg, #00BFFF 25%, #FA8072 0, #FA8072 50%, #00BFFF 0, #00BFFF 75%, #FA8072 0);
		border-radius: 24px;
		animation: panoramic 20s linear infinite;
		background-size: 32px 100%;
	}

	@keyframes panoramic {
		to {
			background-position: 200% 0;
		}
	}
</style>
