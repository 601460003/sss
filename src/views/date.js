// 计算续住的总日期列表
export function getAlldate(begin, end) {
	console.log(begin);
	console.log(end);
	let arr1 = begin.split("/");
	let arr2 = end.split("/");
	let arr1_ = new Date();
	let arrTime = [];
	arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
	let arr2_ = new Date();
	arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
	let unixDb = arr1_.getTime();
	let unixDe = arr2_.getTime();
	for (let k = unixDb; k <= unixDe;) {
		arrTime.push(datetimeparse(k, 'yyyy-MM-DD'));
		k = k + 24 * 60 * 60 * 1000;
	}
	return arrTime;
}

// 时间格式处理
function datetimeparse(timestamp, format, prefix) {
	if (typeof timestamp == 'string') {
		timestamp = Number(timestamp)
	}
	;
	//转换时区
	let currentZoneTime = new Date(timestamp);
	let currentTimestamp = currentZoneTime.getTime();
	let offsetZone = currentZoneTime.getTimezoneOffset() / 60;//如果offsetZone>0是西区，西区晚
	let offset = null;
	//客户端时间与服务器时间保持一致，固定北京时间东八区
	offset = offsetZone + 8;
	currentTimestamp = currentTimestamp + offset * 3600 * 1000

	let newtimestamp = null;
	if (currentTimestamp) {
		if (currentTimestamp.toString().length === 13) {
			newtimestamp = currentTimestamp.toString()
		} else if (currentTimestamp.toString().length === 10) {
			newtimestamp = currentTimestamp + '000'
		} else {
			newtimestamp = null
		}
	} else {
		newtimestamp = null
	}
	;
	let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date()
	let YYYY = dateobj.getFullYear()
	let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
	let DD = dateobj.getDate() > 9 ? dateobj.getDate() : '0' + dateobj.getDate()
	let HH = dateobj.getHours() > 9 ? dateobj.getHours() : '0' + dateobj.getHours()
	let mm = dateobj.getMinutes() > 9 ? dateobj.getMinutes() : '0' + dateobj.getMinutes()
	let ss = dateobj.getSeconds() > 9 ? dateobj.getSeconds() : '0' + dateobj.getSeconds()
	let output = '';
	let separator = '/'
	if (format) {
		separator = format.match(/-/) ? '-' : '/'
		output += format.match(/yy/i) ? YYYY : ''
		output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
		output += format.match(/dd/i) ? (output.length ? separator : '') + DD : ''
		output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
		output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
		output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
	} else {
		output += YYYY + separator + MM + separator + DD
	}
	output = prefix ? (prefix + output) : output

	return newtimestamp ? output : ''
}
//5.最大的失败是放弃，最大的敌人是自己，最大的对手是时间。
//36.上当不是别人太狡猾，而是自己太贪。
//42.做了销售你会发现，最先相信你的是陌生人.最先屏蔽你的是好朋友.最先删除你的是酒肉朋友.最看不起你的是同学和亲人。
//79.一个好的东西往往是说不清楚的，说得请楚的往往不是好东西。
