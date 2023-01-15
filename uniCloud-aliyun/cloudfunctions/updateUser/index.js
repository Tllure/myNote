'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	db.collection('user').where({_id: '637e29a7b653d60001d5dc00'}).update(event)
	//返回数据给客户端
	return event
};
