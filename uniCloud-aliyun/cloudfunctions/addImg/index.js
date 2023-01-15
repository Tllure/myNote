'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	db.collection("user")
		.add(event)
		.then((res) => {
			uni.showToast({
				title: '新增成功'
			})
		})
		.catch((err) => {
			uni.showModal({
				content: err.message || '新增失败',
				showCancel: false
			})
		})
		.finally(() => {

		})
	//返回数据给客户端
	return event
};
