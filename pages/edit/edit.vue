<template>
	<view class="box">
		<view class="top">
			<image style="left: 20px;" src="../../static/左箭头.png" @click="backTo"></image>
			<image style="right: 20px;" src="../../static/对勾.png" @click="getContent"></image>
		</view>
		<input class="title" placeholder="标题" v-model="content" />
		<view class="example-body">
			<uni-dateformat :date="now - 30000" :threshold="[60000,3600000]"></uni-dateformat>
			<uni-dateformat :date="now - 30000" :threshold="[0,0]" :format="'hh:mm'"></uni-dateformat>
		</view>
		<editor id="editor" class="ql-container" @ready="onEditorReady"></editor>
		<view class="bottom">
			<!-- <uni-file-picker @success="handleSuccess" fileMediatype="image" limit="9"> -->
			<view class="btn" @click="chooseAndUploadFile">
				<image src="../../static/图片.png"></image>
				<span>图片</span>
			</view>
			<!-- </uni-file-picker> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: '',
				ops: [],
				avatar: [],
				now: Date.now()
			}
		},
		onLoad(e) {
			console.log(e);
			this.id = e.id;
			this.show(e);
		},
		methods: {
			chooseAndUploadFile() {
				const that = this
				uniCloud.chooseAndUploadFile({
					type: 'image',
					success(res) {
						console.log(res);
						if (res.tempFiles.length > 0) {
							for (let item in res.tempFiles) {
								console.log(item);
								let src = res.tempFiles[item].url;
								console.log(src);
								that.editorCtx.insertImage({
									src: src,
									width: '50%',
									height: '50%',
								})
								that.avatar = [src];
								that.insertImg();
							}
						};
					}
				})
			},
			//获取编辑器输入的内容
			getContent() {
				let that = this
				this.editorCtx.getContents({
					success: function(res) {
						console.log(res);
						// this.ops = res.delta;
						uniCloud.callFunction({
							name: 'updateContent',
							data: {
								_id: that.id,
								delta: res.delta,
								now: that.now,
								content: that.content,
							},
							success: (e) => {
								console.log(e);
							}
						})
					}
				})
			},
			show(e) {
				uniCloud.callFunction({
					name: 'getContent',
					data: {
						_id: e.id
					},
					success: (res) => {
						console.log(res);
						this.content = res.result.data[0].content;
						this.editorCtx.setContents({
							'delta': res.result.data[0].delta,
							success: (e) => {
								console.log(e);
							}
						})
					}
				})
			},
			insertImg() {
				uniCloud.callFunction({
					name: 'addAvatar',
					data: {
						_id: this.id,
						avatar: this.avatar
					},
					success: (e) => {
						console.log(e.result);
					}
				})
			},
			backTo() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			handleSuccess(res) {
				console.log(res);
				if (res.tempFilePaths.length > 0) {
					for (let item in res.tempFilePaths) {
						console.log(item);
						let src = res.tempFilePaths[item];
						this.editorCtx.insertImage({
								src: src,
								width: '50%',
								height: '50%',
							}),
							this.avatar = res.tempFilePaths;
						this.insertImg();
					}
				};
			}
		}
	}
</script>

<style>
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.top {
		display: flex;
		justify-content: space-between;
		margin-top: 50px;
	}

	.top image {
		width: 30px;
		height: 30px;
	}

	.title {
		width: 90%;
		margin-top: 20px;
		margin-left: 20px;
		font-size: 30px;
	}

	.example-body {
		width: 90%;
		display: flex;
		flex-direction: row;
		margin-left: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
		line-height: 1.5em;
		font-size: 10px;
		color: #bfbfbf;
		z-index: 100;
	}

	.example-body text {
		margin-right: 5px;
	}

	.ql-container {
		width: 90%;
		height: 600px;
		left: 20px;
	}

	.bottom {
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.btn {
		display: flex;
		flex-direction: column;
		margin: 10px;
	}

	.btn image {
		width: 30px;
		height: 30px;
	}

	.btn span {
		width: 30px;
		text-align: center;
		font-size: 10px;
		color: #242424;
	}
</style>
