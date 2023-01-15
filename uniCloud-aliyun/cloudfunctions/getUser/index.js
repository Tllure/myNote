'use strict';
const db = uniCloud.database()
const userDb = db.collection('user')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res = await userDb.where({_id: '637e29a7b653d60001d5dc00'}).get();
	//返回数据给客户端
	return res;
};
