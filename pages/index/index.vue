<template>
	<view class="background">
		<view class="default"></view>
		<view class="bg">
			<image :src="image" v-if="default"></image>
			<!-- 提示窗1 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="通知" content="是否更换背景封面"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
			<!-- 底部弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<uni-file-picker @success="handleSuccess" fileMediatype="image" limit="1"></uni-file-picker>
				</view>
			</uni-popup>
		</view>
		<view class="box">
			<view class="box-1" @click="dialogToggle('info')">
				<view class="title">
					<view class="title-1">
						<p>全部笔记</p>
						<image src="../../static/下拉.png"></image>
					</view>
					<span>{{note.length}}条笔记</span>
				</view>
			</view>
			<view class="more">
				<image src="../../static/更多.png" @click="dialogToggle2('info')"></image>
				<!-- 提示窗2 -->
				<uni-popup ref="alertDialog2" type="dialog">
					<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="通知" content="是否更换为默认背景"
						@confirm="dialogConfirm2" @close="dialogClose"></uni-popup-dialog>
				</uni-popup>
			</view>
			<uni-search-bar bgColor="#fff" radius="100" placeholder="搜索笔记" clearButton="none" cancelButton="none">
				<uni-icons slot="searchIcon" size="18" type="search" />
			</uni-search-bar>
			<view class="note" v-for="(item,index) in note" :key="index" @click="toEdit(item._id)"
				@longpress="longpressTo(item._id)">
				<p>{{item.content}}</p>
				<span>
					<uni-dateformat :date="item.now - 30000" :threshold="[60000,3600000]" :format="'MM月dd日'">
					</uni-dateformat>
				</span>
				<image :src="item.avatar[0]" v-if="item.avatar" mode="aspectFill"></image>
			</view>
			<uni-fab @click="goto" ref="fab" horizontal="right" vertical="bottom" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				win3:true,
				default: true,
				image: '',
				list: [],
				note: []
			}
		},
		onLoad() {
			this.getData();
			this.getNote();
		},
		onShow() {
			this.getData();
			this.getNote();
		},
		methods: {
			toEdit(id) {
				uni.navigateTo({
					url: '/pages/edit/edit?id=' + id,
				});
			},
			goto() {
				uni.navigateTo({
					url: '/pages/new/new'
				})
			},
			longpressTo(id) {
				console.log(id);
			},
			getNote() {
				uniCloud.callFunction({
					name: 'getNote',
					success: (e) => {
						console.log(e.result);
						this.note = e.result.data;
					}
				})
			},
			getData() {
				uniCloud.callFunction({
					name: 'getUser',
					success: (e) => {
						console.log(e.result);
						this.list = e.result.data;
						this.image = e.result.data[0].image;
					}
				})
			},
			addImg() {
				uniCloud.callFunction({
					name: 'addImg',
					data: {
						image: this.image
					},
					success: (e) => {
						console.log(e.result);
					}
				})
			},
			updateImg() {
				// console.log('66666', this.image);
				uniCloud.callFunction({
					name: 'updateUser',
					data: {
						image: this.image
					},
					success: (e) => {
						console.log(e.result);
						// this.getData();
					}
				})
			},
			handleSuccess(res) {
				console.log(res.tempFilePaths);
				this.image = res.tempFilePaths[0];
				this.updateImg();
				this.$refs.popup.close();
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogToggle2(type) {
				this.msgType = type
				this.$refs.alertDialog2.open()
			},
			dialogConfirm() {
				console.log('点击确认')
				this.$refs.popup.open('bottom')
			},
			dialogConfirm2() {
				console.log('点击确认')
				this.default = !this.default
				this.$refs.popup.close()
			},
			dialogClose() {
				console.log('点击关闭')
			},
		}
	}
</script>

<style>
	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 150px;
		background-color: #fff;
	}

	/* .background {
		width: 100%;
		height: 100vh;
		background-color: #f3f4f6;
		z-index: -1;
	} */

	.default {
		width: 100%;
		height: 100vh;
		position: fixed;
		background-color: #f3f4f6;
		z-index: -1;
	}

	.bg image {
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 0;
	}

	.box {
		width: 100%;
		/* height: auto; */
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 140px;
		position: relative;
		/* background-color: #f3f4f6; */
	}

	.box-1 {
		width: 100%;
		height: 50vw;
		position: relative;
		/* background-color: #f00; */
	}

	.box-2 {
		width: 95%;
	}

	.title {
		position: absolute;
		top: 30vw;
		left: 5vw;
	}

	.title-1 {
		display: flex;
		flex-direction: row;
	}

	.title-1>p {
		font-size: 60rpx;
	}

	.title-1>image {
		width: 5vw;
		height: 5vw;
		margin: 3vw 2vw 3vw 2vw;
	}

	.title>span {
		color: #808080;
	}

	.more {
		position: absolute;
		top: 20vw;
		right: 5vw;
	}

	.more>image {
		width: 5vw;
		height: 5vw;
	}

	.note {
		width: 95%;
		height: 20vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 20rpx;
		border-radius: 15px;
		background-color: #fff;
	}

	.note>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 70vw;
		font-size: 16px;
		padding-left: 20rpx;
	}

	.note>span {
		font-size: 10px;
		color: #808080;
		padding-left: 20rpx;
	}

	.note>image {
		width: 60px;
		height: 60px;
		position: absolute;
		right: 20px;
		border-radius: 10px;
	}
</style>
